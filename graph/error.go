package graph

import (
	"errors"
	"fmt"
)

// ErrCollectionExists is the error returned when a collection already exists.
var ErrCollectionExists = errors.New("collection already exists")

// ErrFieldExists is the error returned when a field already exists.
var ErrFieldExists = errors.New("field already exists")

// ErrRelationExists is the error returned when a relation already exists.
var ErrRelationExists = errors.New("relation already exists")

// ErrNotFound is the error returned when an element is not found. Generally it
// is wrapped with a more descriptive error.
var ErrNotFound = errors.New("not found")

// newNotFoundError returns a new error for an element not found.
func newNotFoundError(element, name string) error {
	return fmt.Errorf("%s %q: %w", element, name, ErrNotFound)
}

// newNotFoundInError returns a new error for an element not found in another
// element.
func newNotFoundInError(element, name, in string) error {
	return fmt.Errorf("%s %q in %q: %w", element, name, in, ErrNotFound)
}

// newInvalidOverrideDef returns a new error for an invalid override definition.
func newInvalidOverrideDef(def any, field, collection string) error {
	return fmt.Errorf("invalid override definition %v for field %q: collection: %q",
		def, field, collection,
	)
}
