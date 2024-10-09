package main

import (
	"github.com/joho/godotenv"
	dst "github.com/marcozac/directus-schema-types"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

const (
	// --- [root] config keys ---

	baseUrlKey = "base_url"
	tokenKey   = "token"
)

func NewRootCmd() *cobra.Command {
	_ = godotenv.Load() // try to load .env file

	viper := viper.New()
	viper.SetEnvPrefix("directus")
	viper.MustBindEnv("base_url")
	viper.MustBindEnv("token")

	cmd := &cobra.Command{
		Use: "dst",
	}

	// --- [root] flags ---

	cmd.PersistentFlags().
		StringP("url", "u", "http://localhost:8055", "Directus base URL")
	_ = viper.BindPFlag(baseUrlKey, cmd.PersistentFlags().Lookup("url"))

	cmd.PersistentFlags().
		StringP("token", "t", "", "Directus admin token")
	_ = viper.BindPFlag(tokenKey, cmd.PersistentFlags().Lookup("token"))

	// --- [root] commands ---
	cmd.AddCommand(
		NewGenerateCmd(viper),
		NewSnapshotCmd(viper),
	)
	return cmd
}

// newClient creates a client using the configuration from the environment
// variables and command-line flags.
func newClient(viper *viper.Viper) *dst.Client {
	return dst.NewClient(dst.ClientOptions{
		BaseURL: viper.GetString(baseUrlKey),
		Token:   viper.GetString(tokenKey),
	})
}
