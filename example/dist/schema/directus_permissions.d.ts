import { DirectusPoliciesPrimaryKey, DirectusPolicies } from './directus_policies';
export type DirectusPermissionsPrimaryKeyField = 'id';
export type DirectusPermissionsPrimaryKey = number;
export interface DirectusPermissions {
    action?: string;
    collection?: string;
    fields?: any | null;
    id?: number;
    permissions?: object | null;
    policy?: string;
    presets?: object | null;
    validation?: object | null;
}
export interface DirectusPermissionsRelations {
    policy: DirectusPoliciesPrimaryKey | DirectusPolicies;
}
export type DirectusPermissionsPayload = DirectusPermissions;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusPermissionsPayload(v: DirectusPermissionsPayload): DirectusPermissions;
