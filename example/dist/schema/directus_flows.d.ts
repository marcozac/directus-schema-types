import { DirectusOperationsPrimaryKey, DirectusOperations } from './directus_operations';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusFlowsPrimaryKeyField = 'id';
export type DirectusFlowsPrimaryKey = string;
export interface DirectusFlows {
    accountability?: string | null;
    color?: string | null;
    date_created?: Date | null;
    description?: string | null;
    icon?: string | null;
    id?: string;
    name?: string;
    operation?: string | null;
    options?: object | null;
    status?: string;
    trigger?: string | null;
    user_created?: string | null;
}
export interface DirectusFlowsRelations {
    operation: DirectusOperationsPrimaryKey | DirectusOperations;
    operations: (DirectusOperationsPrimaryKey | DirectusOperations)[];
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusFlowsPayload = Omit<DirectusFlows, 'date_created'> & {
    date_created?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusFlows}.
 */
export declare function parseDirectusFlowsPayload(v: DirectusFlowsPayload): DirectusFlows;
