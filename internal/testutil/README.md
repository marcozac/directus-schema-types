# testdata

## [directus-schema-snapshot.json](./directus-schema-snapshot.json)

This file is a snapshot of a test `Directus` schema, obtained from `/schema/snapshot` endpoint.
It's used to apply a default schema in tests.

This is **NOT** the result of calling `snapshot` command in the CLI.

The file includes the following environment variables, which are expanded at runtime:

-   `DIRECTUS_VERSION`: The version of the testing `Directus` instance.
-   `DIRECTUS_DB_VENDOR`: The database vendor of the testing `Directus` instance.

## [directus-empty-schema-snapshot.json](./directus-empty-schema-snapshot.json)

As the file described above, but with an empty schema.
It's used to reset the schema in tests and includes the same environment variables.

## [client-schema-snapshot.json](./client-schema-snapshot.json)

This file is a snapshot obtained running `dst snapshot` command in the CLI.

## Updates

In case you need to update the snapshots, you can make the changes in `Directus`,
and then run the following command in this directory:

```sh
go run ./cmd/update_snapshots/main.go
```
