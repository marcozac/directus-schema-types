import { DirectusPolicies, DirectusPoliciesPrimaryKey } from './directus_policies';
import { DirectusRoles, DirectusRolesPrimaryKey } from './directus_roles';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusAccessPrimaryKey = string;
export type DirectusAccessPrimaryKeyField = 'id';
export interface DirectusAccess {
    /**
     * Type: uuid
     */
    id?: DirectusAccessPrimaryKey;
    /**
     * Type: string
     */
    policy?: string;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: integer
     */
    sort?: number | null;
    /**
     * Type: string
     */
    user?: string | null;
}
export interface DirectusAccessRelations {
    policy?: DirectusPoliciesPrimaryKey | DirectusPolicies;
    role?: DirectusRolesPrimaryKey | DirectusRoles;
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusAccessRelatedCollections {
    policy: 'directus_policies';
    role: 'directus_roles';
    user: 'directus_users';
}
