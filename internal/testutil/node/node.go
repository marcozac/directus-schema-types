package node

import (
	"embed"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/marcozac/directus-schema-types/internal/testutil/tmpl"
)

//go:embed template/*
var tmplFS embed.FS

// Tmpl is a template for Node.js files.
var Tmpl = tmpl.FromFS(tmplFS, "template/*")

// Create creates a new Node.js package for testing.
// The files are created in the given directory.
// If the directory does not exist, it is created.
func Create(dir string, spec *Spec) (*Package, error) {
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, fmt.Errorf("mkdir: %w", err)
	}
	if err := Tmpl.CreateExecute(filepath.Join(dir, "package.json"), "package.json", spec.PackageJson); err != nil {
		return nil, fmt.Errorf("create package.json: %w", err)
	}
	if err := Tmpl.CreateExecute(filepath.Join(dir, "tsconfig.json"), "tsconfig.json", spec.TSConfig); err != nil {
		return nil, fmt.Errorf("create tsconfig.json: %w", err)
	}
	return &Package{
		Dir: dir,
	}, nil
}

type Spec struct {
	PackageJson *PackageJsonSpec
	TSConfig    *TSConfigSpec
}

type Package struct {
	// Dir is the directory of the package.
	Dir string
}

// Install runs `npm install` in the package directory.
// It returns the output of the command and an error if any.
func (p *Package) Install() ([]byte, error) {
	resetDir, err := p.chdirTemp()
	if err != nil {
		return nil, err
	}
	defer resetDir()
	return exec.Command("npm", "install").CombinedOutput()
}

// Run runs a script in the package directory.
// It returns the output of the command and an error if any.
func (p *Package) Run(script string) ([]byte, error) {
	resetDir, err := p.chdirTemp()
	if err != nil {
		return nil, err
	}
	defer resetDir()
	return exec.Command("npm", "run", script).CombinedOutput()
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
