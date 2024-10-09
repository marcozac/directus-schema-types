package util

// WrapChan wraps a function returning a value and an error into a channel.
//   - The error is sent to its channel only if it's not nil.
//   - The value is sent to its channel only if there is no error.
func WrapChan[T any](errc chan error, fn func() (T, error)) chan T {
	resc := make(chan T, 1)
	go func(resc chan T, errc chan error) {
		res, err := fn()
		if err != nil {
			errc <- err
		}
		resc <- res
	}(resc, errc)
	return resc
}
