package directus

import (
	"encoding/json"
	"fmt"
	"io"
)

// DecodeResponseError decodes the Directus errors from the given reader
// (the response body).
// It panics if the decoding fails.
func DecodeResponseError(statusCode int, body io.Reader) *Errors {
	errs := &Errors{statusCode: statusCode}
	if err := json.NewDecoder(body).Decode(errs); err != nil {
		panic(fmt.Errorf("decode directus errors: %w", err))
	}
	return errs
}

var _ error = (*Errors)(nil)

// Errors represents an error returned by the Directus API.
// It contains a list of Error elements.
type Errors struct {
	Errors     []*Error `json:"errors"`
	statusCode int      // not included in the error payload
}

func (e *Errors) Error() string {
	var msg string
	if e.statusCode != 0 {
		msg = fmt.Sprintf("%d: ", e.statusCode)
	}
	for _, err := range e.Errors {
		msg += err.Error() + "\n"
	}
	return msg
}

var _ error = (*Error)(nil)

// Error represents an error element returned by the Directus API.
type Error struct {
	Message    string          `json:"message"`
	Extensions ErrorExtensions `json:"extensions"`
}

func (e *Error) Error() string {
	return fmt.Sprintf("[%s]: %s", e.Extensions.Code, e.Message)
}

type ErrorExtensions struct {
	Reason string `json:"reason"`
	Code   string `json:"code"`
}
