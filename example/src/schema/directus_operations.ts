// File generated by directus-schema-types. Do not change.

import { DirectusFlowsPrimaryKey, DirectusFlows } from './directus_flows';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';

// --- directus_operations ---

export type DirectusOperationsPrimaryKeyField = 'id';
export type DirectusOperationsPrimaryKey = string;

export interface DirectusOperations {
    // Type: dateTime
    date_created?: Date | null;

    // Type: string
    flow?: string;

    // Type: uuid
    id?: string;

    // Type: string
    key?: string;

    // Type: string
    name?: string | null;

    // Type: json
    options?: object | null;

    // Type: integer
    position_x?: number;

    // Type: integer
    position_y?: number;

    // Type: string
    reject?: string | null;

    // Type: string
    resolve?: string | null;

    // Type: string
    type?: string;

    // Type: string
    user_created?: string | null;
}

export interface DirectusOperationsRelations {
    flow: DirectusFlowsPrimaryKey | DirectusFlows;

    reject: DirectusOperationsPrimaryKey | DirectusOperations;

    resolve: DirectusOperationsPrimaryKey | DirectusOperations;

    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}

/**
 * DirectusOperationsRelatedCollections maps the {@link DirectusOperationsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusOperationsRelatedCollections {
    flow: 'directus_flows';
    reject: 'directus_operations';
    resolve: 'directus_operations';
    user_created: 'directus_users';
}

export type DirectusOperationsPayload = Omit<DirectusOperations, 'date_created'> & {
    // Type: dateTime
    date_created?: string | null;
};

/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusOperations}.
 */
export function parseDirectusOperationsPayload(v: DirectusOperationsPayload): DirectusOperations {
    const r = v as Record<keyof DirectusOperations, unknown>;
    if (v.date_created) {
        r.date_created = new Date(v.date_created);
    }
    return r as DirectusOperations;
}
