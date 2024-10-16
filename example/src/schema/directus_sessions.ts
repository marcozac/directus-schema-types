// File generated by directus-schema-types. Do not change.

import { DirectusShares, DirectusSharesPrimaryKey } from './directus_shares.js';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users.js';

export type DirectusSessionsPrimaryKey = string;
export type DirectusSessionsPrimaryKeyField = 'token';

export interface DirectusSessions {
    /**
     * Type: dateTime
     */
    expires?: Date;
    /**
     * Type: string
     */
    ip?: string | null;
    /**
     * Type: string
     */
    next_token?: string | null;
    /**
     * Type: string
     */
    origin?: string | null;
    /**
     * Type: string
     */
    share?: string | null;
    /**
     * Type: string
     */
    token?: DirectusSessionsPrimaryKey;
    /**
     * Type: string
     */
    user?: string | null;
    /**
     * Type: text
     */
    user_agent?: string | null;
}

export interface DirectusSessionsRelations {
    share?: DirectusSharesPrimaryKey | DirectusShares;
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}

export interface DirectusSessionsRelatedCollections {
    share: 'directus_shares';
    user: 'directus_users';
}

export interface DirectusSessionsPayload extends Omit<DirectusSessions, 'expires'> {
    expires?: string;
}

/**
 * parseDirectusSessionsPayload parses the given {@link DirectusSessionsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusSessions}.
 */
export function parseDirectusSessionsPayload(v: DirectusSessionsPayload): DirectusSessions {
    const r = v as Record<keyof DirectusSessions, unknown>;
    if (v.expires) {
        r.expires = new Date(v.expires);
    }
    return r as DirectusSessions;
}

/**
 * parseDirectusSessions parses the given {@link DirectusSessions}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusSessionsPayload}.
 */
export function parseDirectusSessions(v: DirectusSessions): DirectusSessionsPayload {
    const r = v as Record<keyof DirectusSessionsPayload, unknown>;
    if (v.expires) {
        r.expires = v.expires.toString();
    }
    return r as DirectusSessionsPayload;
}
