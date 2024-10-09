import { DirectusCollectionsPrimaryKey, DirectusCollections } from './directus_collections';
import { DirectusRolesPrimaryKey, DirectusRoles } from './directus_roles';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusSharesPrimaryKeyField = 'id';
export type DirectusSharesPrimaryKey = string;
export interface DirectusShares {
    collection?: string;
    readonly date_created?: Date | null;
    date_end?: Date | null;
    date_start?: Date | null;
    readonly id?: string;
    item?: string;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: string | null;
    readonly times_used?: number | null;
    readonly user_created?: string | null;
}
export interface DirectusSharesRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;
    role: DirectusRolesPrimaryKey | DirectusRoles;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusSharesPayload = Omit<DirectusShares, 'date_created' | 'date_end' | 'date_start'> & {
    readonly date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusShares}.
 */
export declare function parseDirectusSharesPayload(v: DirectusSharesPayload): DirectusShares;
