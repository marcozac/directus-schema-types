package graph

import "testing"

func TestCollection(t *testing.T) {
	c := &collection{}
	_ = c.IsSingleton() // just for coverage
}
