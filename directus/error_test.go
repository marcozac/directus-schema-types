package directus

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestError(t *testing.T) {
	for _, tt := range []struct {
		name string
		test func(t *testing.T)
	}{
		{
			name: "DecodeResponseErrorPanic",
			test: func(t *testing.T) {
				assert.Panics(t, func() {
					_ = DecodeResponseError(0, strings.NewReader("{"))
				})
			},
		},
		{
			name: "ErrorsMessage",
			test: func(t *testing.T) {
				errs := &Errors{
					statusCode: 500,
					Errors: []*Error{
						{
							Message: "error message 1",
							Extensions: ErrorExtensions{
								Reason: "reason 1",
								Code:   "code 1",
							},
						},
						{
							Message: "error message 2",
							Extensions: ErrorExtensions{
								Reason: "reason 2",
								Code:   "code 2",
							},
						},
					},
				}
				assert.Equal(t,
					"500: [code 1]: error message 1\n[code 2]: error message 2\n", errs.Error(),
				)
			},
		},
	} {
		t.Run(tt.name, tt.test)
	}
}
