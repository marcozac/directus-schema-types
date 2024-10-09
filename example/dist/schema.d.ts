export type ChefsPrimaryKeyField = 'id';
export type ChefsPrimaryKey = number;
export interface Chefs {
    readonly id?: number;
    signature_dish?: number | null;
}
export interface ChefsRelations {
    signature_dish: RecipesPrimaryKey | Recipes;
}
export type ChefsPayload = Chefs;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseChefsPayload(v: ChefsPayload): Chefs;
export type DirectusAccessPrimaryKeyField = 'id';
export type DirectusAccessPrimaryKey = string;
export interface DirectusAccess {
    id?: string | null;
    policy?: string;
    role?: string | null;
    sort?: number | null;
    user?: string | null;
}
export interface DirectusAccessRelations {
    policy: DirectusPoliciesPrimaryKey | DirectusPolicies;
    role: DirectusRolesPrimaryKey | DirectusRoles;
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusAccessPayload = DirectusAccess;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusAccessPayload(v: DirectusAccessPayload): DirectusAccess;
export type DirectusActivityPrimaryKeyField = 'id';
export type DirectusActivityPrimaryKey = number;
export interface DirectusActivity {
    action?: string;
    collection?: string;
    comment?: string | null;
    id?: number;
    ip?: string | null;
    item?: string;
    origin?: string | null;
    timestamp?: Date;
    user?: string | null;
    user_agent?: string | null;
}
export interface DirectusActivityRelations {
    revisions: (DirectusRevisionsPrimaryKey | DirectusRevisions)[];
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusActivityPayload = Omit<DirectusActivity, 'timestamp'> & {
    timestamp?: string;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusActivity}.
 */
export declare function parseDirectusActivityPayload(v: DirectusActivityPayload): DirectusActivity;
export type DirectusCollectionsPrimaryKeyField = 'collection';
export type DirectusCollectionsPrimaryKey = string;
export interface DirectusCollections {
    accountability?: string | null;
    archive_app_filter?: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse?: string;
    readonly collection?: string;
    color?: string | null;
    display_template?: string | null;
    group?: string | null;
    hidden?: boolean;
    icon?: string | null;
    item_duplication_fields?: object | null;
    note?: string | null;
    preview_url?: string | null;
    singleton?: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: object | null;
    unarchive_value?: string | null;
    versioning?: boolean;
}
export interface DirectusCollectionsRelations {
    fields: (DirectusFieldsPrimaryKey | DirectusFields)[];
    group: DirectusCollectionsPrimaryKey | DirectusCollections;
}
export type DirectusCollectionsPayload = DirectusCollections;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusCollectionsPayload(v: DirectusCollectionsPayload): DirectusCollections;
export type DirectusDashboardsPrimaryKeyField = 'id';
export type DirectusDashboardsPrimaryKey = string;
export interface DirectusDashboards {
    color?: string | null;
    date_created?: Date | null;
    icon?: string;
    id?: string;
    name?: string;
    note?: string | null;
    user_created?: string | null;
}
export interface DirectusDashboardsRelations {
    panels: (DirectusPanelsPrimaryKey | DirectusPanels)[];
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusDashboardsPayload = Omit<DirectusDashboards, 'date_created'> & {
    date_created?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusDashboards}.
 */
export declare function parseDirectusDashboardsPayload(v: DirectusDashboardsPayload): DirectusDashboards;
export type DirectusExtensionsPrimaryKeyField = 'id';
export type DirectusExtensionsPrimaryKey = string;
export interface DirectusExtensions {
    bundle?: string | null;
    enabled?: boolean;
    folder?: string;
    id?: string;
    source?: string;
}
export interface DirectusExtensionsRelations {
}
export type DirectusExtensionsPayload = DirectusExtensions;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusExtensionsPayload(v: DirectusExtensionsPayload): DirectusExtensions;
export type DirectusFieldsPrimaryKeyField = 'id';
export type DirectusFieldsPrimaryKey = number;
export interface DirectusFields {
    collection?: string;
    conditions?: object | null;
    display?: string | null;
    display_options?: object | null;
    field?: string;
    group?: string | null;
    hidden?: boolean;
    id?: number;
    interface?: string | null;
    note?: string | null;
    options?: object | null;
    readonly?: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: any | null;
    translations?: object | null;
    validation?: object | null;
    validation_message?: string | null;
    width?: string | null;
}
export interface DirectusFieldsRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;
    group: DirectusFieldsPrimaryKey | DirectusFields;
}
export type DirectusFieldsPayload = DirectusFields;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusFieldsPayload(v: DirectusFieldsPayload): DirectusFields;
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
export type DirectusFoldersPrimaryKeyField = 'id';
export type DirectusFoldersPrimaryKey = string;
export interface DirectusFolders {
    id?: string;
    name?: string;
    parent?: string | null;
}
export interface DirectusFoldersRelations {
    parent: DirectusFoldersPrimaryKey | DirectusFolders;
}
export type DirectusFoldersPayload = DirectusFolders;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusFoldersPayload(v: DirectusFoldersPayload): DirectusFolders;
export type DirectusMigrationsPrimaryKeyField = 'version';
export type DirectusMigrationsPrimaryKey = string;
export interface DirectusMigrations {
    name?: string;
    timestamp?: Date | null;
    version?: string;
}
export interface DirectusMigrationsRelations {
}
export type DirectusMigrationsPayload = Omit<DirectusMigrations, 'timestamp'> & {
    timestamp?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusMigrations}.
 */
export declare function parseDirectusMigrationsPayload(v: DirectusMigrationsPayload): DirectusMigrations;
export type DirectusNotificationsPrimaryKeyField = 'id';
export type DirectusNotificationsPrimaryKey = number;
export interface DirectusNotifications {
    collection?: string | null;
    id?: number;
    item?: string | null;
    message?: string | null;
    recipient?: string;
    sender?: string | null;
    status?: string | null;
    subject?: string;
    timestamp?: Date | null;
}
export interface DirectusNotificationsRelations {
    recipient: DirectusUsersPrimaryKey | DirectusUsers;
    sender: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusNotificationsPayload = Omit<DirectusNotifications, 'timestamp'> & {
    timestamp?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusNotifications}.
 */
export declare function parseDirectusNotificationsPayload(v: DirectusNotificationsPayload): DirectusNotifications;
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
export type DirectusPanelsPrimaryKeyField = 'id';
export type DirectusPanelsPrimaryKey = string;
export interface DirectusPanels {
    color?: string | null;
    dashboard?: string;
    date_created?: Date | null;
    height?: number;
    icon?: string | null;
    id?: string;
    name?: string | null;
    note?: string | null;
    options?: object | null;
    position_x?: number;
    position_y?: number;
    show_header?: boolean;
    type?: string;
    user_created?: string | null;
    width?: number;
}
export interface DirectusPanelsRelations {
    dashboard: DirectusDashboardsPrimaryKey | DirectusDashboards;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusPanelsPayload = Omit<DirectusPanels, 'date_created'> & {
    date_created?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusPanels}.
 */
export declare function parseDirectusPanelsPayload(v: DirectusPanelsPayload): DirectusPanels;
export type DirectusPermissionsPrimaryKeyField = 'id';
export type DirectusPermissionsPrimaryKey = number;
export interface DirectusPermissions {
    action?: string;
    collection?: string;
    fields?: any | null;
    id?: number;
    permissions?: object | null;
    policy?: string;
    presets?: object | null;
    validation?: object | null;
}
export interface DirectusPermissionsRelations {
    policy: DirectusPoliciesPrimaryKey | DirectusPolicies;
}
export type DirectusPermissionsPayload = DirectusPermissions;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusPermissionsPayload(v: DirectusPermissionsPayload): DirectusPermissions;
export type DirectusPoliciesPrimaryKeyField = 'id';
export type DirectusPoliciesPrimaryKey = string;
export interface DirectusPolicies {
    admin_access?: boolean;
    app_access?: boolean;
    description?: string | null;
    enforce_tfa?: boolean;
    icon?: string;
    id?: string | null;
    ip_access?: any | null;
    name: string;
}
export interface DirectusPoliciesRelations {
    permissions: (DirectusPermissionsPrimaryKey | DirectusPermissions)[];
    roles: (DirectusAccessPrimaryKey | DirectusAccess)[];
    users: (DirectusAccessPrimaryKey | DirectusAccess)[];
}
export type DirectusPoliciesPayload = DirectusPolicies;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusPoliciesPayload(v: DirectusPoliciesPayload): DirectusPolicies;
export type DirectusPresetsPrimaryKeyField = 'id';
export type DirectusPresetsPrimaryKey = number;
export interface DirectusPresets {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: object | null;
    icon?: string | null;
    id?: number;
    layout?: string | null;
    layout_options?: object | null;
    layout_query?: object | null;
    refresh_interval?: number | null;
    role?: string | null;
    search?: string | null;
    user?: string | null;
}
export interface DirectusPresetsRelations {
    role: DirectusRolesPrimaryKey | DirectusRoles;
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusPresetsPayload = DirectusPresets;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusPresetsPayload(v: DirectusPresetsPayload): DirectusPresets;
export type DirectusRelationsPrimaryKeyField = 'id';
export type DirectusRelationsPrimaryKey = number;
export interface DirectusRelations {
    id?: number;
    junction_field?: string | null;
    many_collection?: string;
    many_field?: string;
    one_allowed_collections?: any | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action?: string;
    one_field?: string | null;
    sort_field?: string | null;
}
export interface DirectusRelationsRelations {
}
export type DirectusRelationsPayload = DirectusRelations;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusRelationsPayload(v: DirectusRelationsPayload): DirectusRelations;
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
export type DirectusRevisionsPayload = DirectusRevisions;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusRevisionsPayload(v: DirectusRevisionsPayload): DirectusRevisions;
export type DirectusRolesPrimaryKeyField = 'id';
export type DirectusRolesPrimaryKey = string;
export interface DirectusRoles {
    description?: string | null;
    icon?: string;
    id?: string;
    name: string;
    parent?: string | null;
}
export interface DirectusRolesRelations {
    children: (DirectusRolesPrimaryKey | DirectusRoles)[];
    parent: DirectusRolesPrimaryKey | DirectusRoles;
    policies: (DirectusAccessPrimaryKey | DirectusAccess)[];
    users: (DirectusUsersPrimaryKey | DirectusUsers)[];
}
export type DirectusRolesPayload = DirectusRoles;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusRolesPayload(v: DirectusRolesPayload): DirectusRoles;
export type DirectusSessionsPrimaryKeyField = 'token';
export type DirectusSessionsPrimaryKey = string;
export interface DirectusSessions {
    expires?: Date;
    ip?: string | null;
    next_token?: string | null;
    origin?: string | null;
    share?: string | null;
    token?: string;
    user?: string | null;
    user_agent?: string | null;
}
export interface DirectusSessionsRelations {
    share: DirectusSharesPrimaryKey | DirectusShares;
    user: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusSessionsPayload = Omit<DirectusSessions, 'expires'> & {
    expires?: string;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusSessions}.
 */
export declare function parseDirectusSessionsPayload(v: DirectusSessionsPayload): DirectusSessions;
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
export type DirectusSharesPrimaryKeyField = 'id';
export type DirectusSharesPrimaryKey = string;
export interface DirectusShares {
    collection?: string;
    readonly date_created?: Date | null;
    date_end?: Date | null;
    date_start?: Date | null;
    readonly id?: string;
    item?: string;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: string | null;
    readonly times_used?: number | null;
    readonly user_created?: string | null;
}
export interface DirectusSharesRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;
    role: DirectusRolesPrimaryKey | DirectusRoles;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusSharesPayload = Omit<DirectusShares, 'date_created' | 'date_end' | 'date_start'> & {
    readonly date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusShares}.
 */
export declare function parseDirectusSharesPayload(v: DirectusSharesPayload): DirectusShares;
export type DirectusTranslationsPrimaryKeyField = 'id';
export type DirectusTranslationsPrimaryKey = string;
export interface DirectusTranslations {
    id?: string;
    key: string;
    language: string;
    value: string;
}
export interface DirectusTranslationsRelations {
}
export type DirectusTranslationsPayload = DirectusTranslations;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusTranslationsPayload(v: DirectusTranslationsPayload): DirectusTranslations;
export type DirectusUsersPrimaryKeyField = 'id';
export type DirectusUsersPrimaryKey = string;
export interface DirectusUsers {
    appearance?: string | null;
    auth_data?: object | null;
    avatar?: string | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id?: string;
    language?: string | null;
    readonly last_access?: Date | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    provider?: string;
    role?: string | null;
    status?: string;
    tags?: object | null;
    tfa_secret?: string | null;
    theme_dark?: string | null;
    theme_dark_overrides?: object | null;
    theme_light?: string | null;
    theme_light_overrides?: object | null;
    title?: string | null;
    token?: string | null;
}
export interface DirectusUsersRelations {
    avatar: DirectusFilesPrimaryKey | DirectusFiles;
    policies: (DirectusAccessPrimaryKey | DirectusAccess)[];
    role: DirectusRolesPrimaryKey | DirectusRoles;
}
export type DirectusUsersPayload = Omit<DirectusUsers, 'last_access'> & {
    readonly last_access?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusUsers}.
 */
export declare function parseDirectusUsersPayload(v: DirectusUsersPayload): DirectusUsers;
export type DirectusVersionsPrimaryKeyField = 'id';
export type DirectusVersionsPrimaryKey = string;
export interface DirectusVersions {
    collection?: string;
    date_created?: Date | null;
    date_updated?: Date | null;
    readonly hash?: string | null;
    readonly id?: string;
    item?: string;
    key?: string;
    name?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
}
export interface DirectusVersionsRelations {
    collection: DirectusCollectionsPrimaryKey | DirectusCollections;
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated: DirectusUsersPrimaryKey | DirectusUsers;
}
export type DirectusVersionsPayload = Omit<DirectusVersions, 'date_created' | 'date_updated'> & {
    date_created?: string | null;
    date_updated?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusVersions}.
 */
export declare function parseDirectusVersionsPayload(v: DirectusVersionsPayload): DirectusVersions;
export type DirectusWebhooksPrimaryKeyField = 'id';
export type DirectusWebhooksPrimaryKey = number;
export interface DirectusWebhooks {
    actions?: any;
    collections?: any;
    data?: boolean;
    headers?: object | null;
    id?: number;
    method?: string;
    migrated_flow?: string | null;
    name?: string;
    status?: string;
    url?: string;
    was_active_before_deprecation?: boolean;
}
export interface DirectusWebhooksRelations {
    migrated_flow: DirectusFlowsPrimaryKey | DirectusFlows;
}
export type DirectusWebhooksPayload = DirectusWebhooks;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseDirectusWebhooksPayload(v: DirectusWebhooksPayload): DirectusWebhooks;
export type IngredientsPrimaryKeyField = 'id';
export type IngredientsPrimaryKey = number;
export interface Ingredients {
    readonly date_created?: Date | null;
    readonly date_updated?: Date | null;
    readonly id?: number;
    name?: string | null;
    readonly user_created?: string | null;
    readonly user_updated?: string | null;
}
export interface IngredientsRelations {
    recipes: (RecipesIngredientsPrimaryKey | RecipesIngredients)[];
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated: DirectusUsersPrimaryKey | DirectusUsers;
}
export type IngredientsPayload = Omit<Ingredients, 'date_created' | 'date_updated'> & {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Ingredients}.
 */
export declare function parseIngredientsPayload(v: IngredientsPayload): Ingredients;
export type RecipesPrimaryKeyField = 'id';
export type RecipesPrimaryKey = number;
export interface Recipes {
    readonly date_created?: Date | null;
    readonly date_updated?: Date | null;
    readonly id?: number;
    readonly user_created?: string | null;
    readonly user_updated?: string | null;
}
export interface RecipesRelations {
    /**
     * NOTE
     * The related field of {@link Chefs} is marked as unique.
     * The resulting array will contain only one element.
     */
    chefs_signature_dish: (ChefsPrimaryKey | Chefs)[];
    ingredients: (RecipesIngredientsPrimaryKey | RecipesIngredients)[];
    user_created: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated: DirectusUsersPrimaryKey | DirectusUsers;
}
export type RecipesPayload = Omit<Recipes, 'date_created' | 'date_updated'> & {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Recipes}.
 */
export declare function parseRecipesPayload(v: RecipesPayload): Recipes;
export type RecipesIngredientsPrimaryKeyField = 'id';
export type RecipesIngredientsPrimaryKey = number;
export interface RecipesIngredients {
    id?: number;
    ingredients_id?: number | null;
    recipes_id?: number | null;
}
export interface RecipesIngredientsRelations {
    ingredients_id: IngredientsPrimaryKey | Ingredients;
    recipes_id: RecipesPrimaryKey | Recipes;
}
export type RecipesIngredientsPayload = RecipesIngredients;
/**
 * @param v The payload to parse.
 * @returns The payload as it is received: it is the same as the schema definition.
 */
export declare function parseRecipesIngredientsPayload(v: RecipesIngredientsPayload): RecipesIngredients;
export interface Schema {
    chefs: Chefs;
    directus_access: DirectusAccess;
    directus_activity: DirectusActivity;
    directus_collections: DirectusCollections;
    directus_dashboards: DirectusDashboards;
    directus_extensions: DirectusExtensions;
    directus_fields: DirectusFields;
    directus_files: DirectusFiles;
    directus_flows: DirectusFlows;
    directus_folders: DirectusFolders;
    directus_migrations: DirectusMigrations;
    directus_notifications: DirectusNotifications;
    directus_operations: DirectusOperations;
    directus_panels: DirectusPanels;
    directus_permissions: DirectusPermissions;
    directus_policies: DirectusPolicies;
    directus_presets: DirectusPresets;
    directus_relations: DirectusRelations;
    directus_revisions: DirectusRevisions;
    directus_roles: DirectusRoles;
    directus_sessions: DirectusSessions;
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares;
    directus_translations: DirectusTranslations;
    directus_users: DirectusUsers;
    directus_versions: DirectusVersions;
    directus_webhooks: DirectusWebhooks;
    ingredients: Ingredients;
    recipes: Recipes;
    recipes_ingredients: RecipesIngredients;
}
export interface Relations {
    chefs: ChefsRelations;
    directus_access: DirectusAccessRelations;
    directus_activity: DirectusActivityRelations;
    directus_collections: DirectusCollectionsRelations;
    directus_dashboards: DirectusDashboardsRelations;
    directus_extensions: DirectusExtensionsRelations;
    directus_fields: DirectusFieldsRelations;
    directus_files: DirectusFilesRelations;
    directus_flows: DirectusFlowsRelations;
    directus_folders: DirectusFoldersRelations;
    directus_migrations: DirectusMigrationsRelations;
    directus_notifications: DirectusNotificationsRelations;
    directus_operations: DirectusOperationsRelations;
    directus_panels: DirectusPanelsRelations;
    directus_permissions: DirectusPermissionsRelations;
    directus_policies: DirectusPoliciesRelations;
    directus_presets: DirectusPresetsRelations;
    directus_relations: DirectusRelationsRelations;
    directus_revisions: DirectusRevisionsRelations;
    directus_roles: DirectusRolesRelations;
    directus_sessions: DirectusSessionsRelations;
    directus_settings: DirectusSettingsRelations;
    directus_shares: DirectusSharesRelations;
    directus_translations: DirectusTranslationsRelations;
    directus_users: DirectusUsersRelations;
    directus_versions: DirectusVersionsRelations;
    directus_webhooks: DirectusWebhooksRelations;
    ingredients: IngredientsRelations;
    recipes: RecipesRelations;
    recipes_ingredients: RecipesIngredientsRelations;
}
