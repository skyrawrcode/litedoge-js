declare module "bufio" {
    import bio from "bufio/lib/bufio";
    export * from "bufio/lib/bufio";
    // const _exports: typeof import("bufio/lib/bufio");
    // export = _exports;
}
declare module "bufio/lib/custom" {
    export var custom: any;
}
declare module "bufio/lib/enforce" {
    export = enforce;
    function enforce(value: any, name: any, type: any): void;
}
declare module "bufio/lib/error" {
    export = EncodingError;
    /**
     * Encoding Error
     * @extends {Error}
     */
    class EncodingError extends Error {
        /**
         * Create an encoding error.
         * @constructor
         * @param {Number} offset
         * @param {String} reason
         */
        constructor(offset: number, reason: string, start: any);
        type: string;
        code: string;
    }
}
declare module "bufio/lib/encoding" {
    export function readUBI(data: any, off: any, len: any): any;
    export function readU64BI(data: any, off: any): any;
    export function readU56BI(data: any, off: any): any;
    export function readU48BI(data: any, off: any): any;
    export function readU40BI(data: any, off: any): any;
    export function readU32BI(data: any, off: any): any;
    export function readU24BI(data: any, off: any): any;
    export function readU16BI(data: any, off: any): any;
    export function readU8BI(data: any, off: any): any;
    export function readU(data: any, off: any, len: any): any;
    export function readU64(data: any, off: any): any;
    export function readU56(data: any, off: any): any;
    export function readU48(data: any, off: any): any;
    export function readU40(data: any, off: any): any;
    export function readU32(data: any, off: any): any;
    export function readU24(data: any, off: any): any;
    export function readU16(data: any, off: any): any;
    export function readU8(data: any, off: any): any;
    export function readUBEBI(data: any, off: any, len: any): any;
    export function readU64BEBI(data: any, off: any): any;
    export function readU56BEBI(data: any, off: any): any;
    export function readU48BEBI(data: any, off: any): any;
    export function readU40BEBI(data: any, off: any): any;
    export function readU32BEBI(data: any, off: any): any;
    export function readU24BEBI(data: any, off: any): any;
    export function readU16BEBI(data: any, off: any): any;
    export function readUBE(data: any, off: any, len: any): any;
    export function readU64BE(data: any, off: any): any;
    export function readU56BE(data: any, off: any): any;
    export function readU48BE(data: any, off: any): any;
    export function readU40BE(data: any, off: any): any;
    export function readU32BE(data: any, off: any): any;
    export function readU24BE(data: any, off: any): any;
    export function readU16BE(data: any, off: any): any;
    export function readIBI(data: any, off: any, len: any): any;
    export function readI64BI(data: any, off: any): any;
    export function readI56BI(data: any, off: any): any;
    export function readI48BI(data: any, off: any): any;
    export function readI40BI(data: any, off: any): any;
    export function readI32BI(data: any, off: any): any;
    export function readI24BI(data: any, off: any): any;
    export function readI16BI(data: any, off: any): any;
    export function readI8BI(data: any, off: any): any;
    export function readI(data: any, off: any, len: any): any;
    export function readI64(data: any, off: any): any;
    export function readI56(data: any, off: any): any;
    export function readI48(data: any, off: any): any;
    export function readI40(data: any, off: any): any;
    export function readI32(data: any, off: any): any;
    export function readI24(data: any, off: any): number;
    export function readI16(data: any, off: any): number;
    export function readI8(data: any, off: any): number;
    export function readIBEBI(data: any, off: any, len: any): any;
    export function readI64BEBI(data: any, off: any): any;
    export function readI56BEBI(data: any, off: any): any;
    export function readI48BEBI(data: any, off: any): any;
    export function readI40BEBI(data: any, off: any): any;
    export function readI32BEBI(data: any, off: any): any;
    export function readI24BEBI(data: any, off: any): any;
    export function readI16BEBI(data: any, off: any): any;
    export function readIBE(data: any, off: any, len: any): any;
    export function readI64BE(data: any, off: any): any;
    export function readI56BE(data: any, off: any): any;
    export function readI48BE(data: any, off: any): any;
    export function readI40BE(data: any, off: any): any;
    export function readI32BE(data: any, off: any): any;
    export function readI24BE(data: any, off: any): number;
    export function readI16BE(data: any, off: any): number;
    export function readFloat(data: any, off: any): number;
    export function readFloatBE(data: any, off: any): number;
    export function readDouble(data: any, off: any): number;
    export function readDoubleBE(data: any, off: any): number;
    export function writeUBI(dst: any, num: any, off: any, len: any): any;
    export function writeU64BI(dst: any, num: any, off: any): any;
    export function writeU56BI(dst: any, num: any, off: any): any;
    export function writeU48BI(dst: any, num: any, off: any): any;
    export function writeU40BI(dst: any, num: any, off: any): any;
    export function writeU32BI(dst: any, num: any, off: any): any;
    export function writeU24BI(dst: any, num: any, off: any): any;
    export function writeU16BI(dst: any, num: any, off: any): any;
    export function writeU8BI(dst: any, num: any, off: any): any;
    export function writeU(dst: any, num: any, off: any, len: any): any;
    export function writeU64(dst: any, num: any, off: any): any;
    export function writeU56(dst: any, num: any, off: any): any;
    export function writeU48(dst: any, num: any, off: any): any;
    export function writeU40(dst: any, num: any, off: any): any;
    export function writeU32(dst: any, num: any, off: any): any;
    export function writeU24(dst: any, num: any, off: any): any;
    export function writeU16(dst: any, num: any, off: any): any;
    export function writeU8(dst: any, num: any, off: any): any;
    export function writeUBEBI(dst: any, num: any, off: any, len: any): any;
    export function writeU64BEBI(dst: any, num: any, off: any): any;
    export function writeU56BEBI(dst: any, num: any, off: any): any;
    export function writeU48BEBI(dst: any, num: any, off: any): any;
    export function writeU40BEBI(dst: any, num: any, off: any): any;
    export function writeU32BEBI(dst: any, num: any, off: any): any;
    export function writeU24BEBI(dst: any, num: any, off: any): any;
    export function writeU16BEBI(dst: any, num: any, off: any): any;
    export function writeUBE(dst: any, num: any, off: any, len: any): any;
    export function writeU64BE(dst: any, num: any, off: any): any;
    export function writeU56BE(dst: any, num: any, off: any): any;
    export function writeU48BE(dst: any, num: any, off: any): any;
    export function writeU40BE(dst: any, num: any, off: any): any;
    export function writeU32BE(dst: any, num: any, off: any): any;
    export function writeU24BE(dst: any, num: any, off: any): any;
    export function writeU16BE(dst: any, num: any, off: any): any;
    export function writeI(dst: any, num: any, off: any, len: any): any;
    export function writeI64(dst: any, num: any, off: any): any;
    export function writeI56(dst: any, num: any, off: any): any;
    export function writeI48(dst: any, num: any, off: any): any;
    export function writeI40(dst: any, num: any, off: any): any;
    export function writeI32(dst: any, num: any, off: any): any;
    export function writeI24(dst: any, num: any, off: any): any;
    export function writeI16(dst: any, num: any, off: any): any;
    export function writeI8(dst: any, num: any, off: any): any;
    export function writeIBI(dst: any, num: any, off: any, len: any): any;
    export function writeI64BI(dst: any, num: any, off: any): any;
    export function writeI56BI(dst: any, num: any, off: any): any;
    export function writeI48BI(dst: any, num: any, off: any): any;
    export function writeI40BI(dst: any, num: any, off: any): any;
    export function writeI32BI(dst: any, num: any, off: any): any;
    export function writeI24BI(dst: any, num: any, off: any): any;
    export function writeI16BI(dst: any, num: any, off: any): any;
    export function writeI8BI(dst: any, num: any, off: any): any;
    export function writeIBE(dst: any, num: any, off: any, len: any): any;
    export function writeI64BE(dst: any, num: any, off: any): any;
    export function writeI56BE(dst: any, num: any, off: any): any;
    export function writeI48BE(dst: any, num: any, off: any): any;
    export function writeI40BE(dst: any, num: any, off: any): any;
    export function writeI32BE(dst: any, num: any, off: any): any;
    export function writeI24BE(dst: any, num: any, off: any): any;
    export function writeI16BE(dst: any, num: any, off: any): any;
    export function writeIBEBI(dst: any, num: any, off: any, len: any): any;
    export function writeI64BEBI(dst: any, num: any, off: any): any;
    export function writeI56BEBI(dst: any, num: any, off: any): any;
    export function writeI48BEBI(dst: any, num: any, off: any): any;
    export function writeI40BEBI(dst: any, num: any, off: any): any;
    export function writeI32BEBI(dst: any, num: any, off: any): any;
    export function writeI24BEBI(dst: any, num: any, off: any): any;
    export function writeI16BEBI(dst: any, num: any, off: any): any;
    export function writeFloat(dst: any, num: any, off: any): any;
    export function writeFloatBE(dst: any, num: any, off: any): any;
    export function writeDouble(dst: any, num: any, off: any): any;
    export function writeDoubleBE(dst: any, num: any, off: any): any;
    export function readVarint(data: any, off: any): Varint;
    export function writeVarint(dst: any, num: any, off: any): any;
    export function sizeVarint(num: any): 1 | 3 | 5 | 9;
    export function readVarint2(data: any, off: any): Varint;
    export function writeVarint2(dst: any, num: any, off: any): any;
    export function sizeVarint2(num: any): number;
    export function readVarintBI(data: any, off: any): VarintBI;
    export function writeVarintBI(dst: any, num: any, off: any): any;
    export function sizeVarintBI(num: any): 1 | 3 | 5 | 9;
    export function sliceBytes(data: any, off: any, size: any): any;
    export function readBytes(data: any, off: any, size: any): any;
    export function writeBytes(data: any, value: any, off: any): any;
    export function readString(data: any, off: any, size: any, enc: any): any;
    export function writeString(data: any, str: any, off: any, enc: any): any;
    export function realloc(data: any, size: any): any;
    export function copy(data: any): any;
    export function concat(a: any, b: any): any;
    export function sizeVarBytes(data: any): any;
    export function sizeVarlen(len: any): any;
    export function sizeVarString(str: any, enc: any): any;
    class Varint {
        constructor(size: any, value: any);
        size: any;
        value: any;
    }
    class VarintBI {
        constructor(size: any, value: any);
        size: any;
        value: any;
    }
    export {};
}
declare module "bufio/lib/reader" {
    export = BufferReader;
    /**
     * Buffer Reader
     */
    class BufferReader {
        /**
         * Create a buffer reader.
         * @constructor
         * @param {Buffer} data
         * @param {Boolean?} zeroCopy - Do not reallocate buffers when
         * slicing. Note that this can lead to memory leaks if not used
         * carefully.
         */
        constructor(data: any, zeroCopy?: boolean | null);
        data: any;
        offset: number;
        zeroCopy: boolean;
        stack: any[];
        /**
         * Assertion.
         * @param {Number} size
         */
        check(size: number): void;
        /**
         * Get total size of passed-in Buffer.
         * @returns {Buffer}
         */
        getSize(): any;
        /**
         * Calculate number of bytes left to read.
         * @returns {Number}
         */
        left(): number;
        /**
         * Seek to a position to read from by offset.
         * @param {Number} off - Offset (positive or negative).
         */
        seek(off: number): BufferReader;
        /**
         * Mark the current starting position.
         */
        start(): number;
        /**
         * Stop reading. Pop the start position off the stack
         * and calculate the size of the data read.
         * @returns {Number} Size.
         * @throws on empty stack.
         */
        end(): number;
        /**
         * Stop reading. Pop the start position off the stack
         * and return the data read.
         * @param {Bolean?} zeroCopy - Do a fast buffer
         * slice instead of allocating a new buffer (warning:
         * may cause memory leaks if not used with care).
         * @returns {Buffer} Data read.
         * @throws on empty stack.
         */
        endData(zeroCopy?: any): any;
        /**
         * Destroy the reader. Remove references to the data.
         */
        destroy(): BufferReader;
        /**
         * Read uint8.
         * @returns {Number}
         */
        readU8(): number;
        /**
         * Read uint8 BigInt.
         * @returns {BigInt}
         */
        readU8BI(): any;
        /**
         * Read uint16le.
         * @returns {Number}
         */
        readU16(): number;
        /**
         * Read uint16le BigInt.
         * @returns {BigInt}
         */
        readU16BI(): any;
        /**
         * Read uint16be.
         * @returns {Number}
         */
        readU16BE(): number;
        /**
         * Read uint16be BigInt.
         * @returns {BigInt}
         */
        readU16BEBI(): any;
        /**
         * Read uint24le.
         * @returns {Number}
         */
        readU24(): number;
        /**
         * Read uint24le BigInt
         * @returns {BigInt}
         */
        readU24BI(): any;
        /**
         * Read uint24be.
         * @returns {Number}
         */
        readU24BE(): number;
        /**
         * Read uint24be BigInt.
         * @returns {BigInt}
         */
        readU24BEBI(): any;
        /**
         * Read uint32le.
         * @returns {Number}
         */
        readU32(): number;
        /**
         * Read uint32le BigInt.
         * @returns {BigInt}
         */
        readU32BI(): any;
        /**
         * Read uint32be.
         * @returns {Number}
         */
        readU32BE(): number;
        /**
         * Read uint32be BigInt.
         * @returns {BigInt}
         */
        readU32BEBI(): any;
        /**
         * Read uint40le.
         * @returns {Number}
         */
        readU40(): number;
        /**
         * Read uint40le BigInt.
         * @returns {BigInt}
         */
        readU40BI(): any;
        /**
         * Read uint40be.
         * @returns {Number}
         */
        readU40BE(): number;
        /**
         * Read uint40be BigInt.
         * @returns {BigInt}
         */
        readU40BEBI(): any;
        /**
         * Read uint48le.
         * @returns {Number}
         */
        readU48(): number;
        /**
         * Read uint48le BigInt.
         * @returns {BigInt}
         */
        readU48BI(): any;
        /**
         * Read uint48be.
         * @returns {Number}
         */
        readU48BE(): number;
        /**
         * Read uint56le.
         * @returns {Number}
         */
        readU56(): number;
        /**
         * Read uint56le BigInt.
         * @returns {BigInt}
         */
        readU56BI(): any;
        /**
         * Read uint56be.
         * @returns {Number}
         */
        readU56BE(): number;
        /**
         * Read uint56be BigInt.
         * @returns {BigInt}
         */
        readU56BEBI(): any;
        /**
         * Read uint64le as a js number.
         * @returns {Number}
         * @throws on num > MAX_SAFE_INTEGER
         */
        readU64(): number;
        /**
         * Read uint64le as a js BigInt.
         * @returns {BigInt}
         */
        readU64BI(): any;
        /**
         * Read uint64be as a js number.
         * @returns {Number}
         * @throws on num > MAX_SAFE_INTEGER
         */
        readU64BE(): number;
        /**
         * Read uint64be as a js BigInt.
         * @returns {BigInt}
         */
        readU64BEBI(): any;
        /**
         * Read int8.
         * @returns {Number}
         */
        readI8(): number;
        /**
         * Read int8 BigInt.
         * @returns {BigInt}
         */
        readI8BI(): any;
        /**
         * Read int16le.
         * @returns {Number}
         */
        readI16(): number;
        /**
         * Read int16le BigInt.
         * @returns {BigInt}
         */
        readI16BI(): any;
        /**
         * Read int16be.
         * @returns {Number}
         */
        readI16BE(): number;
        /**
         * Read int16be BigInt.
         * @returns {BigInt}
         */
        readI16BEBI(): any;
        /**
         * Read int24le.
         * @returns {Number}
         */
        readI24(): number;
        /**
         * Read int24le BigInt.
         * @returns {BigInt}
         */
        readI24BI(): any;
        /**
         * Read int24be.
         * @returns {Number}
         */
        readI24BE(): number;
        /**
         * Read int24be BigInt.
         * @returns {BigInt}
         */
        readI24BEBI(): any;
        /**
         * Read int32le.
         * @returns {Number}
         */
        readI32(): number;
        /**
         * Read int32le BigInt.
         * @returns {BigInt}
         */
        readI32BI(): any;
        /**
         * Read int32be.
         * @returns {Number}
         */
        readI32BE(): number;
        /**
         * Read int32be BigInt.
         * @returns {BigInt}
         */
        readI32BEBI(): any;
        /**
         * Read int40le.
         * @returns {Number}
         */
        readI40(): number;
        /**
         * Read int40le BigInt.
         * @returns {BigInt}
         */
        readI40BI(): any;
        /**
         * Read int40be.
         * @returns {Number}
         */
        readI40BE(): number;
        /**
         * Read int40be BigInt.
         * @returns {BigInt}
         */
        readI40BEBI(): any;
        /**
         * Read int48le BigInt.
         * @returns {BigInt}
         */
        readI48BI(): any;
        /**
         * Read int48be.
         * @returns {Number}
         */
        readI48BE(): number;
        /**
         * Read int48be BigInt.
         * @returns {BigInt}
         */
        readI48BEBI(): any;
        /**
         * Read int56le.
         * @returns {Number}
         */
        readI56(): number;
        /**
         * Read int56le BigInt.
         * @returns {BigInt}
         */
        readI56BI(): any;
        /**
         * Read int56be.
         * @returns {Number}
         */
        readI56BE(): number;
        /**
         * Read int56be BigInt.
         * @returns {BigInt}
         */
        readI56BEBI(): any;
        /**
         * Read int64le as a js number.
         * @returns {Number}
         * @throws on num > MAX_SAFE_INTEGER
         */
        readI64(): number;
        /**
         * Read int64le as a js BigInt.
         * @returns {BigInt}
         */
        readI64BI(): any;
        /**
         * Read int64be as a js number.
         * @returns {Number}
         * @throws on num > MAX_SAFE_INTEGER
         */
        readI64BE(): number;
        /**
         * Read int64be as a js BigInt.
         * @returns {BigInt}
         */
        readI64BEBI(): any;
        /**
         * Read float le.
         * @returns {Number}
         */
        readFloat(): number;
        /**
         * Read float be.
         * @returns {Number}
         */
        readFloatBE(): number;
        /**
         * Read double float le.
         * @returns {Number}
         */
        readDouble(): number;
        /**
         * Read double float be.
         * @returns {Number}
         */
        readDoubleBE(): number;
        /**
         * Read a varint.
         * @returns {Number}
         */
        readVarint(): number;
        /**
         * Read a varint as a BigInt.
         * @returns {BigInt}
         */
        readVarintBI(): any;
        /**
         * Read a varint (type 2).
         * @returns {Number}
         */
        readVarint2(): number;
        /**
         * Read N bytes (will do a fast slice if zero copy).
         * @param {Number} size
         * @param {Bolean?} zeroCopy - Do a fast buffer
         * slice instead of allocating a new buffer (warning:
         * may cause memory leaks if not used with care).
         * @returns {Buffer}
         */
        readBytes(size: number, zeroCopy?: any): any;
        /**
         * Read a varint number of bytes (will do a fast slice if zero copy).
         * @param {Bolean?} zeroCopy - Do a fast buffer
         * slice instead of allocating a new buffer (warning:
         * may cause memory leaks if not used with care).
         * @returns {Buffer}
         */
        readVarBytes(zeroCopy?: any): any;
        /**
         * Slice N bytes and create a child reader.
         * @param {Number} size
         * @returns {BufferReader}
         */
        readChild(size: number): BufferReader;
        /**
         * Read a string.
         * @param {Number} size
         * @param {String} enc - Any buffer-supported encoding.
         * @returns {String}
         */
        readString(size: number, enc: string): string;
        /**
         * Read a 32-byte hash.
         * @param {String} enc - `"hex"` or `null`.
         * @returns {Hash|Buffer}
         */
        readHash(enc: 'hex'): string;
        /**
         * Read a 32-byte hash.
         * @param {String} enc - `"hex"` or `null`.
         * @returns {Hash|Buffer}
         */
        readHash():  Buffer;
        /**
         * Read string of a varint length.
         * @param {String} enc - Any buffer-supported encoding.
         * @param {Number?} limit - Size limit.
         * @returns {String}
         */
        readVarString(enc: string, limit?: number | null): string;
        /**
         * Read a null-terminated string.
         * @param {String} enc - Any buffer-supported encoding.
         * @returns {String}
         */
        readNullString(enc: string): string;
        /**
         * Create a checksum from the last start position.
         * @param {Function} hash
         * @returns {Number} Checksum.
         */
        createChecksum(hash: Function): number;
        /**
         * Verify a 4-byte checksum against a calculated checksum.
         * @param {Function} hash
         * @returns {Number} checksum
         * @throws on bad checksum
         */
        verifyChecksum(hash: Function): number;
    }
}
declare module "bufio/lib/writer" {
    export = BufferWriter;
    /**
     * Buffer Writer
     */
    class BufferWriter {
        ops: any[];
        offset: number;
        /**
         * Allocate and render the final buffer.
         * @returns {Buffer} Rendered buffer.
         */
        render(): any;
        /**
         * Get size of data written so far.
         * @returns {Number}
         */
        getSize(): number;
        /**
         * Seek to relative offset.
         * @param {Number} offset
         */
        seek(off: any): BufferWriter;
        /**
         * Destroy the buffer writer. Remove references to `ops`.
         */
        destroy(): BufferWriter;
        /**
         * Write uint8.
         * @param {Number} value
         */
        writeU8(value: number): BufferWriter;
        /**
         * Write uint16le.
         * @param {Number} value
         */
        writeU16(value: number): BufferWriter;
        /**
         * Write uint16be.
         * @param {Number} value
         */
        writeU16BE(value: number): BufferWriter;
        /**
         * Write uint24le.
         * @param {Number} value
         */
        writeU24(value: number): BufferWriter;
        /**
         * Write uint24be.
         * @param {Number} value
         */
        writeU24BE(value: number): BufferWriter;
        /**
         * Write uint32le.
         * @param {Number} value
         */
        writeU32(value: number): BufferWriter;
        /**
         * Write uint32le BigInt.
         * @param {BigInt} value
         */
        writeU32(value: any): BufferWriter;
        /**
         * Write uint32be.
         * @param {Number} value
         */
        writeU32BE(value: number): BufferWriter;
        /**
         * Write uint40le.
         * @param {Number} value
         */
        writeU40(value: number): BufferWriter;
        /**
         * Write uint40be.
         * @param {Number} value
         */
        writeU40BE(value: number): BufferWriter;
        /**
         * Write uint48le.
         * @param {Number} value
         */
        writeU48(value: number): BufferWriter;
        /**
         * Write uint48be.
         * @param {Number} value
         */
        writeU48BE(value: number): BufferWriter;
        /**
         * Write uint56le.
         * @param {Number} value
         */
        writeU56(value: number): BufferWriter;
        /**
         * Write uint56be.
         * @param {Number} value
         */
        writeU56BE(value: number): BufferWriter;
        /**
         * Write uint64le.
         * @param {Number} value
         */
        writeU64(value: number): BufferWriter;
        /**
         * Write uint64be.
         * @param {Number} value
         */
        writeU64BE(value: number): BufferWriter;
        /**
         * Write int8.
         * @param {Number} value
         */
        writeI8(value: number): BufferWriter;
        /**
         * Write int16le.
         * @param {Number} value
         */
        writeI16(value: number): BufferWriter;
        /**
         * Write int16be.
         * @param {Number} value
         */
        writeI16BE(value: number): BufferWriter;
        /**
         * Write int24le.
         * @param {Number} value
         */
        writeI24(value: number): BufferWriter;
        /**
         * Write int24be.
         * @param {Number} value
         */
        writeI24BE(value: number): BufferWriter;
        /**
         * Write int32le.
         * @param {Number} value
         */
        writeI32(value: number): BufferWriter;
        /**
         * Write int32be.
         * @param {Number} value
         */
        writeI32BE(value: number): BufferWriter;
        /**
         * Write int40le.
         * @param {Number} value
         */
        writeI40(value: number): BufferWriter;
        /**
         * Write int40be.
         * @param {Number} value
         */
        writeI40BE(value: number): BufferWriter;
        /**
         * Write int48le.
         * @param {Number} value
         */
        writeI48(value: number): BufferWriter;
        /**
         * Write int48be.
         * @param {Number} value
         */
        writeI48BE(value: number): BufferWriter;
        /**
         * Write int56le.
         * @param {Number} value
         */
        writeI56(value: number): BufferWriter;
        /**
         * Write int56be.
         * @param {Number} value
         */
        writeI56BE(value: number): BufferWriter;
        /**
         * Write int64le.
         * @param {Number} value
         */
        writeI64(value: number): BufferWriter;
        /**
         * Write int64be.
         * @param {Number} value
         */
        writeI64BE(value: number): BufferWriter;
        /**
         * Write float le.
         * @param {Number} value
         */
        writeFloat(value: number): BufferWriter;
        /**
         * Write float be.
         * @param {Number} value
         */
        writeFloatBE(value: number): BufferWriter;
        /**
         * Write double le.
         * @param {Number} value
         */
        writeDouble(value: number): BufferWriter;
        /**
         * Write double be.
         * @param {Number} value
         */
        writeDoubleBE(value: number): BufferWriter;
        /**
         * Write a varint.
         * @param {Number} value
         */
        writeVarint(value: number): BufferWriter;
        /**
         * Write a varint BigInt.
         * @param {BigInt} value
         */
        writeVarintBI(value: any): BufferWriter;
        /**
         * Write a varint (type 2).
         * @param {Number} value
         */
        writeVarint2(value: number): BufferWriter;
        /**
         * Write bytes.
         * @param {Buffer} value
         */
        writeBytes(value: any): BufferWriter;
        /**
         * Write bytes with a varint length before them.
         * @param {Buffer} value
         */
        writeVarBytes(value: any): BufferWriter;
        /**
         * Write uint8 BigInt.
         * @param {BigInt} value
         */
        writeU8BI(value: any): BufferWriter;
        /**
         * Write uint16le BigInt.
         * @param {BigInt} value
         */
        writeU16BI(value: any): BufferWriter;
        /**
         * Write uint16be BigInt.
         * @param {BigInt} value
         */
        writeU16BEBI(value: any): BufferWriter;
        /**
         * Write uint24le BigInt.
         * @param {BigInt} value
         */
        writeU24BI(value: any): BufferWriter;
        /**
         * Write uint24be BigInt.
         * @param {BigInt} value
         */
        writeU24BEBI(value: any): BufferWriter;
        /**
         * Write uint32be BigInt.
         * @param {BigInt} value
         */
        writeU32BEBI(value: any): BufferWriter;
        /**
         * Write uint40le BigInt.
         * @param {BigInt} value
         */
        writeU40BI(value: any): BufferWriter;
        /**
         * Write uint40be BigInt.
         * @param {BigInt} value
         */
        writeU40BEBI(value: any): BufferWriter;
        /**
         * Write uint48le BigInt.
         * @param {BigInt} value
         */
        writeU48BI(value: any): BufferWriter;
        /**
         * Write uint48be BigInt.
         * @param {BigInt} value
         */
        writeU48BEBI(value: any): BufferWriter;
        /**
         * Write uint56le BigInt.
         * @param {BigInt} value
         */
        writeU56BI(value: any): BufferWriter;
        /**
         * Write uint56be BigInt.
         * @param {BigInt} value
         */
        writeU56BEBI(value: any): BufferWriter;
        /**
         * Write uint64le BigInt.
         * @param {BigInt} value
         */
        writeU64BI(value: any): BufferWriter;
        /**
         * Write uint64be BigInt.
         * @param {BigInt} value
         */
        writeU64BEBI(value: any): BufferWriter;
        /**
         * Write int8 BigInt.
         * @param {BigInt} value
         */
        writeI8BI(value: any): BufferWriter;
        /**
         * Write int16le BigInt.
         * @param {BigInt} value
         */
        writeI16BI(value: any): BufferWriter;
        /**
         * Write int16be BigInt.
         * @param {BigInt} value
         */
        writeI16BEBI(value: any): BufferWriter;
        /**
         * Write int24le BigInt.
         * @param {BigInt} value
         */
        writeI24BI(value: any): BufferWriter;
        /**
         * Write int24be BigInt.
         * @param {BigInt} value
         */
        writeI24BEBI(value: any): BufferWriter;
        /**
         * Write int32le BigInt.
         * @param {BigInt} value
         */
        writeI32BI(value: any): BufferWriter;
        /**
         * Write int32be BigInt.
         * @param {BigInt} value
         */
        writeI32BEBI(value: any): BufferWriter;
        /**
         * Write int40le BigInt.
         * @param {BigInt} value
         */
        writeI40BI(value: any): BufferWriter;
        /**
         * Write int40be BigInt.
         * @param {BigInt} value
         */
        writeI40BEBI(value: any): BufferWriter;
        /**
         * Write int48le BigInt.
         * @param {BigInt} value
         */
        writeI48BI(value: any): BufferWriter;
        /**
         * Write int48be BigInt.
         * @param {BigInt} value
         */
        writeI48BEBI(value: any): BufferWriter;
        /**
         * Write int56le BigInt.
         * @param {BigInt} value
         */
        writeI56BI(value: any): BufferWriter;
        /**
         * Write int56be BigInt.
         * @param {BigInt} value
         */
        writeI56BEBI(value: any): BufferWriter;
        /**
         * Write int64le BigInt.
         * @param {BigInt} value
         */
        writeI64BI(value: any): BufferWriter;
        /**
         * Write int64be BigInt.
         * @param {BigInt} value
         */
        writeI64BEBI(value: any): BufferWriter;
        /**
         * Copy bytes.
         * @param {Buffer} value
         * @param {Number} start
         * @param {Number} end
         */
        copy(value: any, start: number, end: number): BufferWriter;
        /**
         * Write string to buffer.
         * @param {String} value
         * @param {String?} enc - Any buffer-supported encoding.
         */
        writeString(value: string, enc: string | null): BufferWriter;
        /**
         * Write a 32 byte hash.
         * @param {Hash} value
         */
        writeHash(value: any): BufferWriter;
        /**
         * Write a string with a varint length before it.
         * @param {String}
         * @param {String?} enc - Any buffer-supported encoding.
         */
        writeVarString(value: any, enc?: string | null): BufferWriter;
        /**
         * Write a null-terminated string.
         * @param {String|Buffer}
         * @param {String?} enc - Any buffer-supported encoding.
         */
        writeNullString(value: any, enc: string | null): BufferWriter;
        /**
         * Calculate and write a checksum for the data written so far.
         * @param {Function} hash
         */
        writeChecksum(hash: Function): BufferWriter;
        /**
         * Fill N bytes with value.
         * @param {string} value
         * @param {Number} size
         */
        fill(value: string, size: number): BufferWriter;
    }
}
declare module "bufio/lib/staticwriter" {
    export = StaticWriter;
    /**
     * Statically Allocated Writer
     */
    class StaticWriter {
        /**
         * Allocate writer from preallocated 100kb pool.
         * @param {Number} size
         * @returns {StaticWriter}
         */
        static pool(size: number): StaticWriter;
        /**
         * Statically allocated buffer writer.
         * @constructor
         * @param {Number|Buffer} options
         */
        constructor(options: number | any);
        data: any;
        offset: number;
        /**
         * Assertion.
         * @param {Number} size
         */
        check(size: number): void;
        /**
         * Initialize options.
         * @param {Object} options
         */
        init(options: any): StaticWriter;
        /**
         * Allocate and render the final buffer.
         * @returns {Buffer} Rendered buffer.
         */
        render(): any;
        /**
         * Slice the final buffer at written offset.
         * @returns {Buffer} Rendered buffer.
         */
        slice(): any;
        /**
         * Get size of data written so far.
         * @returns {Number}
         */
        getSize(): number;
        /**
         * Seek to relative offset.
         * @param {Number} off
         */
        seek(off: number): StaticWriter;
        /**
         * Destroy the buffer writer.
         */
        destroy(): StaticWriter;
        /**
         * Write uint8.
         * @param {Number} value
         */
        writeU8(value: number): StaticWriter;
        /**
         * Write uint16le.
         * @param {Number} value
         */
        writeU16(value: number): StaticWriter;
        /**
         * Write uint16be.
         * @param {Number} value
         */
        writeU16BE(value: number): StaticWriter;
        /**
         * Write uint24le.
         * @param {Number} value
         */
        writeU24(value: number): StaticWriter;
        /**
         * Write uint24be.
         * @param {Number} value
         */
        writeU24BE(value: number): StaticWriter;
        /**
         * Write uint32le.
         * @param {Number} value
         */
        writeU32(value: number): StaticWriter;
        /**
         * Write uint32be.
         * @param {Number} value
         */
        writeU32BE(value: number): StaticWriter;
        /**
         * Write uint40le.
         * @param {Number} value
         */
        writeU40(value: number): StaticWriter;
        /**
         * Write uint40be.
         * @param {Number} value
         */
        writeU40BE(value: number): StaticWriter;
        /**
         * Write uint48le.
         * @param {Number} value
         */
        writeU48(value: number): StaticWriter;
        /**
         * Write uint48be.
         * @param {Number} value
         */
        writeU48BE(value: number): StaticWriter;
        /**
         * Write uint56le.
         * @param {Number} value
         */
        writeU56(value: number): StaticWriter;
        /**
         * Write uint56be.
         * @param {Number} value
         */
        writeU56BE(value: number): StaticWriter;
        /**
         * Write uint64le.
         * @param {Number} value
         */
        writeU64(value: number): StaticWriter;
        /**
         * Write uint64be.
         * @param {Number} value
         */
        writeU64BE(value: number): StaticWriter;
        /**
         * Write int8.
         * @param {Number} value
         */
        writeI8(value: number): StaticWriter;
        /**
         * Write int16le.
         * @param {Number} value
         */
        writeI16(value: number): StaticWriter;
        /**
         * Write int16be.
         * @param {Number} value
         */
        writeI16BE(value: number): StaticWriter;
        /**
         * Write int24le.
         * @param {Number} value
         */
        writeI24(value: number): StaticWriter;
        /**
         * Write int24be.
         * @param {Number} value
         */
        writeI24BE(value: number): StaticWriter;
        /**
         * Write int32le.
         * @param {Number} value
         */
        writeI32(value: number): StaticWriter;
        /**
         * Write int32be.
         * @param {Number} value
         */
        writeI32BE(value: number): StaticWriter;
        /**
         * Write int40le.
         * @param {Number} value
         */
        writeI40(value: number): StaticWriter;
        /**
         * Write int40be.
         * @param {Number} value
         */
        writeI40BE(value: number): StaticWriter;
        /**
         * Write int48le.
         * @param {Number} value
         */
        writeI48(value: number): StaticWriter;
        /**
         * Write int48be.
         * @param {Number} value
         */
        writeI48BE(value: number): StaticWriter;
        /**
         * Write int56le.
         * @param {Number} value
         */
        writeI56(value: number): StaticWriter;
        /**
         * Write int56be.
         * @param {Number} value
         */
        writeI56BE(value: number): StaticWriter;
        /**
         * Write int64le.
         * @param {Number} value
         */
        writeI64(value: number): StaticWriter;
        /**
         * Write int64be.
         * @param {Number} value
         */
        writeI64BE(value: number): StaticWriter;
        /**
         * Write uint8 BigInt.
         * @param {BigInt} value
         */
        writeU8BI(value: any): StaticWriter;
        /**
         * Write uint16le BigInt.
         * @param {BigInt} value
         */
        writeU16BI(value: any): StaticWriter;
        /**
         * Write uint16be BigInt.
         * @param {BigInt} value
         */
        writeU16BEBI(value: any): StaticWriter;
        /**
         * Write uint24le BigInt.
         * @param {BigInt} value
         */
        writeU24BI(value: any): StaticWriter;
        /**
         * Write uint24be BigInt.
         * @param {BigInt} value
         */
        writeU24BEBI(value: any): StaticWriter;
        /**
         * Write uint32le BigInt.
         * @param {BigInt} value
         */
        writeU32BI(value: any): StaticWriter;
        /**
         * Write uint32be BigInt.
         * @param {BigInt} value
         */
        writeU32BEBI(value: any): StaticWriter;
        /**
         * Write uint40le BigInt.
         * @param {BigInt} value
         */
        writeU40BI(value: any): StaticWriter;
        /**
         * Write uint40be BigInt.
         * @param {BigInt} value
         */
        writeU40BEBI(value: any): StaticWriter;
        /**
         * Write uint48le BigInt.
         * @param {BigInt} value
         */
        writeU48BI(value: any): StaticWriter;
        /**
         * Write uint48be BigInt.
         * @param {BigInt} value
         */
        writeU48BEBI(value: any): StaticWriter;
        /**
         * Write uint56le BigInt.
         * @param {BigInt} value
         */
        writeU56BI(value: any): StaticWriter;
        /**
         * Write uint56be BigInt.
         * @param {BigInt} value
         */
        writeU56BEBI(value: any): StaticWriter;
        /**
         * Write uint64le BigInt.
         * @param {BigInt} value
         */
        writeU64BI(value: any): StaticWriter;
        /**
         * Write uint64be BigInt.
         * @param {BigInt} value
         */
        writeU64BEBI(value: any): StaticWriter;
        /**
         * Write int8 BigInt.
         * @param {BigInt} value
         */
        writeI8BI(value: any): StaticWriter;
        /**
         * Write int16le BigInt.
         * @param {BigInt} value
         */
        writeI16BI(value: any): StaticWriter;
        /**
         * Write int16be BigInt.
         * @param {BigInt} value
         */
        writeI16BEBI(value: any): StaticWriter;
        /**
         * Write int24le BigInt.
         * @param {BigInt} value
         */
        writeI24BI(value: any): StaticWriter;
        /**
         * Write int24be BigInt.
         * @param {BigInt} value
         */
        writeI24BEBI(value: any): StaticWriter;
        /**
         * Write int32le BigInt.
         * @param {BigInt} value
         */
        writeI32BI(value: any): StaticWriter;
        /**
         * Write int32be BigInt.
         * @param {BigInt} value
         */
        writeI32BEBI(value: any): StaticWriter;
        /**
         * Write int40le BigInt.
         * @param {BigInt} value
         */
        writeI40BI(value: any): StaticWriter;
        /**
         * Write int40be BigInt.
         * @param {BigInt} value
         */
        writeI40BEBI(value: any): StaticWriter;
        /**
         * Write int48le BigInt.
         * @param {BigInt} value
         */
        writeI48BI(value: any): StaticWriter;
        /**
         * Write int48be BigInt.
         * @param {BigInt} value
         */
        writeI48BEBI(value: any): StaticWriter;
        /**
         * Write int56le BigInt.
         * @param {BigInt} value
         */
        writeI56BI(value: any): StaticWriter;
        /**
         * Write int56be BigInt.
         * @param {BigInt} value
         */
        writeI56BEBI(value: any): StaticWriter;
        /**
         * Write int64le BigInt.
         * @param {BigInt} value
         */
        writeI64BI(value: any): StaticWriter;
        /**
         * Write int64be BigInt.
         * @param {BigInt} value
         */
        writeI64BEBI(value: any): StaticWriter;
        /**
         * Write float le.
         * @param {Number} value
         */
        writeFloat(value: number): StaticWriter;
        /**
         * Write float be.
         * @param {Number} value
         */
        writeFloatBE(value: number): StaticWriter;
        /**
         * Write double le.
         * @param {Number} value
         */
        writeDouble(value: number): StaticWriter;
        /**
         * Write double be.
         * @param {Number} value
         */
        writeDoubleBE(value: number): StaticWriter;
        /**
         * Write a varint.
         * @param {Number} value
         */
        writeVarint(value: number): StaticWriter;
        /**
         * Write a varint BigInt.
         * @param {BigInt} value
         */
        writeVarintBI(value: any): StaticWriter;
        /**
         * Write a varint (type 2).
         * @param {Number} value
         */
        writeVarint2(value: number): StaticWriter;
        /**
         * Write bytes.
         * @param {Buffer} value
         */
        writeBytes(value: any): StaticWriter;
        /**
         * Write bytes with a varint length before them.
         * @param {Buffer} value
         */
        writeVarBytes(value: any): StaticWriter;
        /**
         * Copy bytes.
         * @param {Buffer} value
         * @param {Number} start
         * @param {Number} end
         */
        copy(value: any, start: number, end: number): StaticWriter;
        /**
         * Write string to buffer.
         * @param {String} value
         * @param {String?} enc - Any buffer-supported encoding.
         */
        writeString(value: string, enc: string | null): StaticWriter;
        /**
         * Write a 32 byte hash.
         * @param {Hash} value
         */
        writeHash(value: any): StaticWriter;
        /**
         * Write a string with a varint length before it.
         * @param {String}
         * @param {String?} enc - Any buffer-supported encoding.
         */
        writeVarString(value: any, enc?: string | null): StaticWriter;
        /**
         * Write a null-terminated string.
         * @param {String|Buffer}
         * @param {String?} enc - Any buffer-supported encoding.
         */
        writeNullString(value: any, enc: string | null): StaticWriter;
        /**
         * Calculate and write a checksum for the data written so far.
         * @param {Function} hash
         */
        writeChecksum(hash: Function): StaticWriter;
        /**
         * Fill N bytes with value.
         * @param {Number} value
         * @param {Number} size
         */
        fill(value: number, size: number): StaticWriter;
    }
}
declare module "bufio/lib/struct" {
    
