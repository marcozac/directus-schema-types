## dst snapshot

Prints or saves a JSON representation of the Directus schema

### Synopsis


Prints or saves a JSON representation of the Directus schema including all
collections, fields, and relations.

The result is similar to the "/schema/snapshot" endpoint in the Directus API,
including also the system collections and fields, but is not a drop-in
replacement for it and should be not used to generate schema diffs or apply
schema changes.

```
dst snapshot [flags]
```

### Options

```
  -f, --file string   the file path where to save the snapshot
  -h, --help          help for snapshot
      --pretty        enable pretty printing of the snapshot
```

### Options inherited from parent commands

```
  -t, --token string   directus admin token
  -u, --url string     directus base URL (default "http://localhost:8055")
```

### SEE ALSO

* [dst](dst.md)	 - Generate TypeScript definitions for Directus schema

