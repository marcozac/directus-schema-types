import { DirectusFieldsPrimaryKey, DirectusFields } from './directus_fields';
export type DirectusCollectionsPrimaryKeyField = 'collection';
export type DirectusCollectionsPrimaryKey = string;
export interface DirectusCollections {
    accountability?: string | null;
    archive_app_filter?: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse?: string;
    readonly collection?: string;
    color?: string | null;
    display_template?: string | null;
    group?: string | null;
    hidden?: boolean;
    icon?: string | null;
    item_duplication_fields?: object | null;
    note?: string | null;
    preview_url?: string | null;
    singleton?: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: object | null;
    unarchive_value?: string | null;
    versioning?: boolean;
}
export interface DirectusCollectionsRelations {
    fields: (DirectusFieldsPrimaryKey | DirectusFields)[];
    group: DirectusCollectionsPrimaryKey | DirectusCollections;
}
export type DirectusCollectionsPayload = DirectusCollections;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusCollectionsPayload(v: DirectusCollectionsPayload): DirectusCollections;
