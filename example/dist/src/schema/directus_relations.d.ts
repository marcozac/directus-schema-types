export type DirectusRelationsPrimaryKey = number;
export type DirectusRelationsPrimaryKeyField = 'id';
export interface DirectusRelations {
    /**
     * Type: integer
     */
    id?: DirectusRelationsPrimaryKey;
    /**
     * Type: string
     */
    junction_field?: string | null;
    /**
     * Type: string
     */
    many_collection?: string;
    /**
     * Type: string
     */
    many_field?: string;
    /**
     * Type: csv
     */
    one_allowed_collections?: any | null;
    /**
     * Type: string
     */
    one_collection?: string | null;
    /**
     * Type: string
     */
    one_collection_field?: string | null;
    /**
     * Type: string
     */
    one_deselect_action?: string;
    /**
     * Type: string
     */
    one_field?: string | null;
    /**
     * Type: string
     */
    sort_field?: string | null;
}
export interface DirectusRelationsRelations {
}
export interface DirectusRelationsRelatedCollections {
}
