package directus

import (
	"encoding/json"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestResponse(t *testing.T) {
	for _, tt := range []struct {
		name string
		test func(t *testing.T)
	}{
		{
			name: "DecodePayloadError",
			test: func(t *testing.T) {
				_, err := DecodePayload[json.RawMessage](strings.NewReader(`{"data": invalid}`))
				assert.Error(t, err)
			},
		},
	} {
		t.Run(tt.name, tt.test)
	}
}
