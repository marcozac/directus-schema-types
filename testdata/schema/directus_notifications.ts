// File generated by directus-schema-types. Do not change.

import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';

// --- directus_notifications ---

export type DirectusNotificationsPrimaryKeyField = 'id';
export type DirectusNotificationsPrimaryKey = number;

export interface DirectusNotifications {
    // Type: string
    collection?: string | null;

    // Type: integer
    id?: number;

    // Type: string
    item?: string | null;

    // Type: text
    message?: string | null;

    // Type: string
    recipient?: string;

    // Type: string
    sender?: string | null;

    // Type: string
    status?: string | null;

    // Type: string
    subject?: string;

    // Type: timestamp
    timestamp?: Date | null;
}

export interface DirectusNotificationsRelations {
    recipient: DirectusUsersPrimaryKey | DirectusUsers;

    sender: DirectusUsersPrimaryKey | DirectusUsers;
}
