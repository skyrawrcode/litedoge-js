declare module "bval/lib/validator" {
    export default Validator;
    /**
     * Validator
     */
    export class Validator {
        /**
         * Create a multi validator.
         * @param {Object[]} maps
         * @param {Boolean} [loose=false]
         * @returns {MultiValidator}
         */
        static multi(maps: any[], loose?: boolean): MultiValidator;
        /**
         * Create a multi validator from an http request.
         * @param {Object} req
         * @returns {MultiValidator}
         */
        static fromRequest(req: any): MultiValidator;
        /**
         * Create a validator.
         * @constructor
         * @param {Object} map
         * @param {Boolean} [loose=false]
         */
        constructor(map: any, loose?: boolean);
        map: any;
        loose: boolean;
        /**
         * Create a child validator.
         * @param {String} key
         * @returns {Validator}
         */
        child(key: string): Validator;
        /**
         * Test whether value is present.
         * @param {String} key
         * @returns {Boolean}
         */
        has(key: string): boolean;
        /**
         * Get a value (no type validation).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Object|null}
         */
        get(key: string, fallback: any | null): any | null;
        /**
         * Get a value's type.
         * @param {String} key
         * @returns {String}
         */
        typeOf(key: string): string;
        /**
         * Get a value (as a string).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {String|null}
         */
        str(key: string|number, fallback?: any | null): string | null;
        /**
         * Get a value (as an integer).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        int(key: string, fallback?: any | null): number | null;
        /**
         * Get a value (as a signed integer).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        uint(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as a float).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        float(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as a positive float).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        ufloat(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as a fixed number).
         * @param {String} key
         * @param {Number?} exp
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        fixed(key: string, exp: number | null, fallback: any | null): number | null;
        /**
         * Get a value (as a positive fixed number).
         * @param {String} key
         * @param {Number?} exp
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        ufixed(key: string|number, exp: number | null, fallback?: any | null): number | null;
        /**
         * Get a value (as an int32).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        i8(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as an int32).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        i16(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as an int32).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        i32(key: string|number, fallback: any | null): number | null;
        /**
         * Get a value (as an int64).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        i64(key: string|number, fallback?: any | null): number | null;
        /**
         * Get a value (as a uint32).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        u8(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as a uint16).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        u16(key: string, fallback: any | null): number | null;
        /**
         * Get a value (as a uint32).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        u32(key: string|number, fallback?: any | null): number | null;
        /**
         * Get a value (as a uint64).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|null}
         */
        u64(key: string, fallback?: any | null): number | null;
        /**
         * Get a value (as a reverse hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Hash|null}
         */
        hash(key: string, fallback: any | null): any | null;
        /**
         * Get a value (as a reverse hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Buffer|null}
         */
        bhash(key: string, fallback: any | null): any | null;
        /**
         * Get a value (as a number or hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|Hash|null}
         */
        uinthash(key: string, fallback: any | null): number | any | null;
        /**
         * Get a value (as a number or hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|Buffer|null}
         */
        uintbhash(key: string, fallback: any | null): number | any | null;
        /**
         * Get a value (as a reverse hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Hash|null}
         */
        rhash(key: string, fallback: any | null): any | null;
        /**
         * Get a value (as a reverse hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Buffer|null}
         */
        brhash(key: string|number, fallback?: any | null): Buffer | null;
        /**
         * Get a value (as a number or reverse hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|Hash|null}
         */
        uintrhash(key: string, fallback: any | null): number | any | null;
        /**
         * Get a value (as a number or reverse hash).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Number|Buffer|null}
         */
        uintbrhash(key: string|number, fallback?: any | null): number | any | null;
        /**
         * Get a value (as a boolean).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Boolean|null}
         */
        bool(key: string|number, fallback: any | null): boolean | null;
        /**
         * Get a value (as a buffer).
         * @param {String} key
         * @param {Object?} fallback
         * @param {String?} enc
         * @returns {Buffer|null}
         */
        buf(key: string|number, fallback?: any | null, enc?: string | null): any | null;
        /**
         * Get a value (as an array).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Array|String[]|null}
         */
        array(key: string|number, fallback?: any | null): any[] | string[] | null;
        /**
         * Get a value (as an object).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Object|null}
         */
        obj(key: string|number, fallback?: any | null): any | null;
        /**
         * Get a value (as a function).
         * @param {String} key
         * @param {Object?} fallback
         * @returns {Function|null}
         */
        func(key: string, fallback: any | null): Function | null;
    }
    /**
     * Multi Validator
     * @extends Validator
     */
    class MultiValidator {
        /**
         * Create a multi validator.
         * @constructor
         * @param {Object[]} maps
         * @param {Boolean} [loose=false]
         */
        constructor(maps: any[], loose?: boolean);
        maps: any[];
        /**
         * Initialize the validator.
         * @private
         * @param {Object[]} maps
         * @param {Boolean} [loose=false]
         */
        private init;
        /**
         * Get a validator.
         * @private
         * @param {String} key
         * @returns {Validator}
         */
        private find;
        child(key: any): Validator;
        has(key: any): boolean;
        get(key: any, fallback?: any): any;
        typeOf(key: any): string;
        str(key: any, fallback?: any): string;
        int(key: any, fallback: any): number;
        uint(key: any, fallback: any): number;
        float(key: any, fallback: any): number;
        ufloat(key: any, fallback: any): number;
        fixed(key: any, exp: any, fallback: any): number;
        ufixed(key: any, exp: any, fallback: any): number;
        i8(key: any, fallback?: any): number;
        i16(key: any, fallback?: any): number;
        i32(key: any, fallback?: any): number;
        i64(key: any, fallback?: any): number;
        u8(key: any, fallback?: any): number;
        u16(key: any, fallback?: any): number;
        u32(key: any, fallback?: any): number;
        u64(key: any, fallback?: any): number;
        hash(key: any, fallback: any): any;
        bhash(key: any, fallback: any): any;
        uinthash(key: any, fallback: any): any;
        uintbhash(key: any, fallback: any): any;
        rhash(key: any, fallback: any): any;
        brhash(key: any, fallback?: any): any;
        uintrhash(key: any, fallback: any): any;
        uintbrhash(key: any, fallback?: any): any;
        bool(key: any, fallback?: any): boolean;
        buf(key: any, fallback?: any, enc?: any): any;
        array(key: any, fallback: any): any[] | string[];
        obj(key: any, fallback: any): any;
        func(key: any, fallback: any): Function;
    }
}

declare module "bval" {
    import validator from "bval/lib/validator";
    export = validator;
}
declare module "bval/lib/bval" {
    export * from "bval/lib/validator";
}
declare module "bval/lib/util" {
    export function isNumber(value: number | null): boolean;
    export function isInt(value: number | null): boolean;
    export function isUint(value: number | null): boolean;
    export function isFloat(value: number | null): boolean;
    export function isUfloat(value: number | null): boolean;
    export function isI8(value: number | null): boolean;
    export function isI16(value: number | null): boolean;
    export function isI32(value: number | null): boolean;
    export function isI64(value: number | null): boolean;
    export function isU8(value: number | null): boolean;
    export function isU16(value: number | null): boolean;
    export function isU32(value: number | null): boolean;
    export function isU64(value: number | null): boolean;
    export function isAscii(str: string): boolean;
    export function isBase58(str: string | null): boolean;
    export function isBech32(str: string | null): boolean;
    export function isHex(str: string | null): boolean;
    export function isHex160(hash: string | null): boolean;
    export function isHex256(hash: string | null): boolean;
    export function isSafeAddition(a: any, b: any): boolean;
}
