import { DirectusCollections, DirectusCollectionsPrimaryKey } from './directus_collections';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusVersionsPrimaryKey = string;
export type DirectusVersionsPrimaryKeyField = 'id';
export interface DirectusVersions {
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: timestamp
     */
    date_created?: Date | null;
    /**
     * Type: timestamp
     */
    date_updated?: Date | null;
    /**
     * Type: string
     */
    readonly hash?: string | null;
    /**
     * Type: uuid
     */
    readonly id?: DirectusVersionsPrimaryKey;
    /**
     * Type: string
     */
    item?: string;
    /**
     * Type: string
     */
    key?: string;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * Type: string
     */
    user_created?: string | null;
    /**
     * Type: string
     */
    user_updated?: string | null;
}
export interface DirectusVersionsRelations {
    collection?: DirectusCollectionsPrimaryKey | DirectusCollections;
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusVersionsRelatedCollections {
    collection: 'directus_collections';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export interface DirectusVersionsPayload extends Omit<DirectusVersions, 'date_created' | 'date_updated'> {
    date_created?: string | null;
    date_updated?: string | null;
}
/**
 * parseDirectusVersionsPayload parses the given {@link DirectusVersionsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusVersions}.
 */
export declare function parseDirectusVersionsPayload(v: DirectusVersionsPayload): DirectusVersions;
/**
 * parseDirectusVersions parses the given {@link DirectusVersions}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusVersionsPayload}.
 */
export declare function parseDirectusVersions(v: DirectusVersions): DirectusVersionsPayload;
