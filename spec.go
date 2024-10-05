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
			Relations:   make(map[string]*RelationSpec),
		}
	}
	for _, field := range s.Fields {
		skip := field.Type == schema.FieldTypeAlias || // skip alias fields. relations are handled separately
			slices.ContainsFunc(field.Meta.Special, func(s schema.FieldSpecial) bool {
				// skip fields with no data. e.g. groups, dividers, etc.
				return s == schema.FieldSpecialNoData
			})
		if skip {
			continue
		}
		fieldSpec := &FieldSpec{
			Name:       field.Field,
			FieldType:  field.Type,
			IsRequired: field.Meta.Required,
			IsReadonly: field.Meta.Readonly,
			Note:       field.Meta.Note,
		}
		if field.Schema != nil {
			fieldSpec.IsNullable = field.Schema.IsNullable
			fieldSpec.IsUnique = field.Schema.IsUnique
			if field.Schema.IsPrimaryKey {
				spec.Collections[field.Collection].SetPrimaryKeyField(field.Field)
			}
		}
		// collection existence not checked: it must exist
		spec.Collections[field.Collection].Fields[field.Field] = fieldSpec
	}
	for _, relation := range s.Relations {
		spec.Collections[relation.Meta.ManyCollection].Relations[relation.Meta.ManyField] = &RelationSpec{
			Field:             relation.Meta.ManyField,
			RelatedCollection: relation.Meta.OneCollection,
		}
		if relation.Meta.OneField != nil {
			fieldName := *relation.Meta.OneField
			relationSpec := &RelationSpec{
				Field:             fieldName,
				RelatedCollection: relation.Meta.ManyCollection,
				Many:              true,
			}
			// mark the relation as unique if the related field is unique
			if spec.Collections[relation.Meta.ManyCollection].Fields[relation.Meta.ManyField].IsUnique {
				relationSpec.Unique = true
			}
			spec.Collections[relation.Meta.OneCollection].Relations[fieldName] = relationSpec
		}
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

	// Relations is the list of the relations in the collection.
	Relations map[string]*RelationSpec
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

	// FieldType is the type of the field in Directus.
	FieldType schema.FieldType

	// IsNullable is whether the field is nullable.
	IsNullable bool

	// IsRequired is whether the field is required.
	IsRequired bool

	// IsReadonly is whether the field is read-only.
	IsReadonly bool

	// IsUnique is whether the field is unique.
	IsUnique bool

	// Note is an optional note about the field.
	Note *string
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
		// Default to 'any' if the type is unknown
		return TsTypeAny
	}
}

type RelationSpec struct {
	// Field is the name of the field.
	Field string

	// RelatedCollection is the name of the collection that the relation points to.
	RelatedCollection string

	// Many is whether the relation is to-many entities of the related collection.
	// It's the opposite of the [many|one]_[collection|field] in the relation meta.
	// For example, if the relation meta is:
	//   {
	//     "many_collection": "users",
	//     "many_field": "company_id",
	//     "one_collection": "companies",
	//     "one_field": "company_users"
	//   }
	// Then Many is true for "companies" and false for "users".
	Many bool

	// Unique is whether the related field is unique.
	// Paired with Many, it means that the relation is one-to-one.
	// In this case, the relation field type is still an array, but it will
	// have only one element.
	//
	// @TODO
	// Should we enforce the type with a tuple?
	Unique bool
}
