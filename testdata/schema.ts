
// --- chefs ---

export type ChefsPrimaryKeyField = "id";
export type ChefsPrimaryKey = number;

export interface Chefs {
	
	// Type: integer
	readonly id?: number;

	
	// Type: integer
	signature_dish?: number | null;

}

export interface ChefsRelations {
	signature_dish: RecipesPrimaryKey | Recipes

}

// --- directus_access ---

export type DirectusAccessPrimaryKeyField = "id";
export type DirectusAccessPrimaryKey = string;

export interface DirectusAccess {
	
	// Type: uuid
	id?: string | null;

	
	// Type: string
	policy?: string;

	
	// Type: string
	role?: string | null;

	
	// Type: integer
	sort?: number | null;

	
	// Type: string
	user?: string | null;

}

export interface DirectusAccessRelations {
	policy: DirectusPoliciesPrimaryKey | DirectusPolicies

	role: DirectusRolesPrimaryKey | DirectusRoles

	user: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_activity ---

export type DirectusActivityPrimaryKeyField = "id";
export type DirectusActivityPrimaryKey = number;

export interface DirectusActivity {
	
	// Type: string
	action?: string;

	
	// Type: string
	collection?: string;

	
	// Type: text
	comment?: string | null;

	
	// Type: integer
	id?: number;

	
	// Type: string
	ip?: string | null;

	
	// Type: string
	item?: string;

	
	// Type: string
	origin?: string | null;

	
	// Type: timestamp
	timestamp?: Date;

	
	// Type: string
	user?: string | null;

	
	// Type: text
	user_agent?: string | null;

}

export interface DirectusActivityRelations {
	revisions: (DirectusRevisionsPrimaryKey | DirectusRevisions)[]

	user: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_collections ---

export type DirectusCollectionsPrimaryKeyField = "collection";
export type DirectusCollectionsPrimaryKey = string;

export interface DirectusCollections {
	
	// Type: string
	accountability?: string | null;

	
	// Type: boolean
	archive_app_filter?: boolean;

	
	// Type: string
	archive_field?: string | null;

	
	// Type: string
	archive_value?: string | null;

	
	// Type: string
	collapse?: string;

	
	// Type: string
	readonly collection?: string;

	
	// Type: string
	color?: string | null;

	
	// Type: string
	display_template?: string | null;

	
	// Type: string
	group?: string | null;

	
	// Type: boolean
	hidden?: boolean;

	
	// Type: string
	icon?: string | null;

	
	// Type: json
	item_duplication_fields?: object | null;

	
	// Type: text
	note?: string | null;

	
	// Type: string
	preview_url?: string | null;

	
	// Type: boolean
	singleton?: boolean;

	
	// Type: integer
	sort?: number | null;

	
	// Type: string
	sort_field?: string | null;

	
	// Type: json
	translations?: object | null;

	
	// Type: string
	unarchive_value?: string | null;

	
	// Type: boolean
	versioning?: boolean;

}

export interface DirectusCollectionsRelations {
	fields: (DirectusFieldsPrimaryKey | DirectusFields)[]

	group: DirectusCollectionsPrimaryKey | DirectusCollections

}

// --- directus_dashboards ---

export type DirectusDashboardsPrimaryKeyField = "id";
export type DirectusDashboardsPrimaryKey = string;

export interface DirectusDashboards {
	
	// Type: string
	color?: string | null;

	
	// Type: timestamp
	date_created?: Date | null;

	
	// Type: string
	icon?: string;

	
	// Type: uuid
	id?: string;

	
	// Type: string
	name?: string;

	
	// Type: text
	note?: string | null;

	
	// Type: string
	user_created?: string | null;

}

export interface DirectusDashboardsRelations {
	panels: (DirectusPanelsPrimaryKey | DirectusPanels)[]

	user_created: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_extensions ---

export type DirectusExtensionsPrimaryKeyField = "id";
export type DirectusExtensionsPrimaryKey = string;

export interface DirectusExtensions {
	
	// Type: string
	bundle?: string | null;

	
	// Type: boolean
	enabled?: boolean;

	
	// Type: string
	folder?: string;

	
	// Type: uuid
	id?: string;

	
	// Type: string
	source?: string;

}

export interface DirectusExtensionsRelations {
}

// --- directus_fields ---

export type DirectusFieldsPrimaryKeyField = "id";
export type DirectusFieldsPrimaryKey = number;

export interface DirectusFields {
	
