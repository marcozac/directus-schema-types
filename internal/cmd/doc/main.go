package main

import (
	"fmt"
	"log"
	"os"

	"github.com/marcozac/directus-schema-types/internal/cmdapi"
	"github.com/spf13/cobra/doc"
)

const dir = "./doc/dst"

// This program generates markdown documentation for the dst command.
// It must be run from the root of the repository.
func main() {
	if err := run(); err != nil {
		log.Fatalf("error: %v", err)
	}
}

func run() error {
	if err := os.RemoveAll(dir); err != nil {
		return fmt.Errorf("clean %s dir: %w", dir, err)
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("create %s dir: %w", dir, err)
	}
	cmd := cmdapi.NewDstCmd()
	cmd.DisableAutoGenTag = true // disable auto generated tag: ci failure on different date
	return doc.GenMarkdownTree(cmd, dir)
}
