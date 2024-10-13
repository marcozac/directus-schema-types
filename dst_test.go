package dst

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/marcozac/directus-schema-types/internal/testutil/directest"
	"github.com/marcozac/directus-schema-types/internal/testutil/node"
	"github.com/marcozac/directus-schema-types/util"
)

func TestSuite(t *testing.T) {
	suite.Run(t, &Suite{})
}

type Suite struct {
	suite.Suite

	client        *Client
	clientOptions ClientOptions

	dt  directest.Directest
	pkg *node.Package
}

// setup the suite applying the test schema
func (suite *Suite) SetupSuite() {
	r, err := setupSuiteResources(suite)
	suite.Require().NoError(err, "setupSuiteResources")
	suite.dt = r.dt
	suite.pkg = r.pkg

	suite.clientOptions = ClientOptions{
		BaseURL: suite.dt.BaseURL(),
		Token:   directest.DefaultUserToken,
	}
	suite.client = NewClient(suite.clientOptions) // reset before each test
}

func (suite *Suite) TearDownSuite() {
	suite.Assert().NoError(suite.dt.Close(), "Close Directest")
}

// setup before each test
func (suite *Suite) SetupTest() {
	// reset the client
	suite.client = NewClient(suite.clientOptions)
}

func (suite *Suite) TestClient() {
	for _, tt := range []struct {
		name string
		test func()
	}{
		{
			name: "Snapshot",
			test: func() {
				buf := new(bytes.Buffer)
				err := suite.client.Snapshot(buf)
				suite.Require().NoError(err, "Snapshot")

				// check the snapshot
				s := &directus.Schema{}
				suite.Require().NoError(json.NewDecoder(buf).Decode(s), "decode")
				suite.Require().NotEmpty(s.Collections, "collections")

				// check the collections
				var chefsFound bool
				for _, c := range s.Collections {
					if c.Collection == "chefs" {
						chefsFound = true
						break
					}
				}
				suite.Assert().True(chefsFound, "chefs collection not found")
			},
		},
		{
			name: "SnapshotPretty",
			test: func() {
				buf := new(bytes.Buffer)
				err := suite.client.SnapshotPretty(buf)
				suite.Require().NoError(err, "SnapshotPretty")

				// check the snapshot
				s := &directus.Schema{}
				suite.Require().NoError(json.NewDecoder(buf).Decode(s), "decode")
				suite.Assert().NotEmpty(s.Collections, "collections")
			},
		},
	} {
		suite.Run(tt.name, tt.test)
	}
}

func (suite *Suite) TestClientError() {
	// create a client with invalid token
	suite.client.options.Token = "invalid"

	for _, tt := range []struct {
		name string
		test func()
	}{
		{
			name: "GetSchema",
			test: func() {
				_, err := suite.client.GetSchema()
				suite.Assert().Error(err, "GetSchema")
			},
		},
		{
			name: "GetCollections",
			test: func() {
				_, err := suite.client.GetCollections()
				suite.Assert().Error(err, "GetCollections")
			},
		},
		{
			name: "GetFields",
			test: func() {
				_, err := suite.client.GetFields()
				suite.Assert().Error(err, "GetFields")
			},
		},
		{
			name: "GetRelations",
			test: func() {
				_, err := suite.client.GetRelations()
				suite.Assert().Error(err, "GetRelations")
			},
		},
		{
			name: "Snapshot",
			test: func() {
				err := suite.client.Snapshot(io.Discard)
				suite.Assert().Error(err, "Snapshot")
			},
		},
		{
			name: "SnapshotPretty",
			test: func() {
				err := suite.client.SnapshotPretty(io.Discard)
				suite.Assert().Error(err, "SnapshotPretty")
			},
		},
	} {
		suite.Run(tt.name, tt.test)
	}
}

func (suite *Suite) TestGenerator() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// get the schema
	schema, err := suite.client.GetSchema()
	suite.Require().NoError(err, "GetSchema")

	generator := NewGenerator()
	for _, tt := range []struct {
		name    string
		options []Option
	}{
		{
			name:    "WithWriter",
			options: []Option{WithWriter(io.Discard)},
		},
		{
			name:    "WithOutFile",
			options: []Option{WithOutFile(filepath.Join(suite.pkg.Dir, "schema.ts"))},
		},
		{
			name: "WithOutDir",
			options: []Option{
				WithOutDir(filepath.Join(suite.pkg.Dir, "schema")),
				WithFormatOutput(false), // very slower when enabled
			},
		},
	} {
		suite.Run(tt.name, func() {
			suite.Require().NoError(generator.GenerateSchema(schema, tt.options...), "generate")
		})
	}

	// run the typecheck script
	suite.Require().NoError(suite.pkg.RunContext(ctx, "typecheck"), "Run typecheck")
}

type resources struct {
	dt  directest.Directest
	pkg *node.Package
}

// setupSuiteResources creates in parallel the resources required by the test
// suite and waits for the results.
func setupSuiteResources(suite *Suite) (*resources, error) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	errc := make(chan error, 2)
	dtc := util.WrapChan(errc, func() (directest.Directest, error) {
		dt, err := directest.New(testutil.DirectusVersion(), // use DIRECTUS_VERSION or default
			directest.WithContext(ctx),
			directest.WithLogWriter(testutil.NewPrefixLogWriter(suite.T(), "directest")),
			directest.WithApplySchema(true),
		)
		if err != nil {
			return nil, fmt.Errorf("directest: %w", err)
		}
		return dt, nil
	})
	pkgc := util.WrapChan(errc, func() (*node.Package, error) {
		// create a temp dir for the tests output
		tempDir := suite.T().TempDir()
		pkg, err := node.Create(tempDir,
			&node.Spec{
				PackageJson: &node.PackageJsonSpec{
					Name: "test",
					Scripts: map[string]string{
						"typecheck": "tsc --build --verbose",
					},
					DevDependencies: map[string]string{
						"typescript": "^5",
					},
				},
				TSConfig: &node.TSConfigSpec{
					CompilerOptions: map[string]any{
						"noEmit":        true,
						"noImplicitAny": true,
					},
					Include: []string{"**/*.ts"},
				},
			},
			node.WithLogWriter(testutil.NewPrefixLogWriter(suite.T(), "node")),
		)
		if err != nil {
			return nil, fmt.Errorf("node: create: %w", err)
		}
		if err := pkg.InstallContext(ctx); err != nil {
			return nil, fmt.Errorf("node: install: %w", err)
		}
		return pkg, nil
	})

	// wait for the results
	r := &resources{}
	for {
		select {
		case err := <-errc:
			// return the first error
			// the ctx cancelation will cause the other goroutines to return
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
