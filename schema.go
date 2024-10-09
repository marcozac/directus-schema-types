package dst

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/marcozac/directus-schema-types/directus"
)

// SchemaFromSnapshot reads a schema from the given snapshot reader.
func SchemaFromSnapshot(r io.Reader) (*directus.Schema, error) {
	s := &directus.Schema{}
	if err := json.NewDecoder(r).Decode(s); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	return s, nil
}

// SchemaFromSnapshot reads a schema from a snapshot file.
func SchemaFromSnapshotFile(path string) (*directus.Schema, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}
	defer f.Close()
	return SchemaFromSnapshot(f)
}
