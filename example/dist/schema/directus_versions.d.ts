import { DirectusCollectionsPrimaryKey, DirectusCollections } from './directus_collections';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusVersionsPrimaryKeyField = 'id';
export type DirectusVersionsPrimaryKey = string;
export interface DirectusVersions {
    collection?: string;
    date_created?: Date | null;
    date_updated?: Date | null;
    readonly hash?: string | null;
    readonly id?: string;
    item?: string;
    key?: string;
    name?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
}
export interface DirectusVersionsRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusVersionsPayload = Omit<DirectusVersions, 'date_created' | 'date_updated'> & {
    date_created?: string | null;
    date_updated?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusVersions}.
 */
export declare function parseDirectusVersionsPayload(v: DirectusVersionsPayload): DirectusVersions;
