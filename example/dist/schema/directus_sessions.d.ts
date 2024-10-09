import { DirectusSharesPrimaryKey, DirectusShares } from './directus_shares';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusSessionsPrimaryKeyField = 'token';
export type DirectusSessionsPrimaryKey = string;
export interface DirectusSessions {
    expires?: Date;
    ip?: string | null;
    next_token?: string | null;
    origin?: string | null;
    share?: string | null;
    token?: string;
    user?: string | null;
    user_agent?: string | null;
}
export interface DirectusSessionsRelations {
    share: DirectusSharesPrimaryKey | DirectusShares;
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusSessionsPayload = Omit<DirectusSessions, 'expires'> & {
    expires?: string;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusSessions}.
 */
export declare function parseDirectusSessionsPayload(v: DirectusSessionsPayload): DirectusSessions;
