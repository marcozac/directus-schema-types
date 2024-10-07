package dst

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/marcozac/directus-schema-types/schema"
)

// SchemaFromSnapshot reads a schema from the given snapshot reader.
func SchemaFromSnapshot(r io.Reader) (*schema.Schema, error) {
	s := &schema.Schema{}
	if err := json.NewDecoder(r).Decode(s); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	return s, nil
}

// SchemaFromSnapshot reads a schema from a snapshot file.
func SchemaFromSnapshotFile(path string) (*schema.Schema, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}
	defer f.Close()
	return SchemaFromSnapshot(f)
}
