package graph

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestError(t *testing.T) {
	assert.ErrorIs(t, newNotFoundError("element", "name"), ErrNotFound)
	assert.ErrorIs(t, newNotFoundInError("element", "name", "in"), ErrNotFound)
	assert.Error(t, newInvalidOverrideDef("def", "field", "collection"))
}
