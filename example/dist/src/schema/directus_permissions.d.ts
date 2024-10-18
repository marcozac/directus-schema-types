import { DirectusPolicies, DirectusPoliciesPrimaryKey } from './directus_policies.js';
export type DirectusPermissionsPrimaryKey = number;
export type DirectusPermissionsPrimaryKeyField = 'id';
export interface DirectusPermissions {
    /**
     * Type: string
     */
    action?: string;
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: csv
     */
    fields?: any | null;
    /**
     * Type: integer
     */
    id?: DirectusPermissionsPrimaryKey;
    /**
     * Type: json
     */
    permissions?: object | null;
    /**
     * Type: string
     */
    policy?: string;
    /**
     * Type: json
     */
    presets?: object | null;
    /**
     * Type: json
     */
    validation?: object | null;
}
export interface DirectusPermissionsRelations {
    policy?: DirectusPoliciesPrimaryKey | DirectusPolicies;
}
export interface DirectusPermissionsRelatedCollections {
    policy: 'directus_policies';
}
