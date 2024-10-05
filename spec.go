package dst

import (
	"slices"

	"github.com/iancoleman/strcase"
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
				spec.Collections[field.Collection].setPrimaryKey(field.Field)
			}
		}
		// collection existence not checked: it must exist
		spec.Collections[field.Collection].Fields[field.Field] = fieldSpec
	}
	for _, relation := range s.Relations {
		spec.Collections[relation.Meta.ManyCollection].Relations[relation.Meta.ManyField] = &RelationSpec{
			Field:             relation.Meta.ManyField,
			RelatedCollection: spec.Collections[relation.Meta.OneCollection],
		}
		if relation.Meta.OneField != nil {
			fieldName := *relation.Meta.OneField
			relationSpec := &RelationSpec{
				Field:             fieldName,
				RelatedCollection: spec.Collections[relation.Meta.ManyCollection],
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

	// Imports is the list of imports.
	// It's set by the generator in case of multiple files output.
	Imports ImportsSpec
}

const (
	pkSuffix      = "PrimaryKey"
	pkFieldSuffix = pkSuffix + "Field"
	relSuffix     = "Relations"
)

type CollectionSpec struct {
	// Name is the name of the collection.
	Name string

	// IsSingleton is whether the collection is a singleton.
	IsSingleton bool

	// Fields is the list of the fields in the collection.
	Fields map[string]*FieldSpec

	// Relations is the list of the relations in the collection.
	Relations map[string]*RelationSpec

	// Imports is the list of imports for the collection.
	// It's set by the generator in case of multiple files output.
	Imports ImportsSpec

	primaryKey *PrimaryKeySpec
}

// TypeName returns the name of the type for the collection.
func (c *CollectionSpec) TypeName() string {
	return toPascalCase(c.Name)
}

// RelationsTypeName returns the name of the type for the collection relations.
func (c *CollectionSpec) RelationsTypeName() string {
	return c.TypeName() + relSuffix
}

func (c *CollectionSpec) PrimaryKey() *PrimaryKeySpec {
	// panic on access if not set: it's mandatory in Directus
	return c.primaryKey
}

func (c *CollectionSpec) setPrimaryKey(field string) {
	c.primaryKey = &PrimaryKeySpec{c: c, field: field}
}

type PrimaryKeySpec struct {
	c     *CollectionSpec
	field string
}

// TypeName returns the name of the type for the collection primary key.
func (p PrimaryKeySpec) TypeName() string {
	return p.c.TypeName() + pkSuffix
}

// Type returns the type of the collection primary key.
func (p PrimaryKeySpec) Type() TsType {
	return p.c.Fields[p.field].Type()
}

func (p PrimaryKeySpec) FieldTypeName() string {
	return p.c.TypeName() + pkFieldSuffix
}

// FieldType returns the type of the collection primary key field.
// It's a string literal of the field name.
func (p PrimaryKeySpec) FieldType() string {
	return p.field
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
func (f *FieldSpec) Type() TsType {
	return directusTypeToTs(f.FieldType.String())
}

type TsType string

func (t TsType) String() string {
	return string(t)
}

const (
	TsTypeNumber  TsType = "number"
	TsTypeString  TsType = "string"
	TsTypeBoolean TsType = "boolean"
	TsTypeDate    TsType = "Date"
	TsTypeObject  TsType = "object"
	TsTypeAny     TsType = "any"
)

func directusTypeToTs(directusType string) TsType {
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

	// RelatedCollection is the collection that the relation points to.
	RelatedCollection *CollectionSpec

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

// ImportsSpec is a map of package names to the list of symbols to import.
//
// Example:
//
//	imports := ImportSpec{
//		"my_collection": {"MyCollection", "MyCollectionPrimaryKey"},
//	}
type ImportsSpec map[string][]string

func toPascalCase(s string) string {
	return strcase.ToCamel(s)
}
