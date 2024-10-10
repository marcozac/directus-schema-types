import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusNotificationsPrimaryKeyField = 'id';
export type DirectusNotificationsPrimaryKey = number;
export interface DirectusNotifications {
    collection?: string | null;
    id?: number;
    item?: string | null;
    message?: string | null;
    recipient?: string;
    sender?: string | null;
    status?: string | null;
    subject?: string;
    timestamp?: Date | null;
}
export interface DirectusNotificationsRelations {
    recipient: DirectusUsersPrimaryKey | DirectusUsers;
    sender: DirectusUsersPrimaryKey | DirectusUsers;
}
/**
 * DirectusNotificationsRelatedCollections maps the {@link DirectusNotificationsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusNotificationsRelatedCollections {
    recipient: 'directus_users';
    sender: 'directus_users';
}
export type DirectusNotificationsPayload = Omit<DirectusNotifications, 'timestamp'> & {
    timestamp?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusNotifications}.
 */
export declare function parseDirectusNotificationsPayload(v: DirectusNotificationsPayload): DirectusNotifications;
