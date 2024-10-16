import { DirectusRoles, DirectusRolesPrimaryKey } from './directus_roles';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusPresetsPrimaryKey = number;
export type DirectusPresetsPrimaryKeyField = 'id';
export interface DirectusPresets {
    /**
     * Type: string
     */
    bookmark?: string | null;
    /**
     * Type: string
     */
    collection?: string | null;
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: json
     */
    filter?: object | null;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusPresetsPrimaryKey;
    /**
     * Type: string
     */
    layout?: string | null;
    /**
     * Type: json
     */
    layout_options?: object | null;
    /**
     * Type: json
     */
    layout_query?: object | null;
    /**
     * Type: integer
     */
    refresh_interval?: number | null;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: string
     */
    search?: string | null;
    /**
     * Type: string
     */
    user?: string | null;
}
export interface DirectusPresetsRelations {
    role?: DirectusRolesPrimaryKey | DirectusRoles;
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusPresetsRelatedCollections {
    role: 'directus_roles';
    user: 'directus_users';
}
