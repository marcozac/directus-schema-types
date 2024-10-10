import { DirectusRevisionsPrimaryKey, DirectusRevisions } from './directus_revisions';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusActivityPrimaryKeyField = 'id';
export type DirectusActivityPrimaryKey = number;
export interface DirectusActivity {
    action?: string;
    collection?: string;
    comment?: string | null;
    id?: number;
    ip?: string | null;
    item?: string;
    origin?: string | null;
    timestamp?: Date;
    user?: string | null;
    user_agent?: string | null;
}
export interface DirectusActivityRelations {
    revisions: (DirectusRevisionsPrimaryKey | DirectusRevisions)[];
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
/**
 * DirectusActivityRelatedCollections maps the {@link DirectusActivityRelations}
 * fields to the name of the related collection.
 */
export interface DirectusActivityRelatedCollections {
    revisions: 'directus_revisions';
    user: 'directus_users';
}
export type DirectusActivityPayload = Omit<DirectusActivity, 'timestamp'> & {
    timestamp?: string;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusActivity}.
 */
export declare function parseDirectusActivityPayload(v: DirectusActivityPayload): DirectusActivity;
