// File generated by directus-schema-types. Do not change.

import { ChefsPrimaryKey, Chefs } from './chefs';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
import { RecipesIngredientsPrimaryKey, RecipesIngredients } from './recipes_ingredients';

// --- recipes ---

export type RecipesPrimaryKeyField = 'id';
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

export type RecipesPayload = Omit<Recipes, 'date_updated' | 'date_created'> & {
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
    const r: Record<string, unknown> = v;
    if (v.date_created) {
        r.date_created = new Date(v.date_created);
    }
    if (v.date_updated) {
        r.date_updated = new Date(v.date_updated);
    }
    return r as Recipes;
}
