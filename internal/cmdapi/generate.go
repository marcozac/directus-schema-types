package cmdapi

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	dst "github.com/marcozac/directus-schema-types"
	"github.com/marcozac/directus-schema-types/directus"
	"github.com/marcozac/directus-schema-types/graph"
)

func NewGenerateCmd(viper *viper.Viper) *cobra.Command {
	const (
		file           = "gen_out_file"
		dir            = "gen_out_dir"
		fromSnap       = "gen_from_snapshot"
		format         = "gen_format"
		clean          = "gen_clean"
		overrides      = "gen_overrides"
		overrides_file = "gen_overrides_file"
	)

	cmd := &cobra.Command{
		Use:   "generate",
		Short: "Generates Typescript types from the Directus schema",
		Long: `Generates Typescript types from the Directus schema including all collections,
fields, and relations.

By default, reads the schema from the Directus instance, using the provided
base URL and admin token. If the --from-snapshot flag is set, reads the schema
from a snapshot file instead, without connecting the Directus server.

By default, the output is formatted using prettier and printed to the standard
output. Setting the --file or --dir flags, the output can be saved to a file or
multiple files in a directory.

The output can be saved to a file or directory, or printed to the standard
output.`,
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			var schema *directus.Schema
			if viper.IsSet(fromSnap) {
				schema, err = directus.SchemaFromSnapshotFile(viper.GetString(fromSnap))
			} else {
				client := getClient(viper)
				schema, err = client.GetSchema()
			}
			if err != nil {
				return fmt.Errorf("schema: %w", err)
			}
			opts := []dst.Option{
				dst.WithFormatOutput(viper.GetBool(format)),
				dst.WithClean(viper.GetBool(clean)),
			}
			switch {
			case viper.IsSet(file):
				opts = append(opts, dst.WithOutFile(viper.GetString(file)))
			case viper.IsSet(dir):
				opts = append(opts, dst.WithOutDir(viper.GetString(dir)))
			default:
				opts = append(opts, dst.WithWriter(cmd.OutOrStdout()))
			}
			if viper.IsSet(overrides) || viper.IsSet(overrides_file) {
				var data []byte
				if viper.IsSet(overrides_file) {
					data, err = os.ReadFile(viper.GetString(overrides_file))
					if err != nil {
						return fmt.Errorf("overrides file: %w", err)
					}
				} else {
					data = []byte(viper.GetString(overrides))
				}
				var om graph.OverrideMap
				if err := json.Unmarshal(data, &om); err != nil {
					return fmt.Errorf("overrides: %w", err)
				}
				opts = append(opts, dst.WithGraphOptions(graph.WithOverrides(om)))
			}
			generator := dst.NewGenerator()
			if err := generator.GenerateSchema(schema, opts...); err != nil {
				return fmt.Errorf("generate: %w", err)
			}
			return nil
		},
	}

	// --- [generate] flags ---

	cmd.PersistentFlags().StringP("file", "f", "", "file path where to save the generated types")
	_ = viper.BindPFlag(file, cmd.PersistentFlags().Lookup("file"))

	cmd.PersistentFlags().StringP("dir", "d", "", "directory path where to generate the files")
	_ = viper.BindPFlag(dir, cmd.PersistentFlags().Lookup("dir"))

	cmd.PersistentFlags().String("from-snapshot", "", "path to a snapshot file to read the schema from")
	_ = viper.BindPFlag(fromSnap, cmd.PersistentFlags().Lookup("from-snapshot"))

	cmd.PersistentFlags().Bool("format", true, "enable output formatting with prettier")
	_ = viper.BindPFlag(format, cmd.PersistentFlags().Lookup("format"))

	cmd.PersistentFlags().Bool("clean", false, "clean the output file or directory before generating")
	_ = viper.BindPFlag(clean, cmd.PersistentFlags().Lookup("clean"))

	cmd.PersistentFlags().String("overrides", "", "a string containing a JSON object with the type overrides")
	_ = viper.BindPFlag(overrides, cmd.PersistentFlags().Lookup("overrides"))

	cmd.PersistentFlags().String("overrides-file", "", "a file containing a JSON object with the type overrides")
	_ = viper.BindPFlag(overrides_file, cmd.PersistentFlags().Lookup("overrides-file"))

	return cmd
}
