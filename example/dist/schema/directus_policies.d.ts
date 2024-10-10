import { DirectusAccessPrimaryKey, DirectusAccess } from './directus_access';
import { DirectusPermissionsPrimaryKey, DirectusPermissions } from './directus_permissions';
export type DirectusPoliciesPrimaryKeyField = 'id';
export type DirectusPoliciesPrimaryKey = string;
export interface DirectusPolicies {
    admin_access?: boolean;
    app_access?: boolean;
    description?: string | null;
    enforce_tfa?: boolean;
    icon?: string;
    id?: string | null;
    ip_access?: any | null;
    name: string;
}
export interface DirectusPoliciesRelations {
    permissions: (DirectusPermissionsPrimaryKey | DirectusPermissions)[];
    roles: (DirectusAccessPrimaryKey | DirectusAccess)[];
    users: (DirectusAccessPrimaryKey | DirectusAccess)[];
}
/**
 * DirectusPoliciesRelatedCollections maps the {@link DirectusPoliciesRelations}
 * fields to the name of the related collection.
 */
export interface DirectusPoliciesRelatedCollections {
    permissions: 'directus_permissions';
    roles: 'directus_access';
    users: 'directus_access';
}
export type DirectusPoliciesPayload = DirectusPolicies;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusPoliciesPayload(v: DirectusPoliciesPayload): DirectusPolicies;
