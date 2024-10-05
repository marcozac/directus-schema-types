package dst

import (
	"bytes"
	"embed"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"text/template"

	"github.com/marcozac/directus-schema-types/schema"
)

//go:embed template/*
var tmplFS embed.FS

// NewGenerator creates a new generator.
func NewGenerator(s *schema.Schema, opts ...Option) *Generator {
	g := &Generator{
		spec: SchemaToSpec(s),
		tmpl: template.Must(template.New("").
			Funcs(template.FuncMap{
				"join": func(slice []string) string {
					return strings.Join(slice, ", ")
				},
				// unionType returns a string with the union of the slice elements.
				// If quote is true, the elements are (single) quoted.
				"unionType": func(slice []string, quote bool) string {
					if quote {
						for i, s := range slice {
							slice[i] = fmt.Sprintf("'%s'", s)
						}
					}
					return strings.Join(slice, "| ")
				},
				"parserOf": func(t TsType) string {
					switch t {
					case TsTypeDate:
						return "new Date"
					}
					panic(fmt.Sprintf("parserOf: unknown type %s", t))
				},
			}).
			ParseFS(tmplFS, "template/*.tmpl"),
		),
		options: &options{ // default options
			formatOutput: true,
			outDir:       filepath.Join("src", "_gen", "schema"),
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
	tmpl *template.Template
}

func (g *Generator) Generate() error {
	switch {
	case g.writer != nil:
		return g.generateAll(g.writer)
	case g.outFile != "":
		_ = g.clean(g.outFile) // the method checks the clean option
		f, err := os.Create(g.outFile)
		if err != nil {
			return fmt.Errorf("create file: %w", err)
		}
		defer f.Close()
		return g.generateAll(f)
	case g.outDir != "":
		_ = g.clean(g.outDir) // the method checks the clean option
		return g.generateDir()
	}
	return errors.New("no output specified")
}

func (g *Generator) generateDir() error {
	if err := os.MkdirAll(g.outDir, 0o755); err != nil {
		return fmt.Errorf("create directory: %w", err)
	}

	schemaImports := make(ImportsSpec, len(g.spec.Collections))
	relationsImports := make(ImportsSpec, len(g.spec.Collections))
	for _, collection := range g.spec.Collections {
		schemaImports[collection.Name] = []string{collection.TypeName()}
		relationsImports[collection.Name] = []string{collection.RelationsTypeName()}
	}

	type E struct {
		templateName string
		file         string
		data         any
	}
	entries := make([]E, 0, len(g.spec.Collections)+3)
	entries = append(entries,
		E{
			templateName: "schema.ts",
			file:         "schema.ts",
			data: Spec{
				Collections: g.spec.Collections,
				Imports:     schemaImports,
			},
		},
		E{
			templateName: "relations.ts",
			file:         "relations.ts",
			data: Spec{
				Collections: g.spec.Collections,
				Imports:     relationsImports,
			},
		},
		E{
			templateName: "index.ts",
			file:         "index.ts",
			data:         g,
		},
	)
	for _, collection := range g.spec.Collections {
		if len(collection.Relations) > 0 {
			collection.Imports = make(ImportsSpec, len(collection.Relations))
			for _, rel := range collection.Relations {
				if rel.RelatedCollection.Name == collection.Name {
					continue // skip self-references
				}
				collection.Imports[rel.RelatedCollection.Name] = []string{
					rel.RelatedCollection.PrimaryKey().TypeName(),
					rel.RelatedCollection.TypeName(),
				}
			}
		}
		entries = append(entries, E{
			templateName: "collection.ts",
			file:         collection.Name + ".ts",
			data:         collection,
		})
	}

	var wg sync.WaitGroup
	wg.Add(len(entries))
	errs := make(chan error, len(entries))

	for _, e := range entries {
		go func(e E) {
			defer wg.Done()
			f, err := os.Create(filepath.Join(g.outDir, e.file))
			if err != nil {
				errs <- fmt.Errorf("create file %s: %w", e.file, err)
				return
			}
			defer f.Close()
			if err := g.execute(f, e.templateName, e.data); err != nil {
				errs <- fmt.Errorf("execute template for %s: %w", e.file, err)
			}
		}(e)
	}
	wg.Wait()
	close(errs)

	var err error
	for e := range errs {
		err = errors.Join(err, e)
	}
	return err
}

func (g *Generator) generateAll(w io.Writer) error {
	return g.execute(w, "all", g)
}

func (g *Generator) execute(w io.Writer, name string, data any) error {
	buf := new(bytes.Buffer)
	if err := g.tmpl.ExecuteTemplate(buf, name, data); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}
	if g.formatOutput {
		cmd := exec.Command("npx", "--yes", "--", "prettier", "--stdin-filepath", "schema.ts")
		cmd.Stdin = buf
		cmd.Stdout = w
		return cmd.Run()
	}
	_, err := buf.WriteTo(w)
	return err
}

func (g *Generator) clean(path string) error {
	if g.options.clean {
		return os.RemoveAll(path)
	}
	return nil
}

type options struct {
	formatOutput bool
	writer       io.Writer
	outFile      string
	outDir       string
	clean        bool
}

// Option is an option for the generator.
type Option func(*options)

// WithFormatOutput formats the output using prettier.
func WithFormatOutput() Option {
	return func(o *options) {
		o.formatOutput = true
	}
}

// WithWriter sets the writer for the output.
func WithWriter(w io.Writer) Option {
	return func(o *options) {
		o.writer = w
	}
}

// WithOutFile sets the output file path.
func WithOutFile(path string) Option {
	return func(o *options) {
		o.outFile = path
	}
}

// WithOutDir sets the output directory path.
func WithOutDir(path string) Option {
	return func(o *options) {
		o.outDir = path
	}
}

// WithClean removes the output file or directory before generating.
// Setting a Writer, this option is ignored.
func WithClean() Option {
	return func(o *options) {
		o.clean = true
	}
}
