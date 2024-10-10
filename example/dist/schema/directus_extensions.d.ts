export type DirectusExtensionsPrimaryKeyField = 'id';
export type DirectusExtensionsPrimaryKey = string;
export interface DirectusExtensions {
    bundle?: string | null;
    enabled?: boolean;
    folder?: string;
    id?: string;
    source?: string;
}
export interface DirectusExtensionsRelations {
}
/**
 * DirectusExtensionsRelatedCollections maps the {@link DirectusExtensionsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusExtensionsRelatedCollections {
}
export type DirectusExtensionsPayload = DirectusExtensions;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusExtensionsPayload(v: DirectusExtensionsPayload): DirectusExtensions;
