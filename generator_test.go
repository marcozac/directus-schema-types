package dst

import (
	"bytes"
	"os"
	"path/filepath"
	"testing"

	"github.com/joho/godotenv"
	"github.com/stretchr/testify/require"

	_ "embed"
)

//go:embed testdata/schema-snapshot.json
var schemaSnapshot []byte

func TestGenerator(t *testing.T) {
	_ = godotenv.Load() // try to load .env file
	baseURL := os.Getenv("DIRECTUS_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8055"
	}
	token := os.Getenv("ADMIN_TOKEN")
	require.NotEmpty(t, token, "DIRECTUS_TOKEN is required")

	client := NewClient(ClientOptions{
		BaseURL: baseURL,
		Token:   token,
	})

	// apply the test schema
	err := client.applyTestSchema(bytes.NewBuffer(schemaSnapshot))
	require.NoError(t, err, "applyTestSchema")

	// get the schema
	s, err := client.GetSchema()
	require.NoError(t, err, "GetSchema")

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
		t.Run(tt.name, func(t *testing.T) {
			generator := NewGenerator(s, tt.options...)
			require.NoError(t, generator.Generate(), "generate")
		})
	}
}

type NopWriter struct{}

func (NopWriter) Write(p []byte) (n int, err error) {
	return len(p), nil
}
