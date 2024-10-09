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
export type RecipesIngredientsPayload = RecipesIngredients;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseRecipesIngredientsPayload(v: RecipesIngredientsPayload): RecipesIngredients;