	// Type: string
	collection?: string;

	
	// Type: json
	conditions?: object | null;

	
	// Type: string
	display?: string | null;

	
	// Type: json
	display_options?: object | null;

	
	// Type: string
	field?: string;

	
	// Type: string
	group?: string | null;

	
	// Type: boolean
	hidden?: boolean;

	
	// Type: integer
	id?: number;

	
	// Type: string
	interface?: string | null;

	
	// Type: text
	note?: string | null;

	
	// Type: json
	options?: object | null;

	
	// Type: boolean
	readonly?: boolean;

	
	// Type: boolean
	required?: boolean | null;

	
	// Type: integer
	sort?: number | null;

	
	// Type: csv
	special?: any | null;

	
	// Type: json
	translations?: object | null;

	
	// Type: json
	validation?: object | null;

	
	// Type: text
	validation_message?: string | null;

	
	// Type: string
	width?: string | null;

}

export interface DirectusFieldsRelations {
	collection: DirectusCollectionsPrimaryKey | DirectusCollections

	group: DirectusFieldsPrimaryKey | DirectusFields

}

// --- directus_files ---

export type DirectusFilesPrimaryKeyField = "id";
export type DirectusFilesPrimaryKey = string;

export interface DirectusFiles {
	
	// Type: string
	readonly charset?: string | null;

	
	// Type: dateTime
	readonly created_on?: Date;

	
	// Type: text
	description?: string | null;

	
	// Type: integer
	readonly duration?: number | null;

	
	// Type: string
	embed?: string | null;

	
	// Type: string
	readonly filename_disk?: string | null;

	
	// Type: string
	filename_download?: string;

	
	// Type: bigInteger
	readonly filesize?: number | null;

	
	// Type: integer
	focal_point_x?: number | null;

	
	// Type: integer
	focal_point_y?: number | null;

	
	// Type: string
	readonly folder?: string | null;

	
	// Type: integer
	readonly height?: number | null;

	
	// Type: uuid
	id?: string;

	
	// Type: text
	location?: string | null;

	
	// Type: json
	metadata?: object | null;

	
	// Type: string
	readonly modified_by?: string | null;

	
	// Type: dateTime
	readonly modified_on?: Date;

	
	// Type: string
	readonly storage?: string;

	
	// Type: json
	tags?: object | null;

	
	// Type: string
	title?: string | null;

	
	// Type: json
	tus_data?: object | null;

	
	// Type: string
	tus_id?: string | null;

	
	// Type: string
	readonly type?: string | null;

	
	// Type: string
	uploaded_by?: string | null;

	
	// Type: dateTime
	uploaded_on?: Date | null;

	
	// Type: integer
	readonly width?: number | null;

}

export interface DirectusFilesRelations {
	folder: DirectusFoldersPrimaryKey | DirectusFolders

	modified_by: DirectusUsersPrimaryKey | DirectusUsers

	uploaded_by: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_flows ---

export type DirectusFlowsPrimaryKeyField = "id";
export type DirectusFlowsPrimaryKey = string;

export interface DirectusFlows {
	
	// Type: string
	accountability?: string | null;

	
	// Type: string
	color?: string | null;

	
	// Type: dateTime
	date_created?: Date | null;

	
	// Type: text
	description?: string | null;

	
	// Type: string
	icon?: string | null;

	
	// Type: uuid
	id?: string;

	
	// Type: string
	name?: string;

	
	// Type: string
	operation?: string | null;

	
	// Type: json
	options?: object | null;

	
	// Type: string
	status?: string;

	
	// Type: string
	trigger?: string | null;

	
	// Type: string
	user_created?: string | null;

}

export interface DirectusFlowsRelations {
	operation: DirectusOperationsPrimaryKey | DirectusOperations

	operations: (DirectusOperationsPrimaryKey | DirectusOperations)[]

	user_created: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_folders ---

export type DirectusFoldersPrimaryKeyField = "id";
export type DirectusFoldersPrimaryKey = string;

export interface DirectusFolders {
	
	// Type: uuid
	id?: string;

	
	// Type: string
	name?: string;

	
	// Type: string
	parent?: string | null;

}

export interface DirectusFoldersRelations {
	parent: DirectusFoldersPrimaryKey | DirectusFolders

}

// --- directus_migrations ---

export type DirectusMigrationsPrimaryKeyField = "version";
export type DirectusMigrationsPrimaryKey = string;

export interface DirectusMigrations {
	
