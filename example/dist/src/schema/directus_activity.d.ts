import { DirectusRevisions, DirectusRevisionsPrimaryKey } from './directus_revisions.js';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users.js';
export type DirectusActivityPrimaryKey = number;
export type DirectusActivityPrimaryKeyField = 'id';
export interface DirectusActivity {
    /**
     * Type: string
     */
    action?: string;
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: text
     */
    comment?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusActivityPrimaryKey;
    /**
     * Type: string
     */
    ip?: string | null;
    /**
     * Type: string
     */
    item?: string;
    /**
     * Type: string
     */
    origin?: string | null;
    /**
     * Type: timestamp
     */
    timestamp?: Date;
    /**
     * Type: string
     */
    user?: string | null;
    /**
     * Type: text
     */
    user_agent?: string | null;
}
export interface DirectusActivityRelations {
    revisions?: DirectusRevisionsPrimaryKey[] | DirectusRevisions[];
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusActivityRelatedCollections {
    revisions: 'directus_revisions';
    user: 'directus_users';
}
export interface DirectusActivityPayload extends Omit<DirectusActivity, 'timestamp'> {
    timestamp?: string;
}
/**
 * parseDirectusActivityPayload parses the given {@link DirectusActivityPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusActivity}.
 */
export declare function parseDirectusActivityPayload(v: DirectusActivityPayload): DirectusActivity;
/**
 * parseDirectusActivity parses the given {@link DirectusActivity}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusActivityPayload}.
 */
export declare function parseDirectusActivity(v: DirectusActivity): DirectusActivityPayload;
