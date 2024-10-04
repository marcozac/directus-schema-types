package dst

import (
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSpec(t *testing.T) {
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

	schema, err := client.GetSchema()
	require.NoError(t, err, "GetSchema")

	t.Logf("schema: %+v\n", schema)

	spec := SchemaToSpec(schema)
	t.Logf("spec: %+v\n", spec)

	uc, ok := spec.Collections["directus_users"]
	require.True(t, ok, "directus_users collection not found")
	assert.Equal(t, "directus_users", uc.Name, "directus_users collection Name")
	assert.Equal(t, "id", uc.PrimaryKeyField, "directus_users collection PrimaryKeyField")
}
