package testutil

import (
	"fmt"
	"os"

	"mvdan.cc/sh/v3/shell"
)

// DirectusDefaultVersion is the default Directus version used in the tests
// and to generate the snapshots.
const DirectusDefaultVersion = "11.1.0"

var directusVersionEnv = fmt.Sprintf("${DIRECTUS_VERSION:-%s}", DirectusDefaultVersion)

// DirectusVersion returns the Directus version used in the tests.
// It uses the DIRECTUS_VERSION environment variable if set, otherwise it
// returns the default version.
func DirectusVersion() string {
	return expandEnv(directusVersionEnv)
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
