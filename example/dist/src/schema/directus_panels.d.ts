import { DirectusDashboards, DirectusDashboardsPrimaryKey } from './directus_dashboards.js';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users.js';
export type DirectusPanelsPrimaryKey = string;
export type DirectusPanelsPrimaryKeyField = 'id';
export interface DirectusPanels {
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: string
     */
    dashboard?: string;
    /**
     * Type: timestamp
     */
    date_created?: Date | null;
    /**
     * Type: integer
     */
    height?: number;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: uuid
     */
    id?: DirectusPanelsPrimaryKey;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: integer
     */
    position_x?: number;
    /**
     * Type: integer
     */
    position_y?: number;
    /**
     * Type: boolean
     */
    show_header?: boolean;
    /**
     * Type: string
     */
    type?: string;
    /**
     * Type: string
     */
    user_created?: string | null;
    /**
     * Type: integer
     */
    width?: number;
}
export interface DirectusPanelsRelations {
    dashboard?: DirectusDashboardsPrimaryKey | DirectusDashboards;
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusPanelsRelatedCollections {
    dashboard: 'directus_dashboards';
    user_created: 'directus_users';
}
export interface DirectusPanelsPayload extends Omit<DirectusPanels, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusPanelsPayload parses the given {@link DirectusPanelsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusPanels}.
 */
export declare function parseDirectusPanelsPayload(v: DirectusPanelsPayload): DirectusPanels;
/**
 * parseDirectusPanels parses the given {@link DirectusPanels}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusPanelsPayload}.
 */
export declare function parseDirectusPanels(v: DirectusPanels): DirectusPanelsPayload;
