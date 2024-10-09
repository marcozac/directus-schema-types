package node

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"sync"

	"github.com/marcozac/directus-schema-types/internal/testutil/tmpl"
)

//go:embed template/*
var tmplFS embed.FS

// Tmpl is a template for Node.js files.
var Tmpl = tmpl.FromFS(tmplFS, "template/*")

// Create creates a new Node.js package for testing.
// The files are created in the given directory.
// If the directory does not exist, it is created.
func Create(dir string, spec *Spec, opts ...Option) (*Package, error) {
	o := &options{
		logWriter: io.Discard,
	}
	for _, opt := range opts {
		opt(o)
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, fmt.Errorf("mkdir: %w", err)
	}
	if err := Tmpl.CreateExecute(filepath.Join(dir, "package.json"), "package.json", spec.PackageJson); err != nil {
		return nil, fmt.Errorf("create package.json: %w", err)
	}
	if err := Tmpl.CreateExecute(filepath.Join(dir, "tsconfig.json"), "tsconfig.json", spec.TSConfig); err != nil {
		return nil, fmt.Errorf("create tsconfig.json: %w", err)
	}
	if len(spec.Content) > 0 {
		if err := writeContent(dir, spec.Content); err != nil {
			return nil, fmt.Errorf("write content: %w", err)
		}
	}
	return &Package{Dir: dir, o: o}, nil
}

type Spec struct {
	PackageJson *PackageJsonSpec
	TSConfig    *TSConfigSpec

	// Content is a map of file names to file contents.
	// The files are created in the package directory.
	Content map[string]io.Reader
}

type Package struct {
	// Dir is the directory of the package.
	Dir string

	o *options
}

// Install calls InstallContext with a background context.
func (p *Package) Install() error {
	return p.InstallContext(context.Background())
}

// InstallContext runs `npm install` in the package directory with the given context.
func (p *Package) InstallContext(ctx context.Context) error {
	return p.exec(ctx, "npm", "install")
}

// Run runs a script in the package directory.
// It returns the output of the command and an error if any.
func (p *Package) Run(script string) error {
	resetDir, err := p.chdirTemp()
	if err != nil {
		return err
	}
	defer resetDir()
	return p.RunContext(context.Background(), script)
}

func (p *Package) RunContext(ctx context.Context, script string) error {
	resetDir, err := p.chdirTemp()
	if err != nil {
		return err
	}
	defer resetDir()
	return p.exec(ctx, "npm", "run", script)
}

func (p *Package) exec(ctx context.Context, name string, arg ...string) error {
	resetDir, err := p.chdirTemp()
	if err != nil {
		return err
	}
	defer resetDir()
	cmd := exec.CommandContext(ctx, name, arg...)
	cmd.Stdout = p.o.logWriter
	cmd.Stderr = p.o.logWriter
	return cmd.Run()
}

// chdirTemp changes the working directory to the package directory and returns
// a function to restore the original working directory.
//
// The returned function panics if an error occurs.
//
// Example:
//
//	resetDir, err := p.chdirTemp()
//	if err != nil {
//	  // ...
//	}
//	defer resetDir()
func (p *Package) chdirTemp() (func(), error) {
	wd, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("getwd: %w", err)
	}
	if err := os.Chdir(p.Dir); err != nil {
		return nil, fmt.Errorf("chdir: %w", err)
	}
	return func() {
		if err := os.Chdir(wd); err != nil {
			panic(err)
		}
	}, nil
}

type options struct {
	logWriter io.Writer
}

type Option func(*options)

// WithLogWriter sets the writer for the command output.
func WithLogWriter(w io.Writer) Option {
	return func(o *options) {
		o.logWriter = w
	}
}

func writeContent(dir string, content map[string]io.Reader) error {
	// create directories
	dirs := make(map[string]struct{}, len(content))
	for name := range content {
		d := filepath.Dir(name)
		// create only once, skipping files not in subdirectories
		if _, ok := dirs[d]; !ok && d != "." {
			if err := os.MkdirAll(filepath.Join(dir, d), 0o755); err != nil {
				return fmt.Errorf("mkdir: %w", err)
			}
			dirs[d] = struct{}{}
		}
	}

	var wg sync.WaitGroup
	wg.Add(len(content))
	errs := make(chan error, len(content))

	for name, r := range content {
		go func(name string, r io.Reader) {
			defer wg.Done()
			f, err := os.Create(filepath.Join(dir, name))
			if err != nil {
				errs <- fmt.Errorf("create file %s: %w", name, err)
				return
			}
			defer f.Close()
			if _, err := io.Copy(f, r); err != nil {
				errs <- fmt.Errorf("write file %s: %w", name, err)
			}
		}(name, r)
	}
	wg.Wait()
	close(errs)

	var err error
	for e := range errs {
		err = errors.Join(err, e)
	}
	return err
}