	// Type: string
	name?: string;

	
	// Type: dateTime
	timestamp?: Date | null;

	
	// Type: string
	version?: string;

}

export interface DirectusMigrationsRelations {
}

// --- directus_notifications ---

export type DirectusNotificationsPrimaryKeyField = "id";
export type DirectusNotificationsPrimaryKey = number;

export interface DirectusNotifications {
	
	// Type: string
	collection?: string | null;

	
	// Type: integer
	id?: number;

	
	// Type: string
	item?: string | null;

	
	// Type: text
	message?: string | null;

	
	// Type: string
	recipient?: string;

	
	// Type: string
	sender?: string | null;

	
	// Type: string
	status?: string | null;

	
	// Type: string
	subject?: string;

	
	// Type: timestamp
	timestamp?: Date | null;

}

export interface DirectusNotificationsRelations {
	recipient: DirectusUsersPrimaryKey | DirectusUsers

	sender: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_operations ---

export type DirectusOperationsPrimaryKeyField = "id";
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
	flow: DirectusFlowsPrimaryKey | DirectusFlows

	reject: DirectusOperationsPrimaryKey | DirectusOperations

	resolve: DirectusOperationsPrimaryKey | DirectusOperations

	user_created: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_panels ---

export type DirectusPanelsPrimaryKeyField = "id";
export type DirectusPanelsPrimaryKey = string;

export interface DirectusPanels {
	
	// Type: string
	color?: string | null;

	
	// Type: string
	dashboard?: string;

	
	// Type: timestamp
	date_created?: Date | null;

	
	// Type: integer
	height?: number;

	
	// Type: string
	icon?: string | null;

	
	// Type: uuid
	id?: string;

	
	// Type: string
	name?: string | null;

	
	// Type: text
	note?: string | null;

	
	// Type: json
	options?: object | null;

	
	// Type: integer
	position_x?: number;

	
	// Type: integer
	position_y?: number;

	
	// Type: boolean
	show_header?: boolean;

	
	// Type: string
	type?: string;

	
	// Type: string
	user_created?: string | null;

	
	// Type: integer
	width?: number;

}

export interface DirectusPanelsRelations {
	dashboard: DirectusDashboardsPrimaryKey | DirectusDashboards

	user_created: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_permissions ---

export type DirectusPermissionsPrimaryKeyField = "id";
export type DirectusPermissionsPrimaryKey = number;

export interface DirectusPermissions {
	
	// Type: string
	action?: string;

	
	// Type: string
	collection?: string;

	
	// Type: csv
	fields?: any | null;

	
	// Type: integer
	id?: number;

	
	// Type: json
	permissions?: object | null;

	
	// Type: string
	policy?: string;

	
	// Type: json
	presets?: object | null;

	
	// Type: json
	validation?: object | null;

}

export interface DirectusPermissionsRelations {
	policy: DirectusPoliciesPrimaryKey | DirectusPolicies

}

// --- directus_policies ---

export type DirectusPoliciesPrimaryKeyField = "id";
export type DirectusPoliciesPrimaryKey = string;

export interface DirectusPolicies {
	
	// Type: boolean
	admin_access?: boolean;

	
	// Type: boolean
	app_access?: boolean;

	
	// Type: text
	description?: string | null;

	// $t:field_options.directus_policies.enforce_tfa
	// Type: boolean
	enforce_tfa?: boolean;

	
	// Type: string
	icon?: string;

	
	// Type: uuid
	id?: string | null;

	
	// Type: csv
	ip_access?: any | null;

	
	// Type: string
	name: string;

}

export interface DirectusPoliciesRelations {
	permissions: (DirectusPermissionsPrimaryKey | DirectusPermissions)[]

	roles: (DirectusAccessPrimaryKey | DirectusAccess)[]

	users: (DirectusAccessPrimaryKey | DirectusAccess)[]

}

// --- directus_presets ---

export type DirectusPresetsPrimaryKeyField = "id";
export type DirectusPresetsPrimaryKey = number;

export interface DirectusPresets {
	
	// Type: string
	bookmark?: string | null;

	
	// Type: string
	collection?: string | null;

	
	// Type: string
	color?: string | null;

	
	// Type: json
	filter?: object | null;

	
	// Type: string
	icon?: string | null;

	
	// Type: integer
	id?: number;

	
	// Type: string
	layout?: string | null;

	
	// Type: json
	layout_options?: object | null;

	
	// Type: json
	layout_query?: object | null;

	
	// Type: integer
	refresh_interval?: number | null;

	
	// Type: string
	role?: string | null;

	
	// Type: string
	search?: string | null;

	
	// Type: string
	user?: string | null;

}

export interface DirectusPresetsRelations {
	role: DirectusRolesPrimaryKey | DirectusRoles

