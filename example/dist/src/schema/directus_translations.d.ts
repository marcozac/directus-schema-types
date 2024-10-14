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
