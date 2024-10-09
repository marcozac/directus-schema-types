export type DirectusFoldersPrimaryKeyField = 'id';
export type DirectusFoldersPrimaryKey = string;
export interface DirectusFolders {
    id?: string;
    name?: string;
    parent?: string | null;
}
export interface DirectusFoldersRelations {
    parent: DirectusFoldersPrimaryKey | DirectusFolders;
}
export type DirectusFoldersPayload = DirectusFolders;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusFoldersPayload(v: DirectusFoldersPayload): DirectusFolders;
