package directest

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
)

const (
	// Repository is the Docker repository for Directus.
	Repository = "directus/directus"

	// DefaultUserToken is the default user token to use for the Directus API.
	// It is used when the user token is not provided.
	//
	// This is only for testing purposes.
	// NEVER use this token in production.
	DefaultUserToken = "787ebc1d-3510-43f3-89ad-93d7c2a28d28" //nolint:gosec
)

// New runs a new Directus container with the specified version.
func New(version string, opts ...Option) (Directest, error) {
	if version == "" {
		return nil, fmt.Errorf("version is required")
	}
	o := &options{
		ctx:       context.Background(),
		userToken: DefaultUserToken,
		logWriter: io.Discard,
	}
	for _, opt := range opts {
		opt(o)
	}
	// check if the server should be used
	if os.Getenv("DIRECTEST_USE_SERVER") == "true" {
		return newServer(o)
	}
	dt, err := newContainer(version, o)
	if err != nil {
		if errors.As(err, &asDockerError) {
			_, _ = o.logWriter.Write([]byte("[WARNING]: docker not available: running as server\n"))
			return newServer(o) // docker not available: run as server
		}
		return nil, fmt.Errorf("new container: %w", err)
	}
	return dt, nil
}

type Directest interface {
	// BaseURL returns the base URL for the instance.
	BaseURL() string

	// Endpoint returns the full URL for the given endpoint.
	//
	// Example:
	//   u := d.Endpoint("/server/health") // http://localhost:8055/server/health
	Endpoint(string) string

	// Wait waits until the server is ready.
	Wait() error

	// ApplySchema applies the test schema snapshot to the instance.
	ApplySchema() error

	// Close stops and removes all the resources associated with the instance.
	Close() error
}

type options struct {
	ctx         context.Context
	userToken   string
	applySchema bool
	logWriter   io.Writer
}

type Option func(*options)

// WithContext sets the context for pulling the Directus image.
// It does not affect the context for running the Directus container.
func WithContext(ctx context.Context) Option {
	return func(o *options) {
		o.ctx = ctx
	}
}

// WithUserToken sets the user token to use for the Directus API.
func WithUserToken(token string) Option {
	return func(o *options) {
		o.userToken = token
	}
}

// WithApplySchema sets whether to apply the test schema snapshot to the Directus instance.
func WithApplySchema(apply bool) Option {
	return func(o *options) {
		o.applySchema = apply
	}
}

// WithLogWriter sets the writer for the command output.
func WithLogWriter(w io.Writer) Option {
	return func(o *options) {
		o.logWriter = w
	}
}
