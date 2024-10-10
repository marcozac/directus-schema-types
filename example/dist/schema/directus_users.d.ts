import { DirectusAccessPrimaryKey, DirectusAccess } from './directus_access';
import { DirectusFilesPrimaryKey, DirectusFiles } from './directus_files';
import { DirectusRolesPrimaryKey, DirectusRoles } from './directus_roles';
export type DirectusUsersPrimaryKeyField = 'id';
export type DirectusUsersPrimaryKey = string;
export interface DirectusUsers {
    appearance?: string | null;
    auth_data?: object | null;
    avatar?: string | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id?: string;
    language?: string | null;
    readonly last_access?: Date | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    provider?: string;
    role?: string | null;
    status?: string;
    tags?: object | null;
    tfa_secret?: string | null;
    theme_dark?: string | null;
    theme_dark_overrides?: object | null;
    theme_light?: string | null;
    theme_light_overrides?: object | null;
    title?: string | null;
    token?: string | null;
}
export interface DirectusUsersRelations {
    avatar: DirectusFilesPrimaryKey | DirectusFiles;
    policies: (DirectusAccessPrimaryKey | DirectusAccess)[];
    role: DirectusRolesPrimaryKey | DirectusRoles;
}
/**
 * DirectusUsersRelatedCollections maps the {@link DirectusUsersRelations}
 * fields to the name of the related collection.
 */
export interface DirectusUsersRelatedCollections {
    avatar: 'directus_files';
    policies: 'directus_access';
    role: 'directus_roles';
}
export type DirectusUsersPayload = Omit<DirectusUsers, 'last_access'> & {
    readonly last_access?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusUsers}.
 */
export declare function parseDirectusUsersPayload(v: DirectusUsersPayload): DirectusUsers;