	user: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_relations ---

export type DirectusRelationsPrimaryKeyField = "id";
export type DirectusRelationsPrimaryKey = number;

export interface DirectusRelations {
	
	// Type: integer
	id?: number;

	
	// Type: string
	junction_field?: string | null;

	
	// Type: string
	many_collection?: string;

	
	// Type: string
	many_field?: string;

	
	// Type: csv
	one_allowed_collections?: any | null;

	
	// Type: string
	one_collection?: string | null;

	
	// Type: string
	one_collection_field?: string | null;

	
	// Type: string
	one_deselect_action?: string;

	
	// Type: string
	one_field?: string | null;

	
	// Type: string
	sort_field?: string | null;

}

export interface DirectusRelationsRelations {
}

// --- directus_revisions ---

export type DirectusRevisionsPrimaryKeyField = "id";
export type DirectusRevisionsPrimaryKey = number;

export interface DirectusRevisions {
	
	// Type: integer
	activity?: number;

	
	// Type: string
	collection?: string;

	
	// Type: json
	data?: object | null;

	
	// Type: json
	delta?: object | null;

	
	// Type: integer
	id?: number;

	
	// Type: string
	item?: string;

	
	// Type: integer
	parent?: number | null;

	
	// Type: string
	version?: string | null;

}

export interface DirectusRevisionsRelations {
	activity: DirectusActivityPrimaryKey | DirectusActivity

	parent: DirectusRevisionsPrimaryKey | DirectusRevisions

	version: DirectusVersionsPrimaryKey | DirectusVersions

}

// --- directus_roles ---

export type DirectusRolesPrimaryKeyField = "id";
export type DirectusRolesPrimaryKey = string;

export interface DirectusRoles {
	
	// Type: text
	description?: string | null;

	
	// Type: string
	icon?: string;

	
	// Type: uuid
	id?: string;

	
	// Type: string
	name: string;

	// $t:field_options.directus_roles.parent_note
	// Type: string
	parent?: string | null;

}

export interface DirectusRolesRelations {
	children: (DirectusRolesPrimaryKey | DirectusRoles)[]

	parent: DirectusRolesPrimaryKey | DirectusRoles

	policies: (DirectusAccessPrimaryKey | DirectusAccess)[]

	users: (DirectusUsersPrimaryKey | DirectusUsers)[]

}

// --- directus_sessions ---

export type DirectusSessionsPrimaryKeyField = "token";
export type DirectusSessionsPrimaryKey = string;

export interface DirectusSessions {
	
	// Type: dateTime
	expires?: Date;

	
	// Type: string
	ip?: string | null;

	
	// Type: string
	next_token?: string | null;

	
	// Type: string
	origin?: string | null;

	
	// Type: string
	share?: string | null;

	
	// Type: string
	token?: string;

	
	// Type: string
	user?: string | null;

	
	// Type: text
	user_agent?: string | null;

}

export interface DirectusSessionsRelations {
	share: DirectusSharesPrimaryKey | DirectusShares

	user: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_settings ---

export type DirectusSettingsPrimaryKeyField = "id";
export type DirectusSettingsPrimaryKey = number;

export interface DirectusSettings {
	
	// Type: integer
	auth_login_attempts?: number | null;

	
	// Type: string
	auth_password_policy?: string | null;

	
	// Type: json
	basemaps?: object | null;

	
	// Type: json
	custom_aspect_ratios?: object | null;

	
	// Type: text
	custom_css?: string | null;

	
	// Type: string
	default_appearance?: string;

	
	// Type: string
	default_language?: string;

	
	// Type: string
	default_theme_dark?: string | null;

	
	// Type: string
	default_theme_light?: string | null;

	
	// Type: integer
	id?: number;

	
	// Type: string
	mapbox_key?: string | null;

	
	// Type: json
	module_bar?: object | null;

	// $t:field_options.directus_settings.project_color_note
	// Type: string
	project_color?: string;

	
	// Type: string
	project_descriptor?: string | null;

	// $t:field_options.directus_settings.project_logo_note
	// Type: string
	project_logo?: string | null;

	
	// Type: string
	project_name?: string;

	
	// Type: string
	project_url?: string | null;

	
	// Type: string
	public_background?: string | null;

	// $t:field_options.directus_settings.project_favicon_note
	// Type: string
	public_favicon?: string | null;

	
	// Type: string
	public_foreground?: string | null;

	
	// Type: text
	public_note?: string | null;

