package graph

import "github.com/marcozac/directus-schema-types/util"

// Typer is the interface implemented by types that have a name and a type.
type Typer interface {
	TypeNamer
	TypeTyper
}

type typer struct {
	typeNamer
	typeTyper
}

// TypeNamer is the interface implemented by types that have a name.
type TypeNamer interface {
	// TypeName returns the name of the type.
	TypeName() string
}

type typeNamer struct{ name string }

func (t typeNamer) TypeName() string { return t.name }

// TypeTyper is the interface implemented by types to return their type as a
// string.
//
// Generally, despite every type can be represented as a string, this interface
// is used for single-element types, such as "number", "string", "object", etc.
// It should not be used for more complex types.
//
// Example:
//   - "number"
//   - "string"
//   - "object"
type TypeTyper interface {
	// Type returns the type as a string.
	Type() string
}

type typeTyper struct{ typ string }

func (t typeTyper) Type() string { return t.typ }

// SliceTypeNamer is the interface implemented by types that have a name and a
// list of values.
type SliceTypeNamer[T any] interface {
	TypeNamer

	// Values returns the list of values of the type.
	Values() []T
}

func newSliceTypeNamer[T any](name string, sm *util.SortedMap[string, T]) *sliceTypeNamer[T] {
	return &sliceTypeNamer[T]{
		name:      name,
		SortedMap: sm,
	}
}

type sliceTypeNamer[T any] struct {
	name string
	*util.SortedMap[string, T]
}

func (s *sliceTypeNamer[T]) TypeName() string {
	return s.name
}
