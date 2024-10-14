package graph

import (
	"testing"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGraph(t *testing.T) {
	var schema *directus.Schema
	for _, c := range []struct {
		name string
		test func(t *testing.T)
	}{
		{
			// ParseSchema covered by TestFromSchema
			name: "ParseSchemaError",
			test: func(t *testing.T) {
				g := New()
				schema.Relations = append(schema.Relations, directus.Relation{
					Collection: "chefs",
					Meta: directus.RelationMeta{
						ManyCollection: "chefs",
						ManyField:      "not_existing_field",
						OneCollection:  "ingredients",
					},
				})
				require.Error(t, g.ParseSchema(schema), "parse schema with error")
				assert.Len(t, g.Collections(), 0, "no collections in graph")
			},
		},
		{
			name: "OverrideError",
			test: func(t *testing.T) {
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind: "invalid",
						},
					},
				})).ParseSchema(schema), "invalid kind")
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind: FieldOverrideKindAssertable,
							Def:  1,
						},
					},
				})).ParseSchema(schema), "assertable: invalid def")
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind: FieldOverrideKindEnum,
							Def:  "1",
						},
					},
				})).ParseSchema(schema), "enum: invalid def")
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind: FieldOverrideExternal,
							Def:  0,
						},
					},
				})).ParseSchema(schema), "external: invalid def")
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind: FieldOverrideExternal,
							Def:  "Test",
						},
					},
				})).ParseSchema(schema), "external: no importPath")
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind:       FieldOverrideExternal,
							Def:        "Test",
							ImportPath: "test",
						},
					},
				})).ParseSchema(schema), "external: no parserFrom")
				assert.Error(t, New(WithOverrides(map[string]map[string]*FieldOverrideRaw{
					"ingredients": {
						"status": {
							Kind:       FieldOverrideExternal,
							Def:        "Test",
							ImportPath: "test",
							ParserFrom: "Test",
						},
					},
				})).ParseSchema(schema), "external: no parserTo")
			},
		},
		{
			name: "RelationsError",
			test: func(t *testing.T) {
				schema.Relations = append(schema.Relations, directus.Relation{
					Meta: directus.RelationMeta{
						ManyCollection: "not_existing",
					},
				})
				assert.Error(t, New().ParseSchema(schema), "relation: many collection not found")

				l := len(schema.Relations) - 1 // drop last relation
				schema.Relations = append(schema.Relations[:l], directus.Relation{
					Meta: directus.RelationMeta{
						ManyCollection: "ingredients",
						OneCollection:  "not_existing",
					},
				})
				assert.Error(t, New().ParseSchema(schema), "relation: one collection not found")
			},
		},
	} {
		schema, _ = directus.SchemaFromSnapshot(testutil.ClientSchemaSnapshot()) // reset schema
		t.Run(c.name, c.test)
	}
}

func TestFromSchema(t *testing.T) {
	schema, err := directus.SchemaFromSnapshot(testutil.ClientSchemaSnapshot())
	require.NoError(t, err, "read schema from snapshot")
	schema.Collections = append(schema.Collections, directus.Collection{ // cover skip nil schema
		Collection: "skip_me",
	})

	g, err := NewFromSchema(schema)
	require.NoError(t, err, "create graph from schema")

	for _, sc := range schema.Collections {
		if sc.Collection == "skip_me" {
			continue
		}
		var ok bool
		for _, gc := range g.Collections() { // check all collections in the graph
			if sc.Collection == gc.Name() {
				ok = true
				break
			}
		}
		require.True(t, ok, "collection %q not found in graph", sc.Collection)
	}
}

func TestOverrideMap(t *testing.T) {
	var m OverrideMap
	assert.NotPanics(t, func() {
		m.GetCollection("my_collection")
	})
	assert.NotPanics(t, func() {
		m.GetField("my_collection", "my_field")
	})
	m = make(OverrideMap)
	m.GetCollection("my_collection") // just to cover
}
