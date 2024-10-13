package graph

import (
	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/util"
)

type Field interface {
	TypeTyper

	// Collection returns the collection that the field belongs to.
	Collection() Collection

	// Name returns the name of the field.
	Name() string

	// FieldType returns the type of the field in Directus.
	FieldType() directus.FieldType

	// IsPrimaryKey returns whether the field is a primary key.
	IsPrimaryKey() bool

	// IsNullable returns whether the field is nullable.
	IsNullable() bool

	// IsRequired returns whether the field is required.
	IsRequired() bool

	// IsReadonly returns whether the field is read-only.
	IsReadonly() bool

	// IsUnique returns whether the field is unique.
	IsUnique() bool

	// IsAlias returns whether the field is an alias.
	//
	// Alias fields are not included in the schema and will be skipped
	// in the schema definition. They are used to reference other fields
	// in the schema.
	IsAlias() bool

	// Note returns an optional note about the field.
	Note() *string

	// FieldOverride returns the field override of the field.
	//
	// If the field does not have an override, it should return nil.
	Override() FieldOverride
}

type field struct {
	collection   Collection
	name         string
	fieldType    directus.FieldType
	isPrimaryKey bool
	isNullable   bool
	isRequired   bool
	isReadonly   bool
	isUnique     bool
	isAlias      bool
	note         *string
	override     FieldOverride
}

func (f *field) Collection() Collection {
	return f.collection
}

func (f *field) Name() string {
	return f.name
}

func (f *field) FieldType() directus.FieldType {
	return f.fieldType
}

func (f *field) IsPrimaryKey() bool {
	return f.isPrimaryKey
}

func (f *field) IsNullable() bool {
	return f.isNullable
}

func (f *field) IsRequired() bool {
	return f.isRequired
}

func (f *field) IsReadonly() bool {
	return f.isReadonly
}

func (f *field) IsUnique() bool {
	return f.isUnique
}

func (f *field) IsAlias() bool {
	return f.isAlias
}

func (f *field) Note() *string {
	return f.note
}

func (f *field) Type() string {
	if f.Override() != nil {
		return f.Override().TypeName()
	}
	return directusTypeToTs(f.FieldType().String())
}

func (f *field) Override() FieldOverride {
	return f.override
}

// fieldOption represents an option that can be set creating a new field.
type fieldOption func(*field)

// fieldOptions is a slice of [fieldOption]s with chainable methods to set the
// options.
//
// Under the hood, every method uses the append function to add the option to
// the slice. This means that the slice must be assigned to a variable in case
// there are options to be set after the first chain.
//
// # Example
//
//	fo := make(fieldOptions, 0, 3).
//		IsPrimaryKey(true).
//		IsRequired(true).
//		IsReadonly(true)
//
//	// Set more options
//	fo = fo.IsNullable(true).
//		IsUnique(true)
type fieldOptions []fieldOption

// IsPrimaryKey adds an option to set whether the field is a primary key.
func (fo fieldOptions) IsPrimaryKey(b bool) fieldOptions {
	return append(fo, func(f *field) {
		f.isPrimaryKey = b
	})
}

// IsNullable adds an option to set whether the field is nullable.
func (fo fieldOptions) IsNullable(b bool) fieldOptions {
	return append(fo, func(f *field) {
		f.isNullable = b
	})
}

// IsRequired adds an option to set whether the field is required.
func (fo fieldOptions) IsRequired(b bool) fieldOptions {
	return append(fo, func(f *field) {
		f.isRequired = b
	})
}

// IsReadonly adds an option to set whether the field is read-only.
func (fo fieldOptions) IsReadonly(b bool) fieldOptions {
	return append(fo, func(f *field) {
		f.isReadonly = b
	})
}

// IsUnique adds an option to set whether the field is unique.
func (fo fieldOptions) IsUnique(b bool) fieldOptions {
	return append(fo, func(f *field) {
		f.isUnique = b
	})
}

// IsAlias adds an option to set whether the field is an alias.
func (fo fieldOptions) IsAlias(b bool) fieldOptions {
	return append(fo, func(f *field) {
		f.isAlias = b
	})
}

// WithNote adds an option to set an optional note about the field.
func (fo fieldOptions) WithNote(note *string) fieldOptions {
	return append(fo, func(f *field) {
		f.note = note
	})
}

// WithAssertableOverride adds an option to set an assertable override for the
// field.
func (fo fieldOptions) WithAssertableOverride(def string) fieldOptions {
	return append(fo, func(f *field) {
		f.override = newFieldOverride(f, FieldOverrideKindAssertable, def)
	})
}

