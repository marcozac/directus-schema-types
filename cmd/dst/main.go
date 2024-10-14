package main

import "github.com/marcozac/directus-schema-types/internal/cmdapi"

func main() {
	_ = cmdapi.NewDstCmd().Execute()
}
