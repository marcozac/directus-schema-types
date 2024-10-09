package testutil

import (
	"bytes"
	"io"

	_ "embed"
)

// directusSchemaSnapshot is an embedded Directus schema snapshot.
//
// It contains environment variables that are expanded at runtime:
//   - $DIRECTUS_VERSION
//   - $DIRECTUS_DB_VENDOR
//
//go:embed directus-schema-snapshot.json
var directusSchemaSnapshot string

// directusEmptySchemaSnapshot is an embedded empty Directus schema snapshot.
//
// It contains environment variables that are expanded at runtime:
//   - $DIRECTUS_VERSION
//   - $DIRECTUS_DB_VENDOR
//
//go:embed directus-empty-schema-snapshot.json
var directusEmptySchemaSnapshot string

// DirectusSchemaSnapshot returns a reader for the Directus schema snapshot.
// The environment variables in the snapshot are expanded.
// It panics on variables expansion error.
func DirectusSchemaSnapshot() io.Reader {
	return bytes.NewBufferString(
		expandEnv(directusSchemaSnapshot),
	)
}

// DirectusEmptySchemaSnapshot returns a reader for the empty Directus schema snapshot.
// The environment variables in the snapshot are expanded.
// It panics on variables expansion error.
func DirectusEmptySchemaSnapshot() io.Reader {
	return bytes.NewBufferString(
		expandEnv(directusEmptySchemaSnapshot),
	)
}
