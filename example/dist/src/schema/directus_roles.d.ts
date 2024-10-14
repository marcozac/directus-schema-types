import { DirectusAccess, DirectusAccessPrimaryKey } from './directus_access';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusRolesPrimaryKey = string;
export type DirectusRolesPrimaryKeyField = 'id';
export interface DirectusRoles {
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: string
     */
    icon?: string;
    /**
     * Type: uuid
     */
    id?: DirectusRolesPrimaryKey;
    /**
     * Type: string
     */
    name: string;
    /**
     * $t:field_options.directus_roles.parent_note
     * Type: string
     */
    parent?: string | null;
}
export interface DirectusRolesRelations {
    children?: (DirectusRolesPrimaryKey | DirectusRoles)[];
    parent?: DirectusRolesPrimaryKey | DirectusRoles;
    policies?: (DirectusAccessPrimaryKey | DirectusAccess)[];
    users?: (DirectusUsersPrimaryKey | DirectusUsers)[];
}
export interface DirectusRolesRelatedCollections {
    children: 'directus_roles';
    parent: 'directus_roles';
    policies: 'directus_access';
    users: 'directus_users';
}
