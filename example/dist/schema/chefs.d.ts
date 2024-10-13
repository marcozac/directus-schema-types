import { Recipes, RecipesPrimaryKey } from './recipes';
export type ChefsPrimaryKey = number;
export type ChefsPrimaryKeyField = 'id';
export interface Chefs {
    /**
     * Type: integer
     */
    readonly id?: ChefsPrimaryKey;
    /**
     * Type: integer
     */
    signature_dish?: number | null;
}
export interface ChefsRelations {
    signature_dish?: RecipesPrimaryKey | Recipes;
}
export interface ChefsRelatedCollections {
    signature_dish: 'recipes';
}
