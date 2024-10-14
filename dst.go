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
	"slices"
	"strings"
	"sync"
	"text/template"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/graph"
	"github.com/marcozac/directus-schema-types/util"
)

//go:embed template/*
var tmplFS embed.FS

// NewGenerator creates a new generator.
func NewGenerator() *Generator {
	g := &Generator{
		tmpl: template.Must(template.New("").
			Funcs(template.FuncMap{
				"mergeOverrideImports": func(g graph.Graph) []graph.Import {
					cs := g.Collections()
					m := util.NewSortedMap[string, []string](len(cs))
					for _, c := range cs {
						ims := c.Imports(graph.CollectionImportsOverrides)
						for _, im := range ims {
							m.Set(im.Path, append(m.GetX(im.Path), im.Symbols...))
						}
					}
					imports := make([]graph.Import, m.Len())
					for i, k := range m.Keys() {
						imports[i] = graph.Import{
							Path:    k,
							Symbols: slices.Compact(m.GetX(k)), // remove duplicates
						}
					}
					return imports
				},

				// join returns a string with the slice elements joined by a comma.
				"join": func(slice ...string) string {
					return strings.Join(slice, ", ")
				},

				// joinSlice returns a string with the slice elements joined by a comma.
				"joinSlice": func(slice []string) string {
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

				// quote returns a string with the input (single) quoted.
				"quote": func(s string) string {
					return fmt.Sprintf("'%s'", s)
				},
			}).
			ParseFS(tmplFS, "template/*.tmpl"),
		),
	}
	return g
}

type Generator struct {
	tmpl *template.Template
}

func (gen *Generator) GenerateSchema(schema *directus.Schema, opts ...Option) error {
	o := gen.defaultOptions()
	for _, opt := range opts {
		opt(o)
	}
	gr, err := graph.NewFromSchema(schema, o.graphOptions...)
	if err != nil {
		return fmt.Errorf("create graph: %w", err)
	}
	return gen.generateGraph(gr, o)
}

func (gen *Generator) GenerateGraph(gr *graph.Graph, opts ...Option) error {
	o := gen.defaultOptions()
	for _, opt := range opts {
		opt(o)
	}
	return gen.generateGraph(gr, o)
}

func (gen *Generator) generateGraph(gr *graph.Graph, o *options) error {
	switch {
	case o.writer != nil:
		return gen.generateAll(gr, o.writer, o.formatOutput)
	case o.outFile != "":
		return gen.generateFile(gr, o)
	case o.outDir != "":
		return gen.generateDir(gr, o)
	}
	return errors.New("no output specified")
}

func (gen *Generator) defaultOptions() *options {
	return &options{
		formatOutput: true,
		// outDir:       filepath.Join("src", "_gen", "schema"),
	}
}

func (gen *Generator) generateFile(gr *graph.Graph, o *options) error {
	if o.clean {
		_ = gen.clean(o.outFile)
	}
	if err := os.MkdirAll(filepath.Dir(o.outFile), 0o755); err != nil {
		return fmt.Errorf("create directory: %w", err)
	}
	f, err := os.Create(o.outFile)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer f.Close()
	return gen.generateAll(gr, f, o.formatOutput)
}

func (gen *Generator) generateDir(gr *graph.Graph, o *options) error {
	if o.clean {
		_ = gen.clean(o.outDir)
	}
	if err := os.MkdirAll(o.outDir, 0o755); err != nil {
		return fmt.Errorf("create directory: %w", err)
	}
	type E struct {
		templateName string
		file         string
		data         any
	}
	cs := gr.Collections()
	entries := make([]E, 0, len(cs)+3)
	entries = append(entries,
		E{
			templateName: "schema.ts",
			file:         "schema.ts",
			data:         gr,
		},
		E{
			templateName: "relations.ts",
			file:         "relations.ts",
			data:         gr,
		},
		E{
			templateName: "index.ts",
			file:         "index.ts",
			data:         gr,
		},
	)
	for _, c := range cs {
		entries = append(entries, E{
			templateName: "collection.ts",
			file:         c.Name() + ".ts",
			data:         c,
		})
	}

	var wg sync.WaitGroup
	wg.Add(len(entries))
	errs := make(chan error, len(entries))

	for _, e := range entries {
		go func(e E) {
			defer wg.Done()
			f, err := os.Create(filepath.Join(o.outDir, e.file))
			if err != nil {
				errs <- fmt.Errorf("create file %s: %w", e.file, err)
				return
			}
			defer f.Close()
			if err := gen.execute(f, e.templateName, e.data, o.formatOutput); err != nil {
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

func (gen *Generator) generateAll(gr *graph.Graph, w io.Writer, formatOutput bool) error {
	return gen.execute(w, "all", gr, formatOutput)
}

func (gen *Generator) execute(w io.Writer, name string, data any, formatOutput bool) error {
	buf := new(bytes.Buffer)
	if err := gen.tmpl.ExecuteTemplate(buf, name, data); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}
	if formatOutput {
		cmd := exec.Command("npx", "--yes", "--", "prettier", "--stdin-filepath", "schema.ts")
		cmd.Stdin = buf
		cmd.Stdout = w
		return cmd.Run()
	}
	_, err := buf.WriteTo(w)
	return err
}

func (gen *Generator) clean(path string) error {
	return os.RemoveAll(path)
}

type options struct {
	formatOutput bool
	writer       io.Writer
	outFile      string
	outDir       string
	clean        bool
	graphOptions []graph.Option
}

// Option is an option for the generator.
type Option func(*options)

// WithFormatOutput formats the output using prettier.
func WithFormatOutput(v bool) Option {
	return func(o *options) {
		o.formatOutput = v
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
func WithClean(v bool) Option {
	return func(o *options) {
		o.clean = v
	}
}

// WithGraphOptions sets the options for the graph.
// It has effect only when a custom graph is not provided.
func WithGraphOptions(opts ...graph.Option) Option {
	return func(o *options) {
		o.graphOptions = opts
	}
}
