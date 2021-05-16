declare module "blst/lib/list" {
    export default List;
    /**
     * Double Linked List
     * @alias module:utils.List
     */
    export class List {
        head: any;
        tail: any;
        size: number;
        /**
         * Reset the cache. Clear all items.
         */
        reset(): void;
        /**
         * Remove the first item in the list.
         * @returns {ListItem}
         */
        shift(): ListItem;
        /**
         * Prepend an item to the linked list (sets new head).
         * @param {ListItem}
         * @returns {Boolean}
         */
        unshift(item: any): boolean;
        /**
         * Append an item to the linked list (sets new tail).
         * @param {ListItem}
         * @returns {Boolean}
         */
        push(item: any): boolean;
        /**
         * Remove the last item in the list.
         * @returns {ListItem}
         */
        pop(): ListItem;
        /**
         * Insert item into the linked list.
         * @param {ListItem|null} ref
         * @param {ListItem} item
         * @returns {Boolean}
         */
        insert(ref: ListItem, item:ListItem):boolean;
        /**
         * Remove item from the linked list.
         * @param {ListItem}
         * @returns {Boolean}
         */
        remove(ref: ListItem): boolean;
        /**
         * Replace an item in-place.
         * @param {ListItem} ref
         * @param {ListItem} item
         */
        replace(ref: ListItem, item: ListItem): void;
        /**
         * Slice the list to an array of items.
         * Will remove the items sliced.
         * @param {Number?} total
         * @returns {ListItem[]}
         */
        slice(total: number | null): ListItem[];
        /**
         * Convert the list to an array of items.
         * @returns {ListItem[]}
         */
        toArray(): ListItem[];
    }
    /**
     * List Item
     * @alias module:utils.ListItem
     */
    export class ListItem {
        /**
         * Create a list item.
         * @constructor
         * @private
         * @param {String} key
         * @param {Object} value
         */
        private constructor();
        next: any;
        prev: any;
        value: any;
    }
    export { ListItem as Item };
}
declare module "blst/lib/blst" {
    const _exports: typeof import("blst/lib/list");
    export = _exports;
}
declare module "blst" {
    import blst from "blst/lib/list"
    export default blst;
}

