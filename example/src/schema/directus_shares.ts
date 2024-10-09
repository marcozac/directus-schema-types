// File generated by directus-schema-types. Do not change.

import { DirectusCollectionsPrimaryKey, DirectusCollections } from './directus_collections';
import { DirectusRolesPrimaryKey, DirectusRoles } from './directus_roles';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';

// --- directus_shares ---

export type DirectusSharesPrimaryKeyField = 'id';
export type DirectusSharesPrimaryKey = string;

export interface DirectusShares {
    // Type: string
    collection?: string;

    // Type: timestamp
    readonly date_created?: Date | null;

    // $t:shared_leave_blank_for_unlimited
    // Type: dateTime
    date_end?: Date | null;

    // $t:shared_leave_blank_for_unlimited
    // Type: dateTime
    date_start?: Date | null;

    // Type: uuid
    readonly id?: string;

    // Type: string
    item?: string;

    // $t:shared_leave_blank_for_unlimited
    // Type: integer
    max_uses?: number | null;

    // Type: string
    name?: string | null;

    // $t:shared_leave_blank_for_passwordless_access
    // Type: hash
    password?: string | null;

    // Type: string
    role?: string | null;

    // Type: integer
    readonly times_used?: number | null;

    // Type: string
    readonly user_created?: string | null;
}

export interface DirectusSharesRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;

    role: DirectusRolesPrimaryKey | DirectusRoles;

    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}

export type DirectusSharesPayload = Omit<DirectusShares, 'date_created' | 'date_end' | 'date_start'> & {
    // Type: timestamp
    readonly date_created?: string | null;

    // $t:shared_leave_blank_for_unlimited
    // Type: dateTime
    date_end?: string | null;

    // $t:shared_leave_blank_for_unlimited
    // Type: dateTime
    date_start?: string | null;
};

/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusShares}.
 */
export function parseDirectusSharesPayload(v: DirectusSharesPayload): DirectusShares {
    const r: Record<string, unknown> = v;
    if (v.date_created) {
        r.date_created = new Date(v.date_created);
    }
    if (v.date_end) {
        r.date_end = new Date(v.date_end);
    }
    if (v.date_start) {
        r.date_start = new Date(v.date_start);
    }
    return r as DirectusShares;
}
