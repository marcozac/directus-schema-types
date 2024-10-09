package directest

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"net/url"

	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/internal/testutil"
)

func newServer(options *options) (Directest, error) {
	schema, err := directus.SchemaFromSnapshot(testutil.ClientSchemaSnapshot())
	if err != nil {
		return nil, fmt.Errorf("schema from snapshot: %w", err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/collections", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Header.Get("Authorization") != fmt.Sprintf("Bearer %s", options.userToken) {
			w.WriteHeader(http.StatusUnauthorized)
			writeDirectusEmptyErrors(w)
			return
		}
		err := json.NewEncoder(w).Encode(directus.Payload[[]directus.Collection]{Data: schema.Collections})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			writeDirectusEmptyErrors(w)
			return
		}
	})
	mux.HandleFunc("/fields", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Header.Get("Authorization") != fmt.Sprintf("Bearer %s", options.userToken) {
			w.WriteHeader(http.StatusUnauthorized)
			writeDirectusEmptyErrors(w)
			return
		}
		err := json.NewEncoder(w).Encode(directus.Payload[[]directus.Field]{Data: schema.Fields})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			writeDirectusEmptyErrors(w)
			return
		}
	})
	mux.HandleFunc("/relations", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Header.Get("Authorization") != fmt.Sprintf("Bearer %s", options.userToken) {
			w.WriteHeader(http.StatusUnauthorized)
			writeDirectusEmptyErrors(w)
			return
		}
		err := json.NewEncoder(w).Encode(directus.Payload[[]directus.Relation]{Data: schema.Relations})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			writeDirectusEmptyErrors(w)
			return
		}
	})

	s := &server{
		srv: &http.Server{ //nolint:gosec
			Handler: mux,
		},
		options: options,
	}
	if err := s.Start(); err != nil {
		return nil, fmt.Errorf("start: %w", err)
	}
	return s, nil
}

var _ Directest = (*server)(nil)

type server struct {
	srv     *http.Server
	port    int
	options *options
}

func (s *server) Start() error {
	l, err := net.Listen("tcp", ":0") //nolint:gosec
	if err != nil {
		return fmt.Errorf("listen: %w", err)
	}
	s.port = l.Addr().(*net.TCPAddr).Port
	go s.serve(l)
	return nil
}

func (s *server) serve(l net.Listener) {
	if err := s.srv.Serve(l); err != nil {
		if err != http.ErrServerClosed {
			panic(err)
		}
	}
}

func (s *server) Close() error {
	return s.srv.Close()
}

func (s *server) BaseURL() string {
	return fmt.Sprintf("http://localhost:%d", s.port)
}

func (s *server) Endpoint(e string) string {
	u, _ := url.JoinPath(s.BaseURL(), e)
	return u
}

// Wait is a no-op for the server.
func (s *server) Wait() error {
	return nil
}

// ApplySchema is a no-op for the server.
func (s *server) ApplySchema() error {
	return nil
}

func writeDirectusEmptyErrors(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(`{"errors":[]}`))
}
