package dst

import "sort"

// SortableStringMap is a map with string keys that can be sorted by key.
//
// NOTE
// Iterating over the map itself will not guarantee a sorted order.
// This is a simple implementation not optimized for performance: it's
// purpose is just to keep the fields in a stable order for version control.
type SortableStringMap[V any] map[string]V

func (m SortableStringMap[V]) Keys() []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

func (m SortableStringMap[V]) Values() []V {
	values := make([]V, 0, len(m))
	for _, k := range m.Keys() {
		values = append(values, m[k])
	}
	return values
}
