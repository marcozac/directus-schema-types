package node

type TSConfigSpec struct {
	CompilerOptions map[string]any `json:"compilerOptions,omitempty"`
	Include         []string       `json:"include,omitempty"`
	Exclude         []string       `json:"exclude,omitempty"`
}
