// File generated by directus-schema-types. Do not change.

// --- directus_migrations ---

export type DirectusMigrationsPrimaryKeyField = 'version';
export type DirectusMigrationsPrimaryKey = string;

export interface DirectusMigrations {
    // Type: string
    name?: string;

    // Type: dateTime
    timestamp?: Date | null;

    // Type: string
    version?: string;
}

export interface DirectusMigrationsRelations {}

export type DirectusMigrationsPayload = Omit<DirectusMigrations, 'timestamp'> & {
    // Type: dateTime
    timestamp?: string | null;
};

/**
 * @param v The payload to parse.
 * @returns The payload parsed to {@link DirectusMigrations}.
 */
export function parseDirectusMigrationsPayload(v: DirectusMigrationsPayload): DirectusMigrations {
    const r: Record<string, unknown> = v;
    if (v.timestamp) {
        r.timestamp = new Date(v.timestamp);
    }
    return r as DirectusMigrations;
}
