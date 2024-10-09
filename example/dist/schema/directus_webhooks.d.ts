import { DirectusFlowsPrimaryKey, DirectusFlows } from './directus_flows';
export type DirectusWebhooksPrimaryKeyField = 'id';
export type DirectusWebhooksPrimaryKey = number;
export interface DirectusWebhooks {
    actions?: any;
    collections?: any;
    data?: boolean;
    headers?: object | null;
    id?: number;
    method?: string;
    migrated_flow?: string | null;
    name?: string;
    status?: string;
    url?: string;
    was_active_before_deprecation?: boolean;
}
export interface DirectusWebhooksRelations {
    migrated_flow: DirectusFlowsPrimaryKey | DirectusFlows;
}
export type DirectusWebhooksPayload = DirectusWebhooks;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusWebhooksPayload(v: DirectusWebhooksPayload): DirectusWebhooks;
