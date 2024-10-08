package testutil

import (
	"embed"
	"encoding/json"
	"fmt"
	"os"
	"text/template"
)

//go:embed template/*
var tmplFS embed.FS

var tmpl = template.Must(template.New("").
	Funcs(template.FuncMap{
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
	}).
	ParseFS(tmplFS, "template/*.tmpl"),
)

// CreateAndExecute creates a file at the given path and executes the template
// with the given name and data.
func CreateAndExecute(path string, tmplName string, data any) error {
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer f.Close()
	if err := tmpl.ExecuteTemplate(f, tmplName, data); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}
	return nil
}
