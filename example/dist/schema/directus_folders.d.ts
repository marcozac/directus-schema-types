export type DirectusFoldersPrimaryKey = string;
export type DirectusFoldersPrimaryKeyField = 'id';
export interface DirectusFolders {
    /**
     * Type: uuid
     */
    id?: DirectusFoldersPrimaryKey;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: string
     */
    parent?: string | null;
}
export interface DirectusFoldersRelations {
    parent?: DirectusFoldersPrimaryKey | DirectusFolders;
}
export interface DirectusFoldersRelatedCollections {
    parent: 'directus_folders';
}
