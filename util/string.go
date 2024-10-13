package util

import "github.com/iancoleman/strcase"

// ToPascalCase converts a string to PascalCase.
// It's just a wrapper around [strcase.ToCamel] with a more meaningful name.
func ToPascalCase(s string) string {
	return strcase.ToCamel(s)
}
