# directus-schema-types (dst)

[![Go Reference](https://pkg.go.dev/badge/github.com/marcozac/directus-schema-types.svg)](https://pkg.go.dev/github.com/marcozac/directus-schema-types)
![CI](https://github.com/marcozac/directus-schema-types/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/marcozac/directus-schema-types/graph/badge.svg?token=U6nDIqhX58)](https://codecov.io/gh/marcozac/directus-schema-types)
[![Go Report Card](https://goreportcard.com/badge/github.com/marcozac/directus-schema-types?style=flat-square)](https://goreportcard.com/report/github.com/marcozac/directus-schema-types)

Generate TypeScript definitions for your [Directus](https://directus.io) schema
using a powerful CLI tool.

## Table of Contents

-   [Introduction](#introduction)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Examples](#examples)
-   [Why Go?](#why-go)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

`directus-schema-types` (dst) is a tool that helps you generate TypeScript type
definitions for your Directus collections, and fields.

It uses a CLI written in Go to ensure quick and flexible generation of type
definitions.

## Installation

The CLI can be installed from the [Releases](https://github.com/marcozac/directus-schema-types/releases) page.

> A `NPM` package will be available soon.

Otherwise, you can install it using Go:

```sh
go install github.com/marcozac/directus-schema-types/cmd/dst@latest
```

## Usage

The CLI provides simple commands to generate your type definitions.

To configure the target Directus instance, you can use a `.env` file and/or:

| Flag      | Environment Variable | Description                       |
| --------- | -------------------- | --------------------------------- |
| `--url`   | `DIRECTUS_URL`       | The URL of the Directus instance. |
| `--token` | `DIRECTUS_TOKEN`     | The Directus API token.           |

### Single File Generation

To generate a single file with all schema definitions, use the following command:

```sh
dst generate --file src/schema.ts
```

### Directory Generation

To generate a directory with a file per collection, use the following command:

```sh
dst generate --dir src/schema
```

The directory will contain also a `schema.ts` file that groups all the
collections, a `relations.ts` file that groups all the relations, and a
`index.ts` file that exports everything.

### Using the Go Package

You can also use the Go package directly in your application:

```go
import dst "github.com/marcozac/directus-schema-types"

// create the client
client := dst.NewClient(dst.ClientOptions{
	BaseURL: "http://localhost:8055",
	Token:   "my-token",
})

// get the schema
schema, err := client.GetSchema()
if err != nil {
	// ...
}

// create the generator and generate the types
g := dst.NewGenerator(schema,
	// add options ...
	dst.WithOutDir("src/schema"),
	dst.WithClean(true),
	dst.WithFormatOutput(true),
)
if err := g.Generate(); err != nil {
	// ...
}
```

## Examples

Refer to the [example](./example) directory for a complete example of how to
use this tool.

```ts
// dst generate --file src/schema.ts

// ... other collections ...

// --- recipes ---

export type RecipesPrimaryKeyField = "id";
export type RecipesPrimaryKey = number;

export interface Recipes {
    // Type: timestamp
    readonly date_created?: Date | null;

    // Type: timestamp
    readonly date_updated?: Date | null;

    // Type: integer
    readonly id?: number;

    // Type: string
    readonly user_created?: string | null;

    // Type: string
    readonly user_updated?: string | null;
}

export interface RecipesRelations {
    /**
     * NOTE
     * The related field of {@link Chefs} is marked as unique.
     * The resulting array will contain only one element.
     */
    chefs_signature_dish: (ChefsPrimaryKey | Chefs)[];

    ingredients: (RecipesIngredientsPrimaryKey | RecipesIngredients)[];

    user_created: DirectusUsersPrimaryKey | DirectusUsers;

    user_updated: DirectusUsersPrimaryKey | DirectusUsers;
}

/**
 * RecipesRelatedCollections maps the {@link RecipesRelations}
 * fields to the name of the related collection.
 */
export interface RecipesRelatedCollections {
    chefs_signature_dish: "chefs";
    ingredients: "recipes_ingredients";
    user_created: "directus_users";
    user_updated: "directus_users";
}

export type RecipesPayload = Omit<Recipes, "date_created" | "date_updated"> & {
    // Type: timestamp
    readonly date_created?: string | null;

    // Type: timestamp
    readonly date_updated?: string | null;
};

/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Recipes}.
 */
export function parseRecipesPayload(v: RecipesPayload): Recipes {
    const r = v as Record<keyof Recipes, unknown>;
    if (v.date_created) {
        r.date_created = new Date(v.date_created);
    }
    if (v.date_updated) {
        r.date_updated = new Date(v.date_updated);
    }
    return r as Recipes;
}

// ... other collections ...

// --- Schema ---

export interface Schema {
    chefs: Chefs;
    directus_users: DirectusUsers;
    ingredients: Ingredients;
    recipes: Recipes;
    recipes_ingredients: RecipesIngredients;

    // ...
}

// --- Relations ---

export interface Relations {
    chefs: ChefsRelations;
    directus_users: DirectusUsersRelations;
    ingredients: IngredientsRelations;
    recipes: RecipesRelations;
    recipes_ingredients: RecipesIngredientsRelations;

    // ...
}

// --- Related Collections ---

export interface RelatedCollections {
    chefs: ChefsRelatedCollections;
    directus_users: DirectusUsersRelatedCollections;
    ingredients: IngredientsRelatedCollections;
    recipes: RecipesRelatedCollections;
    recipes_ingredients: RecipesIngredientsRelatedCollections;

    // ...
}
```

## Why Go?

Since Directus is written in Typescript, why use Go to generate the types?

The answer is very simple: the templating engine.

Using to the Go templating engine, it is possible to generate complex and
customizable type definitions with ease, in a very fast and efficient way.

The templates are also easy to read, understand and modify, making them a secure
choice in case of future breaking changes in the Directus API.

## Contributing

Contributions are welcome!

Please open an issue or submit a pull request for any features, bugs, or improvements.

## License

This project is licensed under the MIT License.
See the [LICENSE](./LICENSE) file for more details.
