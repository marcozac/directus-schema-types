import { DirectusActivity, DirectusActivityPrimaryKey } from './directus_activity';
import { DirectusVersions, DirectusVersionsPrimaryKey } from './directus_versions';
export type DirectusRevisionsPrimaryKey = number;
export type DirectusRevisionsPrimaryKeyField = 'id';
export interface DirectusRevisions {
    /**
     * Type: integer
     */
    activity?: number;
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: json
     */
    data?: object | null;
    /**
     * Type: json
     */
    delta?: object | null;
    /**
     * Type: integer
     */
    id?: DirectusRevisionsPrimaryKey;
    /**
     * Type: string
     */
    item?: string;
    /**
     * Type: integer
     */
    parent?: number | null;
    /**
     * Type: string
     */
    version?: string | null;
}
export interface DirectusRevisionsRelations {
    activity?: DirectusActivityPrimaryKey | DirectusActivity;
    parent?: DirectusRevisionsPrimaryKey | DirectusRevisions;
    version?: DirectusVersionsPrimaryKey | DirectusVersions;
}
export interface DirectusRevisionsRelatedCollections {
    activity: 'directus_activity';
    parent: 'directus_revisions';
    version: 'directus_versions';
}
