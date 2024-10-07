package testutil

import (
	"embed"
	"fmt"
	"os"
	"text/template"
)

//go:embed template/*
var tmplFS embed.FS

var tmpl = template.Must(template.New("").
	Funcs(template.FuncMap{
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
