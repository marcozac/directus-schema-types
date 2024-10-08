// File generated by directus-schema-types. Do not change.

import { DirectusFieldsPrimaryKey, DirectusFields } from './directus_fields';

// --- directus_collections ---

export type DirectusCollectionsPrimaryKeyField = 'collection';
export type DirectusCollectionsPrimaryKey = string;

export interface DirectusCollections {
    // Type: string
    accountability?: string | null;

    // Type: boolean
    archive_app_filter?: boolean;

    // Type: string
    archive_field?: string | null;

    // Type: string
    archive_value?: string | null;

    // Type: string
    collapse?: string;

    // Type: string
    readonly collection?: string;

    // Type: string
    color?: string | null;

    // Type: string
    display_template?: string | null;

    // Type: string
    group?: string | null;

    // Type: boolean
    hidden?: boolean;

    // Type: string
    icon?: string | null;

    // Type: json
    item_duplication_fields?: object | null;

    // Type: text
    note?: string | null;

    // Type: string
    preview_url?: string | null;

    // Type: boolean
    singleton?: boolean;

    // Type: integer
    sort?: number | null;

    // Type: string
    sort_field?: string | null;

    // Type: json
    translations?: object | null;

    // Type: string
    unarchive_value?: string | null;

    // Type: boolean
    versioning?: boolean;
}

export interface DirectusCollectionsRelations {
    fields: (DirectusFieldsPrimaryKey | DirectusFields)[];

    group: DirectusCollectionsPrimaryKey | DirectusCollections;
}

/**
 * DirectusCollectionsRelatedCollections maps the {@link DirectusCollectionsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusCollectionsRelatedCollections {
    fields: 'directus_fields';
    group: 'directus_collections';
}

// The payload is the same as the schema definition.
export type DirectusCollectionsPayload = DirectusCollections;

/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export function parseDirectusCollectionsPayload(v: DirectusCollectionsPayload): DirectusCollections {
    return v;
}