    /**
     * Struct
     */
    export default class Struct {
        constructor();
        static read(br: any, extra: any): Struct;
        static decode(data: any, extra: any): Struct;
        static fromHex(str: any, extra: any): Struct;
        static fromBase64(str: any, extra: any): Struct;
        static fromString(str: any, extra: any): Struct;
        static fromJSON(json: any, extra: any): Struct;
        static fromOptions(options: any, extra: any): Struct;
        static from(options: any, extra: any): Struct;
        static fromReader(br: any, extra: any): Struct;
        static fromRaw(data: any, extra?: any): Struct;
        inject(obj: any): Struct;
        clone(): any;
        getSize(extra?: any): number;
        write(bw: any, extra?: any): any;
        read(br: any, extra?: any): Struct;
        toString(): any;
        fromString(str: any, extra?: any): Struct;
        getJSON(): Struct;
        fromJSON(json: any, extra?: any): Struct;
        fromOptions(options: any, extra?: any): Struct;
        from(options: any, extra?: any): Struct;
        format(): Struct;
        encode(extra?: any): any;
        decode(data: any, extra?: any): Struct;
        toHex(extra?: any): any;
        fromHex(str: any, extra?: any): Struct;
        toBase64(extra?: any): any;
        fromBase64(str: any, extra?: any): Struct;
        toJSON(): Struct;
        toWriter(bw: any, extra?: any): any;
        fromReader(br: any, extra?: any): Struct;
        toRaw(extra?: any): any;
        fromRaw(data: any, extra?: any): Struct;
    }
}
declare module "bufio/lib/bufio" {
    export function read(data: any, zeroCopy?: any): BufferReader;
    export function write(size?: any): BufferWriter | StaticWriter;
    export function pool(size: any): StaticWriter;
    export function readU(data: any, off: any, len: any): any;
    export function readU64(data: any, off: any): any;
    export function readU56(data: any, off: any): any;
    export function readU48(data: any, off: any): any;
    export function readU40(data: any, off: any): any;
    export function readU32(data: any, off: any): any;
    export function readU24(data: any, off: any): any;
    export function readU16(data: any, off: any): any;
    export function readU8(data: any, off: any): any;
    export function readUBE(data: any, off: any, len: any): any;
    export function readU64BE(data: any, off: any): any;
    export function readU56BE(data: any, off: any): any;
    export function readU48BE(data: any, off: any): any;
    export function readU40BE(data: any, off: any): any;
    export function readU32BE(data: any, off: any): any;
    export function readU24BE(data: any, off: any): any;
    export function readU16BE(data: any, off: any): any;
    export function readI(data: any, off: any, len: any): any;
    export function readI64(data: any, off: any): any;
    export function readI56(data: any, off: any): any;
    export function readI48(data: any, off: any): any;
    export function readI40(data: any, off: any): any;
    export function readI32(data: any, off: any): any;
    export function readI24(data: any, off: any): any;
    export function readI16(data: any, off: any): any;
    export function readI8(data: any, off: any): any;
    export function readIBE(data: any, off: any, len: any): any;
    export function readI64BE(data: any, off: any): any;
    export function readI56BE(data: any, off: any): any;
    export function readI48BE(data: any, off: any): any;
    export function readI40BE(data: any, off: any): any;
    export function readI32BE(data: any, off: any): any;
    export function readI24BE(data: any, off: any): any;
    export function readI16BE(data: any, off: any): any;
    export function readFloat(data: any, off: any): any;
    export function readFloatBE(data: any, off: any): any;
    export function readDouble(data: any, off: any): any;
    export function readDoubleBE(data: any, off: any): any;
    export function writeU(data: any, num: any, off: any, len: any): any;
    export function writeU64(data: any, num: any, off: any): any;
    export function writeU56(data: any, num: any, off: any): any;
    export function writeU48(data: any, num: any, off: any): any;
    export function writeU40(data: any, num: any, off: any): any;
    export function writeU32(data: any, num: any, off: any): any;
    export function writeU24(data: any, num: any, off: any): any;
    export function writeU16(data: any, num: any, off: any): any;
    export function writeU8(data: any, num: any, off: any): any;
    export function writeUBE(data: any, num: any, off: any, len: any): any;
    export function writeU64BE(data: any, num: any, off: any): any;
    export function writeU56BE(data: any, num: any, off: any): any;
    export function writeU48BE(data: any, num: any, off: any): any;
    export function writeU40BE(data: any, num: any, off: any): any;
    export function writeU32BE(data: any, num: any, off: any): any;
    export function writeU24BE(data: any, num: any, off: any): any;
    export function writeU16BE(data: any, num: any, off: any): any;
    export function writeI(data: any, num: any, off: any, len: any): any;
    export function writeI64(data: any, num: any, off: any): any;
    export function writeI56(data: any, num: any, off: any): any;
    export function writeI48(data: any, num: any, off: any): any;
    export function writeI40(data: any, num: any, off: any): any;
    export function writeI32(data: any, num: any, off: any): any;
    export function writeI24(data: any, num: any, off: any): any;
    export function writeI16(data: any, num: any, off: any): any;
    export function writeI8(data: any, num: any, off: any): any;
    export function writeIBE(data: any, num: any, off: any, len: any): any;
    export function writeI64BE(data: any, num: any, off: any): any;
    export function writeI56BE(data: any, num: any, off: any): any;
    export function writeI48BE(data: any, num: any, off: any): any;
    export function writeI40BE(data: any, num: any, off: any): any;
    export function writeI32BE(data: any, num: any, off: any): any;
    export function writeI24BE(data: any, num: any, off: any): any;
    export function writeI16BE(data: any, num: any, off: any): any;
    export function writeFloat(data: any, num: any, off: any): any;
    export function writeFloatBE(data: any, num: any, off: any): any;
    export function writeDouble(data: any, num: any, off: any): any;
    export function writeDoubleBE(data: any, num: any, off: any): any;
    export function readVarint(data: any, off: any): any;
    export function writeVarint(data: any, num: any, off: any): any;
    export function readVarint2(data: any, off: any): any;
    export function writeVarint2(data: any, num: any, off: any): any;
    import custom = require("bufio/lib/custom");
    import encoding = require("bufio/lib/encoding");
    import EncodingError = require("bufio/lib/error");
    import BufferReader = require("bufio/lib/reader");
    import BufferWriter = require("bufio/lib/writer");
    import StaticWriter = require("bufio/lib/staticwriter");
    import Struct from "bufio/lib/struct";
    export { custom, encoding, EncodingError, BufferReader, BufferWriter, StaticWriter, Struct, sizeVarint, sizeVarint2, sliceBytes, readBytes, writeBytes, readString, writeString, realloc, copy, concat, sizeVarBytes, sizeVarlen, sizeVarString };
}
declare module "bufio/lib/custom-browser" {
    export var custom: string;
}
