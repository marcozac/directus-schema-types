export type DirectusExtensionsPrimaryKey = string;
export type DirectusExtensionsPrimaryKeyField = 'id';
export interface DirectusExtensions {
    /**
     * Type: string
     */
    bundle?: string | null;
    /**
     * Type: boolean
     */
    enabled?: boolean;
    /**
     * Type: string
     */
    folder?: string;
    /**
     * Type: uuid
     */
    id?: DirectusExtensionsPrimaryKey;
    /**
     * Type: string
     */
    source?: string;
}
export interface DirectusExtensionsRelations {
}
export interface DirectusExtensionsRelatedCollections {
}
