// File generated by directus-schema-types. Do not change.

// --- directus_folders ---

export type DirectusFoldersPrimaryKeyField = 'id';
export type DirectusFoldersPrimaryKey = string;

export interface DirectusFolders {
    // Type: uuid
    id?: string;

    // Type: string
    name?: string;

    // Type: string
    parent?: string | null;
}

export interface DirectusFoldersRelations {
    parent: DirectusFoldersPrimaryKey | DirectusFolders;
}

/**
 * DirectusFoldersRelatedCollections maps the {@link DirectusFoldersRelations}
 * fields to the name of the related collection.
 */
export interface DirectusFoldersRelatedCollections {
    parent: 'directus_folders';
}

// The payload is the same as the schema definition.
export type DirectusFoldersPayload = DirectusFolders;

/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export function parseDirectusFoldersPayload(v: DirectusFoldersPayload): DirectusFolders {
    return v;
}
