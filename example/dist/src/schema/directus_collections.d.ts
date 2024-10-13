export type DirectusCollectionsPrimaryKey = string;
export type DirectusCollectionsPrimaryKeyField = 'collection';
export interface DirectusCollections {
    /**
     * Type: string
     */
    accountability?: string | null;
    /**
     * Type: boolean
     */
    archive_app_filter?: boolean;
    /**
     * Type: string
     */
    archive_field?: string | null;
    /**
     * Type: string
     */
    archive_value?: string | null;
    /**
     * Type: string
     */
    collapse?: string;
    /**
     * Type: string
     */
    readonly collection?: DirectusCollectionsPrimaryKey;
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: string
     */
    display_template?: string | null;
    /**
     * Type: string
     */
    group?: string | null;
    /**
     * Type: boolean
     */
    hidden?: boolean;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: json
     */
    item_duplication_fields?: object | null;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: string
     */
    preview_url?: string | null;
    /**
     * Type: boolean
     */
    singleton?: boolean;
    /**
     * Type: integer
     */
    sort?: number | null;
    /**
     * Type: string
     */
    sort_field?: string | null;
    /**
     * Type: json
     */
    translations?: object | null;
    /**
     * Type: string
     */
    unarchive_value?: string | null;
    /**
     * Type: boolean
     */
    versioning?: boolean;
}
export interface DirectusCollectionsRelations {
    group?: DirectusCollectionsPrimaryKey | DirectusCollections;
}
export interface DirectusCollectionsRelatedCollections {
    group: 'directus_collections';
}
