import { ChefsPrimaryKey, Chefs } from './chefs';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
import { RecipesIngredientsPrimaryKey, RecipesIngredients } from './recipes_ingredients';
export type RecipesPrimaryKeyField = 'id';
export type RecipesPrimaryKey = number;
export interface Recipes {
    readonly date_created?: Date | null;
    readonly date_updated?: Date | null;
    readonly id?: number;
    readonly user_created?: string | null;
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
    chefs_signature_dish: 'chefs';
    ingredients: 'recipes_ingredients';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export type RecipesPayload = Omit<Recipes, 'date_created' | 'date_updated'> & {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Recipes}.
 */
export declare function parseRecipesPayload(v: RecipesPayload): Recipes;
