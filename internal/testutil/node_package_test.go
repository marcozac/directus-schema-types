package testutil

import (
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCreateNodePackage(t *testing.T) {
	p, err := CreateNodePackage(filepath.Join("testdata", "1"), &NodePackageSpec{
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
	})
	require.NoError(t, err, "CreateNodePackage 1")

	out, err := p.Install()
	assert.NoError(t, err, "Install 1")
	assert.NotEmpty(t, out, "Install Output 1")

	p2, err := CreateNodePackage(filepath.Join("testdata", "2"), &NodePackageSpec{
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
