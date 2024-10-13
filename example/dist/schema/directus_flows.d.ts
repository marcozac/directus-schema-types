import { DirectusOperations, DirectusOperationsPrimaryKey } from './directus_operations';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusFlowsPrimaryKey = string;
export type DirectusFlowsPrimaryKeyField = 'id';
export interface DirectusFlows {
    /**
     * Type: string
     */
    accountability?: string | null;
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: dateTime
     */
    date_created?: Date | null;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: uuid
     */
    id?: DirectusFlowsPrimaryKey;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: string
     */
    operation?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: string
     */
    status?: string;
    /**
     * Type: string
     */
    trigger?: string | null;
    /**
     * Type: string
     */
    user_created?: string | null;
}
export interface DirectusFlowsRelations {
    operation?: DirectusOperationsPrimaryKey | DirectusOperations;
    operations?: (DirectusOperationsPrimaryKey | DirectusOperations)[];
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusFlowsRelatedCollections {
    operation: 'directus_operations';
    operations: 'directus_operations';
    user_created: 'directus_users';
}
export interface DirectusFlowsPayload extends Omit<DirectusFlows, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusFlowsPayload parses the given {@link DirectusFlowsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusFlows}.
 */
export declare function parseDirectusFlowsPayload(v: DirectusFlowsPayload): DirectusFlows;
/**
 * parseDirectusFlows parses the given {@link DirectusFlows}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusFlowsPayload}.
 */
export declare function parseDirectusFlows(v: DirectusFlows): DirectusFlowsPayload;
