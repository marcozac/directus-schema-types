import { InventoryItem } from '../external.js';
export type ChefsPrimaryKey = number;
export type ChefsPrimaryKeyField = 'id';
export interface Chefs {
    /**
     * Type: integer
     */
    readonly id?: ChefsPrimaryKey;
    /**
     * Type: integer
     */
    signature_dish?: number | null;
}
export interface ChefsRelations {
    signature_dish?: RecipesPrimaryKey | Recipes;
}
export interface ChefsRelatedCollections {
    signature_dish: 'recipes';
}
export type DirectusAccessPrimaryKey = string;
export type DirectusAccessPrimaryKeyField = 'id';
export interface DirectusAccess {
    /**
     * Type: uuid
     */
    id?: DirectusAccessPrimaryKey;
    /**
     * Type: string
     */
    policy?: string;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: integer
     */
    sort?: number | null;
    /**
     * Type: string
     */
    user?: string | null;
}
export interface DirectusAccessRelations {
    policy?: DirectusPoliciesPrimaryKey | DirectusPolicies;
    role?: DirectusRolesPrimaryKey | DirectusRoles;
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusAccessRelatedCollections {
    policy: 'directus_policies';
    role: 'directus_roles';
    user: 'directus_users';
}
export type DirectusActivityPrimaryKey = number;
export type DirectusActivityPrimaryKeyField = 'id';
export interface DirectusActivity {
    /**
     * Type: string
     */
    action?: string;
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: text
     */
    comment?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusActivityPrimaryKey;
    /**
     * Type: string
     */
    ip?: string | null;
    /**
     * Type: string
     */
    item?: string;
    /**
     * Type: string
     */
    origin?: string | null;
    /**
     * Type: timestamp
     */
    timestamp?: Date;
    /**
     * Type: string
     */
    user?: string | null;
    /**
     * Type: text
     */
    user_agent?: string | null;
}
export interface DirectusActivityRelations {
    revisions?: DirectusRevisionsPrimaryKey[] | DirectusRevisions[];
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusActivityRelatedCollections {
    revisions: 'directus_revisions';
    user: 'directus_users';
}
export interface DirectusActivityPayload extends Omit<DirectusActivity, 'timestamp'> {
    timestamp?: string;
}
/**
 * parseDirectusActivityPayload parses the given {@link DirectusActivityPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusActivity}.
 */
export declare function parseDirectusActivityPayload(v: DirectusActivityPayload): DirectusActivity;
/**
 * parseDirectusActivity parses the given {@link DirectusActivity}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusActivityPayload}.
 */
export declare function parseDirectusActivity(v: DirectusActivity): DirectusActivityPayload;
export type DirectusCollectionsPrimaryKey = string;
export type DirectusCollectionsPrimaryKeyField = 'collection';
export interface DirectusCollections {
    /**
     * Type: string
     */
    accountability?: string | null;
    /**
     * Type: boolean
     */
    archive_app_filter?: boolean;
    /**
     * Type: string
     */
    archive_field?: string | null;
    /**
     * Type: string
     */
    archive_value?: string | null;
    /**
     * Type: string
     */
    collapse?: string;
    /**
     * Type: string
     */
    readonly collection?: DirectusCollectionsPrimaryKey;
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: string
     */
    display_template?: string | null;
    /**
     * Type: string
     */
    group?: string | null;
    /**
     * Type: boolean
     */
    hidden?: boolean;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: json
     */
    item_duplication_fields?: object | null;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: string
     */
    preview_url?: string | null;
    /**
     * Type: boolean
     */
    singleton?: boolean;
    /**
     * Type: integer
     */
    sort?: number | null;
    /**
     * Type: string
     */
    sort_field?: string | null;
    /**
     * Type: json
     */
    translations?: object | null;
    /**
     * Type: string
     */
    unarchive_value?: string | null;
    /**
     * Type: boolean
     */
    versioning?: boolean;
}
export interface DirectusCollectionsRelations {
    group?: DirectusCollectionsPrimaryKey | DirectusCollections;
}
export interface DirectusCollectionsRelatedCollections {
    group: 'directus_collections';
}
export type DirectusDashboardsPrimaryKey = string;
export type DirectusDashboardsPrimaryKeyField = 'id';
export interface DirectusDashboards {
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: timestamp
     */
    date_created?: Date | null;
    /**
     * Type: string
     */
    icon?: string;
    /**
     * Type: uuid
     */
    id?: DirectusDashboardsPrimaryKey;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: string
     */
    user_created?: string | null;
}
export interface DirectusDashboardsRelations {
    panels?: DirectusPanelsPrimaryKey[] | DirectusPanels[];
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusDashboardsRelatedCollections {
    panels: 'directus_panels';
    user_created: 'directus_users';
}
export interface DirectusDashboardsPayload extends Omit<DirectusDashboards, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusDashboardsPayload parses the given {@link DirectusDashboardsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusDashboards}.
 */
export declare function parseDirectusDashboardsPayload(v: DirectusDashboardsPayload): DirectusDashboards;
/**
 * parseDirectusDashboards parses the given {@link DirectusDashboards}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusDashboardsPayload}.
 */
export declare function parseDirectusDashboards(v: DirectusDashboards): DirectusDashboardsPayload;
export type DirectusExtensionsPrimaryKey = string;
export type DirectusExtensionsPrimaryKeyField = 'id';
export interface DirectusExtensions {
    /**
     * Type: string
     */
    bundle?: string | null;
    /**
     * Type: boolean
     */
    enabled?: boolean;
    /**
     * Type: string
     */
    folder?: string;
    /**
     * Type: uuid
     */
    id?: DirectusExtensionsPrimaryKey;
    /**
     * Type: string
     */
    source?: string;
}
export interface DirectusExtensionsRelations {
}
export interface DirectusExtensionsRelatedCollections {
}
export type DirectusFieldsPrimaryKey = number;
export type DirectusFieldsPrimaryKeyField = 'id';
export interface DirectusFields {
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: json
     */
    conditions?: object | null;
    /**
     * Type: string
     */
    display?: string | null;
    /**
     * Type: json
     */
    display_options?: object | null;
    /**
     * Type: string
     */
    field?: string;
    /**
     * Type: string
     */
    group?: string | null;
    /**
     * Type: boolean
     */
    hidden?: boolean;
    /**
     * Type: integer
     */
    id?: DirectusFieldsPrimaryKey;
    /**
     * Type: string
     */
    interface?: string | null;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: boolean
     */
    readonly?: boolean;
    /**
     * Type: boolean
     */
    required?: boolean | null;
    /**
     * Type: integer
     */
    sort?: number | null;
    /**
     * Type: csv
     */
    special?: any | null;
    /**
     * Type: json
     */
    translations?: object | null;
    /**
     * Type: json
     */
    validation?: object | null;
    /**
     * Type: text
     */
    validation_message?: string | null;
    /**
     * Type: string
     */
    width?: string | null;
}
export interface DirectusFieldsRelations {
    collection?: DirectusCollectionsPrimaryKey | DirectusCollections;
    group?: DirectusFieldsPrimaryKey | DirectusFields;
}
export interface DirectusFieldsRelatedCollections {
    collection: 'directus_collections';
    group: 'directus_fields';
}
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
export type DirectusFlowsPrimaryKey = string;
export type DirectusFlowsPrimaryKeyField = 'id';
export interface DirectusFlows {
    /**
     * Type: string
     */
    accountability?: string | null;
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: dateTime
     */
    date_created?: Date | null;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: uuid
     */
    id?: DirectusFlowsPrimaryKey;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: string
     */
    operation?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: string
     */
    status?: string;
    /**
     * Type: string
     */
    trigger?: string | null;
    /**
     * Type: string
     */
    user_created?: string | null;
}
export interface DirectusFlowsRelations {
    operation?: DirectusOperationsPrimaryKey | DirectusOperations;
    operations?: DirectusOperationsPrimaryKey[] | DirectusOperations[];
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusFlowsRelatedCollections {
    operation: 'directus_operations';
    operations: 'directus_operations';
    user_created: 'directus_users';
}
export interface DirectusFlowsPayload extends Omit<DirectusFlows, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusFlowsPayload parses the given {@link DirectusFlowsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusFlows}.
 */
export declare function parseDirectusFlowsPayload(v: DirectusFlowsPayload): DirectusFlows;
/**
 * parseDirectusFlows parses the given {@link DirectusFlows}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusFlowsPayload}.
 */
export declare function parseDirectusFlows(v: DirectusFlows): DirectusFlowsPayload;
export type DirectusFoldersPrimaryKey = string;
export type DirectusFoldersPrimaryKeyField = 'id';
export interface DirectusFolders {
    /**
     * Type: uuid
     */
    id?: DirectusFoldersPrimaryKey;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: string
     */
    parent?: string | null;
}
export interface DirectusFoldersRelations {
    parent?: DirectusFoldersPrimaryKey | DirectusFolders;
}
export interface DirectusFoldersRelatedCollections {
    parent: 'directus_folders';
}
export type DirectusMigrationsPrimaryKey = string;
export type DirectusMigrationsPrimaryKeyField = 'version';
export interface DirectusMigrations {
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: dateTime
     */
    timestamp?: Date | null;
    /**
     * Type: string
     */
    version?: DirectusMigrationsPrimaryKey;
}
export interface DirectusMigrationsRelations {
}
export interface DirectusMigrationsRelatedCollections {
}
export interface DirectusMigrationsPayload extends Omit<DirectusMigrations, 'timestamp'> {
    timestamp?: string | null;
}
/**
 * parseDirectusMigrationsPayload parses the given {@link DirectusMigrationsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusMigrations}.
 */
export declare function parseDirectusMigrationsPayload(v: DirectusMigrationsPayload): DirectusMigrations;
/**
 * parseDirectusMigrations parses the given {@link DirectusMigrations}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusMigrationsPayload}.
 */
export declare function parseDirectusMigrations(v: DirectusMigrations): DirectusMigrationsPayload;
export type DirectusNotificationsPrimaryKey = number;
export type DirectusNotificationsPrimaryKeyField = 'id';
export interface DirectusNotifications {
    /**
     * Type: string
     */
    collection?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusNotificationsPrimaryKey;
    /**
     * Type: string
     */
    item?: string | null;
    /**
     * Type: text
     */
    message?: string | null;
    /**
     * Type: string
     */
    recipient?: string;
    /**
     * Type: string
     */
    sender?: string | null;
    /**
     * Type: string
     */
    status?: string | null;
    /**
     * Type: string
     */
    subject?: string;
    /**
     * Type: timestamp
     */
    timestamp?: Date | null;
}
export interface DirectusNotificationsRelations {
    recipient?: DirectusUsersPrimaryKey | DirectusUsers;
    sender?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusNotificationsRelatedCollections {
    recipient: 'directus_users';
    sender: 'directus_users';
}
export interface DirectusNotificationsPayload extends Omit<DirectusNotifications, 'timestamp'> {
    timestamp?: string | null;
}
/**
 * parseDirectusNotificationsPayload parses the given {@link DirectusNotificationsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusNotifications}.
 */
export declare function parseDirectusNotificationsPayload(v: DirectusNotificationsPayload): DirectusNotifications;
/**
 * parseDirectusNotifications parses the given {@link DirectusNotifications}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusNotificationsPayload}.
 */
export declare function parseDirectusNotifications(v: DirectusNotifications): DirectusNotificationsPayload;
export type DirectusOperationsPrimaryKey = string;
export type DirectusOperationsPrimaryKeyField = 'id';
export interface DirectusOperations {
    /**
     * Type: dateTime
     */
    date_created?: Date | null;
    /**
     * Type: string
     */
    flow?: string;
    /**
     * Type: uuid
     */
    id?: DirectusOperationsPrimaryKey;
    /**
     * Type: string
     */
    key?: string;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: integer
     */
    position_x?: number;
    /**
     * Type: integer
     */
    position_y?: number;
    /**
     * Type: string
     */
    reject?: string | null;
    /**
     * Type: string
     */
    resolve?: string | null;
    /**
     * Type: string
     */
    type?: string;
    /**
     * Type: string
     */
    user_created?: string | null;
}
export interface DirectusOperationsRelations {
    flow?: DirectusFlowsPrimaryKey | DirectusFlows;
    reject?: DirectusOperationsPrimaryKey | DirectusOperations;
    resolve?: DirectusOperationsPrimaryKey | DirectusOperations;
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusOperationsRelatedCollections {
    flow: 'directus_flows';
    reject: 'directus_operations';
    resolve: 'directus_operations';
    user_created: 'directus_users';
}
export interface DirectusOperationsPayload extends Omit<DirectusOperations, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusOperationsPayload parses the given {@link DirectusOperationsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusOperations}.
 */
export declare function parseDirectusOperationsPayload(v: DirectusOperationsPayload): DirectusOperations;
/**
 * parseDirectusOperations parses the given {@link DirectusOperations}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusOperationsPayload}.
 */
export declare function parseDirectusOperations(v: DirectusOperations): DirectusOperationsPayload;
export type DirectusPanelsPrimaryKey = string;
export type DirectusPanelsPrimaryKeyField = 'id';
export interface DirectusPanels {
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: string
     */
    dashboard?: string;
    /**
     * Type: timestamp
     */
    date_created?: Date | null;
    /**
     * Type: integer
     */
    height?: number;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: uuid
     */
    id?: DirectusPanelsPrimaryKey;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * Type: text
     */
    note?: string | null;
    /**
     * Type: json
     */
    options?: object | null;
    /**
     * Type: integer
     */
    position_x?: number;
    /**
     * Type: integer
     */
    position_y?: number;
    /**
     * Type: boolean
     */
    show_header?: boolean;
    /**
     * Type: string
     */
    type?: string;
    /**
     * Type: string
     */
    user_created?: string | null;
    /**
     * Type: integer
     */
    width?: number;
}
export interface DirectusPanelsRelations {
    dashboard?: DirectusDashboardsPrimaryKey | DirectusDashboards;
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusPanelsRelatedCollections {
    dashboard: 'directus_dashboards';
    user_created: 'directus_users';
}
export interface DirectusPanelsPayload extends Omit<DirectusPanels, 'date_created'> {
    date_created?: string | null;
}
/**
 * parseDirectusPanelsPayload parses the given {@link DirectusPanelsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusPanels}.
 */
export declare function parseDirectusPanelsPayload(v: DirectusPanelsPayload): DirectusPanels;
/**
 * parseDirectusPanels parses the given {@link DirectusPanels}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusPanelsPayload}.
 */
export declare function parseDirectusPanels(v: DirectusPanels): DirectusPanelsPayload;
export type DirectusPermissionsPrimaryKey = number;
export type DirectusPermissionsPrimaryKeyField = 'id';
export interface DirectusPermissions {
    /**
     * Type: string
     */
    action?: string;
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: csv
     */
    fields?: any | null;
    /**
     * Type: integer
     */
    id?: DirectusPermissionsPrimaryKey;
    /**
     * Type: json
     */
    permissions?: object | null;
    /**
     * Type: string
     */
    policy?: string;
    /**
     * Type: json
     */
    presets?: object | null;
    /**
     * Type: json
     */
    validation?: object | null;
}
export interface DirectusPermissionsRelations {
    policy?: DirectusPoliciesPrimaryKey | DirectusPolicies;
}
export interface DirectusPermissionsRelatedCollections {
    policy: 'directus_policies';
}
export type DirectusPoliciesPrimaryKey = string;
export type DirectusPoliciesPrimaryKeyField = 'id';
export interface DirectusPolicies {
    /**
     * Type: boolean
     */
    admin_access?: boolean;
    /**
     * Type: boolean
     */
    app_access?: boolean;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * $t:field_options.directus_policies.enforce_tfa
     * Type: boolean
     */
    enforce_tfa?: boolean;
    /**
     * Type: string
     */
    icon?: string;
    /**
     * Type: uuid
     */
    id?: DirectusPoliciesPrimaryKey;
    /**
     * Type: csv
     */
    ip_access?: any | null;
    /**
     * Type: string
     */
    name: string;
}
export interface DirectusPoliciesRelations {
    permissions?: DirectusPermissionsPrimaryKey[] | DirectusPermissions[];
    roles?: DirectusAccessPrimaryKey[] | DirectusAccess[];
    users?: DirectusAccessPrimaryKey[] | DirectusAccess[];
}
export interface DirectusPoliciesRelatedCollections {
    permissions: 'directus_permissions';
    roles: 'directus_access';
    users: 'directus_access';
}
export type DirectusPresetsPrimaryKey = number;
export type DirectusPresetsPrimaryKeyField = 'id';
export interface DirectusPresets {
    /**
     * Type: string
     */
    bookmark?: string | null;
    /**
     * Type: string
     */
    collection?: string | null;
    /**
     * Type: string
     */
    color?: string | null;
    /**
     * Type: json
     */
    filter?: object | null;
    /**
     * Type: string
     */
    icon?: string | null;
    /**
     * Type: integer
     */
    id?: DirectusPresetsPrimaryKey;
    /**
     * Type: string
     */
    layout?: string | null;
    /**
     * Type: json
     */
    layout_options?: object | null;
    /**
     * Type: json
     */
    layout_query?: object | null;
    /**
     * Type: integer
     */
    refresh_interval?: number | null;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: string
     */
    search?: string | null;
    /**
     * Type: string
     */
    user?: string | null;
}
export interface DirectusPresetsRelations {
    role?: DirectusRolesPrimaryKey | DirectusRoles;
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusPresetsRelatedCollections {
    role: 'directus_roles';
    user: 'directus_users';
}
export type DirectusRelationsPrimaryKey = number;
export type DirectusRelationsPrimaryKeyField = 'id';
export interface DirectusRelations {
    /**
     * Type: integer
     */
    id?: DirectusRelationsPrimaryKey;
    /**
     * Type: string
     */
    junction_field?: string | null;
    /**
     * Type: string
     */
    many_collection?: string;
    /**
     * Type: string
     */
    many_field?: string;
    /**
     * Type: csv
     */
    one_allowed_collections?: any | null;
    /**
     * Type: string
     */
    one_collection?: string | null;
    /**
     * Type: string
     */
    one_collection_field?: string | null;
    /**
     * Type: string
     */
    one_deselect_action?: string;
    /**
     * Type: string
     */
    one_field?: string | null;
    /**
     * Type: string
     */
    sort_field?: string | null;
}
export interface DirectusRelationsRelations {
}
export interface DirectusRelationsRelatedCollections {
}
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
export type DirectusRolesPrimaryKey = string;
export type DirectusRolesPrimaryKeyField = 'id';
export interface DirectusRoles {
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: string
     */
    icon?: string;
    /**
     * Type: uuid
     */
    id?: DirectusRolesPrimaryKey;
    /**
     * Type: string
     */
    name: string;
    /**
     * $t:field_options.directus_roles.parent_note
     * Type: string
     */
    parent?: string | null;
}
export interface DirectusRolesRelations {
    children?: DirectusRolesPrimaryKey[] | DirectusRoles[];
    parent?: DirectusRolesPrimaryKey | DirectusRoles;
    policies?: DirectusAccessPrimaryKey[] | DirectusAccess[];
    users?: DirectusUsersPrimaryKey[] | DirectusUsers[];
}
export interface DirectusRolesRelatedCollections {
    children: 'directus_roles';
    parent: 'directus_roles';
    policies: 'directus_access';
    users: 'directus_users';
}
export type DirectusSessionsPrimaryKey = string;
export type DirectusSessionsPrimaryKeyField = 'token';
export interface DirectusSessions {
    /**
     * Type: dateTime
     */
    expires?: Date;
    /**
     * Type: string
     */
    ip?: string | null;
    /**
     * Type: string
     */
    next_token?: string | null;
    /**
     * Type: string
     */
    origin?: string | null;
    /**
     * Type: string
     */
    share?: string | null;
    /**
     * Type: string
     */
    token?: DirectusSessionsPrimaryKey;
    /**
     * Type: string
     */
    user?: string | null;
    /**
     * Type: text
     */
    user_agent?: string | null;
}
export interface DirectusSessionsRelations {
    share?: DirectusSharesPrimaryKey | DirectusShares;
    user?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusSessionsRelatedCollections {
    share: 'directus_shares';
    user: 'directus_users';
}
export interface DirectusSessionsPayload extends Omit<DirectusSessions, 'expires'> {
    expires?: string;
}
/**
 * parseDirectusSessionsPayload parses the given {@link DirectusSessionsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusSessions}.
 */
export declare function parseDirectusSessionsPayload(v: DirectusSessionsPayload): DirectusSessions;
/**
 * parseDirectusSessions parses the given {@link DirectusSessions}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusSessionsPayload}.
 */
export declare function parseDirectusSessions(v: DirectusSessions): DirectusSessionsPayload;
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
export type DirectusSharesPrimaryKey = string;
export type DirectusSharesPrimaryKeyField = 'id';
export interface DirectusShares {
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: timestamp
     */
    readonly date_created?: Date | null;
    /**
     * $t:shared_leave_blank_for_unlimited
     * Type: dateTime
     */
    date_end?: Date | null;
    /**
     * $t:shared_leave_blank_for_unlimited
     * Type: dateTime
     */
    date_start?: Date | null;
    /**
     * Type: uuid
     */
    readonly id?: DirectusSharesPrimaryKey;
    /**
     * Type: string
     */
    item?: string;
    /**
     * $t:shared_leave_blank_for_unlimited
     * Type: integer
     */
    max_uses?: number | null;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * $t:shared_leave_blank_for_passwordless_access
     * Type: hash
     */
    password?: string | null;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: integer
     */
    readonly times_used?: number | null;
    /**
     * Type: string
     */
    readonly user_created?: string | null;
}
export interface DirectusSharesRelations {
    collection?: DirectusCollectionsPrimaryKey | DirectusCollections;
    role?: DirectusRolesPrimaryKey | DirectusRoles;
    readonly user_created?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusSharesRelatedCollections {
    collection: 'directus_collections';
    role: 'directus_roles';
    user_created: 'directus_users';
}
export interface DirectusSharesPayload extends Omit<DirectusShares, 'date_created' | 'date_end' | 'date_start'> {
    readonly date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
}
/**
 * parseDirectusSharesPayload parses the given {@link DirectusSharesPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusShares}.
 */
export declare function parseDirectusSharesPayload(v: DirectusSharesPayload): DirectusShares;
/**
 * parseDirectusShares parses the given {@link DirectusShares}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusSharesPayload}.
 */
export declare function parseDirectusShares(v: DirectusShares): DirectusSharesPayload;
export type DirectusTranslationsPrimaryKey = string;
export type DirectusTranslationsPrimaryKeyField = 'id';
export interface DirectusTranslations {
    /**
     * Type: uuid
     */
    id?: DirectusTranslationsPrimaryKey;
    /**
     * Type: string
     */
    key: string;
    /**
     * Type: string
     */
    language: string;
    /**
     * Type: text
     */
    value: string;
}
export interface DirectusTranslationsRelations {
}
export interface DirectusTranslationsRelatedCollections {
}
export type DirectusUsersPrimaryKey = string;
export type DirectusUsersPrimaryKeyField = 'id';
export interface DirectusUsers {
    /**
     * Type: string
     */
    appearance?: string | null;
    /**
     * Type: json
     */
    auth_data?: object | null;
    /**
     * Type: string
     */
    avatar?: string | null;
    /**
     * Type: text
     */
    description?: string | null;
    /**
     * Type: string
     */
    email?: string | null;
    /**
     * Type: boolean
     */
    email_notifications?: boolean | null;
    /**
     * Type: string
     */
    external_identifier?: string | null;
    /**
     * Type: string
     */
    first_name?: string | null;
    /**
     * Type: uuid
     */
    id?: DirectusUsersPrimaryKey;
    /**
     * Type: string
     */
    language?: string | null;
    /**
     * Type: dateTime
     */
    readonly last_access?: Date | null;
    /**
     * Type: string
     */
    last_name?: string | null;
    /**
     * Type: string
     */
    last_page?: string | null;
    /**
     * Type: string
     */
    location?: string | null;
    /**
     * Type: hash
     */
    password?: string | null;
    /**
     * Type: string
     */
    provider?: string;
    /**
     * Type: string
     */
    role?: string | null;
    /**
     * Type: string
     */
    status?: string;
    /**
     * Type: json
     */
    tags?: object | null;
    /**
     * Type: string
     */
    tfa_secret?: string | null;
    /**
     * Type: string
     */
    theme_dark?: string | null;
    /**
     * Type: json
     */
    theme_dark_overrides?: object | null;
    /**
     * Type: string
     */
    theme_light?: string | null;
    /**
     * Type: json
     */
    theme_light_overrides?: object | null;
    /**
     * Type: string
     */
    title?: string | null;
    /**
     * Type: string
     */
    token?: string | null;
}
export interface DirectusUsersRelations {
    avatar?: DirectusFilesPrimaryKey | DirectusFiles;
    policies?: DirectusAccessPrimaryKey[] | DirectusAccess[];
    role?: DirectusRolesPrimaryKey | DirectusRoles;
}
export interface DirectusUsersRelatedCollections {
    avatar: 'directus_files';
    policies: 'directus_access';
    role: 'directus_roles';
}
export interface DirectusUsersPayload extends Omit<DirectusUsers, 'last_access'> {
    readonly last_access?: string | null;
}
/**
 * parseDirectusUsersPayload parses the given {@link DirectusUsersPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusUsers}.
 */
export declare function parseDirectusUsersPayload(v: DirectusUsersPayload): DirectusUsers;
/**
 * parseDirectusUsers parses the given {@link DirectusUsers}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusUsersPayload}.
 */
export declare function parseDirectusUsers(v: DirectusUsers): DirectusUsersPayload;
export type DirectusVersionsPrimaryKey = string;
export type DirectusVersionsPrimaryKeyField = 'id';
export interface DirectusVersions {
    /**
     * Type: string
     */
    collection?: string;
    /**
     * Type: timestamp
     */
    date_created?: Date | null;
    /**
     * Type: timestamp
     */
    date_updated?: Date | null;
    /**
     * Type: string
     */
    readonly hash?: string | null;
    /**
     * Type: uuid
     */
    readonly id?: DirectusVersionsPrimaryKey;
    /**
     * Type: string
     */
    item?: string;
    /**
     * Type: string
     */
    key?: string;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * Type: string
     */
    user_created?: string | null;
    /**
     * Type: string
     */
    user_updated?: string | null;
}
export interface DirectusVersionsRelations {
    collection?: DirectusCollectionsPrimaryKey | DirectusCollections;
    user_created?: DirectusUsersPrimaryKey | DirectusUsers;
    user_updated?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface DirectusVersionsRelatedCollections {
    collection: 'directus_collections';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export interface DirectusVersionsPayload extends Omit<DirectusVersions, 'date_created' | 'date_updated'> {
    date_created?: string | null;
    date_updated?: string | null;
}
/**
 * parseDirectusVersionsPayload parses the given {@link DirectusVersionsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusVersions}.
 */
export declare function parseDirectusVersionsPayload(v: DirectusVersionsPayload): DirectusVersions;
/**
 * parseDirectusVersions parses the given {@link DirectusVersions}.
 * @param v The object to parse.
 * @returns The payload {@link DirectusVersionsPayload}.
 */
export declare function parseDirectusVersions(v: DirectusVersions): DirectusVersionsPayload;
export type DirectusWebhooksPrimaryKey = number;
export type DirectusWebhooksPrimaryKeyField = 'id';
export interface DirectusWebhooks {
    /**
     * Type: csv
     */
    actions?: any;
    /**
     * Type: csv
     */
    collections?: any;
    /**
     * Type: boolean
     */
    data?: boolean;
    /**
     * Type: json
     */
    headers?: object | null;
    /**
     * Type: integer
     */
    id?: DirectusWebhooksPrimaryKey;
    /**
     * Type: string
     */
    method?: string;
    /**
     * Type: string
     */
    migrated_flow?: string | null;
    /**
     * Type: string
     */
    name?: string;
    /**
     * Type: string
     */
    status?: string;
    /**
     * Type: string
     */
    url?: string;
    /**
     * Type: boolean
     */
    was_active_before_deprecation?: boolean;
}
export interface DirectusWebhooksRelations {
    migrated_flow?: DirectusFlowsPrimaryKey | DirectusFlows;
}
export interface DirectusWebhooksRelatedCollections {
    migrated_flow: 'directus_flows';
}
export type IngredientsPrimaryKey = number;
export type IngredientsPrimaryKeyField = 'id';
export type IngredientsLabelColorType = 'blue' | 'red';
export declare enum IngredientsShelfPositionEnum {
    Shelf1 = 1,
    Shelf2 = 2,
    Shelf3 = 3
}
export declare enum IngredientsStatusEnum {
    Available = "available",
    NotAvailable = "not_available",
    Restock = "restock"
}
export interface Ingredients {
    /**
     * Type: timestamp
     */
    readonly date_created?: Date | null;
    /**
     * Type: timestamp
     */
    readonly date_updated?: Date | null;
    /**
     * Type: string
     */
    description_long: string;
    /**
     * Type: string
     */
    description_short: string | null;
    /**
     * Type: string
     */
    external_inventory_id?: InventoryItem | null;
    /**
     * Type: integer
     */
    readonly id?: IngredientsPrimaryKey;
    /**
     * Type: string
     */
    label_color?: IngredientsLabelColorType | null;
    /**
     * Type: string
     */
    name?: string | null;
    /**
     * This is the (numbered) shelf position
     * Type: integer
     */
    shelf_position?: IngredientsShelfPositionEnum | null;
    /**
     * This is the current availability of the ingredient
     * Type: string
     */
    status?: IngredientsStatusEnum | null;
    /**
     * Type: string
     */
    readonly user_created?: string | null;
    /**
     * Type: string
     */
    readonly user_updated?: string | null;
}
export interface IngredientsRelations {
    recipes?: RecipesIngredientsPrimaryKey[] | RecipesIngredients[];
    readonly user_created?: DirectusUsersPrimaryKey | DirectusUsers;
    readonly user_updated?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface IngredientsRelatedCollections {
    recipes: 'recipes_ingredients';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export interface IngredientsPayload extends Omit<Ingredients, 'date_created' | 'date_updated' | 'external_inventory_id' | 'label_color' | 'shelf_position' | 'status'> {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
    external_inventory_id?: string | null;
    label_color?: string | null;
    shelf_position?: number | null;
    status?: string | null;
}
/**
 * parseIngredientsPayload parses the given {@link IngredientsPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Ingredients}.
 */
export declare function parseIngredientsPayload(v: IngredientsPayload): Ingredients;
/**
 * parseIngredients parses the given {@link Ingredients}.
 * @param v The object to parse.
 * @returns The payload {@link IngredientsPayload}.
 */
export declare function parseIngredients(v: Ingredients): IngredientsPayload;
export type RecipesPrimaryKey = number;
export type RecipesPrimaryKeyField = 'id';
export interface Recipes {
    /**
     * Type: timestamp
     */
    readonly date_created?: Date | null;
    /**
     * Type: timestamp
     */
    readonly date_updated?: Date | null;
    /**
     * Type: integer
     */
    readonly id?: RecipesPrimaryKey;
    /**
     * Type: string
     */
    readonly user_created?: string | null;
    /**
     * Type: string
     */
    readonly user_updated?: string | null;
}
export interface RecipesRelations {
    /**
     * NOTE
     * The related field of {@link Chefs} is marked as unique.
     * The resulting array will contain only one element.
     */
    chefs_signature_dish?: ChefsPrimaryKey[] | Chefs[];
    ingredients: RecipesIngredientsPrimaryKey[] | RecipesIngredients[];
    readonly user_created?: DirectusUsersPrimaryKey | DirectusUsers;
    readonly user_updated?: DirectusUsersPrimaryKey | DirectusUsers;
}
export interface RecipesRelatedCollections {
    chefs_signature_dish: 'chefs';
    ingredients: 'recipes_ingredients';
    user_created: 'directus_users';
    user_updated: 'directus_users';
}
export interface RecipesPayload extends Omit<Recipes, 'date_created' | 'date_updated'> {
    readonly date_created?: string | null;
    readonly date_updated?: string | null;
}
/**
 * parseRecipesPayload parses the given {@link RecipesPayload} payload.
 * @param v The payload to parse.
 * @returns The payload parsed to {@link Recipes}.
 */
export declare function parseRecipesPayload(v: RecipesPayload): Recipes;
/**
 * parseRecipes parses the given {@link Recipes}.
 * @param v The object to parse.
 * @returns The payload {@link RecipesPayload}.
 */
export declare function parseRecipes(v: Recipes): RecipesPayload;
export type RecipesIngredientsPrimaryKey = number;
export type RecipesIngredientsPrimaryKeyField = 'id';
export interface RecipesIngredients {
    /**
     * Type: integer
     */
    id?: RecipesIngredientsPrimaryKey;
    /**
     * Type: integer
     */
    ingredients_id?: number | null;
    /**
     * Type: integer
     */
    recipes_id?: number | null;
}
export interface RecipesIngredientsRelations {
    ingredients_id?: IngredientsPrimaryKey | Ingredients;
    recipes_id?: RecipesPrimaryKey | Recipes;
}
export interface RecipesIngredientsRelatedCollections {
    ingredients_id: 'ingredients';
    recipes_id: 'recipes';
}
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
export interface RelatedCollections {
    chefs: ChefsRelatedCollections;
    directus_access: DirectusAccessRelatedCollections;
    directus_activity: DirectusActivityRelatedCollections;
    directus_collections: DirectusCollectionsRelatedCollections;
    directus_dashboards: DirectusDashboardsRelatedCollections;
    directus_extensions: DirectusExtensionsRelatedCollections;
    directus_fields: DirectusFieldsRelatedCollections;
    directus_files: DirectusFilesRelatedCollections;
    directus_flows: DirectusFlowsRelatedCollections;
    directus_folders: DirectusFoldersRelatedCollections;
    directus_migrations: DirectusMigrationsRelatedCollections;
    directus_notifications: DirectusNotificationsRelatedCollections;
    directus_operations: DirectusOperationsRelatedCollections;
    directus_panels: DirectusPanelsRelatedCollections;
    directus_permissions: DirectusPermissionsRelatedCollections;
    directus_policies: DirectusPoliciesRelatedCollections;
    directus_presets: DirectusPresetsRelatedCollections;
    directus_relations: DirectusRelationsRelatedCollections;
    directus_revisions: DirectusRevisionsRelatedCollections;
    directus_roles: DirectusRolesRelatedCollections;
    directus_sessions: DirectusSessionsRelatedCollections;
    directus_settings: DirectusSettingsRelatedCollections;
    directus_shares: DirectusSharesRelatedCollections;
    directus_translations: DirectusTranslationsRelatedCollections;
    directus_users: DirectusUsersRelatedCollections;
    directus_versions: DirectusVersionsRelatedCollections;
    directus_webhooks: DirectusWebhooksRelatedCollections;
    ingredients: IngredientsRelatedCollections;
    recipes: RecipesRelatedCollections;
    recipes_ingredients: RecipesIngredientsRelatedCollections;
}
export interface Payloads {
    chefs: Chefs;
    directus_access: DirectusAccess;
    directus_activity: DirectusActivityPayload;
    directus_collections: DirectusCollections;
    directus_dashboards: DirectusDashboardsPayload;
    directus_extensions: DirectusExtensions;
    directus_fields: DirectusFields;
    directus_files: DirectusFilesPayload;
    directus_flows: DirectusFlowsPayload;
    directus_folders: DirectusFolders;
    directus_migrations: DirectusMigrationsPayload;
    directus_notifications: DirectusNotificationsPayload;
    directus_operations: DirectusOperationsPayload;
    directus_panels: DirectusPanelsPayload;
    directus_permissions: DirectusPermissions;
    directus_policies: DirectusPolicies;
    directus_presets: DirectusPresets;
    directus_relations: DirectusRelations;
    directus_revisions: DirectusRevisions;
    directus_roles: DirectusRoles;
    directus_sessions: DirectusSessionsPayload;
    directus_settings: DirectusSettings;
    directus_shares: DirectusSharesPayload;
    directus_translations: DirectusTranslations;
    directus_users: DirectusUsersPayload;
    directus_versions: DirectusVersionsPayload;
    directus_webhooks: DirectusWebhooks;
    ingredients: IngredientsPayload;
    recipes: RecipesPayload;
    recipes_ingredients: RecipesIngredients;
}
