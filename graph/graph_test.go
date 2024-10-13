package graph

import (
	"testing"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGraph(t *testing.T) {
	var g *Graph
	for _, c := range []struct {
		name string
		test func(t *testing.T)
	}{
		{
			// ParseSchema covered by TestFromSchema
			name: "ParseSchemaError",
			test: func(t *testing.T) {
				schema, err := directus.SchemaFromSnapshot(testutil.ClientSchemaSnapshot())
				require.NoError(t, err, "read schema from snapshot")
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
	} {
		g = New() // reset graph for each test
		require.NotNil(t, g, "create graph")
		t.Run(c.name, c.test)
	}
}

func TestFromSchema(t *testing.T) {
	schema, err := directus.SchemaFromSnapshot(testutil.ClientSchemaSnapshot())
	require.NoError(t, err, "read schema from snapshot")

	g, err := NewFromSchema(schema)
	require.NoError(t, err, "create graph from schema")

	for _, sc := range schema.Collections {
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
