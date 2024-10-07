package main

import (
	"fmt"

	dst "github.com/marcozac/directus-schema-types"
	"github.com/marcozac/directus-schema-types/schema"
	"github.com/spf13/cobra"
)

const (
	// --- [generate] config keys ---

	genOutFile  = "gen_out_file"
	genOutDir   = "gen_out_dir"
	genFromSnap = "gen_from_snapshot"
	genFormat   = "gen_format"
	genClean    = "gen_clean"
)

func init() {
	// --- [generate] flags ---

	generateCmd.PersistentFlags().StringP("file", "f", "", "output file")
	_ = viper.BindPFlag(genOutFile, generateCmd.PersistentFlags().Lookup("file"))

	generateCmd.PersistentFlags().StringP("dir", "d", "", "output directory")
	_ = viper.BindPFlag(genOutDir, generateCmd.PersistentFlags().Lookup("dir"))

	generateCmd.PersistentFlags().String("from-snapshot", "", "use a snapshot file as schema source")
	_ = viper.BindPFlag(genFromSnap, generateCmd.PersistentFlags().Lookup("from-snapshot"))

	generateCmd.PersistentFlags().Bool("format", true, "format the output")
	_ = viper.BindPFlag(genFormat, generateCmd.PersistentFlags().Lookup("format"))

	generateCmd.PersistentFlags().Bool("clean", false, "clean the output file or directory before generating")
	_ = viper.BindPFlag(genClean, generateCmd.PersistentFlags().Lookup("clean"))
}

var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generates Typescript types from the Directus schema",
	Long: `
Generates Typescript types from the Directus schema including all collections,
fields, and relations.

By default, reads the schema from the Directus instance, using the provided
base URL and admin token. It is also possible to set the DIRECTUS_BASE_URL and
DIRECTUS_TOKEN env variables, but their values are overridden by the flags.
If the --from-snapshot flag is set, reads the schema from a snapshot file
instead, without connecting to the Directus instance.

The output can be saved to a file or directory, or printed to the standard
output.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		schema, err := getGenSchema()
		if err != nil {
			return fmt.Errorf("schema: %w", err)
		}
		opts := []dst.Option{
			dst.WithFormatOutput(viper.GetBool(genFormat)),
			dst.WithClean(viper.GetBool(genClean)),
		}
		switch {
		case viper.IsSet(genOutFile):
			opts = append(opts, dst.WithOutFile(viper.GetString(genOutFile)))
		case viper.IsSet(genOutDir):
			opts = append(opts, dst.WithOutDir(viper.GetString(genOutDir)))
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

// getGenSchema returns the schema for the generate command from the Directus
// instance or from a snapshot file if the flag is set.
func getGenSchema() (*schema.Schema, error) {
	if viper.IsSet(genFromSnap) {
		return dst.SchemaFromSnapshotFile(viper.GetString(genFromSnap))
	}
	client := newClient()
	return client.GetSchema()
}
