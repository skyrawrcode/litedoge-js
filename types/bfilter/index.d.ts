declare module "bcrypto/lib/internal/assert" {
    export = assert;
    function assert(val: any, msg: any): void;
}
declare module "bcrypto/lib/js/murmur3" {
    export var native: number;
    /**
     * Murmur3 hash.
     * @param {Buffer} data
     * @param {Number} seed
     * @returns {Number}
     */
    export function sum(data: any, seed: number): number;
    /**
     * Murmur3 hash.
     * @param {Buffer} data
     * @param {Number} n
     * @param {Number} tweak
     * @returns {Number}
     */
    export function tweak(data: any, n: number, tweak: number): number;
}
declare module "bcrypto/lib/native/random-openssl" {
    export var native: number;
    /**
     * Generate pseudo-random bytes.
     * @param {Number} size
     * @returns {Buffer}
     */
    export function randomBytes(size: number): any;
    /**
     * Generate pseudo-random bytes.
     * @param {Buffer} data
     * @param {Number} [off=0]
     * @param {Number} [size=data.length-off]
     * @returns {Buffer}
     */
    export function randomFill(data: any, off?: number, size?: number): any;
    /**
     * Generate a random uint32.
     * @returns {Number}
     */
    export function randomInt(): number;
    /**
     * Generate a random uint32 within a range.
     * @param {Number} min - Inclusive.
     * @param {Number} max - Exclusive.
     * @returns {Number}
     */
    export function randomRange(min: number, max: number): number;
}
declare module "bcrypto/lib/native/random-torsion" {
    export var native: number;
    /**
     * Generate pseudo-random bytes.
     * @param {Number} size
     * @returns {Buffer}
     */
    export function randomBytes(size: number): any;
    /**
     * Generate pseudo-random bytes.
     * @param {Buffer} data
     * @param {Number} [off=0]
     * @param {Number} [size=data.length-off]
     * @returns {Buffer}
     */
    export function randomFill(data: any, off?: number, size?: number): any;
    /**
     * Generate a random uint32.
     * @returns {Number}
     */
    export function randomInt(): number;
    /**
     * Generate a random uint32 within a range.
     * @param {Number} min - Inclusive.
     * @param {Number} max - Exclusive.
     * @returns {Number}
     */
    export function randomRange(min: number, max: number): number;
    /**
     * Get OS entropy (for testing).
     * @private
     * @param {Number} size
     * @returns {Buffer}
     */
    function getEntropy(size: number): any;
    export { getEntropy as _getEntropy };
}
declare module "bcrypto/lib/native/random" {
    const _exports: typeof import("bcrypto/lib/native/random-openssl");
    export = _exports;
}
declare module "bcrypto/lib/native/binding" {
    export = binding;
    const binding: any;
}
declare module "bcrypto/lib/native/murmur3" {
    export var native: number;
    export function sum(data: any, seed: any): any;
    export function tweak(data: any, n: any, tweak: any): any;
}
declare module "bcrypto/lib/murmur3" {
    const _exports: typeof import("bcrypto/lib/native/murmur3");
    export = _exports;
}
declare module "bfilter/lib/bloom" {
    export default BloomFilter;
    import {BufferReader, Struct} from "bufio";
    /**
     * Bloom Filter
     */
    export class BloomFilter extends Struct {
        static MAX_BLOOM_FILTER_SIZE: number;
        static MAX_HASH_FUNCS: number;
        static flags: {
             NONE: number;
             ALL: number;
             PUBKEY_ONLY: number;
        }
        static flagsByVal: string[];
        /**
         * *
         */

        /**
         * Instantiate bloom filter from options.
         * @param {Number} size - Filter size in bits.
         * @param {Number} n - Number of hash functions.
         * @param {Number} tweak - Seed value.
         * @param {Number|String} - Update type.
         * @returns {BloomFilter}
         */
        static fromOptions(options: any, extra: any): Struct;
        static fromOptions(size: number, n: number, tweak: number, update: any): BloomFilter;
        /**
         * Create a filter from a false positive rate.
         * @param {Number} items - Expected number of items.
         * @param {Number} rate - False positive rate (0.0-1.0).
         * @param {Number|String} update
         * @example
         * BloomFilter.fromRate(800000, 0.0001, 'none');
         * @returns {BloomFilter}
         */
        static fromRate(items: number, rate: number, update: number | string): BloomFilter;
        /**
         * Create a bloom filter.
         * @constructor
         * @param {Number} size - Filter size in bits.
         * @param {Number} n - Number of hash functions.
         * @param {Number} tweak - Seed value.
         * @param {Number|String} - Update type.
         * @property {Buffer} filter
         * @property {Number} size
         * @property {Number} n
         * @property {Number} tweak
         * @property {Number} update - Update flag (see {@link BloomFilter.flags}).
         */
        constructor(size?: number, n?: number, tweak?: number, update?: any);
        filter: any;
        size: number;
        n: number;
        tweak: number;
        update: number;
        /**
         * Inject properties from options.
         * @private
         * @param {Number} size - Filter size in bits.
         * @param {Number} n - Number of hash functions.
         * @param {Number} tweak - Seed value.
         * @param {Number|String} - Update type.
         * @returns {BloomFilter}
         */
        
