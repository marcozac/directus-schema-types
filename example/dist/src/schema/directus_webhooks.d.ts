import { DirectusFlows, DirectusFlowsPrimaryKey } from './directus_flows.js';
export type DirectusWebhooksPrimaryKey = number;
export type DirectusWebhooksPrimaryKeyField = 'id';
export interface DirectusWebhooks {
    /**
     * Type: csv
     */
    actions?: any;
    /**
     * Type: csv
     */
    collections?: any;
    /**
     * Type: boolean
     */
    data?: boolean;
    /**
     * Type: json
     */
    headers?: object | null;
    /**
     * Type: integer
     */
    id?: DirectusWebhooksPrimaryKey;
    /**
     * Type: string
     */
    method?: string;
    /**
     * Type: string
     */
    migrated_flow?: string | null;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: string
     */
    status?: string;
    /**
     * Type: string
     */
    url?: string;
    /**
     * Type: boolean
     */
    was_active_before_deprecation?: boolean;
}
export interface DirectusWebhooksRelations {
    migrated_flow?: DirectusFlowsPrimaryKey | DirectusFlows;
}
export interface DirectusWebhooksRelatedCollections {
    migrated_flow: 'directus_flows';
}
