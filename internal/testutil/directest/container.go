package directest

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/internal/testutil"
	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"
)

func newContainer(version string, o *options) (*container, error) {
	pool, err := newPool()
	if err != nil {
		return nil, &DockerError{err}
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
	d := &container{
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

func newPool() (*dockertest.Pool, error) {
	pool, err := dockertest.NewPool("")
	if err != nil {
		return nil, fmt.Errorf("pool: %w", err)
	}
	if err := pool.Client.Ping(); err != nil {
		return nil, fmt.Errorf("ping: %w", err)
	}
	return pool, nil
}

var _ error = (*DockerError)(nil)

type DockerError struct {
	Err error
}

func (e *DockerError) Error() string {
	return fmt.Sprintf("docker: %v", e.Err)
}

func (e *DockerError) Unwrap() error {
	return e.Err
}

var asDockerError = &DockerError{}

var _ Directest = (*container)(nil)

type container struct {
	*dockertest.Resource
	pool    *dockertest.Pool
	client  *http.Client
	options *options
}

func (c *container) BaseURL() string {
	return "http://localhost:" + c.GetPort("8055/tcp")
}

func (c *container) Endpoint(e string) string {
	u, _ := url.JoinPath(c.BaseURL(), e)
	return u
}

// Wait waits until the Directus server is ready.
func (c *container) Wait() error {
	u := c.Endpoint("/server/health")
	return c.pool.Retry(func() error {
		_, _ = c.options.logWriter.Write([]byte("waiting for directus...\n"))
		resp, err := c.client.Get(u)
		if err != nil {
			return err
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			_, _ = c.options.logWriter.Write([]byte("directus not ready: " + resp.Status + "\n"))
			return fmt.Errorf("not ready: status %d", resp.StatusCode)
		}
		_, _ = c.options.logWriter.Write([]byte("directus ready\n"))
		return nil
	})
}

// ApplySchema applies the test schema snapshot to the Directus instance.
// It's not necessary to call Wait before calling this method.
func (c *container) ApplySchema() error {
	if err := c.Wait(); err != nil {
		return fmt.Errorf("wait: %w", err)
	}

	dres, err := c.post("/schema/diff", testutil.DirectusSchemaSnapshot())
	if err != nil {
		return fmt.Errorf("diff: %w", err)
	}
	defer dres.Body.Close()

	diff := &directus.Payload[json.RawMessage]{}
	if err := json.NewDecoder(dres.Body).Decode(&diff); err != nil {
		return fmt.Errorf("diff decode: %w", err)
	}

	ares, err := c.post("/schema/apply", bytes.NewBuffer(diff.Data))
	if err != nil {
		return fmt.Errorf("apply: %w", err)
	}
	defer ares.Body.Close()

	return nil
}

func (c *container) post(endpoint string, body io.Reader) (*http.Response, error) {
	u := c.Endpoint(endpoint)
	req, err := http.NewRequest(http.MethodPost, u, body)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	req.Header.Add("Authorization", "Bearer "+c.options.userToken)
	req.Header.Set("Content-Type", "application/json")
	res, err := c.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do request: %w", err)
	}
	if res.StatusCode == http.StatusOK || res.StatusCode == http.StatusNoContent {
		return res, nil // ok
	}
	defer res.Body.Close()
	if res.StatusCode >= 400 {
		return nil, directus.DecodeResponseError(res.StatusCode, res.Body)
	}
	return nil, fmt.Errorf("unexpected status code %d", res.StatusCode)
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
