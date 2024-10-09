package directest

import (
	"testing"

	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestDirectest(t *testing.T) {
	t.Log("New Directest...")
	d, err := New(testutil.DirectusVersion())
	require.NoError(t, err, "New")
	defer d.Close()

	t.Log("Apply schema...")
	assert.NoError(t, d.ApplySchema(), "ApplySchema")
}
