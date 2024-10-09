package directest

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const directusTestVersion = "11.1.0"

func TestDirectest(t *testing.T) {
	t.Log("New Directest...")
	d, err := New(directusTestVersion)
	require.NoError(t, err, "New")
	defer d.Close()

	t.Log("Apply schema...")
	assert.NoError(t, d.ApplySchema(), "ApplySchema")
}
