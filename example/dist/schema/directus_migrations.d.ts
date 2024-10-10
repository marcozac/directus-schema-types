export type DirectusMigrationsPrimaryKeyField = 'version';
export type DirectusMigrationsPrimaryKey = string;
export interface DirectusMigrations {
    name?: string;
    timestamp?: Date | null;
    version?: string;
}
export interface DirectusMigrationsRelations {
}
/**
 * DirectusMigrationsRelatedCollections maps the {@link DirectusMigrationsRelations}
 * fields to the name of the related collection.
 */
export interface DirectusMigrationsRelatedCollections {
}
export type DirectusMigrationsPayload = Omit<DirectusMigrations, 'timestamp'> & {
    timestamp?: string | null;
};
/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusMigrations}.
 */
export declare function parseDirectusMigrationsPayload(v: DirectusMigrationsPayload): DirectusMigrations;
