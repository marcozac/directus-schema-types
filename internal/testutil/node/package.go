package node

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
