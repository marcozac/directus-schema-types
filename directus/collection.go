package directus

// Collection is a representation of a collection in the schema.
type Collection struct {
	// Collection is the name of the collection.
	Collection string `json:"collection"`

	// Meta is the metadata of the collection.
	Meta CollectionMeta `json:"meta"`

	// Schema is the schema of the collection.
	Schema *CollectionSchema `json:"schema,omitempty"`
}

// CollectionMeta is the metadata of a collection.
type CollectionMeta struct {
	// Collection is the name of the collection.
	Collection string `json:"collection"`

	// Singleton is whether the collection is a singleton.
	Singleton bool `json:"singleton"`

	// System is whether the collection is a system collection.
	System bool `json:"system"`

	// Accountability        any     `json:"accountability"`
	// ArchiveAppFilter      bool    `json:"archive_app_filter"`
	// ArchiveField          any     `json:"archive_field"`
	// ArchiveValue          any     `json:"archive_value"`
	// Collapse              any     `json:"collapse"`
	// Color                 any     `json:"color"`
	// DisplayTemplate       *string `json:"display_template"`
	// Group                 *string `json:"group"`
	// Hidden                bool    `json:"hidden"`
	// Icon                  *string `json:"icon"`
	// ItemDuplicationFields any     `json:"item_duplication_fields"`
	// Note                  *string `json:"note"`
	// PreviewURL            any     `json:"preview_url"`
	// Sort                  int64   `json:"sort"`
	// SortField             any     `json:"sort_field"`
	// Translations          []any   `json:"translations"`
	// UnarchiveValue        any     `json:"unarchive_value"`
	// Versioning            bool    `json:"versioning"`
}

// CollectionSchema is the schema of a collection.
type CollectionSchema struct {
	// Name is the name of the collection.
	Name string `json:"name"`
}
