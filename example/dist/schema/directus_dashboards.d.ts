import { DirectusPanels, DirectusPanelsPrimaryKey } from './directus_panels';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusDashboardsPrimaryKey = string;
export type DirectusDashboardsPrimaryKeyField = 'id';
export interface DirectusDashboards {
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: timestamp
     */
    date_created?: Date | null;
    /**
     * Type: string
     */
    icon?: string;
    /**
     * Type: uuid
     */
    id?: DirectusDashboardsPrimaryKey;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: string
     */
    user_created?: string | null;
}
export interface DirectusDashboardsRelations {
    panels?: (DirectusPanelsPrimaryKey | DirectusPanels)[];
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusDashboardsRelatedCollections {
    panels: 'directus_panels';
    user_created: 'directus_users';
}
export interface DirectusDashboardsPayload extends Omit<DirectusDashboards, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusDashboardsPayload parses the given {@link DirectusDashboardsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusDashboards}.
 */
export declare function parseDirectusDashboardsPayload(v: DirectusDashboardsPayload): DirectusDashboards;
/**
 * parseDirectusDashboards parses the given {@link DirectusDashboards}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusDashboardsPayload}.
 */
export declare function parseDirectusDashboards(v: DirectusDashboards): DirectusDashboardsPayload;
