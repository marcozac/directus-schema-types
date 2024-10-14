package util

import (
	"cmp"
	"slices"
	"sync"
)

type SortedMap[K cmp.Ordered, V any] struct {
	m  map[K]V
	mu sync.RWMutex
}

func (m *SortedMap[K, V]) Keys() []K {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.keys()
}

func (m *SortedMap[K, V]) keys() []K {
	keys := make([]K, 0, len(m.m))
	for k := range m.m {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	return keys
}

func (m *SortedMap[K, V]) Values() []V {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.values()
}

func (m *SortedMap[K, V]) values() []V {
	values := make([]V, 0, len(m.m))
	for _, k := range m.keys() {
		values = append(values, m.m[k])
	}
	return values
}

func (m *SortedMap[K, V]) Set(k K, v V) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.m[k] = v
}

// Get returns the value associated with the key and a boolean indicating if the
// key was found.
func (m *SortedMap[K, V]) Get(k K) (V, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	v, ok := m.m[k]
	return v, ok
}

// GetX returns the value associated with the key. If the key is not found, it
// returns the zero value of the value type.
func (m *SortedMap[K, V]) GetX(k K) V {
	v, _ := m.Get(k)
	return v
}

func (m *SortedMap[K, V]) Delete(k K) {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.m, k)
}

func (m *SortedMap[K, V]) Len() int {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return len(m.m)
}

func NewSortedMap[K cmp.Ordered, V any](len int) *SortedMap[K, V] {
	return &SortedMap[K, V]{
		m: make(map[K]V, len),
	}
}
