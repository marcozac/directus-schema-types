package cmdapi

import (
	"github.com/joho/godotenv"
	dst "github.com/marcozac/directus-schema-types"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func NewDstCmd() *cobra.Command {
	const (
		baseUrlKey = "base_url"
		tokenKey   = "token"
	)

	_ = godotenv.Load() // try to load .env file

	viper := viper.New()
	viper.SetEnvPrefix("directus")
	viper.MustBindEnv("base_url")
	viper.MustBindEnv("token")

	cmd := &cobra.Command{
		Use: "dst",
	}

	// --- [dst] flags ---

	cmd.PersistentFlags().
		StringP("url", "u", "http://localhost:8055", "Directus base URL")
	_ = viper.BindPFlag(baseUrlKey, cmd.PersistentFlags().Lookup("url"))

	cmd.PersistentFlags().
		StringP("token", "t", "", "Directus admin token")
	_ = viper.BindPFlag(tokenKey, cmd.PersistentFlags().Lookup("token"))

	// create and set client to share between commands
	viper.Set("dst_client", dst.NewClient(dst.ClientOptions{
		BaseURL: viper.GetString(baseUrlKey),
		Token:   viper.GetString(tokenKey),
	}))

	// --- [dst] commands ---
	cmd.AddCommand(
		NewGenerateCmd(viper),
		NewSnapshotCmd(viper),
	)
	return cmd
}

// getClient returns the client from the viper instance.
func getClient(viper *viper.Viper) *dst.Client {
	return viper.Get("dst_client").(*dst.Client)
}
