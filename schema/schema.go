package schema

// Schema represents the schema of the Directus instance.
type Schema struct {
	// Collections is the list of the collections in the schema.
	Collections []Collection `json:"collections"`

	// Fields is the list of the fields in the schema.
	Fields []Field `json:"fields"`

	// Relations is the list of the relations in the schema.
	Relations []Relation `json:"relations"`
}
