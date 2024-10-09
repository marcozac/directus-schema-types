package main

import (
	"context"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/marcozac/directus-schema-types/internal/testutil/directest"
)

func TestSuite(t *testing.T) {
	suite.Run(t, &Suite{})
}

type Suite struct {
	suite.Suite
	dt *directest.Directest
}

// setup the suite applying the test schema
func (suite *Suite) SetupSuite() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var err error
	suite.dt, err = directest.New(testutil.DirectusVersion(), // use DIRECTUS_VERSION or default
		directest.WithContext(ctx),
		directest.WithLogWriter(testutil.NewPrefixLogWriter(suite.T(), "directest")),
		directest.WithApplySchema(true),
	)
	suite.Require().NoError(err, "directest")

	suite.T().Setenv("DIRECTUS_BASE_URL", suite.dt.BaseURL())
	suite.T().Setenv("DIRECTUS_TOKEN", directest.DefaultUserToken)
}

func (suite *Suite) TearDownSuite() {
	suite.Assert().NoError(suite.dt.Close(), "Close Directest")
}

func (suite *Suite) Test() {
	tempDir := suite.T().TempDir()
	var snapPath string // set in the snapshot test
	for _, tt := range []struct {
		name string
		test func()
	}{
		{
			name: "GenerateFile",
			test: func() {
				path := filepath.Join(tempDir, "schema.ts")
				cmd := NewRootCmd()
				cmd.SetArgs([]string{
					"generate",
					"--file", path,
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().FileExists(path, "file exists")
			},
		},
		{
			name: "GenerateDir",
			test: func() {
				path := filepath.Join(tempDir, "schema")
				cmd := NewRootCmd()
				cmd.SetArgs([]string{
					"generate",
					"--dir", path,
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().DirExists(path, "dir exists")
			},
		},
		{
			name: "SnapshotPretty",
			test: func() {
				path := filepath.Join(tempDir, "snapshot-pretty.json")
				cmd := NewRootCmd()
				cmd.SetArgs([]string{
					"snapshot",
					"--file", path,
					"--pretty",
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().FileExists(path, "file exists")
				snapPath = path
			},
		},
		{
			// Run this test AFTER the snapshot has been created by the previous test
			name: "GenerateFromSnapshot",
			test: func() {
				suite.Require().NotEmpty(snapPath, "snapshot path")
				path := filepath.Join(tempDir, "schema-from-snapshot.ts")
				cmd := NewRootCmd()
				cmd.SetArgs([]string{
					"generate",
					"--file", path,
					"--from-snapshot", snapPath,
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().FileExists(path, "file exists")
			},
		},
	} {
		suite.Run(tt.name, tt.test)
	}
}
