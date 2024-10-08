package testutil

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// CreateNodePackage creates a new Node.js package for testing.
// The files are created in the given directory (that must exist).
func CreateNodePackage(dir string, spec *NodePackageSpec) (*NodePackage, error) {
	if err := CreateAndExecute(filepath.Join(dir, "package.json"), "package.json", spec.PackageJson); err != nil {
		return nil, fmt.Errorf("create package.json: %w", err)
	}
	if err := CreateAndExecute(filepath.Join(dir, "tsconfig.json"), "tsconfig.json", spec.TSConfig); err != nil {
		return nil, fmt.Errorf("create tsconfig.json: %w", err)
	}
	return &NodePackage{
		Dir: dir,
	}, nil
}

type NodePackageSpec struct {
	PackageJson *PackageJsonSpec
	TSConfig    *TSConfigSpec
}

type PackageJsonSpec struct {
	// Name is the name of the package.
	Name string

	// Version is the version of the package.
	Version string

	// Description is the description of the package.
	Description string

	// Type is the type of the package.
	Type PackageJsonType

	// Scripts is a map of scripts.
	Scripts map[string]string

	// Dependencies is a map of dependencies.
	Dependencies map[string]string

	// DevDependencies is a map of dev dependencies.
	DevDependencies map[string]string

	// Files is a list of files to include in the package.
	Files []string

	// Options is a map of custom fields to include in the package.json.
	Options map[string]any
}

type PackageJsonType string

const (
	PackageJsonTypeCommonjs PackageJsonType = "commonjs"
	PackageJsonTypeModule   PackageJsonType = "module"
)

type TSConfigSpec struct {
	CompilerOptions map[string]any `json:"compilerOptions,omitempty"`
	Include         []string       `json:"include,omitempty"`
	Exclude         []string       `json:"exclude,omitempty"`
}

type NodePackage struct {
	// Dir is the directory of the package.
	Dir string
}

// Install runs `npm install` in the package directory.
// It returns the output of the command and an error if any.
func (p *NodePackage) Install() ([]byte, error) {
	resetDir, err := p.chdirTemp()
	if err != nil {
		return nil, err
	}
	defer resetDir()
	return exec.Command("npm", "install").CombinedOutput()
}

// Run runs a script in the package directory.
// It returns the output of the command and an error if any.
func (p *NodePackage) Run(script string) ([]byte, error) {
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
func (p *NodePackage) chdirTemp() (func(), error) {
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
