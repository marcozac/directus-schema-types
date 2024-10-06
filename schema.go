package dst

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/marcozac/directus-schema-types/schema"
)

// SchemaFromSnapshot reads a schema from a snapshot file.
func SchemaFromSnapshot(path string) (*schema.Schema, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}
	defer f.Close()
	s := &schema.Schema{}
	if err := json.NewDecoder(f).Decode(s); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	return s, nil
}
