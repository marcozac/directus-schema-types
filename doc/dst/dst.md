## dst

Generate TypeScript definitions for Directus schema

### Synopsis

dst generates TypeScript definitions for the Directus schema including all collections,
fields, and relations or saves a snapshot of the schema to a file. See the subcommands
documentation for more details.

To use the Directus API, the base URL and an admin token are required. They can be
provided as flags or environment variables:
  - DIRECTUS_BASE_URL
  - DIRECTUS_TOKEN
The environment variables can be set in a .env file in the current directory,
but the flags take precedence over them.


### Options

```
  -h, --help           help for dst
  -t, --token string   directus admin token
  -u, --url string     directus base URL (default "http://localhost:8055")
```

### SEE ALSO

* [dst generate](dst_generate.md)	 - Generates Typescript types from the Directus schema
* [dst snapshot](dst_snapshot.md)	 - Prints or saves a JSON representation of the Directus schema

