package dst

import (
	"os"
	"testing"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSchemaFromSnapshot(t *testing.T) {
	tempDir := t.TempDir()
	for _, tt := range []struct {
		name string
		test func(t *testing.T)
	}{
		{
			name: "OK",
			test: func(t *testing.T) {
				s, err := directus.SchemaFromSnapshot(testutil.DirectusSchemaSnapshot())
				require.NoError(t, err, "schema from snapshot")
				var hasChefs bool
				for _, c := range s.Collections {
					if c.Collection == "chefs" {
						hasChefs = true
						break
					}
				}
				assert.True(t, hasChefs, "chefs collection not found")
			},
		},
		{
			name: "Error",
			test: func(t *testing.T) {
				r := testutil.DirectusSchemaSnapshot()
				_, _ = r.Read(make([]byte, 2))
				_, err := directus.SchemaFromSnapshot(r)
				assert.Error(t, err)
			},
		},
		{
			name: "FileOK",
			test: func(t *testing.T) {
				f, err := os.CreateTemp(tempDir, "snapshot-*.json")
				require.NoError(t, err, "create temp file")
				defer f.Close()

				_, err = f.ReadFrom(testutil.DirectusSchemaSnapshot())
				require.NoError(t, err, "write snapshot to temp file")

				s, err := directus.SchemaFromSnapshotFile(f.Name())
				require.NoError(t, err, "schema from snapshot file")
				var hasChefs bool
				for _, c := range s.Collections {
					if c.Collection == "chefs" {
						hasChefs = true
						break
					}
				}
				assert.True(t, hasChefs, "chefs collection not found")
			},
		},
		{
			name: "FileError",
			test: func(t *testing.T) {
				_, err := directus.SchemaFromSnapshotFile("nonexistent")
				assert.Error(t, err)
			},
		},
	} {
		t.Run(tt.name, tt.test)
	}
}
