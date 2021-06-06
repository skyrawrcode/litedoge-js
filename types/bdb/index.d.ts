


declare module "bdb/lib/db" {
  
    /**
     * DB
     */
    export default class DB {
        /**
         * Create a DB instance.
         * @constructor
         * @param {Function} backend - Database backend.
         * @param {String} location - File location.
         * @param {Object?} options - Leveldown options.
         */
        constructor(backend: Function, location: string, options: any | null);
        options: DBOptions;
        backend: Function;
        location: string;
        loading: boolean;
        closing: boolean;
        loaded: boolean;
        binding: any;
        leveldown: boolean;
        /**
         * Initialize the database.
         * @private
         */
        private init;
        /**
         * Open the database.
         * @returns {Promise}
         */
        open(): Promise<any>;
        /**
         * Close the database.
         * @returns {Promise}
         */
        close(): Promise<any>;
        /**
         * Open the database.
         * @private
         * @returns {Promise}
         */
        private load;
        /**
         * Close the database.
         * @private
         * @returns {Promise}
         */
        private unload;
        /**
         * Destroy the database.
         * @returns {Promise}
         */
        destroy(): Promise<any>;
        /**
         * Repair the database.
         * @returns {Promise}
         */
        repair(): Promise<any>;
        /**
         * Backup the database.
         * @param {String} path
         * @returns {Promise}
         */
        backup(path: string): Promise<any>;
        /**
         * Create a bucket.
         * @param {Buffer} prefix
         * @returns {Bucket}
         */
        bucket(prefix: any): Bucket;
        /**
         * Get root bucket.
         * @returns {Bucket}
         */
        root(): Bucket;
        /**
         * Get child bucket.
         * @param {Buffer} prefix
         * @returns {Bucket}
         */
        child(prefix: any): Bucket;
        /**
         * Wrap a batch or iterator.
         * @param {Object} obj
         * @returns {Object}
         */
        wrap(obj: any): any;
        /**
         * Retrieve a record from the database.
         * @param {Buffer} key
         * @returns {Promise} - Returns Buffer.
         */
        get(key: any): Promise<any>;
        /**
         * Store a record in the database.
         * @param {Buffer} key
         * @param {Buffer} value
         * @returns {Promise}
         */
        put(key: any, value: any): Promise<any>;
        /**
         * Remove a record from the database.
         * @param {Buffer} key
         * @returns {Promise}
         */
        del(key: any): Promise<any>;
        /**
         * Create an atomic batch.
         * @returns {Batch}
         */
        batch(): Batch;
        /**
         * Create an iterator.
         * @param {Object} options
         * @returns {Iterator}
         */
        iterator(options?: any): Iterator;
        /**
         * Get a database property.
         * @param {String} name - Property name.
         * @returns {String}
         */
        getProperty(name: string): string;
        /**
         * Calculate approximate database size.
         * @param {Buffer|null} start - Start key.
         * @param {Buffer|null} end - End key.
         * @returns {Promise} - Returns Number.
         */
        approximateSize(start: any | null, end: any | null): Promise<any>;
        /**
         * Compact range of keys.
         * @param {Buffer|null} start - Start key.
         * @param {Buffer|null} end - End key.
         * @returns {Promise}
         */
        compactRange(start: any | null, end: any | null): Promise<any>;
        /**
         * Test whether a key exists.
         * @param {Buffer} key
         * @returns {Promise} - Returns Boolean.
         */
        has(key: any): Promise<any>;
        /**
         * Collect all keys from iterator options.
         * @param {Object} options - Iterator options.
         * @returns {Promise} - Returns Array.
         */
        range(options: any): Promise<any>;
        /**
         * Collect all keys from iterator options.
         * @param {Object} options - Iterator options.
         * @returns {Promise} - Returns Array.
         */
        keys(options: any): Promise<any>;
        /**
         * Collect all keys from iterator options.
         * @param {Object} options - Iterator options.
         * @returns {Promise} - Returns Array.
         */
        values(options: any): Promise<any>;
        /**
         * Dump database (for debugging).
         * @returns {Promise} - Returns Object.
         */
        dump(): Promise<any>;
        /**
         * Write and assert a version number for the database.
         * @param {Buffer} key
         * @param {String} name
         * @param {Number} version
         * @returns {Promise}
         */
        verify(key: any, name: string, version: number): Promise<any>;
        /**
         * Clone the database.
         * @param {String} path
         * @returns {Promise}
         */
        clone(path: string): Promise<any>;
        /**
         * Clone the database.
         * @param {Object} db
         * @returns {Promise}
         */
        cloneTo(db: any): Promise<any>;
    }
    /**
     * DBOptions
     */
    export class DBOptions {
        /**
         * Create DBOptions.
         * @constructor
         * @ignore
         * @param {Object} options
         */
        constructor(options: any);
        createIfMissing: boolean;
        errorIfExists: boolean;
        compression: boolean;
        cacheSize: number;
        writeBufferSize: number;
        maxOpenFiles: number;
        maxFileSize: number;
        paranoidChecks: boolean;
        memory: boolean;
        /**
         * Inject properties from options.
         * @private
         * @param {Object} options
         * @returns {DBOptions}
         */
        private fromOptions;
    }
    /**
     * Bucket
     */
     export class Bucket {
        /**
         * Create a bucket.
         * @constructor
         * @ignore
         * @param {DB} db
         * @param {Batch} batch
         * @param {Buffer} prefix
         */
        constructor(db: DB, prefix: any);
        db: DB;
        prefix: any;
        /**
         * Get bucket.
         * @param {Buffer} prefix
         * @returns {Bucket}
         */
        bucket(prefix: any): Bucket;
        /**
         * Get root bucket.
         * @returns {Bucket}
         */
        root(): Bucket;
        /**
         * Get child bucket.
         * @param {Buffer} prefix
         * @returns {Bucket}
         */
        child(prefix: any): Bucket;
        /**
         * Wrap a batch or iterator.
         * @param {Object} obj
         * @returns {Object}
         */
        wrap(obj: any): any;
        /**
         * Create a batch.
         * @returns {Batch}
         */
        batch(): Batch;
        /**
         * Get a value from the bucket.
         * @param {Buffer} key
         * @returns {Promise}
         */
        has(key: any): Promise<any>;
        /**
         * Get a value from the bucket.
         * @param {Buffer} key
         * @returns {Promise}
         */
        get(key: any): Promise<any>;
        /**
         * Create an iterator.
         * @param {Object} options
         * @returns {Iterator}
         */
        iterator(options: any): Iterator;
        /**
         * Collect all keys from iterator options.
         * @param {Object} options - Iterator options.
         * @returns {Promise} - Returns Array.
         */
        range(options: any): Promise<any>;
        /**
         * Collect all keys from iterator options.
         * @param {Object} options - Iterator options.
         * @returns {Promise} - Returns Array.
         */
        keys(options: any): Promise<any>;
        /**
         * Collect all keys from iterator options.
         * @param {Object} options - Iterator options.
         * @returns {Promise} - Returns Array.
         */
        values(options: any): Promise<any>;
    }
    /**
     * Batch
     */
     export class Batch {
        /**
         * Create a batch.
         * @constructor
         * @ignore
         * @param {Object} binding
         * @param {Buffer} [prefix=null]
         */
        constructor(binding: any, prefix?: any);
        binding: any;
        prefix: any;
        /**
         * Get bucket.
         * @returns {Batch}
         */
        bucket(prefix: any): Batch;
        /**
         * Get root batch.
         * @returns {Batch}
         */
        root(): Batch;
        /**
         * Get child batch.
         * @param {Buffer} prefix
         * @returns {Batch}
         */
        child(prefix: any): Batch;
        /**
         * Wrap a batch or iterator.
         * @param {Object} obj
         * @returns {Object}
         */
        wrap(obj: any): any;
        /**
         * Write a value to the batch.
         * @param {Buffer} key
         * @param {Buffer} value
         */
        put(key: any, value: any): Batch;
        /**
         * Delete a value from the batch.
         * @param {Buffer} key
         */
        del(key: any): Batch;
        /**
         * Write batch to database.
         * @returns {Promise}
         */
        write(): Promise<any>;
        /**
         * Clear the batch.
         */
        clear(): Batch;
    }
    /**
     * Iterator
     */
     export class Iterator {
        /**
         * Create an iterator.
         * @constructor
         * @ignore
         * @param {DB} db
         * @param {Object} [options=null]
         * @param {Buffer} [prefix=null]
         */
        constructor(db: DB, options?: any, prefix?: any);
        db: DB;
        options: any;
        prefix: any;
        binding: any;
        cache: any[];
        finished: boolean;
        key: any;
        value: any;
        /**
         * Start the iterator.
         */
        start(): void;
        /**
         * Get bucket.
         * @param {Buffer} prefix
         * @returns {Iterator}
         */
        bucket(prefix: any): Iterator;
        /**
         * Get root iterator.
         * @returns {Iterator}
         */
        root(): Iterator;
        /**
         * Get child iterator.
         * @param {Buffer} prefix
         * @returns {Iterator}
         */
        child(prefix: any): Iterator;
        /**
         * Wrap a batch or iterator.
         * @param {Object} obj
         * @returns {Object}
         */
        wrap(obj: any): any;
        /**
         * Clean up iterator.
         * @private
         */
        private cleanup;
        /**
         * For each.
         * @returns {Promise}
         */
        each(cb: any): Promise<any>;
        /**
         * Seek to the next key.
         * @returns {Promise}
         */
        next(): Promise<any>;
        /**
         * Seek to the next key.
         * @private
         * @param {Function} callback
         */
        private _read;
        /**
         * Seek to the next key (buffer values).
         * @private
         * @returns {Promise}
         */
        private read;
        /**
         * Seek to an arbitrary key.
         * @param {Buffer} key
         */
        seek(key: any): Iterator;
        /**
         * End the iterator.
         * @returns {Promise}
         */
        end(): Promise<any>;
        /**
         * Collect all keys and values from iterator options.
         * @param {Function} parse
         * @returns {Promise} - Returns Array.
         */
        range(parse: Function): Promise<any>;
        /**
         * Collect all keys from iterator options.
         * @param {Function} parse
         * @returns {Promise} - Returns Array.
         */
        keys(parse: Function): Promise<any>;
        /**
         * Collect all values from iterator options.
         * @param {Function} parse
         * @returns {Promise} - Returns Array.
         */
        values(parse: Function): Promise<any>;
    }
}
declare module "bdb/lib/key" {
    export default Key;
    /**
     * Key
     * @ignore
     */
    export class Key {
        /**
         * Create a key.
         * @constructor
         * @param {Number|String} id
         * @param {String[]|null} ops
         */
        constructor(id: number | string, ops?: string[] | null);
        id: any;
        base: any;
        encode(...args: any[]): any;
        decode(key: any): any;
        min(...args: any[]): any;
        max(...args: any[]): any;
        root(): any;
    }
}
declare module "bdb/lib/rbt" {
    export default  RBT;
    /**
     * Red-black Tree
     */
    export class RBT {
        /**
         * Create a red black tree.
         * @constructor
         * @param {Function} compare - Comparator.
         * @param {Boolean?} unique
         */
        constructor(compare: Function, unique: boolean | null);
        root: any;
        compare: Function;
        unique: boolean;
        /**
         * Clear the tree.
         */
        reset(): void;
        /**
         * Do a key lookup.
         * @param {Buffer|String} key
         * @returns {Buffer?} value
         */
        search(key: any | string): any;
        /**
         * Insert a record.
         * @param {Buffer|String} key
         * @param {Buffer} value
         */
        insert(key: any | string, value: any): any;
        /**
         * Repaint necessary nodes after insertion.
         * @private
         * @param {RBTNode} x
         */
        private insertFixup;
        /**
         * Remove a record.
         * @param {Buffer|String} key
         * @returns {Boolean}
         */
        remove(key: any | string): boolean;
        /**
         * Remove a single node.
         * @private
         * @param {RBTNode} z
         */
        private removeNode;
        /**
         * Repaint necessary nodes after removal.
         * @private
         * @param {RBTNode} x
         */
        private removeFixup;
        /**
         * Do a left rotate.
         * @private
         * @param {RBTNode} x
         */
        private rotl;
        /**
         * Do a right rotate.
         * @private
         * @param {RBTNode} x
         */
        private rotr;
        /**
         * Minimum subtree.
         * @private
         * @param {RBTNode} z
         * @returns {RBTNode}
         */
        private min;
        /**
         * Maximum subtree.
         * @private
         * @param {RBTNode} z
         * @returns {RBTNode}
         */
        private max;
        /**
         * Successor node.
         * @private
         * @param {RBTNode} x
         * @returns {RBTNode}
         */
        private successor;
        /**
         * Predecessor node.
         * @private
         * @param {RBTNode} x
         * @returns {RBTNode}
         */
        private predecessor;
        /**
         * Take a snapshot and return
         * a cloned root node (iterative).
         * @returns {RBTNode}
         */
        clone(): RBTNode;
        /**
         * Take a snapshot and return
         * a cloned root node (recursive).
         * @returns {RBTNode}
         */
        snapshot(): RBTNode;
        /**
         * Create an iterator.
         * @param {RBTNode?} snapshot
         * @returns {RBTIterator}
         */
        iterator(snapshot: RBTNode | null): RBTIterator;
        /**
         * Traverse between a range of keys and collect records.
         * @param {Buffer} min
         * @param {Buffer} max
         * @returns {RBTNode[]} Records.
         */
        range(min: any, max: any): RBTNode[];
    }
    /**
     * RBT Node
     */
    export class RBTNode {
        /**
         * Create an RBT node.
         * @constructor
         * @param {Buffer} key
         * @param {Buffer} value
         * @property {Buffer} key
         * @property {Buffer} value
         * @property {Number} color
         * @property {RBTNode|RBTSentinel} parent
         * @property {RBTNode|RBTSentinel} left
         * @property {RBTNode|RBTSentinel} right
         */
        constructor(key: any, value: any);
        key: any;
        value: any;
        color: number;
        parent: any;
        left: any;
        right: any;
        /**
         * Clone the node.
         * @returns {RBTNode}
         */
        clone(): RBTNode;
        /**
         * Clone the node (key/value only).
         * @returns {RBTData}
         */
        copy(): RBTData;
        /**
         * Inspect the rbt node.
         * @returns {Object}
         */
        inspect(): any;
        /**
         * Test whether the node is a leaf.
         * Always returns false.
         * @returns {Boolean}
         */
        isNull(): boolean;
    }
    /**
     * RBT Iterator
     */
    export class RBTIterator {
        /**
         * Create an iterator.
         * @constructor
         * @param {RBT} tree
         * @param {RBTNode} snapshot
         * @property {RBT} tree
         * @property {RBTNode} current
         * @property {Object} key
         * @property {Object} value
         */
        constructor(tree: RBT, snapshot: RBTNode);
        tree: RBT;
        root: RBTNode;
        current: RBTNode;
        key: any;
        value: any;
        /**
         * Compare keys using tree's comparator.
         * @param {Object} key
         */
        compare(key: any): any;
        /**
         * Test whether current node is valid.
         */
        valid(): boolean;
        /**
         * Seek to the root.
         */
        reset(): void;
        /**
         * Seek to the start of the tree.
         */
        seekFirst(): void;
        /**
         * Seek to the end of the tree.
         */
        seekLast(): void;
        /**
         * Seek to a key from the current node (gte).
         * @param {String} key
         */
        seek(key: string): void;
        /**
         * Seek to a key from the current node (gte).
         * @param {String} key
         */
        seekMin(key: string): void;
        /**
         * Seek to a key from the current node (lte).
         * @param {String} key
         */
        seekMax(key: string): void;
        /**
         * Seek to previous node.
         * @param {String} key
         */
        prev(): boolean;
        /**
         * Seek to next node.
         * @returns {Boolean}
         */
        next(): boolean;
        /**
         * Return the current key/value pair.
         * @returns {RBTData}
         */
        data(): RBTData;
    }
    /**
     * RBT Data
     */
    export class RBTData {
        /**
         * Create an RBT key/value pair.
         * @constructor
         * @param {Buffer} key
         * @param {Buffer} value
         * @property {Buffer} key
         * @property {Buffer} value
         */
        constructor(key: any, value: any);
        key: any;
        value: any;
    }
}
declare module "bdb/lib/memdb" {
    import RBT from "bdb/lib/rbt";
    export default MemDB;
    /**
     * MemDB
     */
    export class MemDB {
        /**
         * Destroy the database (leveldown function) (NOP).
         * @param {String} location
         * @param {Function} callback
         */
        static destroy(location: string, callback: Function): void;
        /**
         * Repair the database (leveldown function) (NOP).
         * @param {String} location
         * @param {Function} callback
         */
        static repair(location: string, callback: Function): void;
        /**
         * Create a memdb.
         * @constructor
         * @param {String?} location - Phony location.
         * @param {Object?} options
         * @param {Function} options.compare - Comparator.
         */
        constructor(location: string | null);
        location: string;
        options: {};
        tree: RBT;
        /**
         * Do a key lookup.
         * @private
         * @param {Buffer|String} key
         * @returns {Buffer?} value
         */
        private search;
        /**
         * Insert a record.
         * @private
         * @param {Buffer|String} key
         * @param {Buffer} value
         */
        private insert;
        /**
         * Remove a record.
         * @private
         * @param {Buffer|String} key
         * @returns {Boolean}
         */
        private remove;
        /**
         * Traverse between a range of keys and collect records.
         * @private
         * @param {Buffer} min
         * @param {Buffer} max
         * @returns {RBTData[]} Records.
         */
        private range;
        /**
         * Open the database (leveldown method).
         * @param {Object?} options
         * @param {Function} callback
         */
        open(options: any | null, callback: Function): void;
        /**
         * Close the database (leveldown method).
         * @param {Function} callback
         */
        close(callback: Function): void;
        /**
         * Retrieve a record (leveldown method).
         * @param {Buffer|String} key
         * @param {Object?} options
         * @param {Function} callback - Returns Buffer.
         */
        get(key: any | string, options: any | null, callback: Function): void;
        /**
         * Insert a record (leveldown method).
         * @param {Buffer|String} key
         * @param {Buffer} value
         * @param {Object?} options
         * @param {Function} callback
         */
        put(key: any | string, value: any, options: any | null, callback: Function): void;
        /**
         * Remove a record (leveldown method).
         * @param {Buffer|String} key
         * @param {Object?} options
         * @param {Function} callback
         */
        del(key: any | string, options: any | null, callback: Function): void;
        /**
         * Create an atomic batch (leveldown method).
         * @see Leveldown.Batch
         * @param {Object[]?} ops
         * @param {Object?} options
         * @param {Function} callback
         */
        batch(ops: any[] | null, options: any | null, callback: Function): Batch;
        /**
         * Create an iterator (leveldown method).
         * @param {Object} options - See {Leveldown.Iterator}.
         * @returns {Leveldown.Iterator}.
         */
        iterator(options: any): any;
        /**
         * Get a database property (leveldown method) (NOP).
         * @param {String} name - Property name.
         * @returns {String}
         */
        getProperty(name: string): string;
        /**
         * Calculate approximate database size (leveldown method).
         * @param {Buffer|String} start - Start key.
         * @param {Buffer|String} end - End key.
         * @param {Function} callback - Returns Number.
         */
        approximateSize(start: any | string, end: any | string, callback: Function): void;
    }

