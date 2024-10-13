import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusNotificationsPrimaryKey = number;
export type DirectusNotificationsPrimaryKeyField = 'id';
export interface DirectusNotifications {
    /**
     * Type: string
     */
    collection?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusNotificationsPrimaryKey;
    /**
     * Type: string
     */
    item?: string | null;
    /**
     * Type: text
     */
    message?: string | null;
    /**
     * Type: string
     */
    recipient?: string;
    /**
     * Type: string
     */
    sender?: string | null;
    /**
     * Type: string
     */
    status?: string | null;
    /**
     * Type: string
     */
    subject?: string;
    /**
     * Type: timestamp
     */
    timestamp?: Date | null;
}
export interface DirectusNotificationsRelations {
    recipient?: DirectusUsersPrimaryKey | DirectusUsers;
    sender?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusNotificationsRelatedCollections {
    recipient: 'directus_users';
    sender: 'directus_users';
}
export interface DirectusNotificationsPayload extends Omit<DirectusNotifications, 'timestamp'> {
    timestamp?: string | null;
}
/**
 * parseDirectusNotificationsPayload parses the given {@link DirectusNotificationsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusNotifications}.
 */
export declare function parseDirectusNotificationsPayload(v: DirectusNotificationsPayload): DirectusNotifications;
/**
 * parseDirectusNotifications parses the given {@link DirectusNotifications}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusNotificationsPayload}.
 */
export declare function parseDirectusNotifications(v: DirectusNotifications): DirectusNotificationsPayload;
