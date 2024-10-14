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
