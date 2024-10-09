package directus

type Relation struct {
	// Collection is the name of the collection the relation field belongs to.
	Collection string `json:"collection"`

	// Field is the name of the field.
	Field string `json:"field"`

	// RelatedCollection is the name of the collection that the relation points to.
	RelatedCollection string `json:"related_collection"`

	// Meta is the metadata of the relation.
	Meta RelationMeta `json:"meta"`

	// Schema is the schema of the relation.
	Schema RelationSchema `json:"schema"`
}

type RelationMeta struct {
	// JunctionField is the field that is used to join the two collections.
	JunctionField *string `json:"junction_field"`

	// ManyCollection is the name of the collection that has many records.
	ManyCollection string `json:"many_collection"`

	// ManyField is the field that is used to join the two collections.
	ManyField string `json:"many_field"`

	// OneCollection is the name of the collection that has one record.
	OneCollection string `json:"one_collection"`

	// OneField is the field that is used to join the two collections.
	OneField *string `json:"one_field"`

	// OneAllowedCollections any    `json:"one_allowed_collections"`
	// OneCollectionField    any    `json:"one_collection_field"`
	// OneDeselectAction     string `json:"one_deselect_action"`
	// SortField             any    `json:"sort_field"`
}

type RelationSchema struct {
	// Table is the name of the table where the relation is defined.
	Table string `json:"table"`

	// Column is the name of the column where the relation is defined.
	Column string `json:"column"`

	// ForeignKeyTable is the name of the table that the relation points to.
	ForeignKeyTable string `json:"foreign_key_table"`

	// ForeignKeyColumn is the name of the column that the relation points to.
	ForeignKeyColumn string `json:"foreign_key_column"`

	// ConstraintName is the name of the constraint.
	ConstraintName string `json:"constraint_name"`

	// OnUpdate string `json:"on_update"`
	// OnDelete string `json:"on_delete"`
}
