package graph

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestOverrideMap(t *testing.T) {
	var m OverrideMap
	assert.NotPanics(t, func() {
		m.GetCollection("my_collection")
	})
	assert.NotPanics(t, func() {
		m.GetField("my_collection", "my_field")
	})
}
