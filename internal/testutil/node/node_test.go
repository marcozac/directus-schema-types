package node

import (
	"bytes"
	"io"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCreateNodePackage(t *testing.T) {
	p, err := Create(filepath.Join("testdata", "1"), &Spec{
		PackageJson: &PackageJsonSpec{
			Name:    "test1",
			Version: "1.0.0",
			Type:    PackageJsonTypeCommonjs,
			Scripts: map[string]string{
				"foo": "echo foo",
				"bar": "echo bar",
			},
			Dependencies: map[string]string{
				"@types/node": "*",
				"typescript":  "*",
			},
			DevDependencies: map[string]string{
				"@types/node": "*",
				"typescript":  "*",
			},
			Files: []string{"foo", "bar"},
			Options: map[string]any{
				"example_1": struct {
					Foo string `json:"foo_1"`
					Bar struct {
						Hello string `json:"hello"`
					}
					Baz []string `json:"baz"`
				}{
					Foo: "foo",
					Bar: struct {
						Hello string `json:"hello"`
					}{
						Hello: "world",
					},
					Baz: []string{"a", "b", "c"},
				},
				"example_2": struct {
					Foo string `json:"foo_1"`
					Bar struct {
						Hello string `json:"hello"`
					}
					Baz []string `json:"baz"`
				}{
					Foo: "foo",
					Bar: struct {
						Hello string `json:"hello"`
					}{
						Hello: "world",
					},
					Baz: []string{"a", "b", "c"},
				},
			},
		},
		TSConfig: &TSConfigSpec{
			CompilerOptions: map[string]any{
				"target": "es6",
				"strict": true,
				"lib":    []string{"es6", "dom"},
			},
		},
		Content: map[string]io.Reader{
			"src/index.ts":               bytes.NewBuffer([]byte("console.log('Hello, world!');")),
			"src/my-module/index.ts":     bytes.NewBuffer([]byte("export const foo = 'bar';")),
			"src/my-module/sub/index.ts": bytes.NewBuffer([]byte("export const bar = 'baz';")),
			"example.txt":                bytes.NewBuffer([]byte("Hello, world!")),
		},
	})
	require.NoError(t, err, "CreateNodePackage 1")

	// install package dependencies
	assert.NoError(t, p.Install(), "Install 1")

	p2, err := Create(filepath.Join("testdata", "2"), &Spec{
		PackageJson: &PackageJsonSpec{
			Name: "test2",
			Scripts: map[string]string{
				"foo": "echo foo",
				"bar": "echo bar",
			},
		},
	})
	require.NoError(t, err, "CreateNodePackage 2")
	require.NotNil(t, p2, "CreateNodePackage 2 Package")
}
