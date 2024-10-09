export type DirectusRelationsPrimaryKeyField = 'id';
export type DirectusRelationsPrimaryKey = number;
export interface DirectusRelations {
    id?: number;
    junction_field?: string | null;
    many_collection?: string;
    many_field?: string;
    one_allowed_collections?: any | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action?: string;
    one_field?: string | null;
    sort_field?: string | null;
}
export interface DirectusRelationsRelations {
}
export type DirectusRelationsPayload = DirectusRelations;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusRelationsPayload(v: DirectusRelationsPayload): DirectusRelations;
