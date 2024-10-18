package util

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSortedMap(t *testing.T) {
	m := NewSortedMap[int, string](0)
	m.Set(1, "one")

	assert.Equal(t, 1, m.Len())
	assert.Equal(t, "one", m.GetX(1))

	m.Delete(1)
	assert.Equal(t, 0, m.Len())
	assert.Equal(t, "", m.GetX(1))
}
