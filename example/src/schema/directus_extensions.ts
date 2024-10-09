// File generated by directus-schema-types. Do not change.

// --- directus_extensions ---

export type DirectusExtensionsPrimaryKeyField = 'id';
export type DirectusExtensionsPrimaryKey = string;

export interface DirectusExtensions {
    // Type: string
    bundle?: string | null;

    // Type: boolean
    enabled?: boolean;

    // Type: string
    folder?: string;

    // Type: uuid
    id?: string;

    // Type: string
    source?: string;
}

export interface DirectusExtensionsRelations {}

// The payload is the same as the schema definition.
export type DirectusExtensionsPayload = DirectusExtensions;

/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export function parseDirectusExtensionsPayload(v: DirectusExtensionsPayload): DirectusExtensions {
    return v;
}
