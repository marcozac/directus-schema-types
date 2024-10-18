import { DirectusCollections, DirectusCollectionsPrimaryKey } from './directus_collections.js';
import { DirectusRoles, DirectusRolesPrimaryKey } from './directus_roles.js';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users.js';
export type DirectusSharesPrimaryKey = string;
export type DirectusSharesPrimaryKeyField = 'id';
export interface DirectusShares {
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: timestamp
     */
    readonly date_created?: Date | null;
    /**
     * $t:shared_leave_blank_for_unlimited
     * Type: dateTime
     */
    date_end?: Date | null;
    /**
     * $t:shared_leave_blank_for_unlimited
     * Type: dateTime
     */
    date_start?: Date | null;
    /**
     * Type: uuid
     */
    readonly id?: DirectusSharesPrimaryKey;
    /**
     * Type: string
     */
    item?: string;
    /**
     * $t:shared_leave_blank_for_unlimited
     * Type: integer
     */
    max_uses?: number | null;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * $t:shared_leave_blank_for_passwordless_access
     * Type: hash
     */
    password?: string | null;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: integer
     */
    readonly times_used?: number | null;
    /**
     * Type: string
     */
    readonly user_created?: string | null;
}
export interface DirectusSharesRelations {
    collection?: DirectusCollectionsPrimaryKey | DirectusCollections;
    role?: DirectusRolesPrimaryKey | DirectusRoles;
    readonly user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusSharesRelatedCollections {
    collection: 'directus_collections';
    role: 'directus_roles';
    user_created: 'directus_users';
}
export interface DirectusSharesPayload extends Omit<DirectusShares, 'date_created' | 'date_end' | 'date_start'> {
    readonly date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
}
/**
 * parseDirectusSharesPayload parses the given {@link DirectusSharesPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusShares}.
 */
export declare function parseDirectusSharesPayload(v: DirectusSharesPayload): DirectusShares;
/**
 * parseDirectusShares parses the given {@link DirectusShares}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusSharesPayload}.
 */
export declare function parseDirectusShares(v: DirectusShares): DirectusSharesPayload;
