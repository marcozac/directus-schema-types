import { DirectusCollectionsPrimaryKey, DirectusCollections } from './directus_collections';
export type DirectusFieldsPrimaryKeyField = 'id';
export type DirectusFieldsPrimaryKey = number;
export interface DirectusFields {
    collection?: string;
    conditions?: object | null;
    display?: string | null;
    display_options?: object | null;
    field?: string;
    group?: string | null;
    hidden?: boolean;
    id?: number;
    interface?: string | null;
    note?: string | null;
    options?: object | null;
    readonly?: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: any | null;
    translations?: object | null;
    validation?: object | null;
    validation_message?: string | null;
    width?: string | null;
}
export interface DirectusFieldsRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;
    group: DirectusFieldsPrimaryKey | DirectusFields;
}
export type DirectusFieldsPayload = DirectusFields;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusFieldsPayload(v: DirectusFieldsPayload): DirectusFields;
