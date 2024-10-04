package dst

import (
	"slices"

	"github.com/marcozac/directus-schema-types/schema"
)

func SchemaToSpec(s *schema.Schema) *Spec {
	spec := &Spec{
		Collections: make(map[string]*CollectionSpec, len(s.Collections)),
	}
	for _, collection := range s.Collections {
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
	for _, field := range s.Fields {
		skip := slices.ContainsFunc(field.Meta.Special, func(s schema.FieldSpecial) bool {
			// skip fields with no data. e.g. groups, dividers, etc.
			return s == schema.FieldSpecialNoData
		})
		if skip {
			continue
		}
		fieldSpec := &FieldSpec{
			Name:       field.Field,
			IsRequired: field.Meta.Required,
			IsReadonly: field.Meta.Readonly,
			FieldType:  field.Type,
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

func (c *CollectionSpec) PrimaryKeyTsType() TsType {
	return c.Fields[c.PrimaryKeyField].TsType()
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

	// FieldType is the type of the field in Directus.
	FieldType schema.FieldType
}

// TsType returns the TypeScript type of the field.
func (f *FieldSpec) TsType() TsType {
	return TsType{
		FieldSpec: f,
		Type:      directusTypeToTsTypeBase(f.FieldType.String()),
	}
}

// TsType is a representation of a TypeScript type.
type TsType struct {
	*FieldSpec

	// Type is the base type of the field.
	Type TsTypeBase
}

type TsTypeBase string

const (
	TsTypeNumber  TsTypeBase = "number"
	TsTypeString  TsTypeBase = "string"
	TsTypeBoolean TsTypeBase = "boolean"
	TsTypeDate    TsTypeBase = "Date"
	TsTypeObject  TsTypeBase = "object"
	TsTypeAny     TsTypeBase = "any"
)

func directusTypeToTsTypeBase(directusType string) TsTypeBase {
	switch directusType {
	case "integer", "bigInteger", "float", "decimal":
		return TsTypeNumber
	case "string", "text", "uuid", "hash":
		return TsTypeString
	case "boolean":
		return TsTypeBoolean
	case "date", "dateTime", "timestamp":
		return TsTypeDate
	case "json":
		return TsTypeObject
	default:
		// @TODO
		//   - check relations for "alias" type
		//
		// Default to 'any' if the type is unknown
		return TsTypeAny
	}
}
