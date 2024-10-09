package main

import (
	"context"
	"fmt"
	"log"
	"os"

	dst "github.com/marcozac/directus-schema-types"

	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/marcozac/directus-schema-types/internal/testutil/directest"
	"github.com/marcozac/directus-schema-types/internal/testutil/node"
	"github.com/marcozac/directus-schema-types/util"
)

//go:generate go run generate.go

func main() {
	if err := generate(); err != nil {
		log.Fatal(err)
	}
}

func generate() error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// setup the resources:
	//   - Directus container
	//   - Node.js package
	r, err := setup(ctx)
	if err != nil {
		return fmt.Errorf("setup: %w", err)
	}
	defer r.dt.Close()

	// create the client
	client := dst.NewClient(dst.ClientOptions{
		BaseURL: r.dt.BaseURL(),
		Token:   directest.DefaultUserToken,
	})

	// get the schema
	schema, err := client.GetSchema()
	if err != nil {
		return fmt.Errorf("client.GetSchema: %w", err)
	}

	// generate the schema types
	for _, out := range []dst.Option{
		dst.WithOutFile("src/schema.ts"), // write to a file
		dst.WithOutDir("src/schema"),     // write to a directory
	} {
		g := dst.NewGenerator(schema,
			out,
			dst.WithFormatOutput(true),
			dst.WithClean(true),
		)
		if err := g.Generate(); err != nil {
			return fmt.Errorf("generate: %w", err)
		}
	}

	// build the types
	if err := r.pkg.RunContext(ctx, "build"); err != nil {
		return fmt.Errorf("run build: %w", err)
	}

	return nil
}

type resources struct {
	dt  directest.Directest
	pkg *node.Package
}

// setup creates in parallel the resources required to generate the example schema types.
func setup(ctx context.Context) (*resources, error) {
	errc := make(chan error, 2)
	dtc := util.WrapChan(errc, func() (directest.Directest, error) {
		dt, err := directest.New(testutil.DirectusVersion(),
			directest.WithContext(ctx),
			directest.WithLogWriter(os.Stderr),
			directest.WithApplySchema(true), // apply the test schema
		)
		if err != nil {
			return nil, fmt.Errorf("directest.New: %w", err)
		}
		return dt, nil
	})
	pkgc := util.WrapChan(errc, func() (*node.Package, error) {
		// create the Node.js package
		pkg, err := node.Create(".",
			&node.Spec{
				PackageJson: &node.PackageJsonSpec{
					Name:        "example",
					Version:     "0.1.0",
					Private:     boolPtr(true),
					Description: "Example package",
					Scripts: map[string]string{
						"build": "tsc",
					},
					DevDependencies: map[string]string{
						"@types/node": "^20",
						"typescript":  "^5",
					},
				},
				TSConfig: &node.TSConfigSpec{
					CompilerOptions: map[string]any{
						"declaration":         true,
						"emitDeclarationOnly": true,
						"outDir":              "dist",
					},
				},
			},
			node.WithLogWriter(os.Stderr),
		)
		if err != nil {
			return nil, fmt.Errorf("node.Create: %w", err)
		}
		// install the dependencies
		if err := pkg.InstallContext(ctx); err != nil {
			return nil, fmt.Errorf("pkg.InstallContext: %w", err)
		}
		return pkg, nil
	})
	// wait for the results
	r := &resources{}
	for {
		select {
		case err := <-errc:
			return nil, err
		case dt := <-dtc:
			r.dt = dt
		case pkg := <-pkgc:
			r.pkg = pkg
		}
		if r.dt != nil && r.pkg != nil {
			break
		}
	}
	return r, nil
}

func boolPtr(b bool) *bool {
	return &b
}
