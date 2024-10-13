package graph

import (
	"slices"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/util"
)

type Graph struct {
	*options
	cs *util.SortedMap[string, Collection]
}

// Collections returns the list of collections in the graph.
func (g *Graph) Collections() []Collection {
	return g.cs.Values()
}

// AddCollection adds a collection to the graph.
// If the collection already exists, it will be replaced.
func (g *Graph) AddCollection(c Collection) {
	g.cs.Set(c.Name(), c)
}

// ParseSchema parses the given schema and adds the collections, the fields and
// the relations to the graph.
//
// If a collection already exists, it will be replaced.
// No changes will be made to the underlying graph if an error occurs.
func (g *Graph) ParseSchema(s *directus.Schema) (err error) {
	m := make(map[string]*collection, len(s.Collections))
	for _, c := range s.Collections {
		if c.Schema == nil {
			// skip alias collections. e.g. groups
			continue
		}
		nc := newCollection(c.Collection, c.Meta.Singleton)
		m[c.Collection] = nc
		defer func(nc *collection) {
			if err == nil { // only add collection if no error occurred
				g.AddCollection(nc)
			}
		}(nc)
	}
	for _, f := range s.Fields {
		skip := slices.ContainsFunc(f.Meta.Special, func(s directus.FieldSpecial) bool {
			// skip fields with no data. e.g. groups, dividers, etc.
			return s == directus.FieldSpecialNoData
		})
		if skip {
			continue
		}
		fieldOpts := make(fieldOptions, 0, 7).
			IsAlias(f.Type == directus.FieldTypeAlias).
			IsRequired(f.Meta.Required).
			IsReadonly(f.Meta.Readonly).
			WithNote(f.Meta.Note)
		if f.Schema != nil {
			fieldOpts = fieldOpts.
				IsPrimaryKey(f.Schema.IsPrimaryKey).
				IsNullable(f.Schema.IsNullable).
				IsUnique(f.Schema.IsUnique)
		}
		m[f.Collection].setField(f.Field, f.Type, fieldOpts...)
	}
	for _, r := range s.Relations {
		collMany, ok := m[r.Meta.ManyCollection]
		if !ok {
			return newNotFoundError("collection", r.Meta.ManyCollection)
		}

		collOne, ok := m[r.Meta.OneCollection]
		if !ok {
			return newNotFoundError("collection", r.Meta.OneCollection)
		}

		manyField := collMany.getField(r.Meta.ManyField)
		if manyField == nil {
			return newNotFoundInError("field", r.Meta.ManyField, r.Meta.ManyCollection)
		}
		collMany.setRelation(manyField.Name(), collOne)

		if r.Meta.OneField != nil {
			fieldName := *r.Meta.OneField
			if collOne.getField(fieldName) == nil {
				continue // skip relations on non-existing fields
			}
			collOne.setRelation(fieldName, collMany,
				relationOptions{}.Many(true).Unique(manyField.IsUnique())...,
			)
		}
	}
	return nil
}

// New creates a new empty graph with the given options.
func New(opts ...Option) *Graph {
	o := &options{}
	for _, opt := range opts {
		opt(o)
	}
	return &Graph{
		options: o,
		cs:      util.NewSortedMap[string, Collection](0),
	}
}

// FromSchema creates a new graph from the given schema and options.
// It returns an error and an empty (but initialized) graph if the schema
// parsing fails.
func NewFromSchema(s *directus.Schema, opts ...Option) (*Graph, error) {
	g := New(opts...)
	return g, g.ParseSchema(s)
}

type options struct{}

// @TODO
type Option func(*options)