	// $t:fields.directus_settings.public_registration_note
	// Type: boolean
	public_registration?: boolean;

	// $t:fields.directus_settings.public_registration_email_filter_note
	// Type: json
	public_registration_email_filter?: object | null;

	// $t:fields.directus_settings.public_registration_role_note
	// Type: string
	public_registration_role?: string | null;

	// $t:fields.directus_settings.public_registration_verify_email_note
	// Type: boolean
	public_registration_verify_email?: boolean;

	
	// Type: string
	report_bug_url?: string | null;

	
	// Type: string
	report_error_url?: string | null;

	
	// Type: string
	report_feature_url?: string | null;

	
	// Type: json
	storage_asset_presets?: object | null;

	
	// Type: string
	storage_asset_transform?: string | null;

	// $t:interfaces.system-folder.field_hint
	// Type: string
	storage_default_folder?: string | null;

	
	// Type: json
	theme_dark_overrides?: object | null;

	
	// Type: json
	theme_light_overrides?: object | null;

}

export interface DirectusSettingsRelations {
	project_logo: DirectusFilesPrimaryKey | DirectusFiles

	public_background: DirectusFilesPrimaryKey | DirectusFiles

	public_favicon: DirectusFilesPrimaryKey | DirectusFiles

	public_foreground: DirectusFilesPrimaryKey | DirectusFiles

	public_registration_role: DirectusRolesPrimaryKey | DirectusRoles

	storage_default_folder: DirectusFoldersPrimaryKey | DirectusFolders

}

// --- directus_shares ---

export type DirectusSharesPrimaryKeyField = "id";
export type DirectusSharesPrimaryKey = string;

export interface DirectusShares {
	
	// Type: string
	collection?: string;

	
	// Type: timestamp
	readonly date_created?: Date | null;

	// $t:shared_leave_blank_for_unlimited
	// Type: dateTime
	date_end?: Date | null;

	// $t:shared_leave_blank_for_unlimited
	// Type: dateTime
	date_start?: Date | null;

	
	// Type: uuid
	readonly id?: string;

	
	// Type: string
	item?: string;

	// $t:shared_leave_blank_for_unlimited
	// Type: integer
	max_uses?: number | null;

	
	// Type: string
	name?: string | null;

	// $t:shared_leave_blank_for_passwordless_access
	// Type: hash
	password?: string | null;

	
	// Type: string
	role?: string | null;

	
	// Type: integer
	readonly times_used?: number | null;

	
	// Type: string
	readonly user_created?: string | null;

}

export interface DirectusSharesRelations {
	collection: DirectusCollectionsPrimaryKey | DirectusCollections

	role: DirectusRolesPrimaryKey | DirectusRoles

	user_created: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_translations ---

export type DirectusTranslationsPrimaryKeyField = "id";
export type DirectusTranslationsPrimaryKey = string;

export interface DirectusTranslations {
	
	// Type: uuid
	id?: string;

	
	// Type: string
	key: string;

	
	// Type: string
	language: string;

	
	// Type: text
	value: string;

}

export interface DirectusTranslationsRelations {
}

// --- directus_users ---

export type DirectusUsersPrimaryKeyField = "id";
export type DirectusUsersPrimaryKey = string;

export interface DirectusUsers {
	
	// Type: string
	appearance?: string | null;

	
	// Type: json
	auth_data?: object | null;

	
	// Type: string
	avatar?: string | null;

	
	// Type: text
	description?: string | null;

	
	// Type: string
	email?: string | null;

	
	// Type: boolean
	email_notifications?: boolean | null;

	
	// Type: string
	external_identifier?: string | null;

	
	// Type: string
	first_name?: string | null;

	
	// Type: uuid
	id?: string;

	
	// Type: string
	language?: string | null;

	
	// Type: dateTime
	readonly last_access?: Date | null;

	
	// Type: string
	last_name?: string | null;

	
	// Type: string
	last_page?: string | null;

	
	// Type: string
	location?: string | null;

	
	// Type: hash
	password?: string | null;

	
	// Type: string
	provider?: string;

	
	// Type: string
	role?: string | null;

	
	// Type: string
	status?: string;

	
	// Type: json
	tags?: object | null;

	
	// Type: string
	tfa_secret?: string | null;

	
	// Type: string
	theme_dark?: string | null;

	
	// Type: json
	theme_dark_overrides?: object | null;

	
	// Type: string
	theme_light?: string | null;

	
	// Type: json
	theme_light_overrides?: object | null;

	
	// Type: string
	title?: string | null;

	
	// Type: string
	token?: string | null;

}

export interface DirectusUsersRelations {
	avatar: DirectusFilesPrimaryKey | DirectusFiles

