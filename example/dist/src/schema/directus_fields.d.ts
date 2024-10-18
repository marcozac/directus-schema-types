import { DirectusCollections, DirectusCollectionsPrimaryKey } from './directus_collections.js';
export type DirectusFieldsPrimaryKey = number;
export type DirectusFieldsPrimaryKeyField = 'id';
export interface DirectusFields {
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: json
     */
    conditions?: object | null;
    /**
     * Type: string
     */
    display?: string | null;
    /**
     * Type: json
     */
    display_options?: object | null;
    /**
     * Type: string
     */
    field?: string;
    /**
     * Type: string
     */
    group?: string | null;
    /**
     * Type: boolean
     */
    hidden?: boolean;
    /**
     * Type: integer
     */
    id?: DirectusFieldsPrimaryKey;
    /**
     * Type: string
     */
    interface?: string | null;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: boolean
     */
    readonly?: boolean;
    /**
     * Type: boolean
     */
    required?: boolean | null;
    /**
     * Type: integer
     */
    sort?: number | null;
    /**
     * Type: csv
     */
    special?: any | null;
    /**
     * Type: json
     */
    translations?: object | null;
    /**
     * Type: json
     */
    validation?: object | null;
    /**
     * Type: text
     */
    validation_message?: string | null;
    /**
     * Type: string
     */
    width?: string | null;
}
export interface DirectusFieldsRelations {
    collection?: DirectusCollectionsPrimaryKey | DirectusCollections;
    group?: DirectusFieldsPrimaryKey | DirectusFields;
}
export interface DirectusFieldsRelatedCollections {
    collection: 'directus_collections';
    group: 'directus_fields';
}
