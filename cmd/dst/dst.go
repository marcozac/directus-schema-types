package main

import (
	"fmt"

	dst "github.com/marcozac/directus-schema-types"
	"github.com/spf13/cobra"
)

var (
	baseURL string
	token   string

	outFile string
	outDir  string
	format  bool
	clean   bool
)

func init() {
	generateCmd.PersistentFlags().
		StringVarP(&baseURL, "url", "u", "http://localhost:8055", "Directus base URL")
	generateCmd.PersistentFlags().
		StringVarP(&token, "token", "t", "", "Directus admin token")

	generateCmd.PersistentFlags().
		StringVarP(&outFile, "file", "f", "", "output file")
	generateCmd.PersistentFlags().
		StringVarP(&outDir, "dir", "d", "", "output directory")
	generateCmd.PersistentFlags().
		BoolVar(&format, "format", true, "format the output")
	generateCmd.PersistentFlags().
		BoolVar(&clean, "clean", false, "clean the output file or directory before generating")

	rootCmd.AddCommand(generateCmd)
}

var rootCmd = &cobra.Command{
	Use: "dst",
}

var generateCmd = &cobra.Command{
	Use: "generate",
	RunE: func(cmd *cobra.Command, args []string) error {
		client := dst.NewClient(dst.ClientOptions{
			BaseURL: baseURL,
			Token:   token,
		})
		schema, err := client.GetSchema()
		if err != nil {
			return fmt.Errorf("schema: %w", err)
		}
		opts := []dst.Option{
			dst.WithFormatOutput(format),
			dst.WithClean(clean),
		}
		switch {
		case outFile != "":
			opts = append(opts, dst.WithOutFile(outFile))
		case outDir != "":
			opts = append(opts, dst.WithOutDir(outDir))
		default:
			opts = append(opts, dst.WithWriter(cmd.OutOrStdout()))
		}
		generator := dst.NewGenerator(schema, opts...)
		if err := generator.Generate(); err != nil {
			return fmt.Errorf("generate: %w", err)
		}
		return nil
	},
}
