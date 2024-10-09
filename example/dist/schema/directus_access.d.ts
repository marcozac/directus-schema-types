import { DirectusPoliciesPrimaryKey, DirectusPolicies } from './directus_policies';
import { DirectusRolesPrimaryKey, DirectusRoles } from './directus_roles';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusAccessPrimaryKeyField = 'id';
export type DirectusAccessPrimaryKey = string;
export interface DirectusAccess {
    id?: string | null;
    policy?: string;
    role?: string | null;
    sort?: number | null;
    user?: string | null;
}
export interface DirectusAccessRelations {
    policy: DirectusPoliciesPrimaryKey | DirectusPolicies;
    role: DirectusRolesPrimaryKey | DirectusRoles;
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusAccessPayload = DirectusAccess;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusAccessPayload(v: DirectusAccessPayload): DirectusAccess;
