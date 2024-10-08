package tmpl

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"text/template"
)

// Template is a wrapper around the standard template.Template
// with additional utility methods.
type Template struct{ *template.Template }

// CreateExecute creates a file at the given path and executes the template
// with the given name and data.
func (t *Template) CreateExecute(path string, tmplName string, data any) error {
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer f.Close()
	if err := t.ExecuteTemplate(f, tmplName, data); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}
	return nil
}

// FromFS returns a new template from the given file system and patterns.
// It also adds utility functions to the template and panics on error.
func FromFS(fsys fs.FS, patterns ...string) *Template {
	return &Template{
		template.Must(template.New("").
			Funcs(Funcs()).
			ParseFS(fsys, patterns...),
		),
	}
}

// Funcs returns template utility functions.
func Funcs() template.FuncMap {
	return template.FuncMap{
		// json returns the JSON representation of the given value with the given indent.
		"json": func(v any, prefix, indent string) string {
			b, err := json.MarshalIndent(v, prefix, indent)
			if err != nil {
				panic(err)
			}
			return string(b)
		},
		// json returns the JSON representation of the given value.
		"jsonRaw": func(v any) string {
			b, err := json.Marshal(v)
			if err != nil {
				panic(err)
			}
			return string(b)
		},
		// sub returns the difference of a and b.
		"sub": func(a, b int) int {
			return a - b
		},
	}
}
