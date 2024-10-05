package dst

import (
	"embed"
	"fmt"
	"io"
	"text/template"

	"github.com/marcozac/directus-schema-types/schema"
)

//go:embed template/*
var tmplFS embed.FS

// NewGenerator creates a new generator.
func NewGenerator(options GeneratorOptions) *Generator {
	return &Generator{spec: SchemaToSpec(options.Schema)}
}

type GeneratorOptions struct {
	Schema *schema.Schema
}

type Generator struct {
	spec *Spec
}

// Generate generates the TypeScript schema, writing it to the given writer.
func (g *Generator) Generate(wr io.Writer) error {
	tmpl, err := template.New("schema.ts.tmpl").ParseFS(tmplFS, "template/*.tmpl")
	if err != nil {
		return fmt.Errorf("parse template: %w", err)
	}
	if err := tmpl.Execute(wr, g.spec); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}
	return nil
}
