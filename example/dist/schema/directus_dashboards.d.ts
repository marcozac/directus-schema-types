import { DirectusPanelsPrimaryKey, DirectusPanels } from './directus_panels';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusDashboardsPrimaryKeyField = 'id';
export type DirectusDashboardsPrimaryKey = string;
export interface DirectusDashboards {
    color?: string | null;
    date_created?: Date | null;
    icon?: string;
    id?: string;
    name?: string;
    note?: string | null;
    user_created?: string | null;
}
export interface DirectusDashboardsRelations {
    panels: (DirectusPanelsPrimaryKey | DirectusPanels)[];
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusDashboardsPayload = Omit<DirectusDashboards, 'date_created'> & {
    date_created?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusDashboards}.
 */
export declare function parseDirectusDashboardsPayload(v: DirectusDashboardsPayload): DirectusDashboards;
