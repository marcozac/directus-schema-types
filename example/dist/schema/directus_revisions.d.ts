import { DirectusActivityPrimaryKey, DirectusActivity } from './directus_activity';
import { DirectusVersionsPrimaryKey, DirectusVersions } from './directus_versions';
export type DirectusRevisionsPrimaryKeyField = 'id';
export type DirectusRevisionsPrimaryKey = number;
export interface DirectusRevisions {
    activity?: number;
    collection?: string;
    data?: object | null;
    delta?: object | null;
    id?: number;
    item?: string;
    parent?: number | null;
    version?: string | null;
}
export interface DirectusRevisionsRelations {
    activity: DirectusActivityPrimaryKey | DirectusActivity;
    parent: DirectusRevisionsPrimaryKey | DirectusRevisions;
    version: DirectusVersionsPrimaryKey | DirectusVersions;
}
/**
 * DirectusRevisionsRelatedCollections maps the {@link DirectusRevisionsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusRevisionsRelatedCollections {
    activity: 'directus_activity';
    parent: 'directus_revisions';
    version: 'directus_versions';
}
export type DirectusRevisionsPayload = DirectusRevisions;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusRevisionsPayload(v: DirectusRevisionsPayload): DirectusRevisions;
