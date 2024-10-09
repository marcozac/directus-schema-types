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

	// run a Directus container
	dt, err := directest.New(testutil.DirectusVersion(),
		directest.WithContext(ctx),
		directest.WithLogWriter(os.Stderr),
		directest.WithApplySchema(true), // apply the test schema
	)
	if err != nil {
		return fmt.Errorf("directest.New: %w", err)
	}
	defer dt.Close()

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
		return fmt.Errorf("node.Create: %w", err)
	}
	if err := pkg.InstallContext(ctx); err != nil {
		return fmt.Errorf("pkg.InstallContext: %w", err)
	}

	// create the client
	client := dst.NewClient(dst.ClientOptions{
		BaseURL: dt.BaseURL(),
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
	if err := pkg.RunContext(ctx, "build"); err != nil {
		return fmt.Errorf("run build: %w", err)
	}

	return nil
}

func boolPtr(b bool) *bool {
	return &b
}
