package dst

import (
	"bytes"
	"encoding/json"
	"os"
	"path/filepath"
	"testing"

	"github.com/joho/godotenv"
	"github.com/marcozac/directus-schema-types/schema"
	"github.com/stretchr/testify/suite"
)

type Suite struct {
	suite.Suite

	clientOptions ClientOptions
	client        *Client
}

// setup the suite applying the test schema
func (suite *Suite) SetupSuite() {
	_ = godotenv.Load() // try to load .env file
	baseURL := os.Getenv("DIRECTUS_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8055"
	}
	token := os.Getenv("DIRECTUS_TOKEN")
	suite.Require().NotEmpty(token, "DIRECTUS_TOKEN is required")

	suite.clientOptions = ClientOptions{
		BaseURL: baseURL,
		Token:   token,
	}
	suite.client = NewClient(suite.clientOptions) // reset before each test

	// apply the test schema
	suite.Require().NoError(suite.client.applyTestSchema(), "applyTestSchema")
}

func (suite *Suite) TearDownSuite() {
	// reset the schema
	suite.Require().NoError(suite.client.resetSchema(), "teardown")
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
				s := &schema.Schema{}
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
				s := &schema.Schema{}
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
			name: "applyTestSchema",
			test: func() {
				err := suite.client.applyTestSchema()
				suite.Assert().Error(err, "applyTestSchema")
			},
		},
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
				err := suite.client.Snapshot(NopWriter{})
				suite.Assert().Error(err, "Snapshot")
			},
		},
		{
			name: "SnapshotPretty",
			test: func() {
				err := suite.client.SnapshotPretty(NopWriter{})
				suite.Assert().Error(err, "SnapshotPretty")
			},
		},
	} {
		suite.Run(tt.name, tt.test)
	}
}

func (suite *Suite) TestGenerator() {
	// get the schema
	s, err := suite.client.GetSchema()
	suite.Require().NoError(err, "GetSchema")

	for _, tt := range []struct {
		name    string
		options []Option
	}{
		{
			name:    "WithWriter",
			options: []Option{WithWriter(NopWriter{})},
		},
		{
			name:    "WithOutFile",
			options: []Option{WithOutFile(filepath.Join("testdata", "schema.ts"))},
		},
		{
			name:    "WithOutDir",
			options: []Option{WithOutDir(filepath.Join("testdata", "schema"))},
		},
	} {
		suite.Run(tt.name, func() {
			generator := NewGenerator(s, tt.options...)
			suite.Require().NoError(generator.Generate(), "generate")
		})
	}
}

func TestSuite(t *testing.T) {
	suite.Run(t, &Suite{})
}

type NopWriter struct{}

func (NopWriter) Write(p []byte) (n int, err error) {
	return len(p), nil
}
