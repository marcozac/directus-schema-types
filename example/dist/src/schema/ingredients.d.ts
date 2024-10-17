import { InventoryItem } from '../external';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
import { RecipesIngredients, RecipesIngredientsPrimaryKey } from './recipes_ingredients';
export type IngredientsPrimaryKey = number;
export type IngredientsPrimaryKeyField = 'id';
export type IngredientsLabelColorType = 'blue' | 'red';
export declare enum IngredientsShelfPositionEnum {
    Shelf1 = 1,
    Shelf2 = 2,
    Shelf3 = 3
}
export declare enum IngredientsStatusEnum {
    Available = "available",
    NotAvailable = "not_available",
    Restock = "restock"
}
export interface Ingredients {
    /**
     * Type: timestamp
     */
    readonly date_created?: Date | null;
    /**
     * Type: timestamp
     */
    readonly date_updated?: Date | null;
    /**
     * Type: string
     */
    description_long: string;
    /**
     * Type: string
     */
    description_short: string | null;
    /**
     * Type: string
     */
    external_inventory_id?: InventoryItem | null;
    /**
     * Type: integer
     */
    readonly id?: IngredientsPrimaryKey;
    /**
     * Type: string
     */
    label_color?: IngredientsLabelColorType | null;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * This is the (numbered) shelf position
     * Type: integer
     */
    shelf_position?: IngredientsShelfPositionEnum | null;
    /**
     * This is the current availability of the ingredient
     * Type: string
     */
    status?: IngredientsStatusEnum | null;
    /**
     * Type: string
     */
    readonly user_created?: string | null;
    /**
     * Type: string
     */
    readonly user_updated?: string | null;
}
export interface IngredientsRelations {
    recipes?: RecipesIngredientsPrimaryKey[] | RecipesIngredients[];
    readonly user_created?: DirectusUsersPrimaryKey | DirectusUsers;
    readonly user_updated?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface IngredientsRelatedCollections {
    recipes: 'recipes_ingredients';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export interface IngredientsPayload extends Omit<Ingredients, 'date_created' | 'date_updated' | 'external_inventory_id' | 'label_color' | 'shelf_position' | 'status'> {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
    external_inventory_id?: string | null;
    label_color?: string | null;
    shelf_position?: number | null;
    status?: string | null;
}
/**
 * parseIngredientsPayload parses the given {@link IngredientsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Ingredients}.
 */
export declare function parseIngredientsPayload(v: IngredientsPayload): Ingredients;
/**
 * parseIngredients parses the given {@link Ingredients}.
 * @param v The object to parse.
 * @returns The payload {@link IngredientsPayload}.
 */
export declare function parseIngredients(v: Ingredients): IngredientsPayload;
