package util

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWrapChan(t *testing.T) {
	errc := make(chan error, 1)
	err := errors.New("error")
	intc := WrapChan(errc, func() (int, error) {
		return 0, err
	})
	select {
	case <-intc:
		t.Error("expected error")
	case e := <-errc:
		assert.ErrorIs(t, e, err)
	}
}