    /**
     * Batch
     */
    export class Batch {
        /**
         * Create a batch.
         * @constructor
         * @ignore
         * @param {MemDB} db
         * @param {Object?} options
         */
        constructor(db: MemDB, options: any | null);
        options: any;
        ops: any[];
        db: MemDB;
        written: boolean;
        /**
         * Insert a record.
         * @param {Buffer|String} key
         * @param {Buffer} value
         */
        put(key: any | string, value: any): Batch;
        /**
         * Remove a record.
         * @param {Buffer|String} key
         */
        del(key: any | string): Batch;
        /**
         * Commit the batch.
         * @param {Function} callback
         */
        write(callback: Function): Batch;
        /**
         * Clear batch of all ops.
         */
        clear(): Batch;
    }
}
declare module "bdb/lib/level" {
    export default LevelDOWN;
    /**
     * LevelDOWN
     */
    export class LevelDOWN {
        static destroy(location: any, callback: any): void;
        static repair(location: any, callback: any): void;
        constructor(location: any);
        location: any;
        context: any;
        open(options: any, callback: any): void;
        close(callback: any): void;
        put(key: any, value: any, callback: any): void;
        get(key: any, callback: any): void;
        del(key: any, callback: any): void;
        batch(ops: any, callback: any): Batch;
        approximateSize(start: any, end: any, callback: any): void;
        compactRange(start: any, end: any, callback: any): void;
        getProperty(property: any): any;
        iterator(options: any): Iterator;
    }
    namespace LevelDOWN {
        const leveldown: boolean;
    }
    /**
     * Batch
     */
    export class Batch {
        constructor(db: any);
        context: any;
        put(key: any, value: any): void;
        del(key: any): void;
        clear(): void;
        write(callback: any): void;
    }
    /**
     * Iterator
     */
    export class Iterator {
        constructor(db: any, options: any);
        context: any;
        seek(target: any): void;
        next(callback: any): void;
        end(callback: any): void;
    }
}
declare module "bdb/lib/bdb" {
    import DB from "bdb/lib/db";
    import Key from "bdb/lib/key";
    export function create(options: any): DB;
    export function key(id: any, args?: any): Key;
  
