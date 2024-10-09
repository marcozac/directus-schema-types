package directus

import (
	"encoding/json"
	"fmt"
	"io"
)

// DecodePayload is a generic function that decodes a Directus payload
// from an io.Reader (e.g. an HTTP response body).
func DecodePayload[T PayloadData](r io.Reader) (T, error) {
	p := &Payload[T]{}
	if err := json.NewDecoder(r).Decode(p); err != nil {
		return nil, fmt.Errorf("decode payload: %w", err)
	}
	return p.Data, nil
}

// Payload is a generic representation of the payload received from a
// successful Directus API response.
type Payload[T PayloadData] struct {
	Data T `json:"data"`
}

// PayloadData is an interface that represents the types that can
// be decoded from a Directus payload.
// It includes also the json.RawMessage type to allow for custom
// decoding of unknown types.
type PayloadData interface {
	[]Collection | []Field | []Relation | json.RawMessage
}
