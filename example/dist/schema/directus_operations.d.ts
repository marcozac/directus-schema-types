import { DirectusFlowsPrimaryKey, DirectusFlows } from './directus_flows';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusOperationsPrimaryKeyField = 'id';
export type DirectusOperationsPrimaryKey = string;
export interface DirectusOperations {
    date_created?: Date | null;
    flow?: string;
    id?: string;
    key?: string;
    name?: string | null;
    options?: object | null;
    position_x?: number;
    position_y?: number;
    reject?: string | null;
    resolve?: string | null;
    type?: string;
    user_created?: string | null;
}
export interface DirectusOperationsRelations {
    flow: DirectusFlowsPrimaryKey | DirectusFlows;
    reject: DirectusOperationsPrimaryKey | DirectusOperations;
    resolve: DirectusOperationsPrimaryKey | DirectusOperations;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusOperationsPayload = Omit<DirectusOperations, 'date_created'> & {
    date_created?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusOperations}.
 */
export declare function parseDirectusOperationsPayload(v: DirectusOperationsPayload): DirectusOperations;
