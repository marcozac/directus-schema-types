package testutil

import (
	"bytes"
	"io"
	"os"

	"mvdan.cc/sh/v3/shell"

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

// DirectusVersion returns the Directus version.
// It uses the DIRECTUS_VERSION environment variable if set, otherwise it
// returns the default version.
func DirectusVersion() string {
	return expandEnv("${DIRECTUS_VERSION:-11.1.0}")
}

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

// expandEnv expands the environment variables in the given string.
// It panics on variables expansion error.
func expandEnv(s string) string {
	v, err := shell.Expand(s, os.Getenv)
	if err != nil {
		panic(err)
	}
	return v
}
