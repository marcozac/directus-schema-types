package graph

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPayload(t *testing.T) {
	assert.Panics(t, func() {
		parserFrom("invalid")
	}, "get parserFrom for invalid type")
	assert.Panics(t, func() {
		parserTo("invalid")
	}, "get parserTo for invalid type")
}
