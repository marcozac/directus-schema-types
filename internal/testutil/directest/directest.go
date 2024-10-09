package directest

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"

	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/marcozac/directus-schema-types/util"
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
func New(version string, opts ...Option) (*Directest, error) {
	if version == "" {
		return nil, fmt.Errorf("version is required")
	}
	pool, err := dockertest.NewPool("")
	if err != nil {
		return nil, fmt.Errorf("docker pool: %w", err)
	}

	o := &options{
		ctx:       context.Background(),
		userToken: DefaultUserToken,
		logWriter: io.Discard,
	}
	for _, opt := range opts {
		opt(o)
	}

	// pull separately to enable context cancellation and logging
	if err := pull(pool, version, o); err != nil {
		return nil, fmt.Errorf("pull image: %w", err)
	}
	r, err := pool.RunWithOptions(&dockertest.RunOptions{
		Repository: Repository,
		Tag:        version,
		Env: []string{
			`ADMIN_EMAIL="admin@example.com"`,
			`ADMIN_PASSWORD="myPassword1!"`,
			fmt.Sprintf(`ADMIN_TOKEN="%s"`, o.userToken),
		},
	})
	if err != nil {
		return nil, fmt.Errorf("run container: %w", err)
	}

	d := &Directest{
		Resource: r,
		pool:     pool,
		client:   http.DefaultClient,
		options:  o,
	}
	if o.applySchema {
		if err := d.ApplySchema(); err != nil {
			d.Close()
			return nil, fmt.Errorf("apply schema: %w", err)
		}
	}
	return d, nil
}

type Directest struct {
	*dockertest.Resource
	pool    *dockertest.Pool
	client  *http.Client
	options *options
}

func (d *Directest) BaseURL() string {
	return "http://localhost:" + d.GetPort("8055/tcp")
}

func (d *Directest) Endpoint(e string) string {
	u, _ := url.JoinPath(d.BaseURL(), e)
	return u
}

// Wait waits until the Directus server is ready.
func (d *Directest) Wait() error {
	u := d.Endpoint("/server/health")
	return d.pool.Retry(func() error {
		_, _ = d.options.logWriter.Write([]byte("waiting for directus...\n"))
		resp, err := d.client.Get(u)
		if err != nil {
			return err
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			_, _ = d.options.logWriter.Write([]byte("directus not ready: " + resp.Status + "\n"))
			return fmt.Errorf("not ready: status %d", resp.StatusCode)
		}
		_, _ = d.options.logWriter.Write([]byte("directus ready\n"))
		return nil
	})
}

type Diff struct {
	// the schema diff is used only here, should not be necessary to
	// define a type for it
	Data json.RawMessage `json:"data"`
}

// ApplySchema applies the test schema snapshot to the Directus instance.
// It's not necessary to call Wait before calling this method.
func (d *Directest) ApplySchema() error {
	if err := d.Wait(); err != nil {
		return fmt.Errorf("wait: %w", err)
	}

	dres, err := d.post("/schema/diff", testutil.DirectusSchemaSnapshot())
	if err != nil {
		return fmt.Errorf("diff: %w", err)
	}
	defer dres.Body.Close()

	diff := &Diff{}
	if err := json.NewDecoder(dres.Body).Decode(&diff); err != nil {
		return fmt.Errorf("diff decode: %w", err)
	}

	ares, err := d.post("/schema/apply", bytes.NewBuffer(diff.Data))
	if err != nil {
		return fmt.Errorf("apply: %w", err)
	}
	defer ares.Body.Close()

	return nil
}

func (d *Directest) post(endpoint string, body io.Reader) (*http.Response, error) {
	u := d.Endpoint(endpoint)
	req, err := http.NewRequest(http.MethodPost, u, body)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	req.Header.Add("Authorization", "Bearer "+d.options.userToken)
	req.Header.Set("Content-Type", "application/json")
	res, err := d.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do request: %w", err)
	}
	if res.StatusCode == http.StatusOK || res.StatusCode == http.StatusNoContent {
		return res, nil // ok
	}
	defer res.Body.Close()
	if res.StatusCode >= 400 {
		return nil, util.DecodeDirectusError(res.StatusCode, res.Body)
	}
	return nil, fmt.Errorf("unexpected status code %d", res.StatusCode)
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

func pull(pool *dockertest.Pool, version string, opts *options) error {
	if _, err := pool.Client.InspectImage(fmt.Sprintf("%s:%s", Repository, version)); err == nil {
		return nil // already available
	}
	return pool.Client.PullImage(
		docker.PullImageOptions{
			Context:      opts.ctx,
			Repository:   Repository,
			Tag:          version,
			OutputStream: opts.logWriter,
		},
		docker.AuthConfiguration{},
	)
}
