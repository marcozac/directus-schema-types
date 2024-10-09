import { DirectusAccessPrimaryKey, DirectusAccess } from './directus_access';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusRolesPrimaryKeyField = 'id';
export type DirectusRolesPrimaryKey = string;
export interface DirectusRoles {
    description?: string | null;
    icon?: string;
    id?: string;
    name: string;
    parent?: string | null;
}
export interface DirectusRolesRelations {
    children: (DirectusRolesPrimaryKey | DirectusRoles)[];
    parent: DirectusRolesPrimaryKey | DirectusRoles;
    policies: (DirectusAccessPrimaryKey | DirectusAccess)[];
    users: (DirectusUsersPrimaryKey | DirectusUsers)[];
}
export type DirectusRolesPayload = DirectusRoles;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusRolesPayload(v: DirectusRolesPayload): DirectusRoles;
