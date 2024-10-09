import { DirectusFoldersPrimaryKey, DirectusFolders } from './directus_folders';
import { DirectusUsersPrimaryKey, DirectusUsers } from './directus_users';
export type DirectusFilesPrimaryKeyField = 'id';
export type DirectusFilesPrimaryKey = string;
export interface DirectusFiles {
    readonly charset?: string | null;
    readonly created_on?: Date;
    description?: string | null;
    readonly duration?: number | null;
    embed?: string | null;
    readonly filename_disk?: string | null;
    filename_download?: string;
    readonly filesize?: number | null;
    focal_point_x?: number | null;
    focal_point_y?: number | null;
    readonly folder?: string | null;
    readonly height?: number | null;
    id?: string;
    location?: string | null;
    metadata?: object | null;
    readonly modified_by?: string | null;
    readonly modified_on?: Date;
    readonly storage?: string;
    tags?: object | null;
    title?: string | null;
    tus_data?: object | null;
    tus_id?: string | null;
    readonly type?: string | null;
    uploaded_by?: string | null;
    uploaded_on?: Date | null;
    readonly width?: number | null;
}
export interface DirectusFilesRelations {
    folder: DirectusFoldersPrimaryKey | DirectusFolders;
    modified_by: DirectusUsersPrimaryKey | DirectusUsers;
    uploaded_by: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusFilesPayload = Omit<DirectusFiles, 'created_on' | 'modified_on' | 'uploaded_on'> & {
    readonly created_on?: string;
    readonly modified_on?: string;
    uploaded_on?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusFiles}.
 */
export declare function parseDirectusFilesPayload(v: DirectusFilesPayload): DirectusFiles;
