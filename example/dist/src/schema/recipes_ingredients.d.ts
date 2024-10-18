import { Ingredients, IngredientsPrimaryKey } from './ingredients.js';
import { Recipes, RecipesPrimaryKey } from './recipes.js';
export type RecipesIngredientsPrimaryKey = number;
export type RecipesIngredientsPrimaryKeyField = 'id';
export interface RecipesIngredients {
    /**
     * Type: integer
     */
    id?: RecipesIngredientsPrimaryKey;
    /**
     * Type: integer
     */
    ingredients_id?: number | null;
    /**
     * Type: integer
     */
    recipes_id?: number | null;
}
export interface RecipesIngredientsRelations {
    ingredients_id?: IngredientsPrimaryKey | Ingredients;
    recipes_id?: RecipesPrimaryKey | Recipes;
}
export interface RecipesIngredientsRelatedCollections {
    ingredients_id: 'ingredients';
    recipes_id: 'recipes';
}
