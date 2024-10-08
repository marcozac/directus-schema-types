// File generated by directus-schema-types. Do not change.

import { IngredientsPrimaryKey, Ingredients } from './ingredients';
import { RecipesPrimaryKey, Recipes } from './recipes';

// --- recipes_ingredients ---

export type RecipesIngredientsPrimaryKeyField = 'id';
export type RecipesIngredientsPrimaryKey = number;

export interface RecipesIngredients {
    // Type: integer
    id?: number;

    // Type: integer
    ingredients_id?: number | null;

    // Type: integer
    recipes_id?: number | null;
}

export interface RecipesIngredientsRelations {
    ingredients_id: IngredientsPrimaryKey | Ingredients;

    recipes_id: RecipesPrimaryKey | Recipes;
}

/**
 * RecipesIngredientsRelatedCollections maps the {@link RecipesIngredientsRelations}
 * fields to the name of the related collection.
 */
export interface RecipesIngredientsRelatedCollections {
    ingredients_id: 'ingredients';
    recipes_id: 'recipes';
}

// The payload is the same as the schema definition.
export type RecipesIngredientsPayload = RecipesIngredients;

/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export function parseRecipesIngredientsPayload(v: RecipesIngredientsPayload): RecipesIngredients {
    return v;
}
