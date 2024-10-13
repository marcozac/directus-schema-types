package graph

type Relation interface {
	// Field returns the field that the relation is based on.
	Field() Field

	// Collection returns the related collection.
	Collection() Collection

	// Many returns whether the relation is to-many entities of the related
	// collection. It's the opposite of the [many|one]_[collection|field]
	// in the relation meta.
	//
	// For example, if the relation meta is:
	//	{
	//		"many_collection": "users",
	//		"many_field": "company_id",
	//		"one_collection": "companies",
	//		"one_field": "company_users"
	//	}
	// then Many is true for "companies" and false for "users".
	Many() bool

	// Unique returns whether the related field is unique.
	// Paired with Many, it means that the relation is one-to-one.
	// In this case, the relation field type is still an array, but it will
	// have only one element.
	//
	// @TODO
	// Should we enforce the type with a tuple?
	Unique() bool
}

type relation struct {
	field      Field
	collection Collection
	many       bool
	unique     bool
}

func (r *relation) Field() Field {
	return r.field
}

func (r *relation) Collection() Collection {
	return r.collection
}

func (r *relation) Many() bool {
	return r.many
}

func (r *relation) Unique() bool {
	return r.unique
}

// relationOption represents an option that can be set creating a new relation.
type relationOption func(*relation)

// relationOptions is a slice of [relationOption]s with chainable methods to set
// the options.
//
// As [FieldOptions], every method uses the append function to add the option to
// the slice. See [FieldOptions] for more information about variable assignment
// and example.
type relationOptions []relationOption

func (ro relationOptions) Many(b bool) relationOptions {
	return append(ro, func(r *relation) {
		r.many = b
	})
}

func (ro relationOptions) Unique(b bool) relationOptions {
	return append(ro, func(r *relation) {
		r.unique = b
	})
}