// WithEnumOverride adds an option to set an enum override for the field.
func (fo fieldOptions) WithEnumOverride(def map[string]string) fieldOptions {
	return append(fo, func(f *field) {
		f.override = newFieldOverride(f, FieldOverrideKindEnum, def)
	})
}

const (
	TsTypeNumber  = "number"
	TsTypeString  = "string"
	TsTypeBoolean = "boolean"
	TsTypeDate    = "Date"
	TsTypeObject  = "object"
	TsTypeAny     = "any"
)

func directusTypeToTs(directusType string) string {
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

// FieldOverride is the interface implemented by fields that can override their
// type.
type FieldOverride interface {
	Typer
	Parseable

	// Kind returns the kind of field override.
	Kind() FieldOverrideKind

	// Def returns the definition of the field override.
	Def() any

	// Assertable returns whether the payload field can be asserted to the
	// schema field type.
	Assertable() bool
}

type FieldOverrideKind string

const (
	// FieldOverrideKindAssertable is the kind of field override that can be
	// asserted and is not another more specific kind (e.g. enum).
	//
	// Example:
	//	type Foo = 'a' | 'b';
	FieldOverrideKindAssertable FieldOverrideKind = "assertable"

	// FieldOverrideKindEnum is the kind of field override that is an enum.
	FieldOverrideKindEnum FieldOverrideKind = "enum"
)

// Parseable is the interface implemented by field overrides that can be parsed
// to and from the payload.
//
// In case of assertable fields (including enums), both methods will be ignored
// and can return empty strings.
type Parseable interface {
	// ParserFrom returns the name of a method of the schema field type that
	// returns the value to be used in the payload field. It must have no
	// parameters and return the type of the payload field.
	//
	// For example, if the schema field is a `Date` and the payload field is
	// a `string`, the method might be just `toString`, since `Date.toString()`
	// returns a valid `string`.
	ParserFrom() string

	// ParserTo returns the name of a function that parses the payload
	// field and returns the value to be used in the schema field.
	//
	// The function must have a single parameter of the type of the payload
	// field and return the type of the schema field.
	//
	// For example, if the schema field is a `Date` and the payload field is
	// a `string`, the function might be just `new Date`, since `new Date(string)`
	// returns a valid `Date`.
	ParserTo() string
}

// newFieldOverride creates a new field override with the given collection, field,
// kind, and options.
func newFieldOverride(f Field, kind FieldOverrideKind, def any, opts ...fieldOverrideOption) FieldOverride {
	fo := &fieldOverride{
		f:    f,
		def:  def,
		kind: kind,
	}
	for _, opt := range opts {
		opt(fo)
	}
	return fo
}

type fieldOverride struct {
	f          Field
	kind       FieldOverrideKind
	def        any
	parserFrom string
	parserTo   string
}

func (fo *fieldOverride) TypeName() string {
	n := fo.f.Collection().TypeName() + util.ToPascalCase(fo.f.Name())
	switch fo.kind {
	case FieldOverrideKindEnum:
		n += "Enum"
	default:
		n += "Type"
	}
	return n
}

func (fo *fieldOverride) Type() string {
	return fo.TypeName()
}

func (fo *fieldOverride) Kind() FieldOverrideKind {
	return fo.kind
}

func (fo *fieldOverride) Def() any {
	return fo.def
}

func (fo *fieldOverride) Assertable() bool {
	switch fo.kind {
	case FieldOverrideKindAssertable, FieldOverrideKindEnum:
		return true
	}
	return false
}

func (fo *fieldOverride) ParserTo() string {
	return fo.parserTo
}

func (fo *fieldOverride) ParserFrom() string {
	return fo.parserFrom
}

// fieldOverrideOption represents an option that can be set creating a new field
// override.
type fieldOverrideOption func(*fieldOverride)

// fieldOverrideOptions is a slice of [fieldOverrideOption]s with chainable methods
// to set the options.
//
// As [fieldOptions], every method uses the append function to add the option to
// the slice. See [fieldOptions] for more information about variable assignment
// and example.
type fieldOverrideOptions []fieldOverrideOption

// WithParserTo adds an option to set the function to be used to parse the schema
// field to the payload field.
func (fo fieldOverrideOptions) WithParserTo(parserTo string) fieldOverrideOptions {
	return append(fo, func(f *fieldOverride) {
		f.parserTo = parserTo
	})
}

// WithParserFrom adds an option to set the function to be used to parse the payload
// field to the schema field.
func (fo fieldOverrideOptions) WithParserFrom(parserFrom string) fieldOverrideOptions {
	return append(fo, func(f *fieldOverride) {
		f.parserFrom = parserFrom
	})
}
