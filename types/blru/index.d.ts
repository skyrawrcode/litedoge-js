declare module "blru" {
  import blru from "blru/lib/lru";
  export default blru;
  export * from "blru/lib/lru";
}
declare module "blru/lib/lru" {
  export default LRU;

  /**
   * LRU Cache
   */
  export class LRU {
    map: any;
    size: number;
    items: number;
    head: any;
    tail: any;
    pending: LRUBatch;
    capacity: number;
    getSize: Function;
    /**
     * Calculate size of an item.
     * @private
     * @param {LRUItem} item
     * @returns {Number} Size.
     */
    private _getSize;
    /**
     * Compact the LRU linked list.
     * @private
     */
    private _compact;
    /**
     * Prepend an item to the linked list (sets new head).
     * @private
     * @param {LRUItem}
     */
    private _prependList;
    /**
     * Append an item to the linked list (sets new tail).
     * @private
     * @param {LRUItem}
     */
    private _appendList;
    /**
     * Insert item into the linked list.
     * @private
     * @param {LRUItem|null} ref
     * @param {LRUItem} item
     */
    private _insertList;
    /**
     * Remove item from the linked list.
     * @private
     * @param {LRUItem}
     */
    private _removeList;

    /**
     * Create an LRU cache.
     * @constructor
     * @param {Number} capacity
     * @param {Function?} getSize
     * @param {Function?} CustomMap
     */
    constructor(capacity: number, getSize?: Function | null, CustomMap?: Function | null);

    /**
     * Reset the cache. Clear all items.
     */
    reset(): void;

    /**
     * Add an item to the cache.
     * @param {String|Number} key
     * @param {Object} value
     */
    set(key: Buffer| string | number, value: any): void;

    /**
     * Retrieve an item from the cache.
     * @param {String|Number} key
     * @returns {Object} Item.
     */
    get(key: string | Buffer | number): any;

    /**
     * Test whether the cache contains a key.
     * @param {String|Number} key
     * @returns {Boolean}
     */
    has(key: Buffer | number): boolean;

    /**
     * Remove an item from the cache.
     * @param {String|Number} key
     * @returns {Boolean} Whether an item was removed.
     */
    remove(key: Buffer | number): boolean;

    /**
     * Collect all keys in the cache, sorted by LRU.
     * @returns {String[]}
     */
    keys(): string[];

    /**
     * Collect all values in the cache, sorted by LRU.
     * @returns {String[]}
     */
    values(): string[];

    /**
     * Convert the LRU cache to an array of items.
     * @returns {Object[]}
     */
    toArray(): any[];

    /**
     * Create an atomic batch for the lru
     * (used for caching database writes).
     * @returns {LRUBatch}
     */
    batch(): LRUBatch;

    /**
     * Start the pending batch.
     */
    start(): void;

    /**
     * Clear the pending batch.
     */
    clear(): void;

    /**
     * Drop the pending batch.
     */
    drop(): void;

    /**
     * Commit the pending batch.
     */
    commit(): void;

    /**
     * Push an item onto the pending batch.
     * @param {String} key
     * @param {Object} value
     */
    push(key: string, value: any): void;

    /**
     * Push a removal onto the pending batch.
     * @param {String} key
     */
    unpush(key: string): void;
  }

  /**
   * LRU Batch
   * @alias module:utils.LRUBatch
   */
  export class LRUBatch {
    lru: LRU;
    ops: any[];

    /**
     * Create an LRU batch.
     * @constructor
     * @param {LRU} lru
     */
    constructor(lru: LRU);

    /**
     * Push an item onto the batch.
     * @param {String} key
     * @param {Object} value
     */
    set(key: string, value: any): void;

    /**
     * Push a removal onto the batch.
     * @param {String} key
     */
    remove(key: string): void;

    /**
     * Clear the batch.
     */
    clear(): void;

    /**
     * Commit the batch.
     */
    commit(): void;
  }
}
declare module "blru/lib/blru" {
  const _exports: typeof import("blru/lib/lru");
  export = _exports;
}
