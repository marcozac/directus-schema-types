package dst

import (
	"slices"

	"github.com/iancoleman/strcase"
	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/util"
)

func SchemaToSpec(s *directus.Schema) *Spec {
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
		skip := field.Type == directus.FieldTypeAlias || // skip alias fields. relations are handled separately
			slices.ContainsFunc(field.Meta.Special, func(s directus.FieldSpecial) bool {
				// skip fields with no data. e.g. groups, dividers, etc.
				return s == directus.FieldSpecialNoData
			})
		if skip {
			continue
		}
		fieldSpec := &FieldSpec{
			collection: spec.Collections[field.Collection],
			name:       field.Field,
			fieldType:  field.Type,
			isRequired: field.Meta.Required,
			isReadonly: field.Meta.Readonly,
			note:       field.Meta.Note,
		}
		if field.Schema != nil {
			fieldSpec.isNullable = field.Schema.IsNullable
			fieldSpec.isUnique = field.Schema.IsUnique
			if field.Schema.IsPrimaryKey {
				fieldSpec.Collection().setPrimaryKey(field.Field)
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
			if spec.Collections[relation.Meta.ManyCollection].Fields[relation.Meta.ManyField].isUnique {
				relationSpec.Unique = true
			}
			spec.Collections[relation.Meta.OneCollection].Relations[fieldName] = relationSpec
		}
	}
	return spec
}

type Spec struct {
	Collections util.SortableStringMap[*CollectionSpec]

	// Imports is the list of imports.
	// It's set by the generator in case of multiple files output.
	Imports ImportsSpec
}

const (
	pkSuffix       = "PrimaryKey"
	pkFieldSuffix  = pkSuffix + "Field"
	relSuffix      = "Relations"
	relCollsSuffix = "RelatedCollections"
	payloadSuffix  = "Payload"
)

var _ TypeNamer = (*CollectionSpec)(nil)

type CollectionSpec struct {
	// Name is the name of the collection.
	Name string

	// IsSingleton is whether the collection is a singleton.
	IsSingleton bool

	// Fields is the list of the fields in the collection.
	Fields util.SortableStringMap[*FieldSpec]

	// Relations is the list of the relations in the collection.
	Relations util.SortableStringMap[*RelationSpec]

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

// RelatedCollectionsTypeName returns the name of the type for the collection
// related collections.
func (c *CollectionSpec) RelatedCollectionsTypeName() string {
	return c.TypeName() + relCollsSuffix
}

// PayloadTypeName returns the name of the type for the collection payload.
func (c *CollectionSpec) PayloadTypeName() string {
	return c.TypeName() + payloadSuffix
}

// PayloadFields returns the list of fields in the collection payload different
// than the schema ones.
func (c *CollectionSpec) PayloadFields() PayloadFields {
	fields := make(PayloadFields)
	for _, f := range c.Fields {
		t := directusPayloadType(f.FieldType().String())
		if t != f.Type() {
			fields[f.Name()] = &payloadField{FieldSpec: f, typ: t}
		}
	}
	if len(fields) == 0 {
		return nil
	}
	return fields
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

// FieldTypeName returns the name of the type of the collection.
func (p PrimaryKeySpec) FieldTypeName() string {
	return p.c.TypeName() + pkFieldSuffix
}

// FieldType returns the type of the collection primary key field.
// It's a string literal of the field name.
func (p PrimaryKeySpec) FieldType() string {
	return p.field
}

var _ FieldTyper = (*FieldSpec)(nil)

type FieldSpec struct {
	// collection is the collection that the field belongs to.
	collection *CollectionSpec

	// name is the name of the field.
	name string

	// FieldType is the type of the field in Directus.
	fieldType directus.FieldType

	// IsNullable is whether the field is nullable.
	isNullable bool

	// IsRequired is whether the field is required.
	isRequired bool

	// IsReadonly is whether the field is read-only.
	isReadonly bool

	// IsUnique is whether the field is unique.
	isUnique bool

	// Note is an optional note about the field.
	note *string
}

func (f *FieldSpec) Collection() *CollectionSpec {
	return f.collection
}

// Name returns the name of the field.
func (f *FieldSpec) Name() string {
	return f.name
}

// FieldType returns the type of the field in Directus.
func (f *FieldSpec) FieldType() directus.FieldType {
	return f.fieldType
}

// TsType returns the TypeScript type of the field.
func (f *FieldSpec) Type() TsType {
	return directusTypeToTs(f.FieldType().String())
}

// IsNullable returns whether the field is nullable.
func (f *FieldSpec) IsNullable() bool {
	return f.isNullable
}

// IsRequired returns whether the field is required.
func (f *FieldSpec) IsRequired() bool {
	return f.isRequired
}

// IsReadonly returns whether the field is read-only.
func (f *FieldSpec) IsReadonly() bool {
	return f.isReadonly
}

// IsUnique returns whether the field is unique.
func (f *FieldSpec) IsUnique() bool {
	return f.isUnique
}

// Note returns an optional note about the field.
func (f *FieldSpec) Note() *string {
	return f.note
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

func directusPayloadType(directusType string) TsType {
	switch directusType {
	case "date", "dateTime", "timestamp":
		// Directus API returns dates as strings
		return TsTypeString
	}
	return directusTypeToTs(directusType)
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
type ImportsSpec util.SortableStringMap[[]string]

// PayloadFields is a map of field names to their types.
type PayloadFields = util.SortableStringMap[PayloadFieldTyper]

var _ PayloadFieldTyper = (*payloadField)(nil)

type payloadField struct {
	*FieldSpec
	typ TsType
}

func (f *payloadField) Spec() *FieldSpec {
	return f.FieldSpec
}

func (f *payloadField) Type() TsType {
	return f.typ
}

func toPascalCase(s string) string {
	return strcase.ToCamel(s)
}

// TypeNamer is the interface implemented by types that have a name.
type TypeNamer interface {
	// TypeName returns the name of the type.
	TypeName() string
}

// TypeTyper is the interface implemented by types that have a type.
type TypeTyper interface {
	// Type returns the typescript type.
	Type() TsType
}

// Typer is the interface implemented by types that have a name and a type.
type Typer interface {
	TypeNamer
	TypeTyper
}

// FieldTyper is the interface implemented by field types that have a name and a type.
type FieldTyper interface {
	TypeTyper

	Collection() *CollectionSpec

	// Name returns the name of the field.
	Name() string

	// FieldType is the type of the field in Directus.
	FieldType() directus.FieldType

	// IsNullable is whether the field is nullable.
	IsNullable() bool

	// IsRequired is whether the field is required.
	IsRequired() bool

	// IsReadonly is whether the field is read-only.
	IsReadonly() bool

	// IsUnique is whether the field is unique.
	IsUnique() bool

	// Note is an optional note about the field.
	Note() *string
}

type PayloadFieldTyper interface {
	FieldTyper

	// Spec returns the parent field spec.
	Spec() *FieldSpec
}
