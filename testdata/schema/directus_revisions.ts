// File generated by directus-schema-types. Do not change.

import { DirectusActivityPrimaryKey, DirectusActivity } from './directus_activity';
import { DirectusVersionsPrimaryKey, DirectusVersions } from './directus_versions';

// --- directus_revisions ---

export type DirectusRevisionsPrimaryKeyField = 'id';
export type DirectusRevisionsPrimaryKey = number;

export interface DirectusRevisions {
    // Type: integer
    activity?: number;

    // Type: string
    collection?: string;

    // Type: json
    data?: object | null;

    // Type: json
    delta?: object | null;

    // Type: integer
    id?: number;

    // Type: string
    item?: string;

    // Type: integer
    parent?: number | null;

    // Type: string
    version?: string | null;
}

export interface DirectusRevisionsRelations {
    activity: DirectusActivityPrimaryKey | DirectusActivity;

    parent: DirectusRevisionsPrimaryKey | DirectusRevisions;

    version: DirectusVersionsPrimaryKey | DirectusVersions;
}

// The payload is the same as the schema definition.
export type DirectusRevisionsPayload = DirectusRevisions;

/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export function parseDirectusRevisionsPayload(v: DirectusRevisionsPayload): DirectusRevisions {
    return v;
}
