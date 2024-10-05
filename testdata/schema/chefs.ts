// File generated by directus-schema-types. Do not change.

import { RecipesPrimaryKey, Recipes } from './recipes';

// --- chefs ---

export type ChefsPrimaryKeyField = 'id';
export type ChefsPrimaryKey = number;

export interface Chefs {
    // Type: integer
    readonly id?: number;

    // Type: integer
    signature_dish?: number | null;
}

export interface ChefsRelations {
    signature_dish: RecipesPrimaryKey | Recipes;
}

// The payload is the same as the schema definition.
export type ChefsPayload = Chefs;

/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export function parseChefsPayload(v: ChefsPayload): Chefs {
    return v;
}
