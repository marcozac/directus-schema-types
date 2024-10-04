package dst

import "github.com/marcozac/directus-schema-types/schema"

func SchemaToSpec(schema *schema.Schema) *Spec {
	spec := &Spec{
		Collections: make(map[string]*CollectionSpec, len(schema.Collections)),
	}
	for _, collection := range schema.Collections {
		if collection.Schema == nil {
			// skip alias collections. e.g. groups
			continue
		}
		spec.Collections[collection.Collection] = &CollectionSpec{
			Name:        collection.Collection,
			IsSingleton: collection.Meta.Singleton,
			Fields:      make(map[string]*FieldSpec),
		}
	}
	for _, field := range schema.Fields {
		fieldSpec := &FieldSpec{
			Name:       field.Field,
			IsRequired: field.Meta.Required,
			IsReadonly: field.Meta.Readonly,
		}
		if field.Schema != nil {
			fieldSpec.IsNullable = field.Schema.IsNullable
			if field.Schema.IsPrimaryKey {
				spec.Collections[field.Collection].SetPrimaryKeyField(field.Field)
			}
		}
		spec.Collections[field.Collection].Fields[field.Field] = fieldSpec
	}
	return spec
}

type Spec struct {
	Collections map[string]*CollectionSpec
}

type CollectionSpec struct {
	// Name is the name of the collection.
	Name string

	// PrimaryKeyField is the name of the primary key field.
	PrimaryKeyField string

	// IsSingleton is whether the collection is a singleton.
	IsSingleton bool

	// Fields is the list of the fields in the collection.
	Fields map[string]*FieldSpec
}

func (c *CollectionSpec) SetPrimaryKeyField(name string) {
	c.PrimaryKeyField = name
}

type FieldSpec struct {
	// Name is the name of the field.
	Name string

	// IsNullable is whether the field is nullable.
	IsNullable bool

	// IsRequired is whether the field is required.
	IsRequired bool

	// IsReadonly is whether the field is read-only.
	IsReadonly bool
}

// @TODO
// TsType returns the TypeScript type of the field.
func (f *FieldSpec) TsType() TsType {
	t := TsType{}
	return t
}

// @TODO
// TsType is a representation of a TypeScript type.
type TsType struct{}
