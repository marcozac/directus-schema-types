import { DirectusRolesPrimaryKey, DirectusRoles } from './directus_roles';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusPresetsPrimaryKeyField = 'id';
export type DirectusPresetsPrimaryKey = number;
export interface DirectusPresets {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: object | null;
    icon?: string | null;
    id?: number;
    layout?: string | null;
    layout_options?: object | null;
    layout_query?: object | null;
    refresh_interval?: number | null;
    role?: string | null;
    search?: string | null;
    user?: string | null;
}
export interface DirectusPresetsRelations {
    role: DirectusRolesPrimaryKey | DirectusRoles;
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
/**
 * DirectusPresetsRelatedCollections maps the {@link DirectusPresetsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusPresetsRelatedCollections {
    role: 'directus_roles';
    user: 'directus_users';
}
export type DirectusPresetsPayload = DirectusPresets;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusPresetsPayload(v: DirectusPresetsPayload): DirectusPresets;
