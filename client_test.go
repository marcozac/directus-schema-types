package dst

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"slices"

	"github.com/marcozac/directus-schema-types/internal/testutil"
)

// This file does not contain tests: they are run by the suite in dst_test.go.
// It includes the Client methods used only for testing purposes, that should
// be not included in the package.

// testCollections is a list of collections that are used for testing purposes.
// They are included in the test schema snapshot.
var testCollections = []string{"chefs", "ingredients", "recipes", "recipes_ingredients"}

// applyTestSchema applies a test schema to the Directus instance.
// It creates collections, fields, and relations for testing purposes.
func (c *Client) applyTestSchema() error {
	return c.applySchema(testutil.DirectusSchemaSnapshot())
}

// resetSchema resets the schema of the Directus instance to an empty one.
func (c *Client) resetSchema() error {
	return c.applySchema(testutil.DirectusEmptySchemaSnapshot())
}

// applySchema applies the schema snapshot provided by the given reader to the
// Directus instance.
func (c *Client) applySchema(snapshotReader io.Reader) error {
	diff, err := c.diff(snapshotReader)
	if err != nil {
		return fmt.Errorf("diff: %w", err)
	}

	// apply the schema diff
	res, err := c.post("/schema/apply", bytes.NewBuffer(diff.Data), setJsonHeader)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	switch res.StatusCode {
	case http.StatusOK, http.StatusNoContent: // ok
	default:
		return decodeDirectusErrors(res.StatusCode, res.Body)
	}
	return nil
}

type Diff struct {
	// the schema diff is used only here, should not be necessary to
	// define a type for it
	Data json.RawMessage `json:"data"`
}

// diff returns the schema diff between the schema snapshot provided by the
// given reader and the current one, checking if the current collections are
// all system or test collections.
//
// @TODO
// Improve the schema check to make it more robust and safe in case of
// wrong configurations (e.g. .env file with production credentials).
func (c *Client) diff(snapshotReader io.Reader) (*Diff, error) {
	// retrieve the schema diff
	res, err := c.post("/schema/diff", snapshotReader, setJsonHeader)
	if err != nil {
		return nil, fmt.Errorf("post: %w", err)
	}
	defer res.Body.Close()

	switch res.StatusCode {
	case http.StatusNoContent: // ok, no changes to apply
		return nil, nil
	case http.StatusOK: // check later
	default:
		return nil, decodeDirectusErrors(res.StatusCode, res.Body)
	}

	// check if the collections are all system or test collections
	collections, err := c.GetCollections()
	if err != nil {
		return nil, fmt.Errorf("get current collections: %w", err)
	}
	for _, collection := range collections {
		if !collection.Meta.System && !slices.Contains(testCollections, collection.Collection) {
			return nil, fmt.Errorf(
				"%s is not a system or test collection. use a clean instance to apply the test schema", collection.Collection,
			)
		}
	}

	// decode the schema diff
	diff := &Diff{}
	if err := json.NewDecoder(res.Body).Decode(&diff); err != nil {
		return nil, fmt.Errorf("decode schema: %w", err)
	}
	return diff, nil
}
