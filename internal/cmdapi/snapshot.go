package cmdapi

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func NewSnapshotCmd(viper *viper.Viper) *cobra.Command {
	const (
		file   = "snap_out_file"
		pretty = "snap_pretty"
	)

	cmd := &cobra.Command{
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
			if viper.IsSet(file) {
				f, err := os.Create(viper.GetString(file))
				if err != nil {
					return fmt.Errorf("create file: %w", err)
				}
				defer f.Close()
				w = f
			}
			client := getClient(viper)
			snap := client.Snapshot
			if viper.GetBool(pretty) {
				snap = client.SnapshotPretty
			}
			return snap(w)
		},
	}

	// --- [snapshot] flags ---

	cmd.PersistentFlags().StringP("file", "f", "", "the file path where to save the snapshot")
	_ = viper.BindPFlag(file, cmd.PersistentFlags().Lookup("file"))

	cmd.PersistentFlags().Bool("pretty", false, "enable pretty printing of the snapshot")
	_ = viper.BindPFlag(pretty, cmd.PersistentFlags().Lookup("pretty"))

	return cmd
}
