/**
 * This is an example class used by the `ingredients` collection.
 */
export class InventoryItem {
    constructor(private external_id: string) {}

    externalId() {
        return this.external_id;
    }
}
