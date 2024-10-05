package schema

type Field struct {
	// Collection is the name of the collection the field belongs to.
	Collection string `json:"collection"`

	// Field is the name of the field.
	Field string `json:"field"`

	// Type is the type of the field in Directus.
	// It may be different than the database type.
	Type FieldType `json:"type"`

	// Meta is the metadata of the field.
	Meta FieldMeta `json:"meta"`

	// Schema is the schema of the field.
	Schema *FieldSchema `json:"schema,omitempty"`
}

type FieldMeta struct {
	// Collection is the name of the collection the field belongs to.
	Collection string `json:"collection"`

	// Field is the name of the field.
	Field string `json:"field"`

	// Readonly is whether the field is read-only.
	Readonly bool `json:"readonly"`

	// Required is whether the field is required.
	Required bool `json:"required"`

	// Special is the special type of the field.
	Special []FieldSpecial `json:"special"`

	// Note is an optional note about the field.
	Note *string `json:"note"`

	// Conditions        []any   `json:"conditions"`
	// Display           *any    `json:"display"`
	// DisplayOptions    *any    `json:"display_options"`
	// Group             *string `json:"group"`
	// Hidden            bool    `json:"hidden"`
	// Interface         *any    `json:"interface"`
	// Options           *any    `json:"options"`
	// Sort              int64   `json:"sort"`
	// Translations      []any   `json:"translations"`
	// Validation        any     `json:"validation"`
	// ValidationMessage any     `json:"validation_message"`
	// Width             string  `json:"width"`
}

type FieldSchema struct {
	// Name is the name of the field in the database.
	Name string `json:"name"`

	// Table is the name of the table in the database.
	Table string `json:"table"`

	// IsNullable is whether the field is nullable.
	IsNullable bool `json:"is_nullable"`

	// IsPrimaryKey is whether the field is a primary key.
	IsPrimaryKey bool `json:"is_primary_key"`

	// IsUnique is whether the field is unique.
	IsUnique bool `json:"is_unique"`

	// IsForeignKey is whether the field is a foreign key.
	ForeignKeyTable *string `json:"foreign_key_table"`

	// ForeignKeyColumn is the column of the foreign key.
	ForeignKeyColumn *string `json:"foreign_key_column"`

	// DataType             any         `json:"data_type"`
	// DefaultValue         *any        `json:"default_value"`
	// MaxLength            *int64      `json:"max_length"`
	// NumericPrecision     *int64      `json:"numeric_precision"`
	// NumericScale         *int64      `json:"numeric_scale"`
	// IsGenerated          bool        `json:"is_generated"`
	// GenerationExpression interface{} `json:"generation_expression"`
	// HasAutoIncrement     bool        `json:"has_auto_increment"`
}

// FieldType is the type of a field in Directus.
type FieldType string

func (ft FieldType) String() string {
	return string(ft)
}

const (
	FieldTypeAlias FieldType = "alias"

	FieldTypeTypeInteger FieldType = "integer"
	FieldTypeBigInteger  FieldType = "bigInteger"
	FieldTypeTypeFloat   FieldType = "float"
	FieldTypeTypeDecimal FieldType = "decimal"

	FieldTypeString   FieldType = "string"
	FieldTypeTypeText FieldType = "text"
	FieldTypeTypeUUID FieldType = "uuid"
	FieldTypeHash     FieldType = "hash"

	FieldTypeTypeBoolean FieldType = "boolean"

	FieldTypeTypeTime  FieldType = "time"
	FieldTypeTimestamp FieldType = "timestamp"
	FieldTypeDate      FieldType = "date"
	FieldTypeDateTime  FieldType = "dateTime"

	FieldTypeTypeJSON FieldType = "json"
	FieldTypeCSV      FieldType = "csv"
)

// FieldSpecial is the special type of a field.
type FieldSpecial string

const (
	FieldSpecialSpecialAlias FieldSpecial = "alias"
	FieldSpecialCastBoolean  FieldSpecial = "cast-boolean"
	FieldSpecialCastJSON     FieldSpecial = "cast-json"
	FieldSpecialDateCreated  FieldSpecial = "date-created"
	FieldSpecialDateUpdated  FieldSpecial = "date-updated"
	FieldSpecialSpecialFile  FieldSpecial = "file"
	FieldSpecialSpecialFiles FieldSpecial = "files"
	FieldSpecialGroup        FieldSpecial = "group"
	FieldSpecialM2M          FieldSpecial = "m2m"
	FieldSpecialM2O          FieldSpecial = "m2o"
	FieldSpecialO2M          FieldSpecial = "o2m"
	FieldSpecialNoData       FieldSpecial = "no-data"
	FieldSpecialUserCreated  FieldSpecial = "user-created"
	FieldSpecialUserUpdated  FieldSpecial = "user-updated"
)
