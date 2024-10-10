package directus

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

// Schema represents the schema of the Directus instance.
type Schema struct {
	// Collections is the list of the collections in the schema.
	Collections []Collection `json:"collections"`

	// Fields is the list of the fields in the schema.
	Fields []Field `json:"fields"`

	// Relations is the list of the relations in the schema.
	Relations []Relation `json:"relations"`
}

// SchemaFromSnapshot reads a schema from the given snapshot reader.
func SchemaFromSnapshot(r io.Reader) (*Schema, error) {
	s := &Schema{}
	if err := json.NewDecoder(r).Decode(s); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	return s, nil
}

// SchemaFromSnapshot reads a schema from a snapshot file.
func SchemaFromSnapshotFile(path string) (*Schema, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}
	defer f.Close()
	return SchemaFromSnapshot(f)
}
