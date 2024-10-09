package util

import (
	"encoding/json"
	"fmt"
	"io"
)

var _ error = (*DirectusErrors)(nil)

type DirectusErrors struct {
	Errors     []*DirectusError `json:"errors"`
	statusCode int              // not included in the error payload
}

func (e *DirectusErrors) Error() string {
	var msg string
	if e.statusCode != 0 {
		msg = fmt.Sprintf("%d: ", e.statusCode)
	}
	for _, err := range e.Errors {
		msg += err.Error() + "\n"
	}
	return msg
}

var _ error = (*DirectusError)(nil)

type DirectusError struct {
	Message    string                  `json:"message"`
	Extensions DirectusErrorExtensions `json:"extensions"`
}

func (e *DirectusError) Error() string {
	return fmt.Sprintf("[%s]: %s", e.Extensions.Code, e.Message)
}

type DirectusErrorExtensions struct {
	Reason string `json:"reason"`
	Code   string `json:"code"`
}

// DecodeDirectusError decodes the Directus errors from the given reader.
// It returns a DirectusErrors or panics if the decoding fails.
func DecodeDirectusError(statusCode int, r io.Reader) *DirectusErrors {
	errs := &DirectusErrors{statusCode: statusCode}
	if err := json.NewDecoder(r).Decode(errs); err != nil {
		panic(fmt.Errorf("decode directus errors: %w", err))
	}
	return errs
}
