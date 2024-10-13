import { DirectusFiles, DirectusFilesPrimaryKey } from './directus_files';
import { DirectusFolders, DirectusFoldersPrimaryKey } from './directus_folders';
import { DirectusRoles, DirectusRolesPrimaryKey } from './directus_roles';
export type DirectusSettingsPrimaryKey = number;
export type DirectusSettingsPrimaryKeyField = 'id';
export interface DirectusSettings {
    /**
     * Type: integer
     */
    auth_login_attempts?: number | null;
    /**
     * Type: string
     */
    auth_password_policy?: string | null;
    /**
     * Type: json
     */
    basemaps?: object | null;
    /**
     * Type: json
     */
    custom_aspect_ratios?: object | null;
    /**
     * Type: text
     */
    custom_css?: string | null;
    /**
     * Type: string
     */
    default_appearance?: string;
    /**
     * Type: string
     */
    default_language?: string;
    /**
     * Type: string
     */
    default_theme_dark?: string | null;
    /**
     * Type: string
     */
    default_theme_light?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusSettingsPrimaryKey;
    /**
     * Type: string
     */
    mapbox_key?: string | null;
    /**
     * Type: json
     */
    module_bar?: object | null;
    /**
     * $t:field_options.directus_settings.project_color_note
     * Type: string
     */
    project_color?: string;
    /**
     * Type: string
     */
    project_descriptor?: string | null;
    /**
     * $t:field_options.directus_settings.project_logo_note
     * Type: string
     */
    project_logo?: string | null;
    /**
     * Type: string
     */
    project_name?: string;
    /**
     * Type: string
     */
    project_url?: string | null;
    /**
     * Type: string
     */
    public_background?: string | null;
    /**
     * $t:field_options.directus_settings.project_favicon_note
     * Type: string
     */
    public_favicon?: string | null;
    /**
     * Type: string
     */
    public_foreground?: string | null;
    /**
     * Type: text
     */
    public_note?: string | null;
    /**
     * $t:fields.directus_settings.public_registration_note
     * Type: boolean
     */
    public_registration?: boolean;
    /**
     * $t:fields.directus_settings.public_registration_email_filter_note
     * Type: json
     */
    public_registration_email_filter?: object | null;
    /**
     * $t:fields.directus_settings.public_registration_role_note
     * Type: string
     */
    public_registration_role?: string | null;
    /**
     * $t:fields.directus_settings.public_registration_verify_email_note
     * Type: boolean
     */
    public_registration_verify_email?: boolean;
    /**
     * Type: string
     */
    report_bug_url?: string | null;
    /**
     * Type: string
     */
    report_error_url?: string | null;
    /**
     * Type: string
     */
    report_feature_url?: string | null;
    /**
     * Type: json
     */
    storage_asset_presets?: object | null;
    /**
     * Type: string
     */
    storage_asset_transform?: string | null;
    /**
     * $t:interfaces.system-folder.field_hint
     * Type: string
     */
    storage_default_folder?: string | null;
    /**
     * Type: json
     */
    theme_dark_overrides?: object | null;
    /**
     * Type: json
     */
    theme_light_overrides?: object | null;
}
export interface DirectusSettingsRelations {
    project_logo?: DirectusFilesPrimaryKey | DirectusFiles;
    public_background?: DirectusFilesPrimaryKey | DirectusFiles;
    public_favicon?: DirectusFilesPrimaryKey | DirectusFiles;
    public_foreground?: DirectusFilesPrimaryKey | DirectusFiles;
    public_registration_role?: DirectusRolesPrimaryKey | DirectusRoles;
    storage_default_folder?: DirectusFoldersPrimaryKey | DirectusFolders;
}
export interface DirectusSettingsRelatedCollections {
    project_logo: 'directus_files';
    public_background: 'directus_files';
    public_favicon: 'directus_files';
    public_foreground: 'directus_files';
    public_registration_role: 'directus_roles';
    storage_default_folder: 'directus_folders';
}