	policies: (DirectusAccessPrimaryKey | DirectusAccess)[]

	role: DirectusRolesPrimaryKey | DirectusRoles

}

// --- directus_versions ---

export type DirectusVersionsPrimaryKeyField = "id";
export type DirectusVersionsPrimaryKey = string;

export interface DirectusVersions {
	
	// Type: string
	collection?: string;

	
	// Type: timestamp
	date_created?: Date | null;

	
	// Type: timestamp
	date_updated?: Date | null;

	
	// Type: string
	readonly hash?: string | null;

	
	// Type: uuid
	readonly id?: string;

	
	// Type: string
	item?: string;

	
	// Type: string
	key?: string;

	
	// Type: string
	name?: string | null;

	
	// Type: string
	user_created?: string | null;

	
	// Type: string
	user_updated?: string | null;

}

export interface DirectusVersionsRelations {
	collection: DirectusCollectionsPrimaryKey | DirectusCollections

	user_created: DirectusUsersPrimaryKey | DirectusUsers

	user_updated: DirectusUsersPrimaryKey | DirectusUsers

}

// --- directus_webhooks ---

export type DirectusWebhooksPrimaryKeyField = "id";
export type DirectusWebhooksPrimaryKey = number;

export interface DirectusWebhooks {
	
	// Type: csv
	actions?: any;

	
	// Type: csv
	collections?: any;

	
	// Type: boolean
	data?: boolean;

	
	// Type: json
	headers?: object | null;

	
	// Type: integer
	id?: number;

	
	// Type: string
	method?: string;

	
	// Type: string
	migrated_flow?: string | null;

	
	// Type: string
	name?: string;

	
	// Type: string
	status?: string;

	
	// Type: string
	url?: string;

	
	// Type: boolean
	was_active_before_deprecation?: boolean;

}

export interface DirectusWebhooksRelations {
	migrated_flow: DirectusFlowsPrimaryKey | DirectusFlows

}

// --- ingredients ---

export type IngredientsPrimaryKeyField = "id";
export type IngredientsPrimaryKey = number;

export interface Ingredients {
	
	// Type: timestamp
	readonly date_created?: Date | null;

	
	// Type: timestamp
	readonly date_updated?: Date | null;

	
	// Type: integer
	readonly id?: number;

	
	// Type: string
	name?: string | null;

	
	// Type: string
	readonly user_created?: string | null;

	
	// Type: string
	readonly user_updated?: string | null;

}

export interface IngredientsRelations {
	recipes: (RecipesIngredientsPrimaryKey | RecipesIngredients)[]

	user_created: DirectusUsersPrimaryKey | DirectusUsers

	user_updated: DirectusUsersPrimaryKey | DirectusUsers

}

// --- recipes ---

export type RecipesPrimaryKeyField = "id";
export type RecipesPrimaryKey = number;

export interface Recipes {
	
	// Type: timestamp
	readonly date_created?: Date | null;

	
	// Type: timestamp
	readonly date_updated?: Date | null;

	
	// Type: integer
	readonly id?: number;

	
	// Type: string
	readonly user_created?: string | null;

	
	// Type: string
	readonly user_updated?: string | null;

}

export interface RecipesRelations {
	/**
	* NOTE
	* The related field of {@link Chefs} is marked as unique.
	* The resulting array will contain only one element.
	*/
	chefs_signature_dish: (ChefsPrimaryKey | Chefs)[]

	ingredients: (RecipesIngredientsPrimaryKey | RecipesIngredients)[]

	user_created: DirectusUsersPrimaryKey | DirectusUsers

	user_updated: DirectusUsersPrimaryKey | DirectusUsers

}

// --- recipes_ingredients ---

export type RecipesIngredientsPrimaryKeyField = "id";
export type RecipesIngredientsPrimaryKey = number;

export interface RecipesIngredients {
	
	// Type: integer
	id?: number;

	
	// Type: integer
	ingredients_id?: number | null;

	
	// Type: integer
	recipes_id?: number | null;

}

export interface RecipesIngredientsRelations {
	ingredients_id: IngredientsPrimaryKey | Ingredients

	recipes_id: RecipesPrimaryKey | Recipes

}

// --- Schema ---

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

// --- Relations ---

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
