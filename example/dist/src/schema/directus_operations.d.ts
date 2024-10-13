import { DirectusFlows, DirectusFlowsPrimaryKey } from './directus_flows';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusOperationsPrimaryKey = string;
export type DirectusOperationsPrimaryKeyField = 'id';
export interface DirectusOperations {
    /**
     * Type: dateTime
     */
    date_created?: Date | null;
    /**
     * Type: string
     */
    flow?: string;
    /**
     * Type: uuid
     */
    id?: DirectusOperationsPrimaryKey;
    /**
     * Type: string
     */
    key?: string;
    /**
     * Type: string
     */
    name?: string | null;
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
     * Type: string
     */
    reject?: string | null;
    /**
     * Type: string
     */
    resolve?: string | null;
    /**
     * Type: string
     */
    type?: string;
    /**
     * Type: string
     */
    user_created?: string | null;
}
export interface DirectusOperationsRelations {
    flow?: DirectusFlowsPrimaryKey | DirectusFlows;
    reject?: DirectusOperationsPrimaryKey | DirectusOperations;
    resolve?: DirectusOperationsPrimaryKey | DirectusOperations;
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusOperationsRelatedCollections {
    flow: 'directus_flows';
    reject: 'directus_operations';
    resolve: 'directus_operations';
    user_created: 'directus_users';
}
export interface DirectusOperationsPayload extends Omit<DirectusOperations, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusOperationsPayload parses the given {@link DirectusOperationsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusOperations}.
 */
export declare function parseDirectusOperationsPayload(v: DirectusOperationsPayload): DirectusOperations;
/**
 * parseDirectusOperations parses the given {@link DirectusOperations}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusOperationsPayload}.
 */
export declare function parseDirectusOperations(v: DirectusOperations): DirectusOperationsPayload;
