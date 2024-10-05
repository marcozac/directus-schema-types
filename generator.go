package dst

import (
	"bytes"
	"embed"
	"fmt"
	"io"
	"os/exec"
	"text/template"

	"github.com/marcozac/directus-schema-types/schema"
)

//go:embed template/*
var tmplFS embed.FS

// NewGenerator creates a new generator.
func NewGenerator(s *schema.Schema, opts ...Option) *Generator {
	g := &Generator{
		spec: SchemaToSpec(s),
		options: &options{
			formatOutput: true,
		},
	}
	for _, opt := range opts {
		opt(g.options)
	}
	return g
}

type spec = Spec

type Generator struct {
	*spec
	*options
}

// Generate generates the TypeScript schema, writing it to the given writer.
func (g *Generator) Generate(wr io.Writer) error {
	tmpl, err := template.New("schema.ts.tmpl").ParseFS(tmplFS, "template/*.tmpl")
	if err != nil {
		return fmt.Errorf("parse template: %w", err)
	}

	buf := new(bytes.Buffer)
	if err := tmpl.Execute(buf, g); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}
	if g.formatOutput {
		cmd := exec.Command("npx", "--yes", "--", "prettier", "--stdin-filepath", "schema.ts")
		cmd.Stdin = buf
		cmd.Stdout = wr
		if err := cmd.Run(); err != nil {
			return fmt.Errorf("run prettier: %w", err)
		}
	} else {
		_, err := buf.WriteTo(wr)
		if err != nil {
			return fmt.Errorf("write: %w", err)
		}
	}
	return nil
}

type options struct {
	formatOutput bool
}

// Option is an option for the generator.
type Option func(*options)

// FormatOutput formats the output using prettier.
func FormatOutput() Option {
	return func(o *options) {
		o.formatOutput = true
	}
}
