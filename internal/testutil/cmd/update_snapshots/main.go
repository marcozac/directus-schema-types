package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"

	dst "github.com/marcozac/directus-schema-types"
	"github.com/marcozac/directus-schema-types/directus"
)

const (
	directusDefaultVersion    = "11.1.0"
	directusSnapshotFile      = "directus-schema-snapshot.json"
	directusEmptySnapshotFile = "directus-empty-schema-snapshot.json"
	clientSnapshotFile        = "client-schema-snapshot.json"
)

var directusVersionEnv = fmt.Sprintf("${DIRECTUS_VERSION:-%s}", directusDefaultVersion)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	baseUrl := os.Getenv("DIRECTUS_BASE_URL")
	if baseUrl == "" {
		return errors.New("DIRECTUS_BASE_URL is required")
	}
	token := os.Getenv("DIRECTUS_TOKEN")
	if token == "" {
		return errors.New("DIRECTUS_TOKEN is required")
	}
	if err := updateDirectusSnapshot(baseUrl, token); err != nil {
		return fmt.Errorf("update directus snapshot: %w", err)
	}
	if err := updateEmptyDirectusSnapshot(); err != nil {
		return fmt.Errorf("update empty directus snapshot: %w", err)
	}
	if err := updateClientSnapshot(baseUrl, token); err != nil {
		return fmt.Errorf("update client snapshot: %w", err)
	}
	return nil
}

func updateDirectusSnapshot(baseUrl, token string) error {
	req, err := http.NewRequest(http.MethodGet, must(url.JoinPath(baseUrl, "/schema/snapshot")), nil)
	if err != nil {
		return fmt.Errorf("new request: %w", err)
	}
	req.Header.Add("Authorization", "Bearer "+token)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("status %d", resp.StatusCode)
	}

	m, err := directus.DecodePayload[map[string]any](resp.Body)
	if err != nil {
		return fmt.Errorf("decode payload: %w", err)
	}
	m["directus"] = directusVersionEnv
	m["vendor"] = "${DIRECTUS_DB_VENDOR:-sqlite}"

	f, err := os.Create(directusSnapshotFile)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer f.Close()

	enc := json.NewEncoder(f)
	enc.SetIndent("", "  ")
	if err := enc.Encode(m); err != nil {
		return fmt.Errorf("encode: %w", err)
	}
	return nil
}

func updateEmptyDirectusSnapshot() error {
	m := map[string]any{
		"version":     1,
		"directus":    directusVersionEnv,
		"vendor":      "${DIRECTUS_DB_VENDOR:-sqlite}",
		"collections": []any{},
		"fields":      []any{},
		"relations":   []any{},
	}

	f, err := os.Create(directusEmptySnapshotFile)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer f.Close()

	enc := json.NewEncoder(f)
	enc.SetIndent("", "  ")
	if err := enc.Encode(m); err != nil {
		return fmt.Errorf("encode: %w", err)
	}
	return nil
}

func updateClientSnapshot(baseUrl, token string) error {
	client := dst.NewClient(dst.ClientOptions{
		BaseURL: baseUrl,
		Token:   token,
	})
	f, err := os.Create(clientSnapshotFile)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer f.Close()
	if err := client.SnapshotPretty(f); err != nil {
		return fmt.Errorf("snapshot: %w", err)
	}
	return nil
}

func must[T any](v T, err error) T {
	if err != nil {
		panic(err)
	}
	return v
}
