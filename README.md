# directus-schema-types (dst)

[![Go Reference](https://pkg.go.dev/badge/github.com/marcozac/directus-schema-types.svg)](https://pkg.go.dev/github.com/marcozac/directus-schema-types)
![CI](https://github.com/marcozac/directus-schema-types/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/marcozac/directus-schema-types/graph/badge.svg?token=U6nDIqhX58)](https://codecov.io/gh/marcozac/directus-schema-types)
[![Go Report Card](https://goreportcard.com/badge/github.com/marcozac/directus-schema-types?style=flat-square)](https://goreportcard.com/report/github.com/marcozac/directus-schema-types)

Generate **TypeScript** definitions for your [Directus](https://directus.io)
schema using a fast and powerful CLI tool, with support for
[**type overriding**](#types-overriding) to customize and enhance your schema
types.

## Table of Contents

-   [Quickstart](#quickstart)
-   [Introduction](#introduction)
-   [Usage](#usage)
-   [Types Overriding](#types-overriding)
-   [Examples](#examples)
-   [Why Go?](#why-go)
-   [Contributing](#contributing)
-   [License](#license)

## Quickstart

Install the CLI and generate your schema types with just a few commands.

1. **Install the CLI** You can download the latest release from the the
   [**Releases**](https://github.com/marcozac/directus-schema-types/releases)
   page or:

    ```sh
    # NPM
    # --- Available soon ---

    # Go
    go install github.com/marcozac/directus-schema-types/cmd/dst@latest
    ```

2. **Generate the schema types**

    ```sh
    // Generate a single file with all the schema definitions
    dst generate --file src/schema.ts

    // Generate a directory with a file per collection
    dst generate --dir src/schema
    ```

For more advanced usage and customization, refer to the sections below.

## Introduction

`directus-schema-types` (dst) is a Go-based CLI tool that generates TypeScript
type definitions for your Directus collections and fields. It simplifies
type-safe development by providing fully typed definitions for all Directus
schema entities.

## Usage

The CLI provides simple commands to generate your type definitions.

For the full list of options, use the `--help` flag or refer to the full
[documentation](./doc/dst/dst.md).

To configure the target Directus server, you can use a `.env` file and/or:

| Flag      | Environment Variable | Description                       |
| --------- | -------------------- | --------------------------------- |
| `--url`   | `DIRECTUS_URL`       | The URL of the Directus instance. |
| `--token` | `DIRECTUS_TOKEN`     | The Directus API token.           |

### Single File Generation

To generate a single file with all schema definitions, use the following
command:

```sh
dst generate --file src/schema.ts
```

### Directory Generation

To generate a directory with a file per collection, use the following command:

```sh
dst generate --dir src/schema
```

The directory will also contain

-   A `schema.ts` file that groups all the collections.
-   A `relations.ts` file that groups all the relations and related collections.
-   A `index.ts` file that exports everything.

### Go API

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
g := dst.NewGenerator()
err = g.GenerateSchema(schema,
	dst.WithOutDir("src/schema"),
    dst.WithClean(true),
    dst.WithFormatOutput(true),
    // other options...
)
if err != nil {
    // ...
}
```

## Types Overriding

An important feature of the tool is the ability to override the field types in
the schema for a more accurate representation in TypeScript or to handle
specific cases.

For example, Directus allows to define a field as a `Dropdown`, with a list of
allowed values, but these are not enforced as `enums`.

Setting an `enum` override for the field, the generated TypeScript file will
contain an enum type in place of the original field one in the schema.

The allowed overrides are:

-   `assertable`: a specific type, assertable to the original one.
-   `enum`: the field is an enum type, with the given definition.
-   `external`: a custom type, defined externally to the schema.

You define the `overrides` in a JSON object that maps the collections to fields
with their respective definitions: an object with the `kind` and `def`.

| kind       | def type | description                              |
| ---------- | -------- | ---------------------------------------- |
| enum       | object   | A object with the enum name/value fields |
| assertable | string   | The assertable type definition           |
| external   | string   | The external type name                   |

For the `external` kind, the following properties are also required:

-   `importPath`: the path to the external type definition.
-   `parserFrom`: a method of the external type that returns the original type
    for Directus API payloads.
-   `parserTo`: a function or constructor with one argument, accepting the
    original type and returning the external one.

They can be set using:

-   the `--overrides` flag with the string representation of
    the JSON object
-   or `--overrides-file` with the path to a JSON file.

For example, overriding the `status`, `label_color` and `external_inventory_id`
fields in the `ingredients` with:

```json
{
    "ingredients": {
        "status": {
            "kind": "enum",
            "def": {
                "Available": "available",
                "NotAvailable": "not_available",
                "Restock": "restock"
            }
        },
        "label_color": {
            "kind": "assertable",
            "def": "'blue' | 'red'"
        },
        "external_inventory_id": {
            "kind": "external",
            "def": "InventoryItem",
            "importPath": "../external",
            "parserFrom": "externalId",
            "parserTo": "new InventoryItem"
        }
    }
}
```

The resulting TypeScript file will contain:

```ts
import { InventoryItem } from "../external";

export enum IngredientsStatusEnum {
    Available = "available",
    NotAvailable = "not_available",
    Restock = "restock",
}

export type IngredientsLabelColorType = "blue" | "red";

export interface Ingredients {
    // other fields ...

    external_inventory_id?: InventoryItem | null;

    label_color?: IngredientsLabelColorType | null;

    status?: IngredientsStatusEnum | null;
}

export function parseIngredientsPayload(v: IngredientsPayload): Ingredients {
    const r = v as Record<keyof Ingredients, unknown>;

    // ...

    if (v.external_inventory_id) {
        r.external_inventory_id = new InventoryItem(v.external_inventory_id);
    }
    if (v.label_color) {
        r.label_color = v.label_color as IngredientsLabelColorType;
    }
    if (v.status) {
        r.status = v.status as IngredientsStatusEnum;
    }
    return r as Ingredients;
}

export function parseIngredients(v: Ingredients): IngredientsPayload {
    const r = v as Record<keyof IngredientsPayload, unknown>;

    // ...

    if (v.external_inventory_id) {
        r.external_inventory_id = v.external_inventory_id.externalId();
    }
    if (v.label_color) {
        r.label_color = v.label_color as string;
    }
    if (v.status) {
        r.status = v.status as string;
    }
    return r as IngredientsPayload;
}
```

You can see the full example of these overrides in the `ingredients` collection
[example](./example/src/schema/ingredients.ts).

## Examples

Refer to the [example](./example) directory for a complete example of how to use
this tool.

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

Directus is written in Typescript, why use Go to generate the types?

The answer is very simple: the
[templating engine](https://pkg.go.dev/text/template).

Using to the Go templating engine, it is possible to generate complex and
customizable type definitions with ease, in a very fast and efficient way.

The templates are also easy to read, understand and modify, making them a secure
choice in case of future breaking changes in the Directus API.

## Contributing

Contributions are welcome!

Please open an issue or submit a pull request for any features, bugs, or
improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE)
file for more details.
