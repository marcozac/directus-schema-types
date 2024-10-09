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
