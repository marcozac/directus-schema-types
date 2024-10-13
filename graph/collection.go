package graph

import (
	"fmt"
	"slices"
	"strings"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/util"
)

type Collection interface {
	TypeNamer

	// Name returns the name of the collection.
	Name() string

	// Is Singleton returns whether the collection is a singleton.
	IsSingleton() bool

	// Primary Key returns the primary key of the collection.
	PrimaryKey() PrimaryKey

	// Fields returns the list of fields in the collection.
	Fields() []Field

	// Relations returns the list of relations in the collection that
	// can also return its own type name.
	//
	// Example:
	//   var c Collection
	//   c.TypeName()             // "Users"
	//   c.Relations().TypeName() // "UsersRelations"
	Relations() SliceTypeNamer[Relation]

	// RelatedCollections returns the list of related collections in the
	// collection that can also return its own type name.
	//
	// Example:
	//   var c Collection
	//   c.TypeName()                      // "Users"
	//   c.RelatedCollections().TypeName() // "UsersRelatedCollections"
	RelatedCollections() SliceTypeNamer[Relation]

	// Payload returns the payload of the collection.
	//
	// A non-nil payload should be returned ONLY if the collection contains
	// fields that require to be parsed or asserted to and from the value
	// returned by the Directus API.
	Payload() Payload

	// Imports returns the list of imports required by the collection.
	Imports(CollectionImports) []Import
}

// Import represents an import with the path and the symbols to import.
type Import struct {
	Path    string
	Symbols []string
}

type CollectionImports string

const (
	// CollectionImportsAll imports all symbols in the collection imports
	// list.
	CollectionImportsAll CollectionImports = "all"

	// CollectionImportsRelations imports only the symbols related to the
	// collection relations.
	CollectionImportsRelations CollectionImports = "relations"

	// CollectionImportsOverrides imports only the symbols related to the
	// collection fields override.
	CollectionImportsOverrides CollectionImports = "overrides"
)

// newCollection creates a new [Collection] with the given name and whether
// it is a singleton.
func newCollection(name string, isSingleton bool) *collection {
	c := &collection{
		name:        name,
		isSingleton: isSingleton,
		fields:      util.NewSortedMap[string, Field](1),
		relations:   util.NewSortedMap[string, Relation](1),
	}
	return c
}

type collection struct {
	name        string
	isSingleton bool
	pk          PrimaryKey
	fields      *util.SortedMap[string, Field]    // keep stable order
	relations   *util.SortedMap[string, Relation] // keep stable order
}

func (c *collection) Name() string {
	return c.name
}

func (c *collection) TypeName() string {
	return util.ToPascalCase(c.name)
}

func (c *collection) IsSingleton() bool {
	return c.isSingleton
}

func (c *collection) PrimaryKey() PrimaryKey {
	return c.pk
}

func (c *collection) Fields() []Field {
	values := make([]Field, c.fields.Len())
	for i, f := range c.fields.Values() {
		values[i] = f
	}
	return values
}

func (c *collection) Relations() SliceTypeNamer[Relation] {
	return newSliceTypeNamer(c.TypeName()+"Relations", c.relations)
}

func (c *collection) RelatedCollections() SliceTypeNamer[Relation] {
	return newSliceTypeNamer(c.TypeName()+"RelatedCollections", c.relations)
}

func (c *collection) Payload() Payload {
	pf := util.NewSortedMap[string, PayloadField](0)
	for _, f := range c.fields.Values() {
		if f.Type() != directusPayloadType(f.FieldType().String()) {
			pf.Set(f.Name(), &payloadField{f})
		}
	}
	if pf.Len() == 0 {
		return nil
	}
	return &payload{c: c, fields: pf}
}

func (c *collection) Imports(l CollectionImports) []Import {
	var m *util.SortedMap[string, []string]
	switch l {
	case CollectionImportsOverrides:
		m = util.NewSortedMap[string, []string](0)
	case CollectionImportsRelations:
		fallthrough // init with same length as all
	case CollectionImportsAll:
		m = util.NewSortedMap[string, []string](c.relations.Len())
	}
	if l == CollectionImportsAll || l == CollectionImportsRelations {
		for _, r := range c.relations.Values() {
			if r.Collection().Name() == c.Name() {
				continue // skip self-relation
			}
			// set the key as local import path for collection name
			m.Set(fmt.Sprintf("./%s", r.Collection().Name()), append(m.GetX(r.Collection().Name()),
				r.Collection().TypeName(),
				r.Collection().PrimaryKey().TypeName(),
			))
		}
	}
	if l == CollectionImportsAll || l == CollectionImportsOverrides {
		for _, f := range c.fields.Values() {
			ov := f.Override()
			if ov == nil || ov.Kind() != FieldOverrideExternal {
				continue
			}
			parserToSubs := strings.Split(ov.ParserTo(), " ")
			m.Set(ov.ImportPath(), append(m.GetX(ov.ImportPath()),
				ov.TypeName(),
				parserToSubs[len(parserToSubs)-1], // last element: new X -> X
			))
		}
	}
	imports := make([]Import, m.Len())
	for i, k := range m.Keys() {
		imports[i] = Import{
			Path:    k,
			Symbols: slices.Compact(m.GetX(k)), // remove duplicates
		}
	}
	return imports
}

func (c *collection) getField(name string) Field {
	return c.fields.GetX(name)
}

func (c *collection) setField(name string, fieldType directus.FieldType, opts ...fieldOption) {
	f := &field{
		collection: c,
		name:       name,
		fieldType:  fieldType,
	}
	for _, opt := range opts {
		opt(f)
	}
	c.fields.Set(name, f)
	if f.IsPrimaryKey() { // set primary key
		c.pk = &primaryKey{f}
	}
}

// setRelation sets a relation between the collection and another collection.
// The relation is set on the field with the given name.
// It returns nil (and the relation is not set) if the field does not exist.
// Otherwise, it returns the field where the relation is set.
func (c *collection) setRelation(fieldName string, relColl Collection, opts ...relationOption) Field {
	f := c.getField(fieldName)
	if f == nil {
		return nil
	}
	r := &relation{
		field:      f,
		collection: relColl,
	}
	for _, opt := range opts {
		opt(r)
	}
	c.relations.Set(fieldName, r)
	return f
}

type PrimaryKey interface {
	// PrimaryKey implements the Typer to return the type and name of the
	// primary key.
	Typer

	// Field returns the [Typer] of the primary key field.
	// The type must be the string literal of the field name.
	Field() Typer
}

type primaryKey struct {
	field Field
}

func (pk *primaryKey) TypeName() string {
	return pk.field.Collection().TypeName() + "PrimaryKey"
}

func (pk *primaryKey) Type() string {
	return pk.field.Type()
}

func (pk *primaryKey) Field() Typer {
	return typer{
		typeNamer: typeNamer{name: pk.TypeName() + "Field"},
		typeTyper: typeTyper{typ: pk.field.Name()},
	}
}
