package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

const (
	// --- [snapshot] config keys ---

	snapOutFile = "snap_out_file"
	snapPretty  = "snap_pretty"
)

func init() {
	// --- [snapshot] flags ---

	snapshotCmd.PersistentFlags().StringP("file", "f", "", "output file")
	_ = viper.BindPFlag(snapOutFile, snapshotCmd.PersistentFlags().Lookup("file"))

	snapshotCmd.PersistentFlags().Bool("pretty", false, "pretty-print the output")
	_ = viper.BindPFlag(snapPretty, snapshotCmd.PersistentFlags().Lookup("pretty"))
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
