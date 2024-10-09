import { DirectusDashboardsPrimaryKey, DirectusDashboards } from './directus_dashboards';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusPanelsPrimaryKeyField = 'id';
export type DirectusPanelsPrimaryKey = string;
export interface DirectusPanels {
    color?: string | null;
    dashboard?: string;
    date_created?: Date | null;
    height?: number;
    icon?: string | null;
    id?: string;
    name?: string | null;
    note?: string | null;
    options?: object | null;
    position_x?: number;
    position_y?: number;
    show_header?: boolean;
    type?: string;
    user_created?: string | null;
    width?: number;
}
export interface DirectusPanelsRelations {
    dashboard: DirectusDashboardsPrimaryKey | DirectusDashboards;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusPanelsPayload = Omit<DirectusPanels, 'date_created'> & {
    date_created?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusPanels}.
 */
export declare function parseDirectusPanelsPayload(v: DirectusPanelsPayload): DirectusPanels;
