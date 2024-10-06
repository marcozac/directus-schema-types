package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	dst "github.com/marcozac/directus-schema-types"
	"github.com/marcozac/directus-schema-types/schema"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

const (
	// --- [root] config keys ---

	baseUrlKey = "base_url"
	tokenKey   = "token"

	// --- [generate] config keys ---

	genOutFile  = "gen_out_file"
	genOutDir   = "gen_out_dir"
	genFromSnap = "gen_from_snapshot"
	genFormat   = "gen_format"
	genClean    = "gen_clean"

	// --- [snapshot] config keys ---

	snapOutFile = "snap_out_file"
	snapPretty  = "snap_pretty"
)

func init() {
	_ = godotenv.Load() // try to load .env file

	viper.SetEnvPrefix("directus")
	viper.MustBindEnv("base_url")
	viper.MustBindEnv("token")

	// --- [root] flags ---

	rootCmd.PersistentFlags().
		StringP("url", "u", "http://localhost:8055", "Directus base URL")
	_ = viper.BindPFlag(baseUrlKey, rootCmd.PersistentFlags().Lookup("url"))

	rootCmd.PersistentFlags().
		StringP("token", "t", "", "Directus admin token")
	_ = viper.BindPFlag(tokenKey, rootCmd.PersistentFlags().Lookup("token"))

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

	// --- [snapshot] flags ---

	snapshotCmd.PersistentFlags().StringP("file", "f", "", "output file")
	_ = viper.BindPFlag(snapOutFile, snapshotCmd.PersistentFlags().Lookup("file"))

	snapshotCmd.PersistentFlags().Bool("pretty", false, "pretty-print the output")
	_ = viper.BindPFlag(snapPretty, snapshotCmd.PersistentFlags().Lookup("pretty"))

	// --- [root] commands ---
	rootCmd.AddCommand(
		generateCmd,
		snapshotCmd,
	)
}

var rootCmd = &cobra.Command{
	Use: "dst",
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

var snapshotCmd = &cobra.Command{
	Use:   "snapshot",
	Short: "Prints or saves a JSON representation of the Directus schema",
	Long: `
Prints or saves a JSON representation of the Directus schema including all
collections, fields, and relations.

The result is similar to the "/schema/snapshot" endpoint in the Directus API,
including also the system collections and fields, but is not a drop-in
replacement for it and should be not used to generate schema diffs or apply
schema changes.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		w := cmd.OutOrStdout()
		if viper.IsSet(snapOutFile) {
			f, err := os.Create(viper.GetString(snapOutFile))
			if err != nil {
				return fmt.Errorf("create file: %w", err)
			}
			defer f.Close()
			w = f
		}
		client := newClient()
		snap := client.Snapshot
		if viper.GetBool(snapPretty) {
			snap = client.SnapshotPretty
		}
		return snap(w)
	},
}

// newClient creates a client using the configuration from the environment
// variables and command-line flags.
func newClient() *dst.Client {
	return dst.NewClient(dst.ClientOptions{
		BaseURL: viper.GetString(baseUrlKey),
		Token:   viper.GetString(tokenKey),
	})
}

// getGenSchema returns the schema for the generate command from the Directus
// instance or from a snapshot file if the flag is set.
func getGenSchema() (*schema.Schema, error) {
	if viper.IsSet(genFromSnap) {
		return dst.SchemaFromSnapshot(viper.GetString(genFromSnap))
	}
	client := newClient()
	return client.GetSchema()
}
