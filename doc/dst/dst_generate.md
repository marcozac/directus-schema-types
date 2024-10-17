## dst generate

Generates Typescript types from the Directus schema

### Synopsis

Generates Typescript types from the Directus schema including all collections,
fields, and relations.

By default, reads the schema from the Directus instance, using the provided
base URL and admin token. If the --from-snapshot flag is set, reads the schema
from a snapshot file instead, without connecting the Directus server.

By default, the output is formatted using prettier and printed to the standard
output. Setting the --file or --dir flags, the output can be saved to a file or
multiple files in a directory.

The output can be saved to a file or directory, or printed to the standard
output.

```
dst generate [flags]
```

### Options

```
      --clean                   clean the output file or directory before generating
  -d, --dir string              directory path where to generate the files
  -f, --file string             file path where to save the generated types
      --format                  enable output formatting with prettier (default true)
      --from-snapshot string    path to a snapshot file to read the schema from
  -h, --help                    help for generate
      --overrides string        a string containing a JSON object with the type overrides
      --overrides-file string   a file containing a JSON object with the type overrides
```

### Options inherited from parent commands

```
  -t, --token string   directus admin token
  -u, --url string     directus base URL (default "http://localhost:8055")
```

### SEE ALSO

* [dst](dst.md)	 - Generate TypeScript definitions for Directus schema