    export { DB, Key };
}

declare module "bdb" {
    export * from "bdb/lib/bdb";
}

declare module "bdb/lib/level-browser" {
    export = Level;
    /**
     * Level
     */
    class Level {
        static destroy(location: any, callback: any): void;
        constructor(location: any);
        options: {};
        version: number;
        name: string;
        location: any;
        db: any;
        store: any;
        transaction(flag: any): any;
        open(options: any, callback: any): Level;
        close(callback: any): Level;
        put(key: any, value: any, callback: any): Level;
        get(key: any, options: any, callback: any): Level;
        del(key: any, callback: any): Level;
        batch(ops: any, options: any, callback: any): Batch;
        iterator(options: any): Iterator;
    }
    /**
     * Batch
     */
    class Batch {
        /**
         * Create a batch.
         * @constructor
         * @ignore
         * @param {Level} db
         * @param {Object?} options
         */
        constructor(db: Level, options: any | null);
        db: Level;
        options: any;
        ops: any[];
        written: boolean;
        /**
         * Insert a record.
         * @param {Buffer|String} key
         * @param {Buffer} value
         */
        put(key: any | string, value: any): Batch;
        /**
         * Remove a record.
         * @param {Buffer|String} key
         */
        del(key: any | string): Batch;
        /**
         * Commit the batch.
         * @param {Function} callback
         */
        write(callback: Function): Batch;
        /**
         * Clear batch of all ops.
         */
        clear(): Batch;
    }
    /**
     * Iterator
     */
    class Iterator {
        constructor(db: any, options: any);
        db: any;
        options: IteratorOptions;
        cursor: any;
        error: Error;
        started: boolean;
        ended: boolean;
        callback: any;
        seek(key: any): void;
        next(callback: any): void;
        end(callback: any): void;
        start(): void;
        respond(err: any, key: any, value: any): void;
    }
    /**
     * Iterator Options
     */
    class IteratorOptions {
        /**
         * Create iterator options.
         * @constructor
         * @ignore
         * @param {Object} options
         */
        constructor(options: any);
        keys: boolean;
        values: boolean;
        start: any;
        end: any;
        gt: boolean;
        lt: boolean;
        keyAsBuffer: boolean;
        valueAsBuffer: boolean;
        reverse: boolean;
        limit: number;
        /**
         * Inject properties from options.
         * @private
         * @param {Object} options
         * @returns {IteratorOptions}
         */
        private fromOptions;
    }
}
