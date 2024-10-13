package graph

import (
	"fmt"

	"github.com/marcozac/directus-schema-types/util"
)

type Payload interface {
	TypeNamer

	// Collection returns the collection of the payload.
	Collection() Collection

	// Fields returns the list of fields in the collection payload.
	Fields() []PayloadField

	// FieldNames returns the list of field names in the collection payload.
	FieldNames() []string
}

type payload struct {
	c      Collection
	fields *util.SortedMap[string, PayloadField]
}

func (p *payload) TypeName() string {
	return p.c.TypeName() + "Payload"
}

func (p *payload) Collection() Collection {
	return p.c
}

func (p *payload) Fields() []PayloadField {
	return p.fields.Values()
}

func (p *payload) FieldNames() []string {
	return p.fields.Keys()
}

type PayloadField interface {
	Field
	Parseable

	// Assertable returns whether the payload field can be asserted to the
	// schema field type.
	Assertable() bool
}

type payloadField struct {
	Field
}

func (f *payloadField) Type() string {
	return directusPayloadType(f.Field.FieldType().String()) // field raw type
}

func (f *payloadField) Assertable() bool {
	if f.Field.Override() != nil {
		return f.Field.Override().Assertable()
	}
	return false
}

func (f *payloadField) ParserTo() string {
	if f.Field.Override() != nil && f.Field.Override().ParserTo() != "" {
		return f.Field.Override().ParserTo()
	}
	return parserTo(f.Field.Type()) // field elaborated type
}

func (f *payloadField) ParserFrom() string {
	if f.Field.Override() != nil && f.Field.Override().ParserFrom() != "" {
		return f.Field.Override().ParserFrom()
	}
	return parserFrom(f.Field.Type()) // field elaborated type
}

func directusPayloadType(directusType string) string {
	switch directusType {
	case "date", "dateTime", "timestamp":
		// Directus API returns dates as strings
		return TsTypeString
	}
	return directusTypeToTs(directusType)
}

func parserFrom(typ string) string {
	switch typ {
	case "Date":
		return "toString"
	default:
		panic(fmt.Sprintf("parserTo: unknown type %s", typ))
	}
}

func parserTo(typ string) string {
	switch typ {
	case "Date":
		return "new Date"
	default:
		panic(fmt.Sprintf("parserFrom: unknown type %s", typ))
	}
}
