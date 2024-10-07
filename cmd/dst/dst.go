package main

import (
	"github.com/joho/godotenv"
	dst "github.com/marcozac/directus-schema-types"
	"github.com/spf13/cobra"
	viper_pkg "github.com/spf13/viper"
)

// viper is a global instance of the Viper configuration manager.
var viper = viper_pkg.New()

const (
	// --- [root] config keys ---

	baseUrlKey = "base_url"
	tokenKey   = "token"
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

	// --- [root] commands ---
	rootCmd.AddCommand(
		generateCmd,
		snapshotCmd,
	)
}

var rootCmd = &cobra.Command{
	Use: "dst",
}

// newClient creates a client using the configuration from the environment
// variables and command-line flags.
func newClient() *dst.Client {
	return dst.NewClient(dst.ClientOptions{
		BaseURL: viper.GetString(baseUrlKey),
		Token:   viper.GetString(tokenKey),
	})
}
