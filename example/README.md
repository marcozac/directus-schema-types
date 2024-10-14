# example

This is an example project, created by running [`go generate`](./generate.go).

The generated schema files are:

## [`src/schema.ts`](./src/schema.ts)

This is a single-file output with all the schema definitions.

Using the CLI, you can generate the schema file with:

```sh
dst generate --file src/schema.ts
```

Or with the Go package:

```go
import dst "github.com/marcozac/directus-schema-types"

// create the client
client := dst.NewClient(dst.ClientOptions{
    BaseURL: r.dt.BaseURL(),
    Token:   directest.DefaultUserToken,
})

// get the schema
schema, err := client.GetSchema()
if err != nil {
    return fmt.Errorf("client.GetSchema: %w", err)
}

g := dst.NewGenerator()
err = g.GenerateSchema(schema, dst.WithOutFile("src/schema.ts"))
if err != nil {
    // ...
}
```

## [`src/schema/`](./src/schema)

This directory contains one file per collection, with the schema definition for each one.

Using the CLI, you can generate the schema files with:

```sh
dst generate --dir src/schema
```

Or with the Go package:

```go
g := dst.NewGenerator()
err = g.GenerateSchema(schema, dst.WithOutDir("src/schema"))
if err != nil {
    // ...
}
```
