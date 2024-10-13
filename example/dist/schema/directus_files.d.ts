import { DirectusFolders, DirectusFoldersPrimaryKey } from './directus_folders';
import { DirectusUsers, DirectusUsersPrimaryKey } from './directus_users';
export type DirectusFilesPrimaryKey = string;
export type DirectusFilesPrimaryKeyField = 'id';
export interface DirectusFiles {
    /**
     * Type: string
     */
    readonly charset?: string | null;
    /**
     * Type: dateTime
     */
    readonly created_on?: Date;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: integer
     */
    readonly duration?: number | null;
    /**
     * Type: string
     */
    embed?: string | null;
    /**
     * Type: string
     */
    readonly filename_disk?: string | null;
    /**
     * Type: string
     */
    filename_download?: string;
    /**
     * Type: bigInteger
     */
    readonly filesize?: number | null;
    /**
     * Type: integer
     */
    focal_point_x?: number | null;
    /**
     * Type: integer
     */
    focal_point_y?: number | null;
    /**
     * Type: string
     */
    readonly folder?: string | null;
    /**
     * Type: integer
     */
    readonly height?: number | null;
    /**
     * Type: uuid
     */
    id?: DirectusFilesPrimaryKey;
    /**
     * Type: text
     */
    location?: string | null;
    /**
     * Type: json
     */
    metadata?: object | null;
    /**
     * Type: string
     */
    readonly modified_by?: string | null;
    /**
     * Type: dateTime
     */
    readonly modified_on?: Date;
    /**
     * Type: string
     */
    readonly storage?: string;
    /**
     * Type: json
     */
    tags?: object | null;
    /**
     * Type: string
     */
    title?: string | null;
    /**
     * Type: json
     */
    tus_data?: object | null;
    /**
     * Type: string
     */
    tus_id?: string | null;
    /**
     * Type: string
     */
    readonly type?: string | null;
    /**
     * Type: string
     */
    uploaded_by?: string | null;
    /**
     * Type: dateTime
     */
    uploaded_on?: Date | null;
    /**
     * Type: integer
     */
    readonly width?: number | null;
}
export interface DirectusFilesRelations {
    readonly folder?: DirectusFoldersPrimaryKey | DirectusFolders;
    readonly modified_by?: DirectusUsersPrimaryKey | DirectusUsers;
    uploaded_by?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusFilesRelatedCollections {
    folder: 'directus_folders';
    modified_by: 'directus_users';
    uploaded_by: 'directus_users';
}
export interface DirectusFilesPayload extends Omit<DirectusFiles, 'created_on' | 'modified_on' | 'uploaded_on'> {
    readonly created_on?: string;
    readonly modified_on?: string;
    uploaded_on?: string | null;
}
/**
 * parseDirectusFilesPayload parses the given {@link DirectusFilesPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusFiles}.
 */
export declare function parseDirectusFilesPayload(v: DirectusFilesPayload): DirectusFiles;
/**
 * parseDirectusFiles parses the given {@link DirectusFiles}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusFilesPayload}.
 */
export declare function parseDirectusFiles(v: DirectusFiles): DirectusFilesPayload;
