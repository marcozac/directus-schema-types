import { IngredientsPrimaryKey, Ingredients } from './ingredients';
import { RecipesPrimaryKey, Recipes } from './recipes';
export type RecipesIngredientsPrimaryKeyField = 'id';
export type RecipesIngredientsPrimaryKey = number;
export interface RecipesIngredients {
    id?: number;
    ingredients_id?: number | null;
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
export type RecipesIngredientsPayload = RecipesIngredients;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseRecipesIngredientsPayload(v: RecipesIngredientsPayload): RecipesIngredients;
