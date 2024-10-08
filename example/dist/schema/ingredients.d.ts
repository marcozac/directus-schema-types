import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
import { RecipesIngredientsPrimaryKey, RecipesIngredients } from './recipes_ingredients';
export type IngredientsPrimaryKeyField = 'id';
export type IngredientsPrimaryKey = number;
export interface Ingredients {
    readonly date_created?: Date | null;
    readonly date_updated?: Date | null;
    description_long: string | null;
    description_short: string | null;
    readonly id?: number;
    name?: string | null;
    readonly user_created?: string | null;
    readonly user_updated?: string | null;
}
export interface IngredientsRelations {
    recipes: (RecipesIngredientsPrimaryKey | RecipesIngredients)[];
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated: DirectusUsersPrimaryKey | DirectusUsers;
}
/**
 * IngredientsRelatedCollections maps the {@link IngredientsRelations}
 * fields to the name of the related collection.
 */
export interface IngredientsRelatedCollections {
    recipes: 'recipes_ingredients';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export type IngredientsPayload = Omit<Ingredients, 'date_created' | 'date_updated'> & {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Ingredients}.
 */
export declare function parseIngredientsPayload(v: IngredientsPayload): Ingredients;
