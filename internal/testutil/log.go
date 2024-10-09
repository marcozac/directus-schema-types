package testutil

import (
	"io"
	"strings"
	"testing"
)

// NewLogWriter returns a new io.Writer that logs to the testing.T.
func NewLogWriter(t *testing.T) io.Writer {
	return &LogWriter{t}
}

var _ io.Writer = (*LogWriter)(nil)

type LogWriter struct {
	t *testing.T
}

func (lw *LogWriter) Write(p []byte) (n int, err error) {
	if s := strings.TrimSuffix(string(p), "\n"); s != "" {
		lw.t.Log(s)
	}
	return len(p), nil
}

func NewPrefixLogWriter(t *testing.T, prefix string) io.Writer {
	return &PrefixLogWriter{t, prefix}
}

var _ io.Writer = (*PrefixLogWriter)(nil)

type PrefixLogWriter struct {
	t      *testing.T
	prefix string
}

func (lw *PrefixLogWriter) Write(p []byte) (n int, err error) {
	if s := strings.TrimSuffix(string(p), "\n"); s != "" {
		lw.t.Logf("[%s]: %s", lw.prefix, s)
	}
	return len(p), nil
}
