import { Chefs, ChefsPrimaryKey } from './chefs';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
import { RecipesIngredients, RecipesIngredientsPrimaryKey } from './recipes_ingredients';
export type RecipesPrimaryKey = number;
export type RecipesPrimaryKeyField = 'id';
export interface Recipes {
    /**
     * Type: timestamp
     */
    readonly date_created?: Date | null;
    /**
     * Type: timestamp
     */
    readonly date_updated?: Date | null;
    /**
     * Type: integer
     */
    readonly id?: RecipesPrimaryKey;
    /**
     * Type: string
     */
    readonly user_created?: string | null;
    /**
     * Type: string
     */
    readonly user_updated?: string | null;
}
export interface RecipesRelations {
    /**
     * NOTE
     * The related field of {@link Chefs} is marked as unique.
     * The resulting array will contain only one element.
     */
    chefs_signature_dish?: (ChefsPrimaryKey | Chefs)[];
    ingredients: (RecipesIngredientsPrimaryKey | RecipesIngredients)[];
    readonly user_created?: DirectusUsersPrimaryKey | DirectusUsers;
    readonly user_updated?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface RecipesRelatedCollections {
    chefs_signature_dish: 'chefs';
    ingredients: 'recipes_ingredients';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export interface RecipesPayload extends Omit<Recipes, 'date_created' | 'date_updated'> {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
}
/**
 * parseRecipesPayload parses the given {@link RecipesPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Recipes}.
 */
export declare function parseRecipesPayload(v: RecipesPayload): Recipes;
/**
 * parseRecipes parses the given {@link Recipes}.
 * @param v The object to parse.
 * @returns The payload {@link RecipesPayload}.
 */
export declare function parseRecipes(v: Recipes): RecipesPayload;
