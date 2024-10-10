import { RecipesPrimaryKey, Recipes } from './recipes';
export type ChefsPrimaryKeyField = 'id';
export type ChefsPrimaryKey = number;
export interface Chefs {
    readonly id?: number;
    signature_dish?: number | null;
}
export interface ChefsRelations {
    signature_dish: RecipesPrimaryKey | Recipes;
}
/**
 * ChefsRelatedCollections maps the {@link ChefsRelations}
 * fields to the name of the related collection.
 */
export interface ChefsRelatedCollections {
    signature_dish: 'recipes';
}
export type ChefsPayload = Chefs;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseChefsPayload(v: ChefsPayload): Chefs;
