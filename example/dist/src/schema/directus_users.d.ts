import { DirectusAccess, DirectusAccessPrimaryKey } from './directus_access.js';
import { DirectusFiles, DirectusFilesPrimaryKey } from './directus_files.js';
import { DirectusRoles, DirectusRolesPrimaryKey } from './directus_roles.js';
export type DirectusUsersPrimaryKey = string;
export type DirectusUsersPrimaryKeyField = 'id';
export interface DirectusUsers {
    /**
     * Type: string
     */
    appearance?: string | null;
    /**
     * Type: json
     */
    auth_data?: object | null;
    /**
     * Type: string
     */
    avatar?: string | null;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: string
     */
    email?: string | null;
    /**
     * Type: boolean
     */
    email_notifications?: boolean | null;
    /**
     * Type: string
     */
    external_identifier?: string | null;
    /**
     * Type: string
     */
    first_name?: string | null;
    /**
     * Type: uuid
     */
    id?: DirectusUsersPrimaryKey;
    /**
     * Type: string
     */
    language?: string | null;
    /**
     * Type: dateTime
     */
    readonly last_access?: Date | null;
    /**
     * Type: string
     */
    last_name?: string | null;
    /**
     * Type: string
     */
    last_page?: string | null;
    /**
     * Type: string
     */
    location?: string | null;
    /**
     * Type: hash
     */
    password?: string | null;
    /**
     * Type: string
     */
    provider?: string;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: string
     */
    status?: string;
    /**
     * Type: json
     */
    tags?: object | null;
    /**
     * Type: string
     */
    tfa_secret?: string | null;
    /**
     * Type: string
     */
    theme_dark?: string | null;
    /**
     * Type: json
     */
    theme_dark_overrides?: object | null;
    /**
     * Type: string
     */
    theme_light?: string | null;
    /**
     * Type: json
     */
    theme_light_overrides?: object | null;
    /**
     * Type: string
     */
    title?: string | null;
    /**
     * Type: string
     */
    token?: string | null;
}
export interface DirectusUsersRelations {
    avatar?: DirectusFilesPrimaryKey | DirectusFiles;
    policies?: DirectusAccessPrimaryKey[] | DirectusAccess[];
    role?: DirectusRolesPrimaryKey | DirectusRoles;
}
export interface DirectusUsersRelatedCollections {
    avatar: 'directus_files';
    policies: 'directus_access';
    role: 'directus_roles';
}
export interface DirectusUsersPayload extends Omit<DirectusUsers, 'last_access'> {
    readonly last_access?: string | null;
}
/**
 * parseDirectusUsersPayload parses the given {@link DirectusUsersPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusUsers}.
 */
export declare function parseDirectusUsersPayload(v: DirectusUsersPayload): DirectusUsers;
/**
 * parseDirectusUsers parses the given {@link DirectusUsers}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusUsersPayload}.
 */
export declare function parseDirectusUsers(v: DirectusUsers): DirectusUsersPayload;
