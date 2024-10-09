import { DirectusFilesPrimaryKey, DirectusFiles } from './directus_files';
import { DirectusFoldersPrimaryKey, DirectusFolders } from './directus_folders';
import { DirectusRolesPrimaryKey, DirectusRoles } from './directus_roles';
export type DirectusSettingsPrimaryKeyField = 'id';
export type DirectusSettingsPrimaryKey = number;
export interface DirectusSettings {
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: object | null;
    custom_aspect_ratios?: object | null;
    custom_css?: string | null;
    default_appearance?: string;
    default_language?: string;
    default_theme_dark?: string | null;
    default_theme_light?: string | null;
    id?: number;
    mapbox_key?: string | null;
    module_bar?: object | null;
    project_color?: string;
    project_descriptor?: string | null;
    project_logo?: string | null;
    project_name?: string;
    project_url?: string | null;
    public_background?: string | null;
    public_favicon?: string | null;
    public_foreground?: string | null;
    public_note?: string | null;
    public_registration?: boolean;
    public_registration_email_filter?: object | null;
    public_registration_role?: string | null;
    public_registration_verify_email?: boolean;
    report_bug_url?: string | null;
    report_error_url?: string | null;
    report_feature_url?: string | null;
    storage_asset_presets?: object | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: string | null;
    theme_dark_overrides?: object | null;
    theme_light_overrides?: object | null;
}
export interface DirectusSettingsRelations {
    project_logo: DirectusFilesPrimaryKey | DirectusFiles;
    public_background: DirectusFilesPrimaryKey | DirectusFiles;
    public_favicon: DirectusFilesPrimaryKey | DirectusFiles;
    public_foreground: DirectusFilesPrimaryKey | DirectusFiles;
    public_registration_role: DirectusRolesPrimaryKey | DirectusRoles;
    storage_default_folder: DirectusFoldersPrimaryKey | DirectusFolders;
}
export type DirectusSettingsPayload = DirectusSettings;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusSettingsPayload(v: DirectusSettingsPayload): DirectusSettings;
