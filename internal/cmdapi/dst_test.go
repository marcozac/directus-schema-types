package cmdapi

import (
	"context"
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/marcozac/directus-schema-types/internal/testutil/directest"

	_ "embed"
)

//go:embed testdata/overrides.json
var overrideDef string

func TestSuite(t *testing.T) {
	suite.Run(t, &Suite{})
}

type Suite struct {
	suite.Suite
	dt directest.Directest
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
				filePath := filepath.Join(tempDir, "schema.ts")
				cmd := NewDstCmd()
				cmd.SetArgs([]string{
					"generate",
					"--file", filePath,
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().FileExists(filePath, "file exists")
			},
		},
		{
			name: "GenerateDir",
			test: func() {
				dir := filepath.Join(tempDir, "schema")
				cmd := NewDstCmd()
				cmd.SetArgs([]string{
					"generate",
					"--dir", dir,
					"--format", "false",
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().DirExists(dir, "dir exists")
			},
		},
		{
			name: "SnapshotPretty",
			test: func() {
				filePath := filepath.Join(tempDir, "snapshot-pretty.json")
				cmd := NewDstCmd()
				cmd.SetArgs([]string{
					"snapshot",
					"--file", filePath,
					"--pretty",
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().FileExists(filePath, "file exists")
				snapPath = filePath
			},
		},
		{
			// Run this test AFTER the snapshot has been created by the previous test
			name: "GenerateFromSnapshot",
			test: func() {
				suite.Require().NotEmpty(snapPath, "snapshot path")
				filePath := filepath.Join(tempDir, "schema-from-snapshot.ts")
				cmd := NewDstCmd()
				cmd.SetArgs([]string{
					"generate",
					"--file", filePath,
					"--from-snapshot", snapPath,
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().FileExists(filePath, "file exists")
			},
		},
		{
			name: "GenerateWithOverrides",
			test: func() {
				dir := filepath.Join(tempDir, "schema_overrides")
				cmd := NewDstCmd()
				cmd.SetArgs([]string{
					"generate",
					"--dir", dir,
					"--overrides", overrideDef,
					"--format", "false",
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().DirExists(dir, "dir exists")
			},
		},
		{
			name: "GenerateWithOverridesFile",
			test: func() {
				filePath := filepath.Join(tempDir, "overrides.json")
				suite.Require().NoError(os.WriteFile(filePath, []byte(overrideDef), 0o644), "write overrides.json")
				dir := filepath.Join(tempDir, "schema_overrides_file")
				cmd := NewDstCmd()
				cmd.SetArgs([]string{
					"generate",
					"--dir", dir,
					"--overrides-file", filePath,
					"--format", "false",
				})
				suite.Require().NoError(cmd.Execute(), "execute")
				suite.Assert().DirExists(dir, "dir exists")
			},
		},
		{
			name: "GenerateWithOverridesFileError",
			test: func() {
				cmd := NewDstCmd()
				cmd.SilenceUsage = true // don't print usage on error
				dir := filepath.Join(tempDir, "schema_overrides_file_error")
				cmd.SetArgs([]string{
					"generate",
					"--dir", tempDir,
					"--overrides-file", "notfound.json",
				})
				suite.Require().Error(cmd.Execute(), "execute")
				suite.Assert().NoDirExists(dir, "dir does not exist")
			},
		},
	} {
		suite.Run(tt.name, tt.test)
	}
}
