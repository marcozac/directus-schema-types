import { DirectusAccess, DirectusAccessPrimaryKey } from './directus_access.js';
import { DirectusPermissions, DirectusPermissionsPrimaryKey } from './directus_permissions.js';
export type DirectusPoliciesPrimaryKey = string;
export type DirectusPoliciesPrimaryKeyField = 'id';
export interface DirectusPolicies {
    /**
     * Type: boolean
     */
    admin_access?: boolean;
    /**
     * Type: boolean
     */
    app_access?: boolean;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * $t:field_options.directus_policies.enforce_tfa
     * Type: boolean
     */
    enforce_tfa?: boolean;
    /**
     * Type: string
     */
    icon?: string;
    /**
     * Type: uuid
     */
    id?: DirectusPoliciesPrimaryKey;
    /**
     * Type: csv
     */
    ip_access?: any | null;
    /**
     * Type: string
     */
    name: string;
}
export interface DirectusPoliciesRelations {
    permissions?: DirectusPermissionsPrimaryKey[] | DirectusPermissions[];
    roles?: DirectusAccessPrimaryKey[] | DirectusAccess[];
    users?: DirectusAccessPrimaryKey[] | DirectusAccess[];
}
export interface DirectusPoliciesRelatedCollections {
    permissions: 'directus_permissions';
    roles: 'directus_access';
    users: 'directus_access';
}
