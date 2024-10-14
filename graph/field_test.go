package graph

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestField(t *testing.T) {
	for _, tt := range []struct {
		name string
		test func(t *testing.T)
	}{
		{
			name: "UnmarshalError",
			test: func(t *testing.T) {
				f := &FieldOverrideRaw{}
				assert.Error(t, f.UnmarshalJSON([]byte(`{`)), "unmarshal error")
				assert.Error(t, f.UnmarshalJSON([]byte(`{
					"kind": "enum",
					"def": 1
				}`)), "enum def not map")
				assert.Error(t, f.UnmarshalJSON([]byte(`{
					"kind": "enum",
					"def": {
						"1": 1
					}
				}`)), "enum def invalid map")
			},
		},
	} {
		t.Run(tt.name, tt.test)
	}
}
