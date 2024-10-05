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

	generator := NewGenerator(GeneratorOptions{
		Schema: s,
	})

	f, err := os.Create(filepath.Join("testdata", "schema.ts"))
	require.NoError(t, err, "create file")
	defer f.Close()

	require.NoError(t, generator.Generate(f), "generate")
}