         fromOptions(options: any, extra: any): Struct;
        /**
         * Perform the mumur3 hash on data.
         * @param {Buffer} value
         * @param {Number} n
         * @returns {Number}
         */
        hash(value: any, n: number): number;
        /**
         * Reset the filter.
         */
        reset(): void;
        /**
         * Add data to the filter.
         * @param {Buffer|String}
         * @param {String?} enc - Can be any of the Buffer object's encodings.
         */
        add(value: any, enc?: string | null): void;
        /**
         * Test whether data is present in the filter.
         * @param {Buffer|String} value
         * @param {String?} enc - Can be any of the Buffer object's encodings.
         * @returns {Boolean}
         */
        test(value: any | string, enc?: string | null): boolean;
        /**
         * Test whether data is present in the
         * filter and potentially add data.
         * @param {Buffer|String} value
         * @param {String?} enc - Can be any of the Buffer object's encodings.
         * @returns {Boolean} Whether data was added.
         */
        added(value: any | string, enc: string | null): boolean;
        /**
         * Ensure the filter is within the size limits.
         * @returns {Boolean}
         */
        isWithinConstraints(): boolean;
        /**
         * Get serialization size.
         * @returns {Number}
         */
        getSize(): number;
        /**
         * Write filter to buffer writer.
         * @param {BufferWriter} bw
         */
        write(bw: any): any;
        /**
         * Inject properties from buffer reader.
         * @param {BufferReader} br
         */
        read(br: BufferReader): any;
    }

  
}

declare module "bfilter/lib/rolling" {
    export default RollingFilter;
    /**
     * Rolling Bloom Filter
     */
    class RollingFilter {
        /**
         * Instantiate rolling filter from items and FPR.
         * @param {Number} items - Expected number of items.
         * @param {Number} rate - False positive rate (0.0-1.0).
         * @returns {RollingFilter}
         */
        static fromRate(items: number, rate: number): RollingFilter;
        /**
         * Create a rolling bloom filter.
         * @constructor
         * @param {Number} items - Expected number of items.
         * @param {Number} rate - False positive rate (0.0-1.0).
         */
        constructor(items: number, rate: number);
        entries: number;
        generation: number;
        n: number;
        limit: number;
        size: number;
        items: number;
        tweak: number;
        filter: any;
        /**
         * Inject properties from items and FPR.
         * @private
         * @param {Number} items - Expected number of items.
         * @param {Number} rate - False positive rate (0.0-1.0).
         * @returns {RollingFilter}
         */
        private fromRate;
        /**
         * Perform the mumur3 hash on data.
         * @param {Buffer} value
         * @param {Number} seed
         * @returns {Number}
         */
        hash(value: any, n: any): number;
        /**
         * Reset the filter.
         */
        reset(): void;
        /**
         * Add data to the filter.
         * @param {Buffer|String}
         * @param {String?} enc - Can be any of the Buffer object's encodings.
         */
        add(value: any, enc?: string | null): void;
        /**
         * Test whether data is present in the filter.
         * @param {Buffer|String} value
         * @param {String?} enc - Can be any of the Buffer object's encodings.
         * @returns {Boolean}
         */
        test(value: any | string, enc?: string | null): boolean;
        /**
         * Test whether data is present in the
         * filter and potentially add data.
         * @param {Buffer|String} value
         * @param {String?} enc - Can be any of the Buffer object's encodings.
         * @returns {Boolean} Whether data was added.
         */
        added(value: any | string, enc?: string | null): boolean;
    }
}
declare module "bfilter/lib/bfilter" {
    import BloomFilter from "bfilter/lib/bloom";
    import RollingFilter from "bfilter/lib/rolling";
    export { BloomFilter, RollingFilter };
}
declare module "bfilter" {
    export * from 'bfilter/lib/bfilter';
}