declare module "bcrypto/lib/internal/assert" {
    export = assert;
    function assert(val: any, msg: any): void;
}
declare module "bcrypto/lib/js/chacha20" {
    export = ChaCha20;
    /**
     * ChaCha20
     */
    class ChaCha20 {
        /**
         * Derive key with XChaCha20.
         * @param {Buffer} key
         * @param {Buffer} nonce
         * @returns {Buffer}
         */
        static derive(key: any, nonce: any): any;
        state: Uint32Array;
        stream: Uint32Array;
        bytes: any;
        pos: number;
        /**
         * Initialize chacha20 with a key, nonce, and counter.
         * @param {Buffer} key
         * @param {Buffer} nonce
         * @param {Number} counter
         */
        init(key: any, nonce: any, counter: number): ChaCha20;
        /**
         * Encrypt/decrypt data.
         * @param {Buffer} data - Will be mutated.
         * @returns {Buffer}
         */
        encrypt(data: any): any;
        /**
         * Stir the stream.
         */
        _block(): void;
        /**
         * Destroy context.
         */
        destroy(): ChaCha20;
    }
    namespace ChaCha20 {
        const native: number;
    }
}
declare module "bcrypto/lib/js/poly1305" {
    export = Poly1305;
    /**
     * Poly1305
     */
    class Poly1305 {
        r: Uint16Array;
        h: Uint16Array;
        pad: Uint16Array;
        buffer: any;
        fin: number;
        leftover: number;
        /**
         * Initialize poly1305 with a key.
         * @param {Buffer} key
         */
        init(key: any): Poly1305;
        /**
         * Process 16 byte blocks.
         * @private
         * @param {Buffer} data - Blocks.
         * @param {Number} bytes - Size.
         * @param {Number} m - Offset pointer.
         */
        private _blocks;
        /**
         * Update the MAC with data (will be
         * processed as 16 byte blocks).
         * @param {Buffer} data
         */
        update(data: any): Poly1305;
        /**
         * Finalize and return a 16-byte MAC.
         * @returns {Buffer}
         */
        final(): any;
        /**
         * Destroy the context.
         */
        destroy(): void;
        /**
         * Finalize and verify MAC against tag.
         * @param {Buffer} tag
         * @returns {Boolean}
         */
        verify(tag: any): boolean;
    }
    namespace Poly1305 {
        const native: number;
    }
}
declare module "bcrypto/lib/js/aead" {
    export = AEAD;
    /**
     * AEAD
     */
    class AEAD {
        /**
         * Encrypt a piece of data.
         * @param {Buffer} key
         * @param {Buffer} iv
         * @param {Buffer} msg
         * @param {Buffer?} aad
         * @returns {Buffer} tag
         */
        static encrypt(key: any, iv: any, msg: any, aad: any): any;
        /**
         * Decrypt a piece of data.
         * @param {Buffer} key
         * @param {Buffer} iv
         * @param {Buffer} msg
         * @param {Buffer} tag
         * @param {Buffer?} aad
         * @returns {Boolean}
         */
        static decrypt(key: any, iv: any, msg: any, tag: any, aad: any): boolean;
        /**
         * Authenticate data without decrypting.
         * @param {Buffer} key
         * @param {Buffer} iv
         * @param {Buffer} msg
         * @param {Buffer} tag
         * @param {Buffer?} aad
         * @returns {Boolean}
         */
        static auth(key: any, iv: any, msg: any, tag: any, aad: any): boolean;
        chacha: ChaCha20;
        poly: Poly1305;
        key: any;
        mode: number;
        aadLen: number;
        cipherLen: number;
        /**
         * Initialize the AEAD with a key and iv.
         * @param {Buffer} key
         * @param {Buffer} iv - IV / packet sequence number.
         */
        init(key: any, iv: any): AEAD;
        /**
         * Update the aad (will be finalized
         * on an encrypt/decrypt call).
         * @param {Buffer} aad
         */
        aad(data: any): AEAD;
        /**
         * Encrypt a piece of data.
         * @param {Buffer} data
         */
        encrypt(data: any): any;
        /**
         * Decrypt a piece of data.
         * @param {Buffer} data
         */
        decrypt(data: any): any;
        /**
         * Authenticate data without decrypting.
         * @param {Buffer} data
         */
        auth(data: any): any;
        /**
         * Finalize the aead and generate a MAC.
         * @returns {Buffer} MAC
         */
        final(): any;
        /**
         * Destroy the context.
         */
        destroy(): AEAD;
        /**
         * Finalize and verify MAC against tag.
         * @param {Buffer} tag
         * @returns {Boolean}
         */
        verify(tag: any): boolean;
        /**
         * Pad a chunk before updating mac.
         * @private
         * @param {Number} size
         */
        private _pad16;
    }
    namespace AEAD {
        const native: number;
    }
    import ChaCha20 = require("bcrypto/lib/js/chacha20");
    import Poly1305 = require("bcrypto/lib/js/poly1305");
}
declare module "bcrypto/lib/aead-browser" {
    const _exports: typeof import("bcrypto/lib/js/aead");
    export = _exports;
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
declare module "bcrypto/lib/native/aead" {
    export = AEAD;
    /**
     * AEAD
     */
    class AEAD {
        static encrypt(key: any, iv: any, msg: any, aad: any): any;
        static decrypt(key: any, iv: any, msg: any, tag: any, aad: any): any;
        static auth(key: any, iv: any, msg: any, tag: any, aad: any): any;
        _handle: any;
        init(key: any, iv: any): AEAD;
        aad(data: any): AEAD;
        encrypt(data: any): any;
        decrypt(data: any): any;
        auth(data: any): any;
        final(): any;
        destroy(): AEAD;
        verify(tag: any): any;
    }
    namespace AEAD {
        const native: number;
    }
}
declare module "bcrypto/lib/aead" {
    const _exports: typeof import("bcrypto/lib/js/aead") | typeof import("bcrypto/lib/native/aead");
    export = _exports;
}
declare module "bcrypto/lib/js/ciphers/aes" {
    export = AES;
    /**
     * AES
     */
    class AES {
        constructor(bits?: number);
        bits: number;
        rounds: number;
        key: any;
        encKey: Uint32Array;
        decKey: Uint32Array;
        get blockSize(): number;
        init(key: any): AES;
        createEncryptKey(): Uint32Array;
        createDecryptKey(): Uint32Array;
        getEncryptKey(): Uint32Array;
        getDecryptKey(): Uint32Array;
        encrypt(output: any, opos: any, input: any, ipos: any): AES;
        decrypt(output: any, opos: any, input: any, ipos: any): AES;
        destroy(): AES;
    }
}
declare module "bcrypto/lib/js/ciphers/ghash" {
    export = GHASH;
    /**
     * GHASH
     */
    class GHASH {
        state: Uint32Array;
        block: any;
        size: number;
        adLen: number;
        ctLen: number;
        table: any[];
        init(key: any): GHASH;
        absorb(data: any): GHASH;
        _absorb(data: any, len: any): void;
        transform(block: any, off: any): void;
        pad(): void;
        aad(data: any): GHASH;
        update(data: any): GHASH;
        final(): any;
        destroy(): void;
        add(x: any, y: any): Uint32Array;
        double(x: any): Uint32Array;
        mul(y: any): void;
    }
}
declare module "bcrypto/lib/js/ciphers/modes" {
    export class Mode {
        constructor(ctx: any);
        ctx: any;
        get blockSize(): any;
        init(key: any, iv: any): void;
        update(data: any): void;
        crypt(output: any, input: any): void;
        final(): void;
        destroy(): void;
        setAutoPadding(padding: any): Mode;
        setAAD(data: any): Mode;
        setCCM(msgLen: any, tagLen: any, aad: any): Mode;
        getAuthTag(): void;
        setAuthTag(tag: any): Mode;
        _setAutoPadding(padding: any): void;
        _setAAD(data: any): void;
        _setCCM(msgLen: any, tagLen: any, aad: any): void;
        _getAuthTag(): void;
        _setAuthTag(tag: any): void;
    }
    /**
     * Block Mode
     */
    export class Block extends Mode {
        constructor(ctx: any, unpad: any);
        padding: boolean;
        unpad: any;
        block: any;
        blockPos: number;
        last: any;
        lastSize: number;
        _updateSize(ilen: any): number;
        _init(key: any, iv: any): void;
        _update(output: any, opos: any, input: any, ipos: any): void;
        _final(): void;
        _destroy(): void;
    }
    export class Stream extends Mode {
        pos: number;
        _init(key: any, iv: any): void;
        _crypt(output: any, input: any): void;
        _final(): void;
        _destroy(): void;
    }
    /**
     * Raw Cipher
     */
    export class RawCipher extends Block {
        constructor(ctx: any);
    }
    /**
     * Raw Decipher
     */
    export class RawDecipher extends Block {
        constructor(ctx: any);
    }
    /**
     * PKCS#7 Cipher
     */
    export class PKCS7Cipher extends Block {
        constructor(ctx: any);
    }
    /**
     * PKCS#7 Decipher
     */
    export class PKCS7Decipher extends Block {
        constructor(ctx: any);
    }
    /**
     * ECB Cipher
     */
    export class ECBCipher extends PKCS7Cipher {
    }
    /**
     * ECB Decipher
     */
    export class ECBDecipher extends PKCS7Decipher {
    }
    /**
     * CBC Cipher
     */
    export class CBCCipher extends PKCS7Cipher {
        prev: any;
    }
    /**
     * CBC Decipher
     */
    export class CBCDecipher extends PKCS7Decipher {
        prev: any;
        tmp: any;
    }
    /**
     * CTS Cipher
     */
    export class CTSCipher extends Block {
        constructor(ctx: any);
        prev: any;
    }
    /**
     * CTS Decipher
     */
    export class CTSDecipher extends Block {
        constructor(ctx: any);
        prev: any;
        tmp: any;
    }
    /**
     * XTS
     */
    export class XTS extends Block {
        encrypt: any;
        poly: number;
        tweak: any;
        prev: any;
        _shift(): void;
    }
    export class XTSCipher extends XTS {
        constructor(ctx: any);
    }
    export class XTSDecipher extends XTS {
        constructor(ctx: any);
    }
    /**
     * CTR
     */
    export class CTR extends Stream {
        state: any;
        ctr: any;
        _increment(): void;
    }
    /**
     * CTR Cipher
     */
    export class CTRCipher extends CTR {
    }
    /**
     * CTR Decipher
     */
    export class CTRDecipher extends CTR {
    }
    /**
     * CFB
     */
    export class CFB extends Stream {
        state: any;
        prev: any;
    }
    /**
     * CFB Cipher
     */
    export class CFBCipher extends CFB {
    }
    /**
     * CFB Decipher
     */
    export class CFBDecipher extends CFB {
    }
    /**
     * OFB
     */
    export class OFB extends Stream {
        state: any;
    }
    /**
     * OFB Cipher
     */
    export class OFBCipher extends OFB {
    }
    /**
     * OFB Decipher
     */
    export class OFBDecipher extends OFB {
    }
    /**
     * GCM
     */
    export class GCM extends Stream {
        constructor(ctx: any, encrypt: any);
        encrypt: any;
        hash: GHASH;
        ctr: any;
        state: any;
        key: any;
        mask: any;
        tag: any;
        mac: any;
        _increment(): void;
        _encipher(output: any, input: any): void;
    }
    /**
     * GCM Cipher
     */
    export class GCMCipher extends GCM {
        constructor(ctx: any);
    }
    /**
     * GCM Decipher
     */
    export class GCMDecipher extends GCM {
        constructor(ctx: any);
    }
    /**
     * CBC-MAC
     */
    export class CBCMAC {
        constructor(ctx: any);
        ctx: any;
        size: any;
        mac: any;
        pos: number;
        init(): CBCMAC;
        update(data: any): void;
        pad(): void;
        final(): any;
    }
    /**
     * CCM
     * https://tools.ietf.org/html/rfc3610
     */
    export class CCM extends Stream {
        constructor(ctx: any, encrypt: any);
        encrypt: any;
        hash: CBCMAC;
        state: any;
        ctr: any;
        tagLen: number;
        iv: any;
        mac: any;
        tag: any;
        _increment(): void;
        _encipher(output: any, input: any): void;
    }
    /**
     * CCM Cipher
     */
    export class CCMCipher extends CCM {
        constructor(ctx: any);
    }
    /**
     * CCM Decipher
     */
    export class CCMDecipher extends CCM {
        constructor(ctx: any);
    }
    /**
     * CMAC
     * https://tools.ietf.org/html/rfc4493
     */
    export class CMAC {
        constructor(ctx: any);
        ctx: any;
        poly: number;
        size: any;
        mac: any;
        pos: number;
        init(flag: any): CMAC;
        shift(dst: any, src: any): void;
        update(data: any): void;
        final(): any;
    }
    /**
     * EAX
     */
    export class EAX extends Stream {
        constructor(ctx: any, encrypt: any);
        encrypt: any;
        hash1: CMAC;
        hash2: CMAC;
        state: any;
        ctr: any;
        mask: any;
        mac: any;
        tag: any;
        _increment(): void;
        _encipher(output: any, input: any): void;
    }
    /**
     * EAX Cipher
     */
    export class EAXCipher extends EAX {
        constructor(ctx: any);
    }
    /**
     * EAX Decipher
     */
    export class EAXDecipher extends EAX {
        constructor(ctx: any);
    }
    export function get(name: any, encrypt?: boolean): typeof RawCipher | typeof OFBCipher;
    import GHASH = require("bcrypto/lib/js/ciphers/ghash");
}
declare module "bcrypto/lib/js/aes" {
    export var native: number;
    /**
     * Encrypt data with aes 256 cbc.
     * @param {Buffer} data
     * @param {Buffer} key
     * @param {Buffer} iv
     * @returns {Buffer}
     */
    export function encipher(data: any, key: any, iv: any): any;
    /**
     * Decrypt data with aes 256 cbc.
     * @param {Buffer} data
     * @param {Buffer} key
     * @param {Buffer} iv
     * @returns {Buffer}
     */
    export function decipher(data: any, key: any, iv: any): any;
}
declare module "bcrypto/lib/aes-browser" {
    const _exports: typeof import("bcrypto/lib/js/aes");
    export = _exports;
}
declare module "bcrypto/lib/native/aes" {
    export var native: number;
    /**
     * Encrypt data with aes 256 cbc.
     * @param {Buffer} data
     * @param {Buffer} key
     * @param {Buffer} iv
     * @returns {Buffer}
     */
    export function encipher(data: any, key: any, iv: any): any;
    /**
     * Decrypt data with aes 256 cbc.
     * @param {Buffer} data
     * @param {Buffer} key
     * @param {Buffer} iv
     * @returns {Buffer}
     */
    export function decipher(data: any, key: any, iv: any): any;
}
declare module "bcrypto/lib/aes" {
    const _exports: typeof import("bcrypto/lib/js/aes");
    export = _exports;
}
declare module "bcrypto/lib/js/arc4" {
    export = ARC4;
    /**
     * ARC4
     */
    class ARC4 {
        s: Uint32Array;
        i: number;
        j: number;
        init(key: any): ARC4;
        encrypt(data: any): any;
        destroy(): ARC4;
    }
    namespace ARC4 {
        const native: number;
    }
}
declare module "bcrypto/lib/arc4-browser" {
    const _exports: typeof import("bcrypto/lib/js/arc4");
    export = _exports;
}
declare module "bcrypto/lib/native/arc4" {
    export = ARC4;
    /**
     * ARC4
     */
    class ARC4 {
        _handle: any;
        init(key: any): ARC4;
        encrypt(data: any): any;
        destroy(): ARC4;
    }
    namespace ARC4 {
        const native: number;
    }
}
declare module "bcrypto/lib/arc4" {
    const _exports: typeof import("bcrypto/lib/js/arc4") | typeof import("bcrypto/lib/native/arc4");
    export = _exports;
}
declare module "bcrypto/lib/internal/hmac" {
    export = HMAC;
    /**
     * HMAC
     */
    class HMAC {
        /**
         * Create an HMAC.
         * @param {Function} Hash
         * @param {Number} size
         * @param {Array} [x=[]]
         * @param {Array} [y=[]]
         */
        constructor(Hash: Function, size: number, x?: any[], y?: any[]);
        hash: Function;
        size: number;
        x: any[];
        y: any[];
        inner: any;
        outer: any;
        /**
         * Initialize HMAC context.
         * @param {Buffer} data
         */
        init(key: any): HMAC;
        /**
         * Update HMAC context.
         * @param {Buffer} data
         */
        update(data: any): HMAC;
        /**
         * Finalize HMAC context.
         * @returns {Buffer}
         */
        final(): any;
    }
}
declare module "bcrypto/lib/js/sha512" {
    export = SHA512;
    /**
     * SHA512
     */
    class SHA512 {
        static hash(): SHA512;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): SHA512;
        update(data: any): SHA512;
        final(): any;
        _update(data: any, len: any): void;
        /**
         * Finalize SHA512 context.
         * @private
         * @param {Buffer} out
         * @returns {Buffer}
         */
        private _final;
        _prepare(chunk: any, pos: any): void;
        _transform(chunk: any, pos: any): void;
    }
    namespace SHA512 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA512;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/hash" {
    export class Hash {
        static hash(type: any): Hash;
        static hmac(type: any): HMAC;
        static digest(type: any, data: any): any;
        static root(type: any, left: any, right: any): any;
        static multi(type: any, x: any, y: any, z: any): any;
        static mac(type: any, data: any, key: any): any;
        constructor(type: any);
        _handle: any;
        init(): Hash;
        update(data: any): Hash;
        final(): any;
    }
    export class HMAC {
        static digest(type: any, data: any, key: any): any;
        constructor(type: any);
        _handle: any;
        init(key: any): HMAC;
        update(data: any): HMAC;
        final(): any;
    }
    export { hashes };
}
declare module "bcrypto/lib/native/sha512" {
    export = SHA512;
    class SHA512 extends Hash {
        static hash(): SHA512;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace SHA512 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA512;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/sha512" {
    const _exports: typeof import("bcrypto/lib/js/sha512") | typeof import("bcrypto/lib/native/sha512");
    export = _exports;
}
declare module "bcrypto/lib/js/ciphers/blowfish" {
    export = Blowfish;
    /**
     * Blowfish
     */
    class Blowfish {
        S: Uint32Array[];
        P: Uint32Array;
        block: Uint32Array;
        off: number;
        get blockSize(): number;
        init(key: any, salt: any): Blowfish;
        encrypt(output: any, opos: any, input: any, ipos: any): Blowfish;
        decrypt(output: any, opos: any, input: any, ipos: any): Blowfish;
        destroy(): Blowfish;
        encipher(x: any, off: any): void;
        decipher(x: any, off: any): void;
        stream2word(data: any): number;
        expand0state(key: any): void;
        expandstate(key: any, data: any): void;
        enc(data: any): void;
        dec(data: any): void;
    }
}
declare module "bcrypto/lib/js/bcrypt" {
    export var native: number;
    export function hash192(pass: any, salt: any, rounds: any): any;
    export function derive(pass: any, salt: any, rounds: any, minor?: string): any;
    export function generate(pass: any, salt: any, rounds: any, minor?: string): string;
    export function verify(pass: any, record: any): boolean;
    export function hash256(pass: any, salt: any, rounds: any): any;
    export function pbkdf(pass: any, salt: any, rounds: any, size: any): any;
    export function pbkdfAsync(pass: any, salt: any, rounds: any, size: any): Promise<any>;
}
declare module "bcrypto/lib/bcrypt-browser" {
    const _exports: typeof import("bcrypto/lib/js/bcrypt");
    export = _exports;
}
declare module "bcrypto/lib/native/bcrypt" {
    export var native: number;
    export function hash192(pass: any, salt: any, rounds: any): any;
    export function hash256(pass: any, salt: any, rounds: any): any;
    export function pbkdf(pass: any, salt: any, rounds: any, size: any): any;
    export function pbkdfAsync(pass: any, salt: any, rounds: any, size: any): Promise<any>;
    export function derive(pass: any, salt: any, rounds: any, minor?: string): any;
    export function generate(pass: any, salt: any, rounds: any, minor?: string): any;
    export function verify(pass: any, record: any): any;
}
declare module "bcrypto/lib/bcrypt" {
    const _exports: typeof import("bcrypto/lib/native/bcrypt");
    export = _exports;
}
declare module "bcrypto/lib/js/blake2b" {
    export = BLAKE2b;
    /**
     * BLAKE2b
     */
    class BLAKE2b {
        static hash(): BLAKE2b;
        static hmac(size: any): HMAC;
        static digest(data: any, size: any, key: any): any;
        static root(left: any, right: any, size: any, key: any): any;
        static multi(x: any, y: any, z: any, size: any, key: any): any;
        static mac(data: any, key: any, size: any): any;
        state: Uint32Array;
        V: Uint32Array;
        M: Uint32Array;
        block: any;
        size: number;
        count: number;
        pos: number;
        init(size: any, key: any): BLAKE2b;
        update(data: any): BLAKE2b;
        final(): any;
        _compress(block: any, off: any, last: any): void;
    }
    namespace BLAKE2b {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2b;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/blake2b" {
    export = BLAKE2b;
    /**
     * BLAKE2b
     */
    class BLAKE2b {
        static hash(): BLAKE2b;
        static hmac(size: any): HMAC;
        static digest(data: any, size: any, key: any): any;
        static root(left: any, right: any, size: any, key: any): any;
        static multi(x: any, y: any, z: any, size: any, key: any): any;
        static mac(data: any, key: any, size: any): any;
        _handle: any;
        init(size: any, key: any): BLAKE2b;
        update(data: any): BLAKE2b;
        final(): any;
    }
    namespace BLAKE2b {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2b;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/blake2b" {
    const _exports: typeof import("bcrypto/lib/js/blake2b") | typeof import("bcrypto/lib/native/blake2b");
    export = _exports;
}
declare module "bcrypto/lib/blake2b160" {
    export = BLAKE2b160;
    /**
     * BLAKE2b160
     */
    class BLAKE2b160 {
        static hash(): BLAKE2b160;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2b160 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2b160;
    }
}
declare module "bcrypto/lib/blake2b256" {
    export = BLAKE2b256;
    /**
     * BLAKE2b256
     */
    class BLAKE2b256 {
        static hash(): BLAKE2b256;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2b256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2b256;
    }
}
declare module "bcrypto/lib/blake2b384" {
    export = BLAKE2b384;
    /**
     * BLAKE2b384
     */
    class BLAKE2b384 {
        static hash(): BLAKE2b384;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2b384 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2b384;
    }
}
declare module "bcrypto/lib/blake2b512" {
    export = BLAKE2b512;
    /**
     * BLAKE2b512
     */
    class BLAKE2b512 {
        static hash(): BLAKE2b512;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2b512 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2b512;
    }
}
declare module "bcrypto/lib/js/blake2s" {
    export = BLAKE2s;
    /**
     * BLAKE2s
     */
    class BLAKE2s {
        static hash(): BLAKE2s;
        static hmac(size: any): HMAC;
        static digest(data: any, size: any, key: any): any;
        static root(left: any, right: any, size: any, key: any): any;
        static multi(x: any, y: any, z: any, size: any, key: any): any;
        static mac(data: any, key: any, size: any): any;
        state: Uint32Array;
        V: Uint32Array;
        M: Uint32Array;
        block: any;
        size: number;
        count: number;
        pos: number;
        init(size: any, key: any): BLAKE2s;
        update(data: any): BLAKE2s;
        final(): any;
        _compress(block: any, off: any, last: any): void;
    }
    namespace BLAKE2s {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2s;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/blake2s" {
    export = BLAKE2s;
    /**
     * BLAKE2s
     */
    class BLAKE2s {
        static hash(): BLAKE2s;
        static hmac(size: any): HMAC;
        static digest(data: any, size: any, key: any): any;
        static root(left: any, right: any, size: any, key: any): any;
        static multi(x: any, y: any, z: any, size: any, key: any): any;
        static mac(data: any, key: any, size: any): any;
        _handle: any;
        init(size: any, key: any): BLAKE2s;
        update(data: any): BLAKE2s;
        final(): any;
    }
    namespace BLAKE2s {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2s;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/blake2s" {
    const _exports: typeof import("bcrypto/lib/js/blake2s") | typeof import("bcrypto/lib/native/blake2s");
    export = _exports;
}
declare module "bcrypto/lib/blake2s128" {
    export = BLAKE2s128;
    /**
     * BLAKE2s128
     */
    class BLAKE2s128 {
        static hash(): BLAKE2s128;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2s128 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2s128;
    }
}
declare module "bcrypto/lib/blake2s160" {
    export = BLAKE2s160;
    /**
     * BLAKE2s160
     */
    class BLAKE2s160 {
        static hash(): BLAKE2s160;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2s160 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2s160;
    }
}
declare module "bcrypto/lib/blake2s224" {
    export = BLAKE2s224;
    /**
     * BLAKE2s224
     */
    class BLAKE2s224 {
        static hash(): BLAKE2s224;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2s224 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2s224;
    }
}
declare module "bcrypto/lib/blake2s256" {
    export = BLAKE2s256;
    /**
     * BLAKE2s256
     */
    class BLAKE2s256 {
        static hash(): BLAKE2s256;
        static hmac(): any;
        static digest(data: any, key: any): any;
        static root(left: any, right: any, key: any): any;
        static multi(x: any, y: any, z: any, key: any): any;
        static mac(data: any, key: any): any;
        init(key: any): any;
    }
    namespace BLAKE2s256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: BLAKE2s256;
    }
}
declare module "bcrypto/lib/internal/custom" {
    export var custom: any;
}
declare module "bcrypto/lib/native/bn" {
    export = BN;
    /**
     * BN
     */
    class BN {
        static min(...args: any[]): any;
        static max(...args: any[]): any;
        static cmp(a: any, b: any): any;
        static ucmp(a: any, b: any): any;
        static red(num: any): Red;
        static barret(num: any): Red;
        static mont(num: any): Red;
        static _prime(name: any): any;
        static prime(name: any): any;
        static pow(num: any, exp: any): BN;
        static shift(num: any, bits: any): BN;
        static mask(bits: any): BN;
        static randomBits(rng: any, bits: any): BN;
        static random(rng: any, min: any, max: any): BN;
        static of(num: any, endian: any): BN;
        static fromNumber(num: any, endian: any): BN;
        static fromDouble(num: any, endian: any): BN;
        static fromBigInt(num: any, endian: any): BN;
        static fromBool(value: any): BN;
        static fromString(str: any, base: any, endian: any): BN;
        static fromJSON(json: any): any;
        static fromBN(num: any): BN;
        static fromArray(data: any, endian: any): BN;
        static fromBuffer(data: any, endian: any): BN;
        static fromArrayLike(data: any, endian: any): BN;
        static decode(data: any, endian: any): BN;
        static from(num: any, base: any, endian: any): BN;
        static cast(num: any, base: any, endian: any): any;
        static isBN(obj: any): boolean;
        constructor(num: any, base: any, endian: any);
        n: bigint;
        red: any;
        set negative(arg: 1 | 0);
        get negative(): 1 | 0;
        get length(): number;
        iadd(num: any): BN;
        iaddn(num: any): BN;
        add(num: any): BN;
        addn(num: any): BN;
        isub(num: any): BN;
        isubn(num: any): BN;
        sub(num: any): BN;
        subn(num: any): BN;
        imul(num: any): BN;
        imuln(num: any): BN;
        mul(num: any): BN;
        muln(num: any): BN;
        mulShift(num: any, bits: any): BN;
        quorem(num: any): BN[];
        iquo(num: any): BN;
        iquon(num: any): BN;
        quo(num: any): BN;
        quon(num: any): BN;
        irem(num: any): BN;
        iremn(num: any): BN;
        rem(num: any): BN;
        remn(num: any): BN;
        remrn(num: any): number;
        divmod(num: any): BN[];
        idiv(num: any): BN;
        idivn(num: any): BN;
        div(num: any): BN;
        divn(num: any): BN;
        imod(num: any): BN;
        imodn(num: any): BN;
        mod(num: any): BN;
        modn(num: any): BN;
        modrn(num: any): number;
        divRound(num: any): BN;
        ipow(num: any): BN;
        ipown(num: any): BN;
        pow(num: any): BN;
        pown(num: any): BN;
        isqr(): BN;
        sqr(): BN;
        rootrem(pow: any): BN[];
        iroot(pow: any): BN;
        root(pow: any): BN;
        isPower(pow: any): boolean;
        sqrtrem(): BN[];
        isqrt(): BN;
        sqrt(): BN;
        isSquare(): boolean;
        iand(num: any): BN;
        iandn(num: any): BN;
        and(num: any): BN;
        andn(num: any): BN;
        andrn(num: any): number;
        iuand(num: any): BN;
        iuandn(num: any): BN;
        uand(num: any): BN;
        uandn(num: any): BN;
        uandrn(num: any): number;
        ior(num: any): BN;
        iorn(num: any): BN;
        or(num: any): BN;
        orn(num: any): BN;
        iuor(num: any): BN;
        iuorn(num: any): BN;
        uor(num: any): BN;
        uorn(num: any): BN;
        ixor(num: any): BN;
        ixorn(num: any): BN;
        xor(num: any): BN;
        xorn(num: any): BN;
        iuxor(num: any): BN;
        iuxorn(num: any): BN;
        uxor(num: any): BN;
        uxorn(num: any): BN;
        inot(): BN;
        not(): BN;
        inotn(width: any): BN;
        notn(width: any): BN;
        ishl(num: any): BN;
        ishln(bits: any): BN;
        shl(num: any): BN;
        shln(bits: any): BN;
        iushl(num: any): BN;
        iushln(bits: any): BN;
        ushl(num: any): BN;
        ushln(bits: any): BN;
        ishr(num: any): BN;
        ishrn(bits: any): BN;
        shr(num: any): BN;
        shrn(bits: any): BN;
        iushr(num: any): BN;
        iushrn(bits: any): BN;
        ushr(num: any): BN;
        ushrn(bits: any): BN;
        setn(bit: any, val: any): BN;
        usetn(bit: any, val: any): BN;
        testn(bit: any): number;
        utestn(bit: any): number;
        imaskn(bits: any): BN;
        maskn(bits: any): BN;
        iumaskn(bits: any): BN;
        umaskn(bits: any): BN;
        andln(num: any): number;
        bit(pos: any): number;
        bits(pos: any, width: any): number;
        ineg(): BN;
        neg(): BN;
        iabs(): BN;
        abs(): BN;
        cmp(num: any): 1 | 0 | -1;
        cmpn(num: any): 1 | 0 | -1;
        eq(num: any): boolean;
        eqn(num: any): boolean;
        gt(num: any): boolean;
        gtn(num: any): boolean;
        gte(num: any): boolean;
        gten(num: any): boolean;
        lt(num: any): boolean;
        ltn(num: any): boolean;
        lte(num: any): boolean;
        lten(num: any): boolean;
        sign(): number;
        isZero(): boolean;
        isNeg(): boolean;
        isPos(): boolean;
        isOdd(): boolean;
        isEven(): boolean;
        ucmp(num: any): 1 | 0 | -1;
        ucmpn(num: any): 1 | 0 | -1;
        legendre(num: any): 1 | 0 | -1;
        jacobi(num: any): number;
        kronecker(num: any): number;
        igcd(num: any): BN;
        gcd(num: any): BN;
        ilcm(num: any): BN;
        lcm(num: any): BN;
        egcd(p: any): BN[];
        iinvert(num: any): BN;
        invert(num: any): BN;
        ifermat(num: any): BN;
        fermat(num: any): BN;
        ipowm(y: any, m: any, mont: any): BN;
        powm(y: any, m: any, mont: any): BN;
        ipowmn(y: any, m: any, mont: any): BN;
        powmn(y: any, m: any, mont: any): BN;
        isqrtm(p: any): BN;
        sqrtm(p: any): BN;
        isqrtpq(p: any, q: any): BN;
        sqrtpq(p: any, q: any): BN;
        isPrime(rng: any, reps: any, limit: any): boolean;
        isPrimeMR(rng: any, reps: any, force2: any): boolean;
        isPrimeLucas(limit: any): boolean;
        toTwos(width: any): BN;
        fromTwos(width: any): BN;
        toRed(ctx: any): any;
        fromRed(): any;
        forceRed(ctx: any): BN;
        redIAdd(num: any): any;
        redAdd(num: any): any;
        redIAddn(num: any): any;
        redAddn(num: any): any;
        redISub(num: any): any;
        redSub(num: any): any;
        redISubn(num: any): any;
        redSubn(num: any): any;
        redIMul(num: any): any;
        redMul(num: any): any;
        redIMuln(num: any): any;
        redMuln(num: any): any;
        redIDiv(num: any): any;
        redDiv(num: any): any;
        redIDivn(num: any): any;
        redDivn(num: any): any;
        redIPow(num: any): any;
        redPow(num: any): any;
        redIPown(num: any): any;
        redPown(num: any): any;
        redISqr(): any;
        redSqr(): any;
        redISqrt(): any;
        redSqrt(): any;
        redIDivSqrt(v: any): any;
        redDivSqrt(v: any): any;
        redIsSquare(): any;
        redIShl(num: any): any;
        redShl(num: any): any;
        redIShln(num: any): any;
        redShln(num: any): any;
        redINeg(): any;
        redNeg(): any;
        redEq(num: any): any;
        redEqn(num: any): any;
        redIsHigh(): any;
        redIsLow(): any;
        redIsOdd(): any;
        redIsEven(): any;
        redLegendre(): any;
        redJacobi(): any;
        redKronecker(): any;
        redIInvert(): any;
        redInvert(): any;
        redIFermat(): any;
        redFermat(): any;
        _forceRed(ctx: any): BN;
        clone(): BN;
        inject(num: any): BN;
        set(num: any, endian: any): BN;
        swap(num: any): BN;
        reverse(): BN;
        byteLength(): number;
        bitLength(): number;
        zeroBits(): number;
        isSafe(): boolean;
        word(pos: any): number;
        toNumber(): number;
        toDouble(): number;
        valueOf(): number;
        toBigInt(): bigint;
        toBool(): boolean;
        toString(base: any, padding: any): any;
        toJSON(): any;
        toArray(endian: any, length: any): any;
        toBuffer(endian: any, length: any): any;
        toArrayLike(ArrayType: any, endian: any, length: any): any;
        encode(endian: any, length: any): any;
        of(num: any, endian: any): BN;
        fromNumber(num: any, endian: any): BN;
        fromDouble(num: any, endian: any): BN;
        fromBigInt(num: any, endian: any): BN;
        fromBool(value: any): BN;
        fromString(str: any, base: any, endian: any): BN;
        fromJSON(json: any): any;
        fromBN(num: any): BN;
        fromArray(data: any, endian: any): BN;
        fromBuffer(data: any, endian: any): BN;
        fromArrayLike(data: any, endian: any): BN;
        decode(data: any, endian: any): BN;
        from(num: any, base: any, endian: any): BN;
    }
    namespace BN {
        export { BN };
        export const wordSize: number;
        export const native: number;
        export { Red };
    }
    /**
     * Reduction Engine
     */
    class Red {
        constructor(m: any);
        m: any;
        n: any;
        prime: any;
        sm1: any;
        _verify1(a: any): void;
        _verify2(a: any, b: any): void;
        get mont(): boolean;
        precompute(): Red;
        convertTo(num: any): BN;
        convertFrom(num: any): any;
        iadd(a: any, b: any): any;
        add(a: any, b: any): any;
        iaddn(a: any, num: any): any;
        addn(a: any, num: any): any;
        isub(a: any, b: any): any;
        sub(a: any, b: any): any;
        isubn(a: any, num: any): any;
        subn(a: any, num: any): any;
        imul(a: any, b: any): any;
        mul(a: any, b: any): any;
        imuln(a: any, num: any): any;
        muln(a: any, num: any): any;
        idiv(a: any, b: any): any;
        div(a: any, b: any): any;
        idivn(a: any, num: any): any;
        divn(a: any, num: any): any;
        ipow(a: any, num: any): any;
        pow(a: any, num: any): any;
        ipown(a: any, num: any): any;
        pown(a: any, num: any): any;
        isqr(a: any): any;
        sqr(a: any): any;
        isqrt(a: any): any;
        sqrt(a: any): any;
        idivsqrt(u: any, v: any): any;
        divsqrt(u: any, v: any): any;
        isSquare(a: any): boolean;
        ishl(a: any, num: any): any;
        shl(a: any, num: any): any;
        ishln(a: any, num: any): any;
        shln(a: any, num: any): any;
        ineg(a: any): any;
        neg(a: any): any;
        eq(a: any, b: any): boolean;
        eqn(a: any, num: any): boolean;
        isHigh(a: any): boolean;
        isLow(a: any): boolean;
        isOdd(a: any): any;
        isEven(a: any): any;
        legendre(a: any): 1 | 0 | -1;
        jacobi(a: any): number;
        kronecker(a: any): number;
        iinvert(a: any): any;
        invert(a: any): any;
        ifermat(a: any): any;
        fermat(a: any): any;
        invertAll(elems: any): any[];
    }
}
declare module "bcrypto/lib/js/bn" {
    export = BN;
    /**
     * BN
     */
    class BN {
        static min(...args: any[]): any;
        static max(...args: any[]): any;
        static cmp(a: any, b: any): any;
        static ucmp(a: any, b: any): any;
        static red(num: any): Red;
        static barrett(num: any): Barrett;
        static mont(num: any): Mont;
        static _prime(name: any): any;
        static prime(name: any): any;
        static pow(num: any, exp: any): BN;
        static shift(num: any, bits: any): BN;
        static mask(bits: any): BN;
        static randomBits(rng: any, bits: any): any;
        static random(rng: any, min: any, max: any): any;
        static of(num: any, endian: any): BN;
        static fromNumber(num: any, endian: any): BN;
        static fromDouble(num: any, endian: any): BN;
        static fromBigInt(num: any, endian: any): BN;
        static fromBool(value: any): BN;
        static fromString(str: any, base: any, endian: any): BN;
        static fromJSON(json: any): any;
        static fromBN(num: any): BN;
        static fromArray(data: any, endian: any): BN;
        static fromBuffer(data: any, endian: any): BN;
        static fromArrayLike(data: any, endian: any): BN;
        static decode(data: any, endian: any): BN;
        static from(num: any, base: any, endian: any): BN;
        static cast(num: any, base: any, endian: any): any;
        static isBN(obj: any): boolean;
        constructor(num: any, base: any, endian: any);
        words: number[];
        length: number;
        negative: number;
        red: any;
        _iadd(a: any, b: any): BN;
        _iaddn(num: any): BN;
        iadd(num: any): BN;
        iaddn(num: any): BN;
        add(num: any): any;
        addn(num: any): BN;
        _isub(a: any, b: any): BN;
        _isubn(num: any): BN;
        isub(num: any): BN;
        isubn(num: any): BN;
        sub(num: any): BN;
        subn(num: any): BN;
        _mul(num: any, out: any): any;
        imul(num: any): any;
        imuln(num: any): BN;
        mul(num: any): any;
        muln(num: any): BN;
        mulShift(num: any, bits: any): any;
        _div(num: any, flags: any): BN[];
        _wordDiv(num: any, flags: any): BN[];
        _ishlnsubmul(num: any, mul: any, shift: any): BN;
        quorem(num: any): BN[];
        iquo(num: any): any;
        iquon(num: any): BN;
        quo(num: any): BN;
        quon(num: any): BN;
        irem(num: any): any;
        iremn(num: any): BN;
        rem(num: any): BN;
        remn(num: any): BN;
        remrn(num: any): number;
        divmod(num: any): BN[];
        idiv(num: any): any;
        idivn(num: any): BN;
        div(num: any): BN;
        divn(num: any): BN;
        imod(num: any): any;
        imodn(num: any): BN;
        mod(num: any): BN;
        modn(num: any): BN;
        modrn(num: any): number;
        divRound(num: any): BN;
        ipow(num: any): any;
        ipown(num: any): any;
        pow(num: any): BN;
        pown(num: any): BN;
        isqr(): any;
        sqr(): any;
        _rootrem(pow: any, rem: any): BN[];
        rootrem(pow: any): BN[];
        iroot(pow: any): any;
        root(pow: any): BN;
        isPower(pow: any): boolean;
        sqrtrem(): BN[];
        isqrt(): any;
        sqrt(): BN;
        isSquare(): boolean;
        iand(num: any): any;
        iandn(num: any): any;
        and(num: any): any;
        andn(num: any): any;
        andrn(num: any): any;
        iuand(num: any): BN;
        iuandn(num: any): BN;
        uand(num: any): BN;
        uandn(num: any): BN;
        uandrn(num: any): number;
        ior(num: any): any;
        iorn(num: any): any;
        or(num: any): any;
        orn(num: any): any;
        iuor(num: any): BN;
        iuorn(num: any): BN;
        uor(num: any): BN;
        uorn(num: any): BN;
        ixor(num: any): any;
        ixorn(num: any): any;
        xor(num: any): any;
        xorn(num: any): any;
        iuxor(num: any): BN;
        iuxorn(num: any): BN;
        uxor(num: any): BN;
        uxorn(num: any): BN;
        inot(): BN;
        not(): BN;
        inotn(width: any): BN;
        notn(width: any): BN;
        ishl(num: any): BN;
        ishln(bits: any): BN;
        shl(num: any): BN;
        shln(bits: any): BN;
        iushl(num: any): BN;
        iushln(bits: any): BN;
        ushl(num: any): BN;
        ushln(bits: any): BN;
        _split(bits: any, output: any): BN;
        ishr(num: any): BN;
        ishrn(bits: any): BN;
        shr(num: any): BN;
        shrn(bits: any): BN;
        iushr(num: any): BN;
        iushrn(bits: any): BN;
        ushr(num: any): BN;
        ushrn(bits: any): BN;
        setn(bit: any, val: any): BN;
        usetn(bit: any, val: any): BN;
        testn(bit: any): number;
        utestn(bit: any): number;
        imaskn(bits: any): BN;
        maskn(bits: any): BN;
        iumaskn(bits: any): BN;
        umaskn(bits: any): BN;
        andln(num: any): number;
        bit(pos: any): number;
        bits(pos: any, width: any): number;
        ineg(): BN;
        neg(): BN;
        iabs(): BN;
        abs(): BN;
        cmp(num: any): number;
        cmpn(num: any): number;
        eq(num: any): boolean;
        eqn(num: any): boolean;
        gt(num: any): boolean;
        gtn(num: any): boolean;
        gte(num: any): boolean;
        gten(num: any): boolean;
        lt(num: any): boolean;
        ltn(num: any): boolean;
        lte(num: any): boolean;
        lten(num: any): boolean;
        sign(): 1 | 0 | -1;
        isZero(): boolean;
        isNeg(): boolean;
        isPos(): boolean;
        isOdd(): boolean;
        isEven(): boolean;
        ucmp(num: any): number;
        ucmpn(num: any): number;
        legendre(num: any): any;
        jacobi(num: any): number;
        kronecker(num: any): number;
        igcd(num: any): any;
        gcd(num: any): any;
        ilcm(num: any): any;
        lcm(num: any): any;
        egcd(num: any): any[];
        iinvert(num: any): any;
        invert(num: any): any;
        ifermat(num: any): any;
        fermat(num: any): any;
        ipowm(y: any, m: any, mont: any): any;
        powm(y: any, m: any, mont: any): any;
        ipowmn(y: any, m: any, mont: any): any;
        powmn(y: any, m: any, mont: any): any;
        isqrtm(p: any): any;
        sqrtm(p: any): any;
        isqrtpq(p: any, q: any): any;
        sqrtpq(p: any, q: any): any;
        isPrime(rng: any, reps: any, limit: any): boolean;
        isPrimeMR(rng: any, reps: any, force2?: boolean): boolean;
        isPrimeLucas(limit?: number): boolean;
        toTwos(width: any): BN;
        fromTwos(width: any): BN;
        toRed(ctx: any): any;
        fromRed(): any;
        forceRed(ctx: any): BN;
        redIAdd(num: any): any;
        redAdd(num: any): any;
        redIAddn(num: any): any;
        redAddn(num: any): any;
        redISub(num: any): any;
        redSub(num: any): any;
        redISubn(num: any): any;
        redSubn(num: any): any;
        redIMul(num: any): any;
        redMul(num: any): any;
        redIMuln(num: any): any;
        redMuln(num: any): any;
        redIDiv(num: any): any;
        redDiv(num: any): any;
        redIDivn(num: any): any;
        redDivn(num: any): any;
        redIPow(num: any): any;
        redPow(num: any): any;
        redIPown(num: any): any;
        redPown(num: any): any;
        redISqr(): any;
        redSqr(): any;
        redISqrt(): any;
        redSqrt(): any;
        redIDivSqrt(v: any): any;
        redDivSqrt(v: any): any;
        redIsSquare(): any;
        redIShl(num: any): any;
        redShl(num: any): any;
        redIShln(num: any): any;
        redShln(num: any): any;
        redINeg(): any;
        redNeg(): any;
        redEq(num: any): any;
        redEqn(num: any): any;
        redIsHigh(): any;
        redIsLow(): any;
        redIsOdd(): any;
        redIsEven(): any;
        redLegendre(): any;
        redJacobi(): any;
        redKronecker(): any;
        redIInvert(): any;
        redInvert(): any;
        redIFermat(): any;
        redFermat(): any;
        _move(dest: any): any;
        _alloc(size: any): BN;
        _expand(size: any): BN;
        _strip(): BN;
        _normalize(): BN;
        _check(): BN;
        _invertp(p: any): BN;
        _makeOdd(): number;
        _factor2(num: any): number;
        _cloneNormal(): any;
        _forceRed(ctx: any): BN;
        clone(): BN;
        inject(num: any): BN;
        set(num: any, endian: any): BN;
        swap(num: any): BN;
        reverse(): BN;
        byteLength(): number;
        bitLength(): any;
        zeroBits(): number;
        isSafe(): boolean;
        word(pos: any): number;
        toNumber(): number;
        toDouble(): number;
        valueOf(): number;
        toBigInt(): any;
        toBool(): boolean;
        toString(base: any, padding: any): string;
        toJSON(): string;
        toArray(endian: any, length: any): any;
        toBuffer(endian: any, length: any): any;
        toArrayLike(ArrayType: any, endian: any, length: any): any;
        encode(endian: any, length: any): any;
        of(num: any, endian: any): BN;
        fromNumber(num: any, endian: any): BN;
        fromDouble(num: any, endian: any): BN;
        fromBigInt(num: any, endian: any): BN;
        fromBool(value: any): BN;
        fromString(str: any, base: any, endian: any): BN;
        _fromHex(str: any, start: any): BN;
        _fromBase(str: any, base: any, start: any): BN;
        fromJSON(json: any): any;
        fromBN(num: any): BN;
        fromArray(data: any, endian: any): BN;
        fromBuffer(data: any, endian: any): BN;
        fromArrayLike(data: any, endian: any): BN;
        decode(data: any, endian: any): BN;
        from(num: any, base: any, endian: any): BN;
    }
    namespace BN {
        export { BN };
        export const wordSize: number;
        export const native: number;
        export { Red };
    }
    /**
     * Reduction Engine
     */
    class Red {
        constructor(m: any);
        m: any;
        prime: any;
        mb: any;
        sm1: any;
        _verify1(a: any): void;
        _verify2(a: any, b: any): void;
        get mont(): boolean;
        precompute(): Red;
        convertTo(num: any): any;
        convertFrom(num: any): any;
        intTo(a: any): any;
        intFrom(a: any): any;
        imod(a: any): any;
        iadd(a: any, b: any): any;
        add(a: any, b: any): any;
        iaddn(a: any, num: any): any;
        addn(a: any, num: any): any;
        isub(a: any, b: any): any;
        sub(a: any, b: any): any;
        isubn(a: any, num: any): any;
        subn(a: any, num: any): any;
        imul(a: any, b: any): any;
        mul(a: any, b: any): any;
        imuln(a: any, num: any): any;
        muln(a: any, num: any): any;
        idiv(a: any, b: any): any;
        div(a: any, b: any): any;
        idivn(a: any, num: any): any;
        divn(a: any, num: any): any;
        ipow(a: any, num: any): any;
        pow(a: any, num: any): any;
        powNum(a: any, num: any): any;
        powInt(a: any, num: any): BN;
        sqrn(a: any, n: any): any;
        sqrnmul(a: any, n: any, b: any): any;
        ipown(a: any, num: any): any;
        pown(a: any, num: any): any;
        isqr(a: any): any;
        sqr(a: any): any;
        isqrt(x: any): any;
        sqrt(x: any): any;
        sqrt3mod4(x: any): any;
        sqrt5mod8(x: any): any;
        sqrt5mod8sm1(x: any): any;
        sqrt0(x: any): any;
        idivsqrt(u: any, v: any): any;
        divsqrt(u: any, v: any): any;
        divsqrt3mod4(u: any, v: any): any;
        divsqrt5mod8(u: any, v: any): any;
        isSquare(a: any): boolean;
        ishl(a: any, num: any): any;
        shl(a: any, num: any): any;
        ishln(a: any, num: any): any;
        shln(a: any, num: any): any;
        ineg(a: any): any;
        neg(a: any): any;
        eq(a: any, b: any): boolean;
        eqn(a: any, num: any): boolean;
        isHigh(a: any): boolean;
        isLow(a: any): boolean;
        isOdd(a: any): any;
        isEven(a: any): any;
        legendre(num: any): 1 | 0 | -1;
        jacobi(a: any): any;
        kronecker(a: any): any;
        iinvert(a: any): any;
        invert(a: any): any;
        ifermat(a: any): any;
        fermat(a: any): any;
        invertAll(elems: any): any[];
    }
    /**
     * Barrett Engine
     */
    class Barrett extends Red {
        n: any;
        k: number;
        w: number;
        b: BN;
        _shift(q: any): void;
    }
    /**
     * Montgomery Engine
     */
    class Mont extends Red {
        n: number;
        r: BN;
        r2: any;
        ri: any;
        mi: any;
        rib: any;
    }
}
declare module "bcrypto/lib/bn" {
    const _exports: typeof import("bcrypto/lib/native/bn") | typeof import("bcrypto/lib/js/bn");
    export = _exports;
}
declare module "bcrypto/lib/js/salsa20" {
    export = Salsa20;
    /**
     * Salsa20
     */
    class Salsa20 {
        /**
         * Derive key with XSalsa20.
         * @param {Buffer} key
         * @param {Buffer} nonce
         * @returns {Buffer}
         */
        static derive(key: any, nonce: any): any;
        state: Uint32Array;
        stream: Uint32Array;
        bytes: any;
        pos: number;
        /**
         * Initialize salsa20 with a key, nonce, and counter.
         * @param {Buffer} key
         * @param {Buffer} nonce
         * @param {Number} counter
         */
        init(key: any, nonce: any, counter: number): Salsa20;
        /**
         * Encrypt/decrypt data.
         * @param {Buffer} data - Will be mutated.
         * @returns {Buffer}
         */
        encrypt(data: any): any;
        /**
         * Stir the stream.
         */
        _block(): void;
        /**
         * Destroy context.
         */
        destroy(): Salsa20;
    }
    namespace Salsa20 {
        const native: number;
    }
}
declare module "bcrypto/lib/native/salsa20" {
    export = Salsa20;
    /**
     * Salsa20
     */
    class Salsa20 {
        static derive(key: any, nonce: any): any;
        _handle: any;
        init(key: any, nonce: any, counter: any): Salsa20;
        encrypt(data: any): any;
        destroy(): Salsa20;
    }
    namespace Salsa20 {
        const native: number;
    }
}
declare module "bcrypto/lib/salsa20" {
    const _exports: typeof import("bcrypto/lib/js/salsa20") | typeof import("bcrypto/lib/native/salsa20");
    export = _exports;
}
declare module "bcrypto/lib/native/poly1305" {
    export = Poly1305;
    /**
     * Poly1305
     */
    class Poly1305 {
        _handle: any;
        init(key: any): Poly1305;
        update(data: any): Poly1305;
        final(): any;
        destroy(): Poly1305;
        verify(tag: any): any;
    }
    namespace Poly1305 {
        const native: number;
    }
}
declare module "bcrypto/lib/poly1305" {
    const _exports: typeof import("bcrypto/lib/js/poly1305") | typeof import("bcrypto/lib/native/poly1305");
    export = _exports;
}
declare module "bcrypto/lib/js/secretbox" {
    export var native: number;
    export function seal(msg: any, key: any, nonce: any): any;
    export function open(sealed: any, key: any, nonce: any): any;
    export function derive(secret: any, kdf: any): any;
}
declare module "bcrypto/lib/native/secretbox" {
    export var native: number;
    export function seal(msg: any, key: any, nonce: any): any;
    export function open(sealed: any, key: any, nonce: any): any;
    export function derive(secret: any, kdf: any): any;
}
declare module "bcrypto/lib/secretbox" {
    const _exports: typeof import("bcrypto/lib/js/secretbox");
    export = _exports;
}
declare module "bcrypto/lib/random" {
    const _exports: typeof import("bcrypto/lib/native/random-openssl");
    export = _exports;
}
declare module "bcrypto/lib/js/elliptic" {
    /**
     * Curve
     */
    export class Curve {
        static fromJSON(json: any): Curve;
        constructor(Point: any, type: any, conf: any);
        Point: any;
        id: any;
        uid: number;
        ossl: any;
        type: string;
        endian: string;
        hash: any;
        prefix: any;
        context: boolean;
        prime: any;
        p: any;
        red: any;
        fieldSize: number;
        fieldBits: number;
        adjustedSize: number;
        signBit: number;
        mask: number;
        n: any;
        h: any;
        q: any;
        z: any;
        g: void;
        nh: any;
        scalarSize: number;
        scalarBits: number;
        zero: any;
        one: any;
        two: any;
        three: any;
        four: any;
        i2: any;
        i3: any;
        i4: any;
        i6: any;
        torsion: any[];
        endo: any;
        hi: any;
        _init(Point: any, type: any, conf: any): Curve;
        _scale(curve: any, invert: any): void;
        isIsomorphic(curve: any): void;
        isIsogenous(curve: any): void;
        _finalize(conf: any): Curve;
        _findTorsion(): void[];
        _fixedMul(p: any, k: any): void;
        _fixedNafMul(p: any, k: any): void;
        _wnafMul(w: any, p: any, k: any): void;
        _wnafMulAdd(w: any, points: any, coeffs: any): void;
        _endoWnafMulAdd(points: any, coeffs: any): void;
        _scaleShort(curve: any, invert: any): void;
        _scaleMont(curve: any, invert: any): void;
        _scaleEdwards(curve: any, invert: any): void;
        isElliptic(): void;
        jinv(): void;
        isComplete(): boolean;
        precompute(rng: any): Curve;
        scalar(num: any, base: any, endian: any): any;
        field(num: any, base: any, endian: any): any;
        point(x: any, y: any): void;
        jpoint(x: any, y: any, z: any): void;
        xpoint(x: any, z: any): void;
        cpoint(xx: any, xz: any, yy: any, yz: any): void;
        solveX2(y: any): void;
        solveX(y: any): any;
        solveY2(x: any): void;
        solveY(x: any): any;
        validate(point: any): void;
        pointFromX(x: any, sign: any): void;
        pointFromY(y: any, sign: any): void;
        pointFromShort(point: any): void;
        pointFromMont(point: any, sign: any): void;
        pointFromEdwards(point: any): void;
        pointFromUniform(u: any): void;
        pointToUniform(p: any): void;
        pointFromHash(bytes: any, pake?: boolean): any;
        pointToHash(p: any, subgroup: any, rng: any): any;
        randomScalar(rng: any): any;
        randomField(rng: any): any;
        randomPoint(rng: any): any;
        mulAll(points: any, coeffs: any): void;
        jmulAll(points: any, coeffs: any): void;
        mulH(k: any): any;
        imulH(k: any): any;
        normalizeAll(points: any): any[];
        affinizeAll(points: any): any[];
        clamp(scalar: any): any;
        splitHash(bytes: any): any[];
        encodeField(x: any): any;
        decodeField(bytes: any): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
        encodeAdjusted(x: any): any;
        decodeAdjusted(bytes: any): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
        encodeScalar(k: any): any;
        decodeScalar(bytes: any): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
        encodeClamped(k: any): any;
        decodeClamped(bytes: any): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
        encodeUniform(x: any, bits: any): any;
        decodeUniform(bytes: any): any;
        encodePoint(point: any, compact: any): any;
        decodePoint(bytes: any): void;
        encodeX(point: any): void;
        decodeX(bytes: any): void;
        decodeEven(bytes: any): void;
        decodeSquare(bytes: any): void;
        toShort(): void;
        toMont(b0: any): void;
        toEdwards(a0: any): void;
        pointToJSON(point: any, pre: any): any;
        pointFromJSON(json: any): void;
        toJSON(pre: any): {
            id: any;
            ossl: any;
            type: string;
            endian: string;
            hash: any;
            prefix: any;
            context: boolean;
            prime: any;
            p: any;
            a: any;
            b: any;
            d: any;
            n: any;
            h: any;
            s: any;
            z: any;
            c: any;
            g: any;
            endo: any;
        };
    }
    /**
     * Point
     */
    export class Point {
        static decode(curve: any, bytes: any): void;
        static decodeX(curve: any, bytes: any): void;
        static decodeEven(curve: any, bytes: any): void;
        static decodeSquare(curve: any, bytes: any): void;
        static fromJSON(curve: any, json: any): void;
        constructor(curve: any, type: any);
        curve: any;
        type: any;
        pre: Precomp;
        _init(): void;
        _safeNAF(width: any): NAF;
        _getNAF(width: any): NAF;
        _getWindows(width: any, bits: any): Windows;
        _getDoubles(step: any, power: any): Doubles;
        _getBeta(): any;
        _getBlinding(rng: any): Blinding;
        _hasWindows(k: any): boolean;
        _hasDoubles(k: any): boolean;
        _getJNAF(point: any): any[];
        _blind(k: any, rng: any): any[];
        clone(): void;
        precompute(bits: any, rng: any): Point;
        validate(): any;
        normalize(): Point;
        scale(a: any): void;
        randomize(rng: any): void;
        neg(): void;
        add(point: any): void;
        sub(point: any): void;
        dbl(): void;
        dblp(pow: any): Point;
        diffAddDbl(p: any, q: any): void;
        getX(): void;
        getY(): void;
        eq(point: any): void;
        cmp(point: any): void;
        isInfinity(): void;
        isOrder2(): void;
        isOdd(): void;
        isEven(): void;
        isSquare(): void;
        eqX(x: any): void;
        eqR(x: any): void;
        isSmall(): any;
        hasTorsion(): boolean;
        order(): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
        mul(k: any): any;
        muln(k: any): any;
        mulBlind(k: any, rng: any): any;
        mulAdd(k1: any, p2: any, k2: any): any;
        mulH(): any;
        div(k: any): any;
        divn(k: any): any;
        divH(): any;
        jmul(k: any): any;
        jmuln(k: any): any;
        jmulBlind(k: any, rng?: any): any;
        jmulAdd(k1: any, p2: any, k2: any): any;
        jmulH(): any;
        jdiv(k: any): any;
        jdivn(k: any): any;
        jdivH(): any;
        toP(): Point;
        toJ(): Point;
        toX(): Point;
        key(): string;
        encode(compact: any): void;
        encodeX(): void;
        toJSON(pre: any): void;
    }
    /**
     * ShortCurve
     */
    export class ShortCurve extends Curve {
        static _isomorphism(curveA: any, curveB: any, custom: any, odd: any): any[];
        constructor(conf: any);
        a: any;
        b: any;
        c: any;
        ai: any;
        zi: any;
        zeroA: any;
        threeA: any;
        redN: any;
        pmodn: any;
        highOrder: boolean;
        smallGap: boolean;
        _short(a0: any, odd: any): any[];
        _mont(b0: any, odd: any): any[];
        _edwards(a0: any, odd: any): any[];
        _findRS(sign: any): any[];
        _scale0(a: any, b: any): any[];
        _scale1(x: any, y: any): any[];
        _getEndomorphism(index?: number): Endo;
        _getEndoRoots(num: any): any[];
        _getEndoBasis(lambda: any): Vector[];
        _egcdSqrt(lambda: any): any[];
        _getEndoPrecomp(basis: any): any[];
        _endoSplit(k: any): any[];
        _endoBeta(point: any): any[];
        _sswu(u: any): ShortPoint;
        _sswui(p: any, hint: any): any;
        _svdwf(u: any): any[];
        _svdw(u: any): ShortPoint;
        _svdwi(p: any, hint: any): any;
    }
    /**
     * ShortPoint
     */
    export class ShortPoint extends Point {
        static decode(curve: any, bytes: any): any;
        static decodeEven(curve: any, bytes: any): any;
        static decodeSquare(curve: any, bytes: any): any;
        static fromJSON(curve: any, json: any): any;
        constructor(curve: any, x: any, y: any);
        x: any;
        y: any;
        inf: boolean;
        toPretty(): string[][];
    }
    /**
     * JPoint
     */
    export class JPoint extends Point {
        static decode(curve: any, bytes: any): any;
        static decodeEven(curve: any, bytes: any): any;
        static decodeSquare(curve: any, bytes: any): any;
        static fromJSON(curve: any, json: any): any;
        constructor(curve: any, x: any, y: any, z: any);
        x: any;
        y: any;
        z: any;
        zOne: boolean;
        _add(p: any): any;
        _mixedAdd(p: any): any;
        _addJJ(p: any): any;
        _addJA(p: any): any;
        _dblJ(): any;
        _dbl0(): any;
        _dbl3(): any;
        toPretty(): any;
    }
    /**
     * MontCurve
     */
    export class MontCurve extends Curve {
        static _isomorphism(curveA: any, curveB: any, customB: any): any[];
        constructor(conf: any);
        a: any;
        b: any;
        bi: any;
        a2: any;
        a24: any;
        a3: any;
        a0: any;
        b0: any;
        _short(a0: any, odd: any): any[];
        _mont(b0: any): any[];
        _edwards(a0: any, invert?: boolean): any[];
        _solveY0(x: any): any;
        _elligator2(u: any): MontPoint;
        _invert2(p: any, hint: any): any;
    }
    /**
     * MontPoint
     */
    export class MontPoint extends Point {
        static decode(curve: any, bytes: any, sign: any): any;
        static fromJSON(curve: any, json: any): any;
        constructor(curve: any, x: any, y: any);
        x: any;
        y: any;
        inf: boolean;
        toPretty(): string[][];
    }
    /**
     * XPoint
     */
    export class XPoint extends Point {
        static decode(curve: any, bytes: any): any;
        static fromJSON(curve: any, json: any): any;
        constructor(curve: any, x: any, z: any);
        x: any;
        z: any;
        toPretty(): any;
    }
    /**
     * EdwardsCurve
     */
    export class EdwardsCurve extends Curve {
        static _isomorphism(curveA: any, curveD: any, customA: any): any[];
        constructor(conf: any);
        a: any;
        d: any;
        s: any;
        si: any;
        k: any;
        smi: number;
        ad6: any;
        twisted: boolean;
        oneA: any;
        mOneA: any;
        smallD: boolean;
        alt: MontCurve;
        _short(a0: any, odd: any): any[];
        _mont(b0: any, invert?: boolean): any[];
        _edwards(a0: any): any[];
        _mulA(num: any): any;
        _mulD(num: any): any;
        _elligator1(t: any): EdwardsPoint;
        _invert1(p: any, hint: any): any;
        _alt(): MontCurve;
    }
    /**
     * EdwardsPoint
     */
    export class EdwardsPoint extends Point {
        static decode(curve: any, bytes: any): any;
        static fromJSON(curve: any, json: any): any;
        constructor(curve: any, x: any, y: any, z: any, t: any);
        x: any;
        y: any;
        z: any;
        t: any;
        zOne: boolean;
        _check(): void;
        _add(p: any): any;
        _addM1(p: any): any;
        _addA(p: any): any;
        _dbl(): any;
        toPretty(): string[][];
    }
    export namespace curves {
        export const __proto__: any;
        export { P192 };
        export { P224 };
        export { P256 };
        export { P384 };
        export { P521 };
        export { SECP256K1 };
        export { BRAINPOOLP256 };
        export { BRAINPOOLP384 };
        export { BRAINPOOLP512 };
        export { X25519 };
        export { X448 };
        export { MONT448 };
        export { ED25519 };
        export { ISO448 };
        export { ED448 };
    }
    export function curve(name: any, ...args: any[]): any;
    export function register(name: any, Curve: any): void;
    /**
     * Precomp
     */
    class Precomp {
        static fromJSON(point: any, json: any): Precomp;
        naf: NAF;
        windows: Windows;
        doubles: Doubles;
        blinding: Blinding;
        beta: any;
        map(func: any): any;
        toJSON(): {
            naf: {
                width: any;
                points: any;
            };
            windows: {
                width: any;
                bits: any;
                points: any;
            };
            doubles: {
                step: any;
                points: any;
            };
            blinding: {
                blind: any;
                unblind: any;
            };
        };
        fromJSON(point: any, json: any): Precomp;
    }
    /**
     * NAF
     */
    class NAF {
        static fromJSON(point: any, json: any): NAF;
        constructor(width: any, points: any);
        width: any;
        points: any;
        map(func: any): any;
        toJSON(): {
            width: any;
            points: any;
        };
    }
    /**
     * Windows
     */
    class Windows {
        static fromJSON(point: any, json: any): Windows;
        constructor(width: any, bits: any, points: any);
        width: any;
        bits: any;
        points: any;
        toJSON(): {
            width: any;
            bits: any;
            points: any;
        };
    }
    /**
     * Doubles
     */
    class Doubles {
        static fromJSON(point: any, json: any): Doubles;
        constructor(step: any, points: any);
        step: any;
        points: any;
        map(func: any): any;
        toJSON(): {
            step: any;
            points: any;
        };
    }
    /**
     * Blinding
     */
    class Blinding {
        static fromJSON(point: any, json: any): Blinding;
        constructor(blind: any, unblind: any);
        blind: any;
        unblind: any;
        toJSON(): {
            blind: any;
            unblind: any;
        };
    }
    /**
     * Endo
     */
    class Endo {
        static fromJSON(curve: any, json: any): Endo;
        constructor(beta: any, lambda: any, basis: any, pre: any);
        beta: any;
        lambda: any;
        basis: any;
        pre: any;
        toJSON(): {
            beta: any;
            lambda: any;
            basis: any[];
            pre: any[];
        };
    }
    /**
     * Vector
     */
    class Vector {
        static fromJSON(json: any): Vector;
        constructor(a: any, b: any);
        a: any;
        b: any;
        toJSON(): {
            a: any;
            b: any;
        };
    }
    /**
     * P192
     * https://tinyurl.com/fips-186-2 (page 29)
     * https://tinyurl.com/fips-186-3 (page 88)
     */
    class P192 extends ShortCurve {
    }
    /**
     * P224
     * https://tinyurl.com/fips-186-2 (page 30)
     * https://tinyurl.com/fips-186-3 (page 88)
     */
    class P224 extends ShortCurve {
    }
    /**
     * P256
     * https://tinyurl.com/fips-186-2 (page 31)
     * https://tinyurl.com/fips-186-3 (page 89)
     */
    class P256 extends ShortCurve {
    }
    /**
     * P384
     * https://tinyurl.com/fips-186-2 (page 32)
     * https://tinyurl.com/fips-186-3 (page 89)
     */
    class P384 extends ShortCurve {
    }
    /**
     * P521
     * https://tinyurl.com/fips-186-2 (page 33)
     * https://tinyurl.com/fips-186-3 (page 90)
     */
    class P521 extends ShortCurve {
    }
    /**
     * SECP256K1
     * https://www.secg.org/SEC2-Ver-1.0.pdf (page 15, section 2.7.1)
     * https://www.secg.org/sec2-v2.pdf (page 9, section 2.4.1)
     */
    class SECP256K1 extends ShortCurve {
    }
    /**
     * BRAINPOOLP256
     * https://tools.ietf.org/html/rfc5639#section-3.4
     */
    class BRAINPOOLP256 extends ShortCurve {
    }
    /**
     * BRAINPOOLP384
     * https://tools.ietf.org/html/rfc5639#section-3.6
     */
    class BRAINPOOLP384 extends ShortCurve {
    }
    /**
     * BRAINPOOLP512
     * https://tools.ietf.org/html/rfc5639#section-3.7
     */
    class BRAINPOOLP512 extends ShortCurve {
    }
    /**
     * X25519
     * https://tools.ietf.org/html/rfc7748#section-4.1
     */
    class X25519 extends MontCurve {
        constructor();
    }
    /**
     * X448
     * https://tools.ietf.org/html/rfc7748#section-4.2
     */
    class X448 extends MontCurve {
        constructor();
    }
    /**
     * MONT448
     * Isomorphic to Ed448-Goldilocks.
     */
    class MONT448 extends MontCurve {
        constructor();
    }
    /**
     * ED25519
     * https://tools.ietf.org/html/rfc8032#section-5.1
     */
    class ED25519 extends EdwardsCurve {
    }
    /**
     * ISO448
     * https://tools.ietf.org/html/rfc7748#section-4.2
     * https://git.zx2c4.com/goldilocks/tree/_aux/ristretto/ristretto.sage#n658
     */
    class ISO448 extends EdwardsCurve {
    }
    /**
     * ED448
     * https://tools.ietf.org/html/rfc8032#section-5.2
     */
    class ED448 extends EdwardsCurve {
    }
    export {};
}
declare module "bcrypto/lib/js/ecdh" {
    export = ECDH;
    /**
     * ECDH
     */
    class ECDH {
        constructor(id: any, eid: any, pre: any);
        id: any;
        type: string;
        eid: any;
        _pre: any;
        _curve: any;
        _edwards: any;
        native: number;
        get curve(): any;
        get edwards(): any;
        get size(): any;
        get bits(): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): boolean;
        privateKeyExport(key: any, sign: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        publicKeyCreate(key: any): any;
        publicKeyConvert(key: any, sign: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any, pake?: boolean): any;
        publicKeyToHash(key: any, subgroup?: number): any;
        publicKeyVerify(key: any): any;
        publicKeyIsSmall(key: any): any;
        publicKeyHasTorsion(key: any): any;
        publicKeyExport(key: any, sign: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        derive(pub: any, priv: any): any;
    }
}
declare module "bcrypto/lib/js/x25519" {
    const _exports: ECDH;
    export = _exports;
    import ECDH = require("bcrypto/lib/js/ecdh");
}
declare module "bcrypto/lib/native/ecdh" {
    export = ECDH;
    /**
     * ECDH
     */
    class ECDH {
        constructor(name: any);
        id: any;
        type: string;
        native: number;
        _ctx: any;
        get _handle(): any;
        get size(): any;
        get bits(): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): any;
        privateKeyExport(key: any, sign: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        publicKeyCreate(key: any): any;
        publicKeyConvert(key: any, sign: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any, pake?: boolean): any;
        publicKeyToHash(key: any, subgroup?: any): any;
        publicKeyVerify(key: any): any;
        publicKeyIsSmall(key: any): any;
        publicKeyHasTorsion(key: any): any;
        publicKeyExport(key: any, sign: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        derive(pub: any, priv: any): any;
    }
}
declare module "bcrypto/lib/native/x25519" {
    const _exports: ECDH;
    export = _exports;
    import ECDH = require("bcrypto/lib/native/ecdh");
}
declare module "bcrypto/lib/x25519" {
    const _exports: typeof import("bcrypto/lib/js/ecdh") | typeof import("bcrypto/lib/native/ecdh");
    export = _exports;
}
declare module "bcrypto/lib/box" {
    export function seal(msg: any, pub: any, priv?: any): any;
    export function open(msg: any, priv: any): any;
    export { native };
}
declare module "bcrypto/lib/native/chacha20" {
    export = ChaCha20;
    /**
     * ChaCha20
     */
    class ChaCha20 {
        static derive(key: any, nonce: any): any;
        _handle: any;
        init(key: any, nonce: any, counter: any): ChaCha20;
        encrypt(data: any): any;
        destroy(): ChaCha20;
    }
    namespace ChaCha20 {
        const native: number;
    }
}
declare module "bcrypto/lib/chacha20" {
    const _exports: typeof import("bcrypto/lib/js/chacha20") | typeof import("bcrypto/lib/native/chacha20");
    export = _exports;
}
declare module "bcrypto/lib/js/ciphers/arc2" {
    export = ARC2;
    /**
     * ARC2
     */
    class ARC2 {
        constructor(bits?: number, ekb?: number);
        bits: number;
        ekb: number;
        k: Uint16Array;
        r: Uint16Array;
        get blockSize(): number;
        init(key: any): ARC2;
        encrypt(output: any, opos: any, input: any, ipos: any): void;
        decrypt(output: any, opos: any, input: any, ipos: any): void;
        destroy(): ARC2;
    }
}
declare module "bcrypto/lib/js/ciphers/camellia" {
    export = Camellia;
    /**
     * Camellia
     */
    class Camellia {
        constructor(bits: any);
        bits: any;
        ctx: Camellia128 | Camellia256;
        get blockSize(): number;
        init(key: any): Camellia;
        encrypt(output: any, opos: any, input: any, ipos: any): Camellia;
        decrypt(output: any, opos: any, input: any, ipos: any): Camellia;
        destroy(): Camellia;
    }
    /**
     * Camellia128
     */
    class Camellia128 {
        key: Uint32Array;
        block: Uint32Array;
        get blockSize(): number;
        init(key: any): Camellia128;
        keySchedule(key: any): Camellia128;
        encrypt(output: any, opos: any, input: any, ipos: any): void;
        decrypt(output: any, opos: any, input: any, ipos: any): Camellia128;
        destroy(): Camellia128;
    }
    /**
     * Camellia256
     */
    class Camellia256 {
        key: Uint32Array;
        block: Uint32Array;
        get blockSize(): number;
        init(key: any): Camellia256;
        keySchedule(key: any): Camellia256;
        encrypt(output: any, opos: any, input: any, ipos: any): Camellia256;
        decrypt(output: any, opos: any, input: any, ipos: any): Camellia256;
        destroy(): Camellia256;
    }
}
declare module "bcrypto/lib/js/ciphers/cast5" {
    export = CAST5;
    /**
     * CAST5
     */
    class CAST5 {
        masking: Uint32Array;
        rotate: Uint8Array;
        get blockSize(): number;
        init(key: any): CAST5;
        destroy(): CAST5;
        keySchedule(input: any): CAST5;
        encrypt(output: any, opos: any, input: any, ipos: any): CAST5;
        decrypt(output: any, opos: any, input: any, ipos: any): CAST5;
    }
}
declare module "bcrypto/lib/js/ciphers/des" {
    /**
     * DES
     */
    export class DES {
        block: Uint32Array;
        keys: Uint32Array;
        get blockSize(): number;
        init(key: any): DES;
        encrypt(output: any, opos: any, input: any, ipos: any): DES;
        decrypt(output: any, opos: any, input: any, ipos: any): DES;
        destroy(): DES;
        derive(key: any): DES;
        crypt(output: any, opos: any, input: any, ipos: any, encrypt: any): DES;
        encipher(lStart: any, rStart: any, out: any, off: any): DES;
        decipher(lStart: any, rStart: any, out: any, off: any): DES;
    }
    /**
     * EDE
     */
    export class EDE {
        x: DES;
        y: DES;
        get blockSize(): number;
        init(key: any): EDE;
        encrypt(output: any, opos: any, input: any, ipos: any): EDE;
        decrypt(output: any, opos: any, input: any, ipos: any): EDE;
        destroy(): EDE;
    }
    /**
     * EDE3
     */
    export class EDE3 {
        x: DES;
        y: DES;
        z: DES;
        get blockSize(): number;
        init(key: any): EDE3;
        encrypt(output: any, opos: any, input: any, ipos: any): EDE3;
        decrypt(output: any, opos: any, input: any, ipos: any): EDE3;
        destroy(): EDE3;
    }
}
declare module "bcrypto/lib/js/ciphers/idea" {
    export = IDEA;
    /**
     * IDEA
     */
    class IDEA {
        key: any;
        encryptKey: Uint16Array;
        decryptKey: Uint16Array;
        get blockSize(): number;
        init(key: any): IDEA;
        getEncryptKey(): Uint16Array;
        getDecryptKey(): Uint16Array;
        encrypt(output: any, opos: any, input: any, ipos: any): void;
        decrypt(output: any, opos: any, input: any, ipos: any): void;
        destroy(): IDEA;
        expandKey(key: any): Uint16Array;
        invertKey(K: any): Uint16Array;
        crypt(output: any, opos: any, input: any, ipos: any, key: any): void;
    }
}
declare module "bcrypto/lib/js/ciphers/serpent" {
    export = Serpent;
    /**
     * Serpent
     */
    class Serpent {
        constructor(bits: any);
        bits: any;
        subkeys: Uint32Array;
        block: Uint32Array;
        get blockSize(): number;
        init(key: any): Serpent;
        keySchedule(key: any): Serpent;
        encrypt(output: any, opos: any, input: any, ipos: any): Serpent;
        decrypt(output: any, opos: any, input: any, ipos: any): Serpent;
        destroy(): Serpent;
    }
}
declare module "bcrypto/lib/js/ciphers/twofish" {
    export = Twofish;
    /**
     * Twofish
     */
    class Twofish {
        constructor(bits?: number);
        bits: number;
        S: Uint32Array[];
        k: Uint32Array;
        get blockSize(): number;
        init(key: any): Twofish;
        encrypt(output: any, opos: any, input: any, ipos: any): Twofish;
        decrypt(output: any, opos: any, input: any, ipos: any): Twofish;
        destroy(): Twofish;
    }
}
declare module "bcrypto/lib/js/cipher" {
    export var native: number;
    /**
     * Cipher
     * @extends CipherBase
     */
    export class Cipher extends CipherBase {
        constructor(name: any);
    }
    /**
     * Decipher
     * @extends CipherBase
     */
    export class Decipher extends CipherBase {
        constructor(name: any);
    }
    export function encrypt(name: any, key: any, iv: any, data: any): any;
    export function decrypt(name: any, key: any, iv: any, data: any): any;
    /**
     * CipherBase
     */
    class CipherBase {
        constructor(name: any, encrypt: any);
        encrypt: any;
        ctx: modes.RawCipher | modes.OFBCipher;
        _init(name: any): void;
        init(key: any, iv: any): CipherBase;
        update(data: any): any;
        crypt(output: any, input: any): any;
        final(): void;
        destroy(): CipherBase;
        setAutoPadding(padding: any): CipherBase;
        setAAD(data: any): CipherBase;
        setCCM(msgLen: any, tagLen: any, aad: any): CipherBase;
        getAuthTag(): void;
        setAuthTag(tag: any): CipherBase;
    }
    import modes = require("bcrypto/lib/js/ciphers/modes");
    export {};
}
declare module "bcrypto/lib/native/cipher" {
    export var native: number;
    /**
     * Cipher
     * @param {String} name
     */
    export class Cipher extends CipherBase {
        constructor(name: any);
    }
    /**
     * Decipher
     * @param {String} name
     */
    export class Decipher extends CipherBase {
        constructor(name: any);
    }
    export function encrypt(name: any, key: any, iv: any, data: any): any;
    export function decrypt(name: any, key: any, iv: any, data: any): any;
    /**
     * CipherBase
     * @param {String} name
     * @param {Boolean} encrypt
     */
    class CipherBase {
        constructor(name: any, encrypt: any);
        _handle: any;
        init(key: any, iv: any): CipherBase;
        update(data: any): any;
        crypt(output: any, input: any): any;
        final(): any;
        destroy(): CipherBase;
        setAutoPadding(padding: any): CipherBase;
        setAAD(data: any): CipherBase;
        setCCM(msgLen: any, tagLen: any, aad: any): CipherBase;
        getAuthTag(): any;
        setAuthTag(tag: any): CipherBase;
    }
    export {};
}
declare module "bcrypto/lib/cipher" {
    const _exports: typeof import("bcrypto/lib/js/cipher") | typeof import("bcrypto/lib/native/cipher");
    export = _exports;
}
declare module "bcrypto/lib/js/cleanse" {
    export = cleanse;
    /**
     * A maybe-secure memzero.
     * @param {Buffer} data
     */
    function cleanse(data: any): void;
    namespace cleanse {
        const native: number;
    }
}
declare module "bcrypto/lib/native/cleanse" {
    export = cleanse;
    function cleanse(data: any): void;
    namespace cleanse {
        const native: number;
    }
}
declare module "bcrypto/lib/cleanse" {
    const _exports: typeof import("bcrypto/lib/native/cleanse");
    export = _exports;
}
declare module "bcrypto/lib/js/keccak" {
    export = Keccak;
    /**
     * Keccak
     */
    class Keccak {
        static hash(): Keccak;
        static hmac(bits: any, pad: any, len: any): HMAC;
        static digest(data: any, bits: any, pad: any, len: any): any;
        static root(left: any, right: any, bits: any, pad: any, len: any): any;
        static multi(x: any, y: any, z: any, bits: any, pad: any, len: any): any;
        static mac(data: any, key: any, bits: any, pad: any, len: any): any;
        state: Uint32Array;
        block: any;
        bs: number;
        pos: number;
        init(bits: any): Keccak;
        update(data: any): Keccak;
        final(pad: any, len: any): any;
        _transform(block: any, off: any): void;
    }
    namespace Keccak {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Keccak;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/keccak" {
    export = Keccak;
    /**
     * Keccak
     */
    class Keccak {
        static hash(): Keccak;
        static hmac(bits: any, pad: any, len: any): HMAC;
        static digest(data: any, bits: any, pad: any, len: any): any;
        static root(left: any, right: any, bits: any, pad: any, len: any): any;
        static multi(x: any, y: any, z: any, bits: any, pad: any, len: any): any;
        static mac(data: any, key: any, bits: any, pad: any, len: any): any;
        _handle: any;
        init(bits: any): Keccak;
        update(data: any): Keccak;
        final(pad: any, len: any): any;
    }
    namespace Keccak {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Keccak;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/keccak" {
    const _exports: typeof import("bcrypto/lib/js/keccak") | typeof import("bcrypto/lib/native/keccak");
    export = _exports;
}
declare module "bcrypto/lib/cshake" {
    export = CSHAKE;
    class CSHAKE {
        static hash(): CSHAKE;
        static hmac(bits: any, name: any, pers: any, len: any): HMAC;
        static digest(data: any, bits: any, name: any, pers: any, len: any): any;
        static root(left: any, right: any, bits: any, name: any, pers: any, len: any): any;
        static multi(x: any, y: any, z: any, bits: any, name: any, pers: any, len: any): any;
        static mac(data: any, key: any, bits: any, name: any, pers: any, len: any): any;
        pad: number;
        rate: number;
        init(bits: any, name: any, pers: any): CSHAKE;
        final(len: any): any;
        bytePad(items: any, w: any): any;
        encodeString(s: any): any;
        zeroPad(size: any): any;
        leftEncode(x: any): any;
        rightEncode(x: any): any;
    }
    namespace CSHAKE {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: CSHAKE;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/cshake128" {
    export = CSHAKE128;
    /**
     * CSHAKE128
     */
    class CSHAKE128 extends CSHAKE {
        static hash(): CSHAKE128;
        static hmac(name: any, pers: any, len: any): import("bcrypto/lib/internal/hmac");
        static digest(data: any, name: any, pers: any, len: any): any;
        static root(left: any, right: any, name: any, pers: any, len: any): any;
        static multi(x: any, y: any, z: any, name: any, pers: any, len: any): any;
        static mac(data: any, key: any, name: any, pers: any, len: any): any;
    }
    namespace CSHAKE128 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: CSHAKE128;
    }
    import CSHAKE = require("bcrypto/lib/cshake");
}
declare module "bcrypto/lib/cshake256" {
    export = CSHAKE256;
    /**
     * CSHAKE256
     */
    class CSHAKE256 extends CSHAKE {
        static hash(): CSHAKE256;
        static hmac(name: any, pers: any, len: any): import("bcrypto/lib/internal/hmac");
        static digest(data: any, name: any, pers: any, len: any): any;
        static root(left: any, right: any, name: any, pers: any, len: any): any;
        static multi(x: any, y: any, z: any, name: any, pers: any, len: any): any;
        static mac(data: any, key: any, name: any, pers: any, len: any): any;
    }
    namespace CSHAKE256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: CSHAKE256;
    }
    import CSHAKE = require("bcrypto/lib/cshake");
}
declare module "bcrypto/lib/js/ctr-drbg" {
    export = CtrDRBG;
    /**
     * CtrDRBG
     */
    class CtrDRBG {
        constructor(bits: any, derivation: any, entropy: any, nonce: any, pers: any);
        bits: any;
        ctr: CTR;
        keySize: number;
        blkSize: number;
        entSize: number;
        slab: any;
        K: any;
        V: any;
        derivation: any;
        rounds: number;
        init(entropy: any, nonce: any, pers: any): CtrDRBG;
        reseed(entropy: any, add: any): CtrDRBG;
        generate(len: any, add: any): any;
        randomBytes(size: any): any;
        update(seed: any): CtrDRBG;
        serialize(...input: any[]): any;
        derive(...input: any[]): any;
    }
    namespace CtrDRBG {
        const native: number;
    }
    class CTR {
        constructor(bits: any);
        ctx: AES;
        ctr: any;
        init(key: any, iv: any): CTR;
        increment(): void;
        encrypt(output: any, opos: any): CTR;
    }
    import AES = require("bcrypto/lib/js/ciphers/aes");
}
declare module "bcrypto/lib/native/ctr-drbg" {
    export = CtrDRBG;
    /**
     * CtrDRBG
     */
    class CtrDRBG {
        constructor(bits: any, derivation: any, entropy: any, nonce: any, pers: any);
        _handle: any;
        init(entropy: any, nonce: any, pers: any): CtrDRBG;
        reseed(entropy: any, add: any): CtrDRBG;
        generate(len: any, add: any): any;
        randomBytes(size: any): any;
    }
    namespace CtrDRBG {
        const native: number;
    }
}
declare module "bcrypto/lib/ctr-drbg" {
    const _exports: typeof import("bcrypto/lib/js/ctr-drbg") | typeof import("bcrypto/lib/native/ctr-drbg");
    export = _exports;
}
declare module "bcrypto/lib/js/hmac-drbg" {
    export = HmacDRBG;
    /**
     * HmacDRBG
     */
    class HmacDRBG {
        constructor(hash: any, entropy: any, nonce: any, pers: any);
        hash: any;
        minEntropy: number;
        K: any;
        V: any;
        rounds: number;
        init(entropy: any, nonce: any, pers: any): HmacDRBG;
        reseed(entropy: any, add: any): HmacDRBG;
        generate(len: any, add: any): any;
        randomBytes(size: any): any;
        mac(data: any): any;
        hmac(): any;
        update(seed: any): HmacDRBG;
    }
    namespace HmacDRBG {
        const native: number;
    }
}
declare module "bcrypto/lib/native/hmac-drbg" {
    export = HmacDRBG;
    /**
     * HmacDRBG
     */
    class HmacDRBG {
        constructor(hash: any, entropy: any, nonce: any, pers: any);
        _handle: any;
        init(entropy: any, nonce: any, pers: any): HmacDRBG;
        reseed(entropy: any, add: any): HmacDRBG;
        generate(len: any, add: any): any;
        randomBytes(size: any): any;
    }
    namespace HmacDRBG {
        const native: number;
    }
}
declare module "bcrypto/lib/hmac-drbg" {
    const _exports: typeof import("bcrypto/lib/js/hmac-drbg") | typeof import("bcrypto/lib/native/hmac-drbg");
    export = _exports;
}
declare module "bcrypto/lib/js/sha256" {
    export = SHA256;
    /**
     * SHA256
     */
    class SHA256 {
        static hash(): SHA256;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): SHA256;
        update(data: any): SHA256;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
    }
    namespace SHA256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA256;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/sha256" {
    export = SHA256;
    class SHA256 extends Hash {
        static hash(): SHA256;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace SHA256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA256;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/sha256" {
    const _exports: typeof import("bcrypto/lib/js/sha256") | typeof import("bcrypto/lib/native/sha256");
    export = _exports;
}
declare module "bcrypto/lib/internal/primes" {
    export function randomPrime(bits: any, reps?: number, rng?: typeof import("bcrypto/lib/native/random-openssl")): any;
    export function isProbablePrime(x: any, reps: any, rng?: typeof import("bcrypto/lib/native/random-openssl")): any;
    export function isSafePrime(x: any, reps: any, rng: any): boolean;
}
declare module "bcrypto/lib/internal/asn1" {
    export function readSize(data: any, pos: any, strict: any): any[];
    export function readSeq(data: any, pos: any, strict?: boolean): any;
    export function readInt(data: any, pos: any, strict?: boolean): any[];
    export function readVersion(data: any, pos: any, version: any, strict?: boolean): any;
    export function sizeSize(size: any): 1 | 2 | 3;
    export function sizeSeq(size: any): any;
    export function sizeInt(num: any): number;
    export function sizeVersion(version: any): number;
    export function writeSize(data: any, pos: any, size: any): any;
    export function writeSeq(data: any, pos: any, size: any): any;
    export function writeInt(data: any, pos: any, num: any): any;
    export function writeVersion(data: any, pos: any, version: any): any;
}
declare module "bcrypto/lib/js/dsa" {
    export var native: number;
    /**
     * Create params from key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function paramsCreate(key: any): any;
    /**
     * Generate params.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function paramsGenerate(bits?: number): any;
    /**
     * Generate params.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function paramsGenerateAsync(bits?: number): any;
    /**
     * Get params prime size in bits.
     * @param {Buffer} params
     * @returns {Number}
     */
    export function paramsBits(params: any): number;
    /**
     * Get params scalar size in bits.
     * @param {Buffer} params
     * @returns {Number}
     */
    export function paramsScalarBits(params: any): number;
    /**
     * Verify params.
     * @param {Buffer} params
     * @returns {Boolean}
     */
    export function paramsVerify(params: any): boolean;
    /**
     * Import params from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function paramsImport(json: any): any;
    /**
     * Export params to an object.
     * @param {Buffer} params
     * @returns {Object}
     */
    export function paramsExport(params: any): any;
    /**
     * Generate private key from params.
     * @param {Buffer} params
     * @returns {Buffer}
     */
    export function privateKeyCreate(params: any): any;
    /**
     * Generate private key.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function privateKeyGenerate(bits?: number): any;
    /**
     * Generate private key.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function privateKeyGenerateAsync(bits?: number): any;
    /**
     * Get private key prime size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function privateKeyBits(key: any): number;
    /**
     * Get private key scalar size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function privateKeyScalarBits(key: any): number;
    /**
     * Verify a private key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function privateKeyVerify(key: any): boolean;
    /**
     * Import a private key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function privateKeyImport(json: any): any;
    /**
     * Export a private key in OpenSSL ASN.1 format.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function privateKeyExport(key: any): any;
    /**
     * Create a public key from a private key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyCreate(key: any): any;
    /**
     * Get public key prime size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function publicKeyBits(key: any): number;
    /**
     * Get public key scalar size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function publicKeyScalarBits(key: any): number;
    /**
     * Verify a public key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function publicKeyVerify(key: any): boolean;
    /**
     * Import a public key to an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function publicKeyImport(json: any): any;
    /**
     * Export a public key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function publicKeyExport(key: any): any;
    /**
     * Convert DER signature to R/S.
     * @param {Buffer} sig
     * @param {Number} size
     * @returns {Buffer} R/S-formatted signature.
     */
    export function signatureImport(sig: any, size: number): any;
    /**
     * Convert R/S signature to DER.
     * @param {Buffer} sig
     * @param {Number} size
     * @returns {Buffer} DER-formatted signature.
     */
    export function signatureExport(sig: any, size: number): any;
    /**
     * Sign a message (R/S).
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @returns {Buffer} R/S-formatted signature.
     */
    export function sign(msg: any, key: any): any;
    /**
     * Sign a message (DER).
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @returns {Buffer} DER-formatted signature.
     */
    export function signDER(msg: any, key: any): any;
    /**
     * Verify a signature (R/S).
     * @private
     * @param {Buffer} msg
     * @param {Buffer} sig - R/S-formatted.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verify(msg: any, sig: any, key: any): boolean;
    /**
     * Verify a signature (DER).
     * @param {Buffer} msg
     * @param {Buffer} sig - DER-formatted.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verifyDER(msg: any, sig: any, key: any): boolean;
    /**
     * Perform a diffie-hellman.
     * @param {Buffer} pub
     * @param {Buffer} priv
     * @returns {Buffer}
     */
    export function derive(pub: any, priv: any): any;
}
declare module "bcrypto/lib/native/dsa" {
    export var native: number;
    /**
     * Create params from key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function paramsCreate(key: any): any;
    /**
     * Generate params.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function paramsGenerate(bits?: number): any;
    /**
     * Generate params.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function paramsGenerateAsync(bits?: number): any;
    /**
     * Get params prime size in bits.
     * @param {Buffer} params
     * @returns {Number}
     */
    export function paramsBits(params: any): number;
    /**
     * Get params scalar size in bits.
     * @param {Buffer} params
     * @returns {Number}
     */
    export function paramsScalarBits(params: any): number;
    /**
     * Verify params.
     * @param {Buffer} params
     * @returns {Boolean}
     */
    export function paramsVerify(params: any): boolean;
    /**
     * Import params from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function paramsImport(json: any): any;
    /**
     * Export params to an object.
     * @param {Buffer} params
     * @returns {Object}
     */
    export function paramsExport(params: any): any;
    /**
     * Generate private key from params.
     * @param {Buffer} params
     * @returns {Buffer}
     */
    export function privateKeyCreate(params: any): any;
    /**
     * Generate private key.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function privateKeyGenerate(bits?: number): any;
    /**
     * Generate private key.
     * @param {Number} [bits=2048]
     * @returns {Buffer}
     */
    export function privateKeyGenerateAsync(bits?: number): any;
    /**
     * Get private key prime size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function privateKeyBits(key: any): number;
    /**
     * Get private key scalar size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function privateKeyScalarBits(key: any): number;
    /**
     * Verify a private key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function privateKeyVerify(key: any): boolean;
    /**
     * Import a private key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function privateKeyImport(json: any): any;
    /**
     * Export a private key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function privateKeyExport(key: any): any;
    /**
     * Create a public key from a private key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyCreate(key: any): any;
    /**
     * Get public key prime size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function publicKeyBits(key: any): number;
    /**
     * Get public key scalar size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function publicKeyScalarBits(key: any): number;
    /**
     * Verify a public key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function publicKeyVerify(key: any): boolean;
    /**
     * Import a public key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function publicKeyImport(json: any): any;
    /**
     * Export a public key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function publicKeyExport(key: any): any;
    /**
     * Convert DER signature to R/S.
     * @param {Buffer} sig
     * @param {Number} size
     * @returns {Buffer} R/S-formatted signature.
     */
    export function signatureImport(sig: any, size: number): any;
    /**
     * Convert R/S signature to DER.
     * @param {Buffer} sig
     * @param {Number} size
     * @returns {Buffer} DER-formatted signature.
     */
    export function signatureExport(sig: any, size: number): any;
    /**
     * Sign a message (R/S).
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @returns {Buffer} R/S-formatted signature.
     */
    export function sign(msg: any, key: any): any;
    /**
     * Sign a message (DER).
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @returns {Buffer} DER-formatted signature.
     */
    export function signDER(msg: any, key: any): any;
    /**
     * Verify a signature (R/S).
     * @param {Buffer} msg
     * @param {Buffer} sig - R/S-formatted.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verify(msg: any, sig: any, key: any): boolean;
    /**
     * Verify a signature (DER).
     * @param {Buffer} msg
     * @param {Buffer} sig - DER-formatted.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verifyDER(msg: any, sig: any, key: any): boolean;
    /**
     * Perform a diffie-hellman.
     * @param {Buffer} pub
     * @param {Buffer} priv
     * @returns {Buffer}
     */
    export function derive(pub: any, priv: any): any;
}
declare module "bcrypto/lib/dsa" {
    const _exports: typeof import("bcrypto/lib/js/dsa");
    export = _exports;
}
declare module "bcrypto/lib/encoding/util" {
    export function countLeft(data: any): number;
    export function countRight(data: any): number;
    export function compareLeft(x: any, y: any): 1 | 0 | -1;
    export function compareRight(x: any, y: any): 1 | 0 | -1;
    export function trimLeft(data: any): any;
    export function trimRight(data: any): any;
    export function padLeft(data: any, size: any): any;
    export function padRight(data: any, size: any): any;
}
declare module "bcrypto/lib/dsaies" {
    export function encrypt(kdf: any, msg: any, pub: any, priv?: any): any;
    export function decrypt(kdf: any, msg: any, priv: any): any;
}
declare module "bcrypto/lib/js/eb2k" {
    export var native: number;
    export function derive(hash: any, pass: any, salt: any, keyLen: any, ivLen: any): any[];
}
declare module "bcrypto/lib/native/eb2k" {
    export var native: number;
    export function derive(hash: any, pass: any, salt: any, keyLen: any, ivLen: any): any;
}
declare module "bcrypto/lib/eb2k" {
    const _exports: typeof import("bcrypto/lib/native/eb2k");
    export = _exports;
}
declare module "bcrypto/lib/ecies" {
    export function encrypt(curve: any, kdf: any, msg: any, pub: any, priv?: any): any;
    export function decrypt(curve: any, kdf: any, msg: any, priv: any): any;
}
declare module "bcrypto/lib/js/batch-rng" {
    export = BatchRNG;
    /**
     * BatchRNG
     */
    class BatchRNG {
        constructor(curve: any, encode?: (key: any) => any);
        curve: any;
        encode: (key: any) => any;
        hash: import("bcrypto/lib/js/sha256") | import("bcrypto/lib/native/sha256");
        chacha: import("bcrypto/lib/js/chacha20") | import("bcrypto/lib/native/chacha20");
        key: any;
        iv: any;
        cache: (import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn"))[];
        init(batch: any): BatchRNG;
        encrypt(counter: any): any[];
        refresh(counter: any): void;
        generate(index: any): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
    }
}
declare module "bcrypto/lib/js/eddsa" {
    export = EDDSA;
    class EDDSA {
        constructor(id: any, mid: any, eid: any, hash: any, pre: any);
        id: any;
        type: string;
        mid: any;
        eid: any;
        hash: any;
        native: number;
        _pre: any;
        _curve: any;
        _mont: any;
        _iso: any;
        _rng: BatchRNG;
        get curve(): any;
        get mont(): any;
        get iso(): any;
        get rng(): BatchRNG;
        get size(): any;
        get bits(): any;
        hashNonce(prefix: any, msg: any, ph: any, ctx: any): any;
        hashChallenge(R: any, A: any, m: any, ph: any, ctx: any): any;
        privateKeyGenerate(): any;
        scalarGenerate(): any;
        privateKeyExpand(secret: any): any;
        privateKeyConvert(secret: any): any;
        privateKeyVerify(secret: any): boolean;
        scalarVerify(scalar: any): boolean;
        scalarIsZero(scalar: any): any;
        scalarClamp(scalar: any): any;
        privateKeyExport(secret: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        scalarTweakAdd(scalar: any, tweak: any): any;
        scalarTweakMul(scalar: any, tweak: any): any;
        scalarReduce(scalar: any): any;
        scalarNegate(scalar: any): any;
        scalarInvert(scalar: any): any;
        publicKeyCreate(secret: any): any;
        publicKeyFromScalar(scalar: any): any;
        publicKeyConvert(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any, pake?: boolean): any;
        publicKeyToHash(key: any, subgroup?: number): any;
        publicKeyVerify(key: any): boolean;
        publicKeyIsInfinity(key: any): any;
        publicKeyIsSmall(key: any): any;
        publicKeyHasTorsion(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyCombine(keys: any): any;
        publicKeyNegate(key: any): any;
        sign(msg: any, secret: any, ph: any, ctx: any): any;
        signWithScalar(msg: any, scalar: any, prefix: any, ph: any, ctx: any): any;
        signTweakAdd(msg: any, secret: any, tweak: any, ph: any, ctx: any): any;
        signTweakMul(msg: any, secret: any, tweak: any, ph: any, ctx: any): any;
        verify(msg: any, sig: any, key: any, ph: any, ctx: any): any;
        _verify(msg: any, sig: any, key: any, ph: any, ctx: any): any;
        verifySingle(msg: any, sig: any, key: any, ph: any, ctx: any): any;
        _verifySingle(msg: any, sig: any, key: any, ph: any, ctx: any): any;
        verifyBatch(batch: any, ph: any, ctx: any): any;
        _verifyBatch(batch: any, ph: any, ctx: any): any;
        derive(pub: any, secret: any): any;
        deriveWithScalar(pub: any, scalar: any): any;
    }
    import BatchRNG = require("bcrypto/lib/js/batch-rng");
}
declare module "bcrypto/lib/js/ed25519" {
    const _exports: EDDSA;
    export = _exports;
    import EDDSA = require("bcrypto/lib/js/eddsa");
}
declare module "bcrypto/lib/native/eddsa" {
    export = EDDSA;
    class EDDSA {
        constructor(name: any);
        id: any;
        type: string;
        native: number;
        _ctx: any;
        get _handle(): any;
        get size(): any;
        get bits(): any;
        privateKeyGenerate(): any;
        scalarGenerate(): any;
        privateKeyExpand(secret: any): any;
        privateKeyConvert(secret: any): any;
        privateKeyVerify(secret: any): any;
        scalarVerify(scalar: any): any;
        scalarIsZero(scalar: any): any;
        scalarClamp(scalar: any): any;
        privateKeyExport(secret: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        scalarTweakAdd(scalar: any, tweak: any): any;
        scalarTweakMul(scalar: any, tweak: any): any;
        scalarReduce(scalar: any): any;
        scalarNegate(scalar: any): any;
        scalarInvert(scalar: any): any;
        publicKeyCreate(secret: any): any;
        publicKeyFromScalar(scalar: any): any;
        publicKeyConvert(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any, pake?: boolean): any;
        publicKeyToHash(key: any, subgroup?: any): any;
        publicKeyVerify(key: any): any;
        publicKeyIsInfinity(key: any): any;
        publicKeyIsSmall(key: any): any;
        publicKeyHasTorsion(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyCombine(keys: any): any;
        publicKeyNegate(key: any): any;
        sign(msg: any, secret: any, ph: any, ctx: any): any;
        signWithScalar(msg: any, scalar: any, prefix: any, ph: any, ctx: any): any;
        signTweakAdd(msg: any, secret: any, tweak: any, ph: any, ctx: any): any;
        signTweakMul(msg: any, secret: any, tweak: any, ph: any, ctx: any): any;
        verify(msg: any, sig: any, key: any, ph: any, ctx: any): any;
        verifySingle(msg: any, sig: any, key: any, ph: any, ctx: any): any;
        verifyBatch(batch: any, ph: any, ctx: any): any;
        derive(pub: any, secret: any): any;
        deriveWithScalar(pub: any, scalar: any): any;
    }
}
declare module "bcrypto/lib/native/ed25519" {
    const _exports: EDDSA;
    export = _exports;
    import EDDSA = require("bcrypto/lib/native/eddsa");
}
declare module "bcrypto/lib/ed25519" {
    const _exports: typeof import("bcrypto/lib/js/eddsa") | typeof import("bcrypto/lib/native/eddsa");
    export = _exports;
}
declare module "bcrypto/lib/shake" {
    export = SHAKE;
    /**
     * SHAKE
     */
    class SHAKE {
        static hash(): SHAKE;
        static hmac(bits: any, len: any): any;
        static digest(data: any, bits: any, len: any): any;
        static root(left: any, right: any, bits: any, len: any): any;
        static multi(x: any, y: any, z: any, bits: any, len: any): any;
        static mac(data: any, key: any, bits: any, len: any): any;
        final(len: any): any;
    }
    namespace SHAKE {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHAKE;
    }
}
declare module "bcrypto/lib/shake256" {
    export = SHAKE256;
    /**
     * SHAKE256
     */
    class SHAKE256 extends SHAKE {
        static hash(): SHAKE256;
        static hmac(len: any): any;
        static digest(data: any, len: any): any;
        static root(left: any, right: any, len: any): any;
        static multi(x: any, y: any, z: any, len: any): any;
        static mac(data: any, key: any, len: any): any;
        init(): any;
    }
    namespace SHAKE256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHAKE256;
    }
    import SHAKE = require("bcrypto/lib/shake");
}
declare module "bcrypto/lib/js/ed448" {
    const _exports: EDDSA;
    export = _exports;
    import EDDSA = require("bcrypto/lib/js/eddsa");
}
declare module "bcrypto/lib/native/ed448" {
    const _exports: EDDSA;
    export = _exports;
    import EDDSA = require("bcrypto/lib/native/eddsa");
}
declare module "bcrypto/lib/ed448" {
    const _exports: typeof import("bcrypto/lib/js/eddsa") | typeof import("bcrypto/lib/native/eddsa");
    export = _exports;
}
declare module "bcrypto/lib/js/gost94" {
    export = GOST94;
    /**
     * GOST94
     */
    class GOST94 {
        static hash(): GOST94;
        static hmac(box: any): HMAC;
        static digest(data: any, box: any): any;
        static root(left: any, right: any, box: any): any;
        static multi(x: any, y: any, z: any, box: any): any;
        static mac(data: any, key: any, box: any): any;
        S: any[];
        state: any;
        sigma: any;
        block: any;
        size: number;
        init(box: any): GOST94;
        update(data: any): GOST94;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
        _shuffle(m: any, s: any): void;
        _f(m: any): void;
        _sum(m: any): void;
    }
    namespace GOST94 {
        export const native: number;
        export const id: string;
        export const size: number;
        export const bits: number;
        export const blockSize: number;
        export const zero: any;
        export const ctx: GOST94;
        export { S_CRYPTOPRO as CRYPTOPRO };
        export { S_TEST as TEST };
        export { S_S2015 as S2015 };
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
    const S_CRYPTOPRO: any[];
    const S_TEST: any[];
    const S_S2015: any[];
}
declare module "bcrypto/lib/native/gost94" {
    export = GOST94;
    class GOST94 extends Hash {
        static hash(): GOST94;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace GOST94 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: GOST94;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/gost94" {
    const _exports: typeof import("bcrypto/lib/js/gost94") | typeof import("bcrypto/lib/native/gost94");
    export = _exports;
}
declare module "bcrypto/lib/js/ripemd160" {
    export = RIPEMD160;
    /**
     * RIPEMD160
     */
    class RIPEMD160 {
        static hash(): RIPEMD160;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): RIPEMD160;
        update(data: any): RIPEMD160;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
    }
    namespace RIPEMD160 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: RIPEMD160;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/js/hash160" {
    export = Hash160;
    /**
     * Hash160
     */
    class Hash160 {
        static hash(): Hash160;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        ctx: SHA256;
        init(): Hash160;
        update(data: any): Hash160;
        final(): any;
    }
    namespace Hash160 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Hash160;
    }
    import SHA256 = require("bcrypto/lib/js/sha256");
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/hash160" {
    export = Hash160;
    class Hash160 extends Hash {
        static hash(): Hash160;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace Hash160 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Hash160;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/hash160" {
    const _exports: typeof import("bcrypto/lib/js/hash160") | typeof import("bcrypto/lib/native/hash160");
    export = _exports;
}
declare module "bcrypto/lib/js/hash256" {
    export = Hash256;
    /**
     * Hash256
     */
    class Hash256 {
        static hash(): Hash256;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        ctx: SHA256;
        init(): Hash256;
        update(data: any): Hash256;
        final(): any;
    }
    namespace Hash256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Hash256;
    }
    import SHA256 = require("bcrypto/lib/js/sha256");
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/hash256" {
    export = Hash256;
    class Hash256 extends Hash {
        static hash(): Hash256;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace Hash256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Hash256;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/hash256" {
    const _exports: typeof import("bcrypto/lib/js/hash256") | typeof import("bcrypto/lib/native/hash256");
    export = _exports;
}
declare module "bcrypto/lib/js/hash-drbg" {
    export = HashDRBG;
    /**
     * HashDRBG
     */
    class HashDRBG {
        constructor(hash: any, entropy: any, nonce: any, pers: any);
        hash: any;
        minEntropy: number;
        seedLen: number;
        V: any;
        C: any;
        len: any;
        rounds: number;
        init(entropy: any, nonce: any, pers: any): HashDRBG;
        reseed(entropy: any, add: any): HashDRBG;
        generate(len: any, add: any): any;
        randomBytes(size: any): any;
        update(): HashDRBG;
        derive(input: any, len: any, prepend: any): any;
        sum(dst: any, ...args: any[]): any;
    }
    namespace HashDRBG {
        const native: number;
    }
}
declare module "bcrypto/lib/native/hash-drbg" {
    export = HashDRBG;
    /**
     * HashDRBG
     */
    class HashDRBG {
        constructor(hash: any, entropy: any, nonce: any, pers: any);
        _handle: any;
        init(entropy: any, nonce: any, pers: any): HashDRBG;
        reseed(entropy: any, add: any): HashDRBG;
        generate(len: any, add: any): any;
        randomBytes(size: any): any;
    }
    namespace HashDRBG {
        const native: number;
    }
}
declare module "bcrypto/lib/hash-drbg" {
    const _exports: typeof import("bcrypto/lib/js/hash-drbg") | typeof import("bcrypto/lib/native/hash-drbg");
    export = _exports;
}
declare module "bcrypto/lib/js/hkdf" {
    export var native: number;
    /**
     * HKDF
     */
    export function extract(hash: any, ikm: any, salt: any): any;
    export function expand(hash: any, prk: any, info: any, len: any): any;
    export function derive(hash: any, ikm: any, salt: any, info: any, len: any): any;
}
declare module "bcrypto/lib/native/hkdf" {
    export var native: number;
    /**
     * HKDF
     */
    export function extract(hash: any, ikm: any, salt: any): any;
    export function expand(hash: any, prk: any, info: any, len: any): any;
    export function derive(hash: any, ikm: any, salt: any, info: any, len: any): any;
}
declare module "bcrypto/lib/hkdf" {
    const _exports: typeof import("bcrypto/lib/js/hkdf");
    export = _exports;
}
declare module "bcrypto/lib/keccak224" {
    export = Keccak224;
    /**
     * Keccak224
     */
    class Keccak224 {
        static hash(): Keccak224;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
        final(): any;
    }
    namespace Keccak224 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Keccak224;
    }
}
declare module "bcrypto/lib/keccak256" {
    export = Keccak256;
    /**
     * Keccak256
     */
    class Keccak256 {
        static hash(): Keccak256;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
        final(): any;
    }
    namespace Keccak256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Keccak256;
    }
}
declare module "bcrypto/lib/keccak384" {
    export = Keccak384;
    /**
     * Keccak384
     */
    class Keccak384 {
        static hash(): Keccak384;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
        final(): any;
    }
    namespace Keccak384 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Keccak384;
    }
}
declare module "bcrypto/lib/keccak512" {
    export = Keccak512;
    /**
     * Keccak512
     */
    class Keccak512 {
        static hash(): Keccak512;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
        final(): any;
    }
    namespace Keccak512 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Keccak512;
    }
}
declare module "bcrypto/lib/kmac" {
    export = KMAC;
    class KMAC extends CSHAKE {
    }
    namespace KMAC {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: KMAC;
    }
    import CSHAKE = require("bcrypto/lib/cshake");
}
declare module "bcrypto/lib/kmac128" {
    export = KMAC128;
    /**
     * KMAC128
     */
    class KMAC128 extends KMAC {
        static hash(): KMAC128;
        static hmac(key: any, pers: any, len: any): import("bcrypto/lib/internal/hmac");
        static digest(data: any, key: any, pers: any, len: any): any;
        static root(left: any, right: any, key: any, pers: any, len: any): any;
        static multi(x: any, y: any, z: any, key: any, pers: any, len: any): any;
        static mac(data: any, salt: any, key: any, pers: any, len: any): any;
    }
    namespace KMAC128 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: KMAC128;
    }
    import KMAC = require("bcrypto/lib/kmac");
}
declare module "bcrypto/lib/kmac256" {
    export = KMAC256;
    /**
     * KMAC256
     */
    class KMAC256 extends KMAC {
        static hash(): KMAC256;
        static hmac(key: any, pers: any, len: any): import("bcrypto/lib/internal/hmac");
        static digest(data: any, key: any, pers: any, len: any): any;
        static root(left: any, right: any, key: any, pers: any, len: any): any;
        static multi(x: any, y: any, z: any, key: any, pers: any, len: any): any;
        static mac(data: any, salt: any, key: any, pers: any, len: any): any;
    }
    namespace KMAC256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: KMAC256;
    }
    import KMAC = require("bcrypto/lib/kmac");
}
declare module "bcrypto/lib/js/md2" {
    export = MD2;
    /**
     * MD2
     */
    class MD2 {
        static hash(): MD2;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: any;
        checksum: any;
        block: any;
        size: number;
        init(): MD2;
        update(data: any): MD2;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
    }
    namespace MD2 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD2;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/md2" {
    export = MD2;
    class MD2 extends Hash {
        static hash(): MD2;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace MD2 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD2;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/md2" {
    const _exports: typeof import("bcrypto/lib/js/md2") | typeof import("bcrypto/lib/native/md2");
    export = _exports;
}
declare module "bcrypto/lib/js/md4" {
    export = MD4;
    /**
     * MD4
     */
    class MD4 {
        static hash(): MD4;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): MD4;
        update(data: any): MD4;
        final(): any;
        _update(data: any, len: any): void;
        /**
         * Finalize MD4 context.
         * @private
         * @param {Buffer} out
         * @returns {Buffer}
         */
        private _final;
        _transform(chunk: any, pos: any): void;
    }
    namespace MD4 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD4;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/md4" {
    export = MD4;
    class MD4 extends Hash {
        static hash(): MD4;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace MD4 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD4;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/md4" {
    const _exports: typeof import("bcrypto/lib/js/md4") | typeof import("bcrypto/lib/native/md4");
    export = _exports;
}
declare module "bcrypto/lib/js/md5" {
    export = MD5;
    /**
     * MD5
     */
    class MD5 {
        static hash(): MD5;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): MD5;
        update(data: any): MD5;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
    }
    namespace MD5 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD5;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/md5" {
    export = MD5;
    class MD5 extends Hash {
        static hash(): MD5;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace MD5 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD5;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/md5" {
    const _exports: typeof import("bcrypto/lib/js/md5") | typeof import("bcrypto/lib/native/md5");
    export = _exports;
}
declare module "bcrypto/lib/js/sha1" {
    export = SHA1;
    /**
     * SHA1
     */
    class SHA1 {
        static hash(): SHA1;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): SHA1;
        update(data: any): SHA1;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
    }
    namespace SHA1 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA1;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/js/md5sha1" {
    export = MD5SHA1;
    /**
     * MD5SHA1
     */
    class MD5SHA1 {
        static hash(): MD5SHA1;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        md5: MD5;
        sha1: SHA1;
        init(): MD5SHA1;
        update(data: any): MD5SHA1;
        final(): any;
    }
    namespace MD5SHA1 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD5SHA1;
    }
    import MD5 = require("bcrypto/lib/js/md5");
    import SHA1 = require("bcrypto/lib/js/sha1");
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/md5sha1" {
    export = MD5SHA1;
    class MD5SHA1 extends Hash {
        static hash(): MD5SHA1;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace MD5SHA1 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: MD5SHA1;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/md5sha1" {
    const _exports: typeof import("bcrypto/lib/js/md5sha1") | typeof import("bcrypto/lib/native/md5sha1");
    export = _exports;
}
declare module "bcrypto/lib/merkle" {
    /**
     * Build a merkle tree from leaves.
     * @param {Object} alg
     * @param {Buffer[]} leaves
     * @returns {Array} [nodes, malleated]
     */
    export function createTree(alg: any, leaves: any[]): any[];
    /**
     * Calculate merkle root from leaves.
     * @param {Object} alg
     * @param {Buffer[]} leaves
     * @returns {Array} [root, malleated]
     */
    export function createRoot(alg: any, leaves: any[]): any[];
    /**
     * Collect a merkle branch from vector index.
     * @param {Object} alg
     * @param {Number} index
     * @param {Buffer[]} leaves
     * @returns {Buffer[]} branch
     */
    export function createBranch(alg: any, index: number, leaves: any[]): any[];
    /**
     * Derive merkle root from branch.
     * @param {Object} alg
     * @param {Buffer} hash
     * @param {Buffer[]} branch
     * @param {Number} index
     * @returns {Buffer} root
     */
    export function deriveRoot(alg: any, hash: any, branch: any[], index: number): any;
}
declare module "bcrypto/lib/mrkl" {
    /**
     * Build a merkle tree from leaves.
     * @param {Object} alg
     * @param {Buffer[]} leaves
     * @returns {Buffer[]} nodes
     */
    export function createTree(alg: any, leaves: any[]): any[];
    /**
     * Calculate merkle root from leaves.
     * @param {Object} alg
     * @param {Buffer[]} leaves
     * @returns {Buffer} root
     */
    export function createRoot(alg: any, leaves: any[]): any;
    /**
     * Collect a merkle branch from vector index.
     * @param {Object} alg
     * @param {Number} index
     * @param {Buffer[]} leaves
     * @returns {Buffer[]} branch
     */
    export function createBranch(alg: any, index: number, leaves: any[]): any[];
    /**
     * Derive merkle root from branch.
     * @param {Object} alg
     * @param {Buffer} leaf
     * @param {Buffer[]} branch
     * @param {Number} index
     * @returns {Buffer} root
     */
    export function deriveRoot(alg: any, leaf: any, branch: any[], index: number): any;
    /**
     * Get sentinel hash.
     * @param {Object} alg
     * @returns {Buffer}
     */
    export function hashEmpty(alg: any): any;
    /**
     * Hash a leaf node.
     * @param {Object} alg
     * @param {Buffer} data
     * @returns {Buffer}
     */
    export function hashLeaf(alg: any, data: any): any;
    /**
     * Hash an internal node.
     * @param {Object} alg
     * @param {Buffer} left
     * @param {Buffer} right
     * @returns {Buffer}
     */
    export function hashInternal(alg: any, left: any, right: any): any;
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
declare module "bcrypto/lib/native/murmur3" {
    export var native: number;
    export function sum(data: any, seed: any): any;
    export function tweak(data: any, n: any, tweak: any): any;
}
declare module "bcrypto/lib/murmur3" {
    const _exports: typeof import("bcrypto/lib/native/murmur3");
    export = _exports;
}
declare module "bcrypto/lib/js/schnorr-legacy" {
    export = Schnorr;
    /**
     * Schnorr
     */
    class Schnorr {
        constructor(curve: any, hash: any);
        curve: any;
        hash: any;
        rng: BatchRNG;
        check(): void;
        encode(key: any): any;
        hashInt(...items: any[]): any;
        hashNonce(a: any, m: any): any;
        hashChallenge(R: any, A: any, m: any): any;
        sign(msg: any, key: any): any;
        _sign(msg: any, key: any): any;
        verify(msg: any, sig: any, key: any): boolean;
        _verify(msg: any, sig: any, key: any): boolean;
        verifyBatch(batch: any): any;
        _verifyBatch(batch: any): any;
    }
    import BatchRNG = require("bcrypto/lib/js/batch-rng");
}
declare module "bcrypto/lib/js/ecdsa" {
    export = ECDSA;
    /**
     * ECDSA
     */
    class ECDSA {
        constructor(name: any, hash: any, xof: any, pre: any);
        id: any;
        type: string;
        hash: any;
        xof: any;
        native: number;
        _pre: any;
        _curve: any;
        _schnorr: Schnorr;
        get curve(): any;
        get schnorr(): Schnorr;
        get size(): any;
        get bits(): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): boolean;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyNegate(key: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any, compress: any): any;
        publicKeyConvert(key: any, compress: any): any;
        publicKeyFromUniform(bytes: any, compress: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any, compress: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): boolean;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any, compress: any): any;
        publicKeyTweakAdd(key: any, tweak: any, compress: any): any;
        publicKeyTweakMul(key: any, tweak: any, compress: any): any;
        publicKeyCombine(keys: any, compress: any): any;
        publicKeyNegate(key: any, compress: any): any;
        signatureNormalize(sig: any): any;
        signatureNormalizeDER(sig: any): any;
        signatureExport(sig: any): any;
        signatureImport(sig: any): any;
        isLowS(sig: any): boolean;
        static isLowDER(sig: any): boolean;
        sign(msg: any, key: any): any;
        signRecoverable(msg: any, key: any): any[];
        static signDER(msg: any, key: any): any;
        signRecoverableDER(msg: any, key: any): any[];
        _sign(msg: any, key: any): any[];
        verify(msg: any, sig: any, key: any): any;
        static verifyDER(msg: any, sig: any, key: any): any;
        _verify(msg: any, r: any, s: any, key: any): any;
        recover(msg: any, sig: any, param: any, compress: any): any;
        recoverDER(msg: any, sig: any, param: any, compress: any): any;
        _recover(msg: any, r: any, s: any, param: any): any;
        derive(pub: any, priv: any, compress: any): any;
        schnorrSign(msg: any, key: any): any;
        schnorrVerify(msg: any, sig: any, key: any): boolean;
        schnorrVerifyBatch(batch: any): any;
        _encodeCompact(r: any, s: any): any;
        _decodeCompact(sig: any): any[];
        _encodeDER(r: any, s: any): any;
        _decodeDER(sig: any, strict: any): any[];
        _truncate(msg: any): import("bcrypto/lib/native/bn") | import("bcrypto/lib/js/bn");
        _reduce(msg: any): any;
    }
    import Schnorr = require("bcrypto/lib/js/schnorr-legacy");
}
declare module "bcrypto/lib/js/p192" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/js/ecdsa");
}
declare module "bcrypto/lib/native/ecdsa" {
    export = ECDSA;
    /**
     * ECDSA
     */
    class ECDSA {
        constructor(name: any);
        id: any;
        type: string;
        native: number;
        _ctx: any;
        get _handle(): any;
        get size(): any;
        get bits(): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): any;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyNegate(key: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any, compress?: boolean): any;
        publicKeyConvert(key: any, compress?: boolean): any;
        publicKeyFromUniform(bytes: any, compress?: boolean): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any, compress?: boolean): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any, compress?: boolean): any;
        publicKeyTweakAdd(key: any, tweak: any, compress?: boolean): any;
        publicKeyTweakMul(key: any, tweak: any, compress?: boolean): any;
        publicKeyCombine(keys: any, compress?: boolean): any;
        publicKeyNegate(key: any, compress?: boolean): any;
        signatureNormalize(sig: any): any;
        signatureNormalizeDER(sig: any): any;
        signatureExport(sig: any): any;
        signatureImport(sig: any): any;
        isLowS(sig: any): any;
        static isLowDER(sig: any): any;
        sign(msg: any, key: any): any;
        signRecoverable(msg: any, key: any): any;
        static signDER(msg: any, key: any): any;
        
        signRecoverableDER(msg: any, key: any): any;
        verify(msg: any, sig: any, key: any): any;
        static verifyDER(msg: any, sig: any, key: any): any;
        recover(msg: any, sig: any, param: any, compress?: boolean): any;
        recoverDER(msg: any, sig: any, param: any, compress?: boolean): any;
        derive(pub: any, priv: any, compress?: boolean): any;
        schnorrSign(msg: any, key: any): any;
        schnorrVerify(msg: any, sig: any, key: any): any;
        schnorrVerifyBatch(batch: any): any;
    }
}
declare module "bcrypto/lib/native/p192" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/native/ecdsa");
}
declare module "bcrypto/lib/p192" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/js/p224" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/js/ecdsa");
}
declare module "bcrypto/lib/native/p224" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/native/ecdsa");
}
declare module "bcrypto/lib/p224" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/js/p256" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/js/ecdsa");
}
declare module "bcrypto/lib/native/p256" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/native/ecdsa");
}
declare module "bcrypto/lib/p256" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/js/sha384" {
    export = SHA384;
    /**
     * SHA384
     */
    class SHA384 extends SHA512 {
    }
    namespace SHA384 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA384;
    }
    import SHA512 = require("bcrypto/lib/js/sha512");
}
declare module "bcrypto/lib/native/sha384" {
    export = SHA384;
    class SHA384 extends Hash {
        static hash(): SHA384;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace SHA384 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA384;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/sha384" {
    const _exports: typeof import("bcrypto/lib/js/sha384") | typeof import("bcrypto/lib/native/sha384");
    export = _exports;
}
declare module "bcrypto/lib/js/p384" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/js/ecdsa");
}
declare module "bcrypto/lib/native/p384" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/native/ecdsa");
}
declare module "bcrypto/lib/p384" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/js/p521" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/js/ecdsa");
}
declare module "bcrypto/lib/native/p521" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/native/ecdsa");
}
declare module "bcrypto/lib/p521" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/js/pbkdf2" {
    export var native: number;
    /**
     * Perform key derivation using PBKDF2.
     * @param {Function} hash
     * @param {Buffer} pass
     * @param {Buffer} salt
     * @param {Number} iter
     * @param {Number} len
     * @returns {Buffer}
     */
    export function derive(hash: Function, pass: any, salt: any, iter: number, len: number): any;
    /**
     * Execute pbkdf2 asynchronously.
     * @param {Function} hash
     * @param {Buffer} pass
     * @param {Buffer} salt
     * @param {Number} iter
     * @param {Number} len
     * @returns {Promise}
     */
    export function deriveAsync(hash: Function, pass: any, salt: any, iter: number, len: number): Promise<any>;
}
declare module "bcrypto/lib/native/pbkdf2" {
    export var native: number;
    /**
     * Perform key derivation using PBKDF2.
     * @param {Function} hash
     * @param {Buffer} pass
     * @param {Buffer} salt
     * @param {Number} iter
     * @param {Number} len
     * @returns {Buffer}
     */
    export function derive(hash: Function, pass: any, salt: any, iter: number, len: number): any;
    /**
     * Execute pbkdf2 asynchronously.
     * @param {Function} hash
     * @param {Buffer} pass
     * @param {Buffer} salt
     * @param {Number} iter
     * @param {Number} len
     * @returns {Promise}
     */
    export function deriveAsync(hash: Function, pass: any, salt: any, iter: number, len: number): Promise<any>;
}
declare module "bcrypto/lib/pbkdf2" {
    const _exports: typeof import("bcrypto/lib/js/pbkdf2");
    export = _exports;
}
declare module "bcrypto/lib/js/base64" {
    export var native: number;
    export function encode(data: any): string;
    export function decode(str: any): any;
    export function test(str: any): boolean;
    export function encodeURL(data: any): string;
    export function decodeURL(str: any): any;
    export function testURL(str: any): boolean;
}
declare module "bcrypto/lib/native/base64" {
    export var native: number;
    export function encode(data: any): any;
    export function decode(str: any): any;
    export function test(str: any): any;
    export function encodeURL(data: any): any;
    export function decodeURL(str: any): any;
    export function testURL(str: any): any;
}
declare module "bcrypto/lib/encoding/base64" {
    const _exports: typeof import("bcrypto/lib/native/base64");
    export = _exports;
}
declare module "bcrypto/lib/encoding/lines" {
    export = lines;
    function lines(str: any): {};
}
declare module "bcrypto/lib/encoding/pem" {
    /**
     * PEMBlock
     */
    export class PEMBlock {
        static fromString(str: any, armor: any): PEMBlock;
        constructor(type: any, data: any);
        type: any;
        headers: any;
        data: any;
        toString(armor: any): string;
        fromString(str: any, armor: any): PEMBlock;
        getProcType(): ProcType;
        setProcType(version: any, state: any): PEMBlock;
        unsetProcType(): PEMBlock;
        getDEKInfo(): DEKInfo;
        setDEKInfo(name: any, iv: any): PEMBlock;
        unsetDEKInfo(): PEMBlock;
        isEncrypted(): boolean;
    }
    /**
     * ProcType
     */
    export class ProcType {
        static fromString(str: any): ProcType;
        constructor(version: any, state: any);
        version: any;
        state: any;
        toString(): string;
        fromString(str: any): ProcType;
    }
    /**
     * DEKInfo
     */
    export class DEKInfo {
        static fromString(str: any): DEKInfo;
        constructor(name: any, iv: any);
        name: any;
        iv: any;
        toString(): any;
        fromString(str: any): DEKInfo;
    }
    export function encode(type: any, headers: any, data: any, armor?: boolean): string;
    export function decode(str: any, armor?: boolean): {};
    export function toPEM(data: any, type: any, armor: any): string;
    export function fromPEM(str: any, type: any, armor: any): any;
}
declare module "bcrypto/lib/native/sha1" {
    export = SHA1;
    class SHA1 extends Hash {
        static hash(): SHA1;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace SHA1 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA1;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/sha1" {
    const _exports: typeof import("bcrypto/lib/js/sha1") | typeof import("bcrypto/lib/native/sha1");
    export = _exports;
}
declare module "bcrypto/lib/native/ripemd160" {
    export = RIPEMD160;
    class RIPEMD160 extends Hash {
        static hash(): RIPEMD160;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace RIPEMD160 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: RIPEMD160;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/ripemd160" {
    const _exports: typeof import("bcrypto/lib/js/ripemd160") | typeof import("bcrypto/lib/native/ripemd160");
    export = _exports;
}
declare module "bcrypto/lib/js/sha224" {
    export = SHA224;
    /**
     * SHA224
     */
    class SHA224 extends SHA256 {
    }
    namespace SHA224 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA224;
    }
    import SHA256 = require("bcrypto/lib/js/sha256");
}
declare module "bcrypto/lib/native/sha224" {
    export = SHA224;
    class SHA224 extends Hash {
        static hash(): SHA224;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace SHA224 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA224;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/sha224" {
    const _exports: typeof import("bcrypto/lib/js/sha224") | typeof import("bcrypto/lib/native/sha224");
    export = _exports;
}
declare module "bcrypto/lib/js/pgpdf" {
    export var native: number;
    export function deriveSimple(hash: any, input: any, size: any): any;
    export function deriveSalted(hash: any, input: any, salt: any, size: any): any;
    export function deriveIterated(hash: any, input: any, salt: any, count: any, size: any): any;
}
declare module "bcrypto/lib/native/pgpdf" {
    export var native: number;
    export function deriveSimple(hash: any, input: any, size: any): any;
    export function deriveSalted(hash: any, input: any, salt: any, size: any): any;
    export function deriveIterated(hash: any, input: any, salt: any, count: any, size: any): any;
}
declare module "bcrypto/lib/internal/pgpdf" {
    const _exports: typeof import("bcrypto/lib/js/pgpdf");
    export = _exports;
}
declare module "bcrypto/lib/pgp" {
    export namespace packetTypes {
        const NONE: number;
        const PUBKEY_ENC: number;
        const SIGNATURE: number;
        const SYMKEY_ENC: number;
        const ONEPASS_SIG: number;
        const PRIVATE_KEY: number;
        const PUBLIC_KEY: number;
        const PRIVATE_SUBKEY: number;
        const COMPRESSED: number;
        const ENCRYPTED: number;
        const MARKER: number;
        const PLAINTEXT: number;
        const RING_TRUST: number;
        const USER_ID: number;
        const PUBLIC_SUBKEY: number;
        const OLD_COMMENT: number;
        const ATTRIBUTE: number;
        const ENCRYPTED_MDC: number;
        const MDC: number;
        const ENCRYPTED_AEAD: number;
    }
    export const packetTypesByVal: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
        14: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
    };
    export namespace sigTypes {
        const BINARY: number;
        const TEXT: number;
        const GENERIC_CERT: number;
        const PERSONA_CERT: number;
        const CASUAL_CERT: number;
        const POSITIVE_CERT: number;
        const SUBKEY_BINDING: number;
        const PRIMARY_KEY_BINDING: number;
        const DIRECT_SIGNATURE: number;
        const KEY_REVOCATION: number;
        const SUBKEY_REVOCATION: number;
    }
    export const sigTypesByVal: {
        0: string;
        1: string;
        16: string;
        17: string;
        18: string;
        19: string;
        24: string;
        25: string;
        31: string;
        32: string;
        40: string;
    };
    export namespace keyTypes {
        const RSA: number;
        const RSA_ENCRYPT_ONLY: number;
        const RSA_SIGN_ONLY: number;
        const ELGAMAL: number;
        const DSA: number;
        const ECDH: number;
        const ECDSA: number;
        const ELGAMAL_LEGACY: number;
        const EDDSA: number;
    }
    export const keyTypesByVal: {
        1: string;
        2: string;
        3: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
        22: string;
    };
    export namespace cipherTypes {
        const NONE_1: number;
        export { NONE_1 as NONE };
        export const IDEA: number;
        export const DES3: number;
        export const CAST5: number;
        export const BLOWFISH: number;
        export const AES128: number;
        export const AES192: number;
        export const AES256: number;
        export const TWOFISH: number;
        export const CAMELLIA128: number;
        export const CAMELLIA192: number;
        export const CAMELLIA256: number;
    }
    export const cipherTypesByVal: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
    };
    export namespace hashTypes {
        const MD5: number;
        const SHA1: number;
        const RIPEMD160: number;
        const SHA256: number;
        const SHA384: number;
        const SHA512: number;
        const SHA224: number;
    }
    export const hashTypesByVal: {
        1: string;
        2: string;
        3: string;
        8: string;
        9: string;
        10: string;
        11: string;
    };
    export namespace compressTypes {
        const NONE_2: number;
        export { NONE_2 as NONE };
        export const ZIP: number;
        export const ZLIB: number;
        export const BZIP2: number;
    }
    export const compressTypesByVal: {
        0: string;
        1: string;
        2: string;
        3: string;
    };
    export namespace curveTypes {
        const NONE_3: number;
        export { NONE_3 as NONE };
        export const P256: number;
        export const P384: number;
        export const P521: number;
        export const SECP256K1: number;
        export const X25519: number;
        export const BRAINPOOLP256: number;
        export const BRAINPOOLP384: number;
        export const BRAINPOOLP512: number;
        export const ED25519: number;
    }
    export const curveTypesByVal: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
    };
    export namespace oids {
        const P256_1: any;
        export { P256_1 as P256 };
        const P384_1: any;
        export { P384_1 as P384 };
        const P521_1: any;
        export { P521_1 as P521 };
        const SECP256K1_1: any;
        export { SECP256K1_1 as SECP256K1 };
        const X25519_1: any;
        export { X25519_1 as X25519 };
        const BRAINPOOLP256_1: any;
        export { BRAINPOOLP256_1 as BRAINPOOLP256 };
        const BRAINPOOLP384_1: any;
        export { BRAINPOOLP384_1 as BRAINPOOLP384 };
        const BRAINPOOLP512_1: any;
        export { BRAINPOOLP512_1 as BRAINPOOLP512 };
        const ED25519_1: any;
        export { ED25519_1 as ED25519 };
    }
    /**
     * PGP Message
     */
    export class PGPMessage {
        packets: any[];
        getSize(): number;
        write(bw: any): any;
        read(br: any): PGPMessage;
        toString(type?: string): string;
        fromString(str: any): any;
        format(): {
            packets: any[];
        };
    }
    /**
     * PGP Packet
     */
    export class PGPPacket {
        type: number;
        body: PGPUnknown;
        getSize(): number;
        write(bw: any): any;
        read(br: any): PGPPacket;
        format(): {
            type: any;
            body: PGPUnknown;
        };
    }
    /**
     * PGP Body
     */
    export class PGPBody {
    }
    /**
     * PGP Unknown
     */
    export class PGPUnknown extends PGPBody {
        data: any;
        getSize(): any;
        write(bw: any): any;
        read(br: any): PGPUnknown;
        format(): {
            data: any;
        };
    }
    /**
     * PGP Public Key
     */
    export class PGPPublicKey extends PGPBody {
        version: number;
        algorithm: number;
        expires: number;
        timestamp: number;
        n: MPI;
        e: MPI;
        p: MPI;
        g: MPI;
        y: MPI;
        q: MPI;
        oid: any;
        point: MPI;
        kdfHash: number;
        kdfAlg: number;
        data: any;
        set curve(arg: number);
        get curve(): number;
        isRSA(): boolean;
        isElgamal(): boolean;
        getSize(): number;
        write(bw: any): any;
        read(br: any): PGPPublicKey;
        fingerprint(): any;
        id(): any;
        long(): any;
        short(): any;
        matches(id: any): any;
        keyHash(): any;
        format(): {
            version: number;
            algorithm: any;
            timestamp: number;
            expires: number;
            n: any;
            e: any;
            p?: undefined;
            g?: undefined;
            y?: undefined;
            q?: undefined;
            curve?: undefined;
            point?: undefined;
            kdfHash?: undefined;
            kdfAlg?: undefined;
            data?: undefined;
        } | {
            version: number;
            algorithm: any;
            timestamp: number;
            expires: number;
            p: any;
            g: any;
            y: any;
            n?: undefined;
            e?: undefined;
            q?: undefined;
            curve?: undefined;
            point?: undefined;
            kdfHash?: undefined;
            kdfAlg?: undefined;
            data?: undefined;
        } | {
            version: number;
            algorithm: any;
            timestamp: number;
            expires: number;
            p: any;
            q: any;
            g: any;
            y: any;
            n?: undefined;
            e?: undefined;
            curve?: undefined;
            point?: undefined;
            kdfHash?: undefined;
            kdfAlg?: undefined;
            data?: undefined;
        } | {
            version: number;
            algorithm: any;
            timestamp: number;
            expires: number;
            curve: any;
            point: any;
            kdfHash: number;
            kdfAlg: number;
            n?: undefined;
            e?: undefined;
            p?: undefined;
            g?: undefined;
            y?: undefined;
            q?: undefined;
            data?: undefined;
        } | {
            version: number;
            algorithm: any;
            timestamp: number;
            expires: number;
            curve: any;
            point: any;
            n?: undefined;
            e?: undefined;
            p?: undefined;
            g?: undefined;
            y?: undefined;
            q?: undefined;
            kdfHash?: undefined;
            kdfAlg?: undefined;
            data?: undefined;
        } | {
            version: number;
            algorithm: any;
            timestamp: number;
            expires: number;
            data: any;
            n?: undefined;
            e?: undefined;
            p?: undefined;
            g?: undefined;
            y?: undefined;
            q?: undefined;
            curve?: undefined;
            point?: undefined;
            kdfHash?: undefined;
            kdfAlg?: undefined;
        };
    }
    /**
     * PGP Private Key
     */
    export class PGPPrivateKey extends PGPBody {
        key: PGPPublicKey;
        params: CipherParams;
        data: any;
        secret(passphrase: any): any;
        getSize(): number;
        write(bw: any): any;
        read(br: any): PGPPrivateKey;
        format(): {
            key: PGPPublicKey;
            params: CipherParams;
            data: any;
        };
    }
    /**
     * Cipher Params
     */
    export class CipherParams {
        encrypted: boolean;
        checksum: boolean;
        cipher: number;
        s2k: S2K;
        iv: any;
        blockSize(): 16 | 8;
        keySize(): 16 | 32 | 24;
        algName(): "IDEA-CFB" | "DES-EDE3-CFB" | "CAST5-CFB" | "BF-CFB" | "AES-128-CFB" | "AES-192-CFB" | "AES-256-CFB" | "TWOFISH-256-CFB" | "CAMELLIA-128-CFB" | "CAMELLIA-192-CFB" | "CAMELLIA-256-CFB";
        derive(passphrase: any): any;
        encipher(pt: any, key: any): any;
        decipher(ct: any, key: any): any;
        encrypt(data: any, passphrase: any): any;
        decrypt(data: any, passphrase: any): any;
        getSize(): number;
        write(bw: any): any;
        read(br: any): CipherParams;
        format(): {
            encrypted: boolean;
            checksum: boolean;
            cipher: any;
            s2k: S2K;
            iv: any;
        };
    }
    /**
     * S2K
     */
    export class S2K {
        mode: number;
        hash: number;
        count: number;
        salt: any;
        serial: any;
        derive(passphrase: any, size: any): any;
        getSize(): number;
        write(bw: any): any;
        read(br: any): S2K;
        format(): {
            mode: number;
            hash: any;
            count: number;
            salt: any;
            serial: any;
        };
    }
    /**
     * Secret Key
     */
    export class SecretKey {
        d: MPI;
        q: MPI;
        p: MPI;
        qi: MPI;
        x: MPI;
        getSize(algorithm: any): number;
        write(bw: any, algorithm: any): any;
        read(br: any, algorithm: any): SecretKey;
        format(): {
            d: any;
            q: any;
            p: any;
            qi: any;
            x?: undefined;
        } | {
            x: any;
            d?: undefined;
            q?: undefined;
            p?: undefined;
            qi?: undefined;
        } | {
            d: any;
            q?: undefined;
            p?: undefined;
            qi?: undefined;
            x?: undefined;
        } | {
            d: any;
            q: any;
            p: any;
            qi: any;
            x: any;
        };
    }
    /**
     * PGP User ID
     */
    export class PGPUserID extends PGPBody {
        id: string;
        getSize(): any;
        write(bw: any): any;
        read(br: any): PGPUserID;
        format(): {
            id: string;
        };
    }
    /**
     * MPI
     */
    export class MPI {
        constructor(data: any);
        bits: number;
        data: any;
        get(): any;
        set(data: any): MPI;
        fromOptions(data: any): MPI;
        getSize(): any;
        write(bw: any): any;
        read(br: any): MPI;
    }
    export function encodeID(raw: any): string;
    export function decodeID(id: any): any;
}
declare module "bcrypto/lib/safe" {
    export function safeCompare(x: any, y: any): number;
    export function safeEqual(x: any, y: any): number;
    export function safeEqualByte(x: any, y: any): number;
    export function safeEqualInt(x: any, y: any): number;
    export function safeSelect(x: any, y: any, v: any): number;
    export function safeLT(x: any, y: any): number;
    export function safeLTE(x: any, y: any): number;
    export function safeGT(x: any, y: any): number;
    export function safeGTE(x: any, y: any): number;
    export function safeMin(x: any, y: any): number;
    export function safeMax(x: any, y: any): number;
    export function safeAbs(x: any): number;
    export function safeBool(x: any): number;
    export function safeCopy(x: any, y: any, v: any): void;
}
declare module "bcrypto/lib/js/rsa" {
    export var native: number;
    export const SALT_LENGTH_AUTO: 0;
    export const SALT_LENGTH_HASH: -1;
    /**
     * Generate a private key.
     * @param {Number} [bits=2048]
     * @param {Number} [exponent=65537]
     * @returns {Buffer} Private key.
     */
    export function privateKeyGenerate(bits?: number, exponent?: number): any;
    /**
     * Generate a private key.
     * @param {Number} [bits=2048]
     * @param {Number} [exponent=65537]
     * @returns {Buffer} Private key.
     */
    export function privateKeyGenerateAsync(bits?: number, exponent?: number): any;
    /**
     * Get a private key's modulus size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function privateKeyBits(key: any): number;
    /**
     * Verify a private key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function privateKeyVerify(key: any): boolean;
    /**
     * Import a private key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function privateKeyImport(json: any): any;
    /**
     * Export a private key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function privateKeyExport(key: any): any;
    /**
     * Create a public key from a private key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyCreate(key: any): any;
    /**
     * Get a public key's modulus size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function publicKeyBits(key: any): number;
    /**
     * Verify a public key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function publicKeyVerify(key: any): boolean;
    /**
     * Import a public key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function publicKeyImport(json: any): any;
    /**
     * Export a public key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function publicKeyExport(key: any): any;
    /**
     * Sign a message (PKCS1v1.5).
     * @param {Object|String|null} hash
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @returns {Buffer} PKCS#1v1.5-formatted signature.
     */
    export function sign(hash: any | string | null, msg: any, key: any): any;
    /**
     * Verify a signature (PKCS1v1.5).
     * @param {Object|String|null} hash
     * @param {Buffer} msg
     * @param {Buffer} sig - PKCS#1v1.5-formatted.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verify(hash: any | string | null, msg: any, sig: any, key: any): boolean;
    /**
     * Encrypt a message with public key (PKCS1v1.5).
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function encrypt(msg: any, key: any): any;
    /**
     * Decrypt a message with private key (PKCS1v1.5).
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function decrypt(msg: any, key: any): any;
    /**
     * Sign a message (PSS).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @param {Number} [saltLen=SALT_LENGTH_HASH]
     * @returns {Buffer} PSS-formatted signature.
     */
    export function signPSS(hash: any, msg: any, key: any, saltLen?: number): any;
    /**
     * Verify a signature (PSS).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} sig - PSS-formatted.
     * @param {Buffer} key
     * @param {Number} [saltLen=SALT_LENGTH_HASH]
     * @returns {Boolean}
     */
    export function verifyPSS(hash: any, msg: any, sig: any, key: any, saltLen?: number): boolean;
    /**
     * Encrypt a message with public key (OAEP).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} key
     * @param {Buffer?} label
     * @returns {Buffer}
     */
    export function encryptOAEP(hash: any, msg: any, key: any, label: any): any;
    /**
     * Decrypt a message with private key (OAEP).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} key
     * @param {Buffer?} label
     * @returns {Buffer}
     */
    export function decryptOAEP(hash: any, msg: any, key: any, label: any): any;
    /**
     * "Veil" an RSA ciphertext to hide the key size.
     * @param {Buffer} msg
     * @param {Number} bits
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function veil(msg: any, bits: number, key: any): any;
    /**
     * "Unveil" a veiled RSA ciphertext.
     * @param {Buffer} msg
     * @param {Number} bits
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function unveil(msg: any, bits: number, key: any): any;
}
declare module "bcrypto/lib/native/rsa" {
    export var native: number;
    export var SALT_LENGTH_AUTO: number;
    export var SALT_LENGTH_HASH: number;
    /**
     * Generate a private key.
     * @param {Number} [bits=2048]
     * @param {Number} [exponent=65537]
     * @returns {Buffer} Private key.
     */
    export function privateKeyGenerate(bits?: number, exponent?: number): any;
    /**
     * Generate a private key.
     * @param {Number} [bits=2048]
     * @param {Number} [exponent=65537]
     * @returns {Buffer} Private key.
     */
    export function privateKeyGenerateAsync(bits?: number, exponent?: number): any;
    /**
     * Get a private key's modulus size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function privateKeyBits(key: any): number;
    /**
     * Verify a private key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function privateKeyVerify(key: any): boolean;
    /**
     * Import a private key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function privateKeyImport(json: any): any;
    /**
     * Export a private key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function privateKeyExport(key: any): any;
    /**
     * Create a public key from a private key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyCreate(key: any): any;
    /**
     * Get a public key's modulus size in bits.
     * @param {Buffer} key
     * @returns {Number}
     */
    export function publicKeyBits(key: any): number;
    /**
     * Verify a public key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function publicKeyVerify(key: any): boolean;
    /**
     * Import a public key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function publicKeyImport(json: any): any;
    /**
     * Export a public key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function publicKeyExport(key: any): any;
    /**
     * Sign a message (PKCS1v1.5).
     * @param {Object|String|null} hash
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @returns {Buffer} PKCS#1v1.5-formatted signature.
     */
    export function sign(hash: any | string | null, msg: any, key: any): any;
    /**
     * Verify a signature (PKCS1v1.5).
     * @param {Object|String|null} hash
     * @param {Buffer} msg
     * @param {Buffer} sig - PKCS#1v1.5-formatted.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verify(hash: any | string | null, msg: any, sig: any, key: any): boolean;
    /**
     * Encrypt a message with public key (PKCS1v1.5).
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function encrypt(msg: any, key: any): any;
    /**
     * Decrypt a message with private key (PKCS1v1.5).
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function decrypt(msg: any, key: any): any;
    /**
     * Sign a message (PSS).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} key - Private key.
     * @param {Number} [saltLen=SALT_LENGTH_HASH]
     * @returns {Buffer} PSS-formatted signature.
     */
    export function signPSS(hash: any, msg: any, key: any, saltLen?: number): any;
    /**
     * Verify a signature (PSS).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} sig - PSS-formatted.
     * @param {Buffer} key
     * @param {Number} [saltLen=SALT_LENGTH_HASH]
     * @returns {Boolean}
     */
    export function verifyPSS(hash: any, msg: any, sig: any, key: any, saltLen?: number): boolean;
    /**
     * Encrypt a message with public key (OAEP).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} key
     * @param {Buffer?} label
     * @returns {Buffer}
     */
    export function encryptOAEP(hash: any, msg: any, key: any, label: any): any;
    /**
     * Decrypt a message with private key (OAEP).
     * @param {Object} hash
     * @param {Buffer} msg
     * @param {Buffer} key
     * @param {Buffer?} label
     * @returns {Buffer}
     */
    export function decryptOAEP(hash: any, msg: any, key: any, label: any): any;
    /**
     * "Veil" an RSA ciphertext to hide the key size.
     * @param {Buffer} msg
     * @param {Number} bits
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function veil(msg: any, bits: number, key: any): any;
    /**
     * "Unveil" a veiled RSA ciphertext.
     * @param {Buffer} msg
     * @param {Number} bits
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function unveil(msg: any, bits: number, key: any): any;
}
declare module "bcrypto/lib/rsa" {
    const _exports: typeof import("bcrypto/lib/native/rsa");
    export = _exports;
}
declare module "bcrypto/lib/rsaies" {
    export function encrypt(hash: any, msg: any, pub: any, size?: any, label?: any): any;
    export function decrypt(hash: any, msg: any, priv: any, size?: any, label?: any): any;
}
declare module "bcrypto/lib/js/schnorr" {
    const _exports: Schnorr;
    export = _exports;
    /**
     * Schnorr
     */
    class Schnorr {
        constructor(name: any, hash: any, pre: any);
        id: any;
        type: string;
        hash: any;
        native: number;
        _pre: any;
        _curve: any;
        _rng: BatchRNG;
        _auxTag: any;
        _nonceTag: any;
        _challengeTag: any;
        get curve(): any;
        get rng(): BatchRNG;
        get size(): any;
        get bits(): any;
        hashInt(...items: any[]): any;
        hashAux(a: any, d: any): any;
        hashNonce(a: any, A: any, m: any, d: any): any;
        hashChallenge(R: any, A: any, m: any): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): boolean;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): boolean;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any[];
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): boolean;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        _sign(msg: any, key: any, aux: any): any;
        verify(msg: any, sig: any, key: any): boolean;
        _verify(msg: any, sig: any, key: any): boolean;
        verifyBatch(batch: any): any;
        _verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
    }
    import BatchRNG = require("bcrypto/lib/js/batch-rng");
}
declare module "bcrypto/lib/native/schnorr-libsecp256k1" {
    export var id: string;
    export var type: string;
    export var size: number;
    export var bits: number;
    export var native: number;
    /**
     * Generate a private key.
     * @returns {Buffer}
     */
    export function privateKeyGenerate(): any;
    /**
     * Validate a private key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function privateKeyVerify(key: any): boolean;
    /**
     * Export a private key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function privateKeyExport(key: any): any;
    /**
     * Import a private key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function privateKeyImport(json: any): any;
    /**
     * Compute ((tweak + key) mod n).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Buffer}
     */
    export function privateKeyTweakAdd(key: any, tweak: any): any;
    /**
     * Compute ((tweak * key) mod n).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Buffer}
     */
    export function privateKeyTweakMul(key: any, tweak: any): any;
    /**
     * Compute (-key mod n).
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function privateKeyNegate(key: any): any;
    /**
     * Compute (key^-1 mod n).
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function privateKeyInvert(key: any): any;
    /**
     * Create a public key from a private key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyCreate(key: any): any;
    /**
     * Run uniform bytes through Shallue-van de Woestijne.
     * @param {Buffer} bytes
     * @returns {Buffer}
     */
    export function publicKeyFromUniform(bytes: any): any;
    /**
     * Run public key through Shallue-van de Woestijne inverse.
     * @param {Buffer} key
     * @param {Number?} hint
     * @returns {Buffer}
     */
    export function publicKeyToUniform(key: any, hint?: number | null): any;
    /**
     * Create public key from a 64 byte hash.
     * @param {Buffer} bytes
     * @returns {Buffer}
     */
    export function publicKeyFromHash(bytes: any): any;
    /**
     * Create a 64 byte hash from a public key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyToHash(key: any): any;
    /**
     * Validate a public key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function publicKeyVerify(key: any): boolean;
    /**
     * Export a public key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function publicKeyExport(key: any): any;
    /**
     * Import a public key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function publicKeyImport(json: any): any;
    /**
     * Compute (key + (g * tweak)).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Buffer}
     */
    export function publicKeyTweakAdd(key: any, tweak: any): any;
    /**
     * Compute (key + (g * tweak)).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Buffer}
     */
    export function publicKeyTweakMul(key: any, tweak: any): any;
    /**
     * Compute (key + (g * tweak)).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Array}
     */
    export function publicKeyTweakSum(key: any, tweak: any): any[];
    /**
     * Test computation of (key + (g * tweak)).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @param {Buffer} expect
     * @param {Boolean} negated
     * @returns {Boolean}
     */
    export function publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: boolean): boolean;
    /**
     * Combine public keys.
     * @param {Buffer[]} keys
     * @returns {Buffer}
     */
    export function publicKeyCombine(keys: any[]): any;
    /**
     * Sign a message.
     * @param {Buffer} msg
     * @param {Buffer} key
     * @param {Buffer?} aux
     * @returns {Buffer}
     */
    export function sign(msg: any, key: any, aux?: any): any;
    /**
     * Verify a signature.
     * @param {Buffer} msg
     * @param {Buffer} sig
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verify(msg: any, sig: any, key: any): boolean;
    /**
     * Batch verify signatures.
     * @param {Object[]} batch
     * @returns {Boolean}
     */
    export function verifyBatch(batch: any[]): boolean;
    /**
     * Perform an ecdh.
     * @param {Buffer} pub
     * @param {Buffer} priv
     * @returns {Buffer}
     */
    export function derive(pub: any, priv: any): any;
}
declare module "bcrypto/lib/native/schnorr-torsion" {
    /**
     * Schnorr
     */
    export class Schnorr {
        constructor(name: any);
        id: any;
        type: string;
        native: number;
        _ctx: any;
        get _handle(): any;
        get size(): any;
        get bits(): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): any;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any;
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): any;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        verify(msg: any, sig: any, key: any): any;
        verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
    }
    export const id: any;
    export const type: string;
    export const native: number;
    export const _ctx: any;
    export function privateKeyGenerate(): any;
    export function privateKeyVerify(key: any): any;
    export function privateKeyExport(key: any): {
        d: any;
        x: any;
        y: any;
    };
    export function privateKeyImport(json: any): any;
    export function privateKeyTweakAdd(key: any, tweak: any): any;
    export function privateKeyTweakMul(key: any, tweak: any): any;
    export function privateKeyInvert(key: any): any;
    export function publicKeyCreate(key: any): any;
    export function publicKeyFromUniform(bytes: any): any;
    export function publicKeyToUniform(key: any, hint?: any): any;
    export function publicKeyFromHash(bytes: any): any;
    export function publicKeyToHash(key: any): any;
    export function publicKeyVerify(key: any): any;
    export function publicKeyExport(key: any): {
        x: any;
        y: any;
    };
    export function publicKeyImport(json: any): any;
    export function publicKeyTweakAdd(key: any, tweak: any): any;
    export function publicKeyTweakMul(key: any, tweak: any): any;
    export function publicKeyTweakSum(key: any, tweak: any): any;
    export function publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): any;
    export function publicKeyCombine(keys: any): any;
    export function sign(msg: any, key: any, aux?: any): any;
    export function verify(msg: any, sig: any, key: any): any;
    export function verifyBatch(batch: any): any;
    export function derive(pub: any, priv: any): any;
}
declare module "bcrypto/lib/native/schnorr" {
    const _exports: typeof import("bcrypto/lib/native/schnorr-libsecp256k1") | {
        id: any;
        type: string;
        native: number;
        _ctx: any;
        readonly _handle: any;
        readonly size: any;
        readonly bits: any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): any;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any;
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): any;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        verify(msg: any, sig: any, key: any): any;
        verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
        Schnorr: typeof import("bcrypto/lib/native/schnorr-torsion").Schnorr;
    };
    export = _exports;
}
declare module "bcrypto/lib/schnorr" {
    const _exports: typeof import("bcrypto/lib/native/schnorr-libsecp256k1") | {
        id: any;
        type: string;
        native: number;
        _ctx: any;
        readonly _handle: any;
        readonly size: any;
        readonly bits: any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): any;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any;
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): any;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        verify(msg: any, sig: any, key: any): any;
        verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
        Schnorr: typeof import("bcrypto/lib/native/schnorr-torsion").Schnorr;
    } | {
        id: any;
        type: string;
        hash: any;
        native: number;
        _pre: any;
        _curve: any;
        _rng: import("bcrypto/lib/js/batch-rng");
        _auxTag: any;
        _nonceTag: any;
        _challengeTag: any;
        readonly curve: any;
        readonly rng: import("bcrypto/lib/js/batch-rng");
        readonly size: any;
        readonly bits: any;
        hashInt(...items: any[]): any;
        hashAux(a: any, d: any): any;
        hashNonce(a: any, A: any, m: any, d: any): any;
        hashChallenge(R: any, A: any, m: any): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): boolean;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): boolean;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any[];
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): boolean;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        _sign(msg: any, key: any, aux: any): any;
        verify(msg: any, sig: any, key: any): boolean;
        _verify(msg: any, sig: any, key: any): boolean;
        verifyBatch(batch: any): any;
        _verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
        Schnorr: any;
    };
    export = _exports;
}
declare module "bcrypto/lib/js/scrypt" {
    export var native: number;
    /**
     * Perform scrypt key derivation.
     * @param {Buffer} passwd
     * @param {Buffer} salt
     * @param {Number} N
     * @param {Number} r
     * @param {Number} p
     * @param {Number} len
     * @returns {Buffer}
     */
    export function derive(passwd: any, salt: any, N: number, r: number, p: number, len: number): any;
    /**
     * Perform scrypt key derivation (async).
     * @param {Buffer} passwd
     * @param {Buffer} salt
     * @param {Number} N
     * @param {Number} r
     * @param {Number} p
     * @param {Number} len
     * @returns {Promise}
     */
    export function deriveAsync(passwd: any, salt: any, N: number, r: number, p: number, len: number): Promise<any>;
}
declare module "bcrypto/lib/native/scrypt" {
    export var native: number;
    /**
     * Perform scrypt key derivation.
     * @param {Buffer} passwd
     * @param {Buffer} salt
     * @param {Number} N
     * @param {Number} r
     * @param {Number} p
     * @param {Number} len
     * @returns {Buffer}
     */
    export function derive(passwd: any, salt: any, N: number, r: number, p: number, len: number): any;
    /**
     * Perform scrypt key derivation (async).
     * @param {Buffer} passwd
     * @param {Buffer} salt
     * @param {Number} N
     * @param {Number} r
     * @param {Number} p
     * @param {Number} len
     * @returns {Promise}
     */
    export function deriveAsync(passwd: any, salt: any, N: number, r: number, p: number, len: number): Promise<any>;
}
declare module "bcrypto/lib/scrypt" {
    const _exports: typeof import("bcrypto/lib/js/scrypt");
    export = _exports;
}
declare module "bcrypto/lib/js/secp256k1" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/js/ecdsa");
}
declare module "bcrypto/lib/native/secp256k1-libsecp256k1" {
    export var id: string;
    export var type: string;
    export var size: number;
    export var bits: number;
    export var native: number;
    /**
     * Generate a private key.
     * @returns {Buffer}
     */
    export function privateKeyGenerate(): any;
    /**
     * Validate a private key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function privateKeyVerify(key: any): boolean;
    /**
     * Export a private key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function privateKeyExport(key: any): any;
    /**
     * Import a private key from an object.
     * @param {Object} json
     * @returns {Buffer}
     */
    export function privateKeyImport(json: any): any;
    /**
     * Compute ((tweak + key) mod n).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Buffer}
     */
    export function privateKeyTweakAdd(key: any, tweak: any): any;
    /**
     * Compute ((tweak * key) mod n).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @returns {Buffer}
     */
    export function privateKeyTweakMul(key: any, tweak: any): any;
    /**
     * Compute (-key mod n).
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function privateKeyNegate(key: any): any;
    /**
     * Compute (key^-1 mod n).
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function privateKeyInvert(key: any): any;
    /**
     * Create a public key from a private key.
     * @param {Buffer} key
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyCreate(key: any, compress?: boolean): any;
    /**
     * Compress or decompress public key.
     * @param {Buffer} key
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyConvert(key: any, compress?: boolean): any;
    /**
     * Run uniform bytes through Shallue-van de Woestijne.
     * @param {Buffer} bytes
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyFromUniform(bytes: any, compress?: boolean): any;
    /**
     * Run public key through Shallue-van de Woestijne inverse.
     * @param {Buffer} key
     * @param {Number?} hint
     * @returns {Buffer}
     */
    export function publicKeyToUniform(key: any, hint?: number | null): any;
    /**
     * Create public key from a 64 byte hash.
     * @param {Buffer} bytes
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyFromHash(bytes: any, compress?: boolean): any;
    /**
     * Create a 64 byte hash from a public key.
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function publicKeyToHash(key: any): any;
    /**
     * Validate a public key.
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function publicKeyVerify(key: any): boolean;
    /**
     * Export a public key to an object.
     * @param {Buffer} key
     * @returns {Object}
     */
    export function publicKeyExport(key: any): any;
    /**
     * Import a public key from an object.
     * @param {Object} json
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyImport(json: any, compress?: boolean): any;
    /**
     * Compute ((g * tweak) + key).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyTweakAdd(key: any, tweak: any, compress?: boolean): any;
    /**
     * Compute (key * tweak).
     * @param {Buffer} key
     * @param {Buffer} tweak
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyTweakMul(key: any, tweak: any, compress?: boolean): any;
    /**
     * Combine public keys.
     * @param {Buffer[]} keys
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyCombine(keys: any[], compress?: boolean): any;
    /**
     * Negate public key.
     * @param {Buffer} key
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function publicKeyNegate(key: any, compress?: boolean): any;
    /**
     * Normalize R/S signature (ensure low S value).
     * @param {Buffer} sig
     * @returns {Buffer}
     */
    export function signatureNormalize(sig: any): any;
    /**
     * Normalize DER signature (ensure low S value).
     * @param {Buffer} sig
     * @returns {Buffer}
     */
    export function signatureNormalizeDER(sig: any): any;
    /**
     * Convert R/S signature to DER.
     * @param {Buffer} sig
     * @returns {Buffer}
     */
    export function signatureExport(sig: any): any;
    /**
     * Convert DER signature to R/S.
     * @param {Buffer} sig
     * @returns {Buffer}
     */
    export function signatureImport(sig: any): any;
    /**
     * Test whether a signature has a low S value (R/S).
     * @param {Buffer} sig
     * @returns {Boolean}
     */
    export function isLowS(sig: any): boolean;
    /**
     * Test whether a signature has a low S value (DER).
     * @param {Buffer} sig
     * @returns {Boolean}
     */
    export function isLowDER(sig: any): boolean;
    /**
     * Sign a message.
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function sign(msg: any, key: any): any;
    /**
     * Sign a message.
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Array}
     */
    export function signRecoverable(msg: any, key: any): any[];
    /**
     * Sign a message.
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function signDER(msg: any, key: any): any;
    /**
     * Sign a message.
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Array}
     */
    export function signRecoverableDER(msg: any, key: any): any[];
    /**
     * Verify a signature.
     * @param {Buffer} msg
     * @param {Buffer} sig
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verify(msg: any, sig: any, key: any): boolean;
    /**
     * Verify a signature.
     * @param {Buffer} msg
     * @param {Buffer} sig
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function verifyDER(msg: any, sig: any, key: any): boolean;
    /**
     * Recover a public key.
     * @param {Buffer} msg
     * @param {Buffer} sig
     * @param {Number} param
     * @param {Boolean} [compress=true]
     * @returns {Buffer|null}
     */
    export function recover(msg: any, sig: any, param: number, compress?: boolean): any | null;
    /**
     * Recover a public key.
     * @param {Buffer} msg
     * @param {Buffer} sig
     * @param {Number} param
     * @param {Boolean} [compress=true]
     * @returns {Buffer|null}
     */
    export function recoverDER(msg: any, sig: any, param: number, compress?: boolean): any | null;
    /**
     * Perform an ecdh.
     * @param {Buffer} pub
     * @param {Buffer} priv
     * @param {Boolean} [compress=true]
     * @returns {Buffer}
     */
    export function derive(pub: any, priv: any, compress?: boolean): any;
    /**
     * Sign a message (schnorr).
     * @param {Buffer} msg
     * @param {Buffer} key
     * @returns {Buffer}
     */
    export function schnorrSign(msg: any, key: any): any;
    /**
     * Verify a schnorr signature.
     * @param {Buffer} msg
     * @param {Buffer} sig
     * @param {Buffer} key
     * @returns {Boolean}
     */
    export function schnorrVerify(msg: any, sig: any, key: any): boolean;
    /**
     * Batch verify schnorr signatures.
     * @param {Object[]} batch
     * @returns {Boolean}
     */
    export function schnorrVerifyBatch(batch: any[]): boolean;
}
declare module "bcrypto/lib/native/secp256k1-torsion" {
    const _exports: ECDSA;
    export = _exports;
    import ECDSA = require("bcrypto/lib/native/ecdsa");
}
declare module "bcrypto/lib/native/secp256k1" {
    const _exports: typeof import("bcrypto/lib/native/secp256k1-libsecp256k1") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/secp256k1" {
    const _exports: typeof import("bcrypto/lib/native/secp256k1-libsecp256k1") | typeof import("bcrypto/lib/native/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/internal/objects" {
    export const NONE: "0.0";
    export namespace attrs {
        const COUNTRY: string;
        const ORGANIZATION: string;
        const ORGANIZATIONALUNIT: string;
        const COMMONNAME: string;
        const SERIALNUMBER: string;
        const LOCALITY: string;
        const PROVINCE: string;
        const STREETADDRESS: string;
        const POSTALCODE: string;
    }
    export const attrsByVal: {
        [x: string]: string;
    };
    export namespace keyAlgs {
        const DH: string;
        const DSA: string;
        const DSA_ALT: string;
        const RSA: string;
        const ECDSA: string;
        const EDDSA: string;
    }
    export const keyAlgsByVal: {
        [x: string]: string;
    };
    export namespace hashes {
        const BLAKE2B160: string;
        const BLAKE2B256: string;
        const BLAKE2B384: string;
        const BLAKE2B512: string;
        const BLAKE2S128: string;
        const BLAKE2S160: string;
        const BLAKE2S224: string;
        const BLAKE2S256: string;
        const GOST94: string;
        const MD2: string;
        const MD4: string;
        const MD5: string;
        const MDC2: string;
        const RIPEMD160: string;
        const RIPEMD160_ALT: string;
        const SHA1: string;
        const SHA224: string;
        const SHA256: string;
        const SHA384: string;
        const SHA512: string;
        const SHA3_224: string;
        const SHA3_256: string;
        const SHA3_384: string;
        const SHA3_512: string;
        const SHAKE128: string;
        const SHAKE256: string;
        const SM3: string;
        const WHIRLPOOL: string;
    }
    export const hashesByVal: {
        [x: string]: string;
    };
    export namespace curves {
        const P192: string;
        const P224: string;
        const P256: string;
        const P384: string;
        const P521: string;
        const BRAINPOOLP256: string;
        const BRAINPOOLP384: string;
        const BRAINPOOLP512: string;
        const SECP192K1: string;
        const SECP224K1: string;
        const SECP256K1: string;
        const FRP256V1: string;
        const X25519: string;
        const X25519_ALT: string;
        const ED25519: string;
        const X448: string;
        const X448_ALT: string;
        const ED448: string;
        const ED1174: string;
        const ED41417: string;
        const CURVE383187: string;
        const M221: string;
        const E222: string;
        const M383: string;
        const E382: string;
        const M511: string;
        const E521: string;
    }
    export const curvesByVal: {
        [x: string]: string;
    };
    export namespace sigAlgs {
        export const DSASHA1: string;
        export const RSAMD2: string;
        export const RSAMD4: string;
        export const RSAMD5: string;
        export const RSASHA1: string;
        export const RSASHA1_MS: string;
        export const RSAPSS: string;
        export const RSASHA256: string;
        export const RSASHA384: string;
        export const RSASHA512: string;
        export const RSASHA224: string;
        export const MGF1: string;
        export const RSASHA3_256: string;
        export const RSASHA3_384: string;
        export const RSASHA3_512: string;
        export const ECDSASHA1: string;
        export const ECDSASHA224: string;
        export const ECDSASHA256: string;
        export const ECDSASHA384: string;
        export const ECDSASHA512: string;
        const EDDSA_1: string;
        export { EDDSA_1 as EDDSA };
    }
    export const sigAlgsByVal: {
        [x: string]: string;
    };
    export const sigToHash: {
        [x: string]: string;
    };
}
declare module "bcrypto/lib/encoding/asn1" {
    export const EMPTY: any;
    export const ZERO: any;
    export const EMPTY_OID: Uint32Array;
    export namespace types {
        const BOOLEAN: number;
        const INTEGER: number;
        const BITSTRING: number;
        const OCTSTRING: number;
        const NULL: number;
        const OID: number;
        const ENUM: number;
        const UTF8STRING: number;
        const SEQUENCE: number;
        const SET: number;
        const NUMSTRING: number;
        const PRINTSTRING: number;
        const T61STRING: number;
        const IA5STRING: number;
        const UTCTIME: number;
        const GENTIME: number;
        const GENSTRING: number;
    }
    export const typesByVal: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        10: string;
        12: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
        22: string;
        23: string;
        24: string;
        27: string;
    };
    export namespace classes {
        const UNIVERSAL: number;
        const APPLICATION: number;
        const CONTEXT: number;
        const PRIVATE: number;
    }
    export const classesByVal: {
        0: string;
        1: string;
        2: string;
        3: string;
    };
    import objects = require("bcrypto/lib/internal/objects");
    export const TARGET: 255;
    export const OPTIONAL: number;
    export const MODE: number;
    export const NORMAL: number;
    export const EXPLICIT: number;
    export const IMPLICIT: number;
    /**
     * Node
     */
    export class Node {
        static decodeBody(value: any): Node;
        static fromArray(value: any): Node;
        static fromNumber(num: any): Node;
        static fromPEM(str: any): Node;
        flags: number;
        set mode(arg: number);
        get mode(): number;
        set opt(arg: boolean);
        get opt(): boolean;
        set target(arg: number);
        get target(): number;
        get isRaw(): boolean;
        explicit(target: any): Node;
        implicit(target: any): Node;
        optional(value?: boolean): Node;
        clean(): boolean;
        getBodySize(extra: any): number;
        writeBody(bw: any, extra: any): any;
        readBody(br: any, extra: any): Node;
        encodeBody(extra: any): any;
        decodeBody(data: any, extra: any): Node;
        set(): Node;
        from(options: any, ...extra: any[]): Node;
        error(str: any): Node;
        getSize(extra: any): number;
        write(bw: any, extra: any): any;
        read(br: any, extra: any): Node;
        raw: any;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(num: any): Node;
    }
    /**
     * Sequence
     */
    export class Sequence extends Node {
        constructor(...options: any[]);
        get type(): number;
    }
    /**
     * Set
     */
    export class Set extends Node {
        constructor(...options: any[]);
        get type(): number;
    }
    /**
     * Any
     */
    export class Any extends Node {
        constructor(...options: any[]);
        node: Null;
        get type(): number;
        format(): {
            type: any;
            node: Null;
        };
    }
    /**
     * Choice
     */
    export class Choice extends Node {
        constructor(node: any, ...options: any[]);
        node: any;
        get type(): any;
        choices(): void;
        format(): {
            type: any;
            node: any;
        };
    }
    /**
     * String
     */
    export const Str: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * Boolean
     */
    export const Bool: {
        new (...options: any[]): {
            value: boolean;
            readonly type: number;
            getBodySize(): number;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * Integer
     */
    export class Integer extends Node {
        constructor(...options: any[]);
        value: any;
        negative: boolean;
        get type(): number;
        formatValue(): any;
        toNumber(): any;
        format(): string;
    }
    /**
     * Unsigned
     */
    export class Unsigned extends Integer {
    }
    /**
     * BitString
     */
    export class BitString extends Node {
        constructor(...options: any[]);
        bits: number;
        value: any;
        get type(): number;
        rightAlign(): any;
        getBit(i: any): number;
        setBit(i: any, val: any): BitString;
        format(): string;
    }
    /**
     * OctString
     */
    export class OctString extends Node {
        constructor(...options: any[]);
        value: any;
        get type(): number;
        format(): string;
    }
    /**
     * Null
     */
    export class Null extends Node {
        constructor(...options: any[]);
        get type(): number;
        format(): string;
    }
    /**
     * OID
     */
    export class OID extends Node {
        constructor(...options: any[]);
        value: Uint32Array;
        get type(): number;
        equals(oid: any): boolean;
        toArray(): number[];
        fromString(str: any): OID;
        getAttributeName(): string;
        getSignatureAlgorithmName(): string;
        getSignatureHash(): string;
        getSignatureHashName(): string;
        getKeyAlgorithmName(): string;
        getHashName(): string;
        getCurveName(): string;
        format(): string;
    }
    /**
     * Enum
     */
    export class Enum extends Integer {
    }
    const Utf8String_base: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * Utf8String
     */
    export class Utf8String extends Utf8String_base {
        get type(): number;
    }
    /**
     * RawSequence
     */
    export class RawSequence extends Node {
        constructor(...options: any[]);
        value: any;
        get type(): number;
        children(): {};
        toArray(): any[];
        format(): any[];
    }
    /**
     * RawSet
     */
    export class RawSet extends RawSequence {
    }
    const NumString_base: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * NumString
     */
    export class NumString extends NumString_base {
        get type(): number;
    }
    const PrintString_base: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * PrintString
     */
    export class PrintString extends PrintString_base {
        get type(): number;
    }
    const T61String_base: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * T61String
     */
    export class T61String extends T61String_base {
        get type(): number;
    }
    const IA5String_base: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * IA5String
     */
    export class IA5String extends IA5String_base {
        get type(): number;
    }
    /**
     * Time
     */
    export class Time extends Node {
        constructor(...options: any[]);
        value: number;
        offset: number;
        unix(): number;
        fromString(str: any): Time;
        format(): string;
    }
    /**
     * UTCTime
     */
    export class UTCTime extends Time {
        get type(): number;
    }
    /**
     * GenTime
     */
    export class GenTime extends Time {
        get type(): number;
    }
    const GenString_base: {
        new (...options: any[]): {
            value: string;
            readonly encoding: string;
            getBodySize(): any;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        decodeBody(value: any): Node;
        fromArray(value: any): Node;
        fromNumber(num: any): Node;
        fromPEM(str: any): Node;
    };
    /**
     * GenString
     */
    export class GenString extends GenString_base {
        get type(): number;
    }
    /**
     * API
     */
    export function typeToClass(type: any): typeof Null | typeof Integer | typeof OctString | typeof RawSequence | typeof UTCTime | typeof GenTime;
    export { objects, Str as String, Bool as Boolean };
}
declare module "bcrypto/lib/encoding/openssl" {
    /**
     * DSAParams
     */
    export class DSAParams extends asn1.Sequence {
        constructor(p: any, q: any, g: any);
        p: asn1.Unsigned;
        q: asn1.Unsigned;
        g: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            p: asn1.Unsigned;
            q: asn1.Unsigned;
            g: asn1.Unsigned;
        };
    }
    /**
     * DSAPublicKey
     */
    export class DSAPublicKey extends asn1.Sequence {
        constructor(y: any, p: any, q: any, g: any);
        y: asn1.Unsigned;
        p: asn1.Unsigned;
        q: asn1.Unsigned;
        g: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            y: asn1.Unsigned;
            p: asn1.Unsigned;
            q: asn1.Unsigned;
            g: asn1.Unsigned;
        };
    }
    /**
     * DSAPrivateKey
     */
    export class DSAPrivateKey extends asn1.Sequence {
        constructor(version: any, p: any, q: any, g: any, y: any, x: any);
        version: asn1.Unsigned;
        p: asn1.Unsigned;
        q: asn1.Unsigned;
        g: asn1.Unsigned;
        y: asn1.Unsigned;
        x: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            version: asn1.Unsigned;
            p: asn1.Unsigned;
            q: asn1.Unsigned;
            g: asn1.Unsigned;
            y: asn1.Unsigned;
            x: asn1.Unsigned;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
}
declare module "bcrypto/lib/encoding/pemcrypt" {
    /**
     * Encrypt a block.
     * @param {PEMBlock} block
     * @param {String} name
     * @param {String} passwd
     * @returns {PEMBlock}
     */
    export function encrypt(block: PEMBlock, name: string, passwd: string): PEMBlock;
    /**
     * Decrypt a block.
     * @param {PEMBlock} block
     * @param {String} passwd
     * @returns {PEMBlock}
     */
    export function decrypt(block: PEMBlock, passwd: string): PEMBlock;
    import { PEMBlock } from "bcrypto/lib/encoding/pem";
}
declare module "bcrypto/lib/encoding/pkcs1" {
    /**
     * RSAPublicKey
     */
    export class RSAPublicKey extends asn1.Sequence {
        constructor(n: any, e: any);
        n: asn1.Unsigned;
        e: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            n: asn1.Unsigned;
            e: asn1.Unsigned;
        };
    }
    /**
     * RSAPrivateKey
     */
    export class RSAPrivateKey extends asn1.Sequence {
        constructor(version: any, n: any, e: any, d: any, p: any, q: any, dp: any, dq: any, qi: any);
        version: asn1.Unsigned;
        n: asn1.Unsigned;
        e: asn1.Unsigned;
        d: asn1.Unsigned;
        p: asn1.Unsigned;
        q: asn1.Unsigned;
        dp: asn1.Unsigned;
        dq: asn1.Unsigned;
        qi: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            version: asn1.Unsigned;
            n: asn1.Unsigned;
            e: asn1.Unsigned;
            d: asn1.Unsigned;
            p: asn1.Unsigned;
            q: asn1.Unsigned;
            dp: asn1.Unsigned;
            dq: asn1.Unsigned;
            qi: asn1.Unsigned;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
}
declare module "bcrypto/lib/encoding/sec1" {
    /**
     * ECPrivateKey
     */
    export class ECPrivateKey extends asn1.Sequence {
        constructor(version: any, privateKey: any, namedCurveOID: any, publicKey: any);
        version: asn1.Unsigned;
        privateKey: asn1.OctString;
        namedCurveOID: asn1.OID;
        publicKey: asn1.BitString;
        toPEM(): string;
        format(): {
            type: any;
            version: asn1.Unsigned;
            privateKey: asn1.OctString;
            namedCurveOID: asn1.OID;
            publicKey: asn1.BitString;
        };
    }
    /**
     * ECDSA Signature
     */
    export class ECDSASignature extends asn1.Sequence {
        constructor(r: any, s: any);
        r: asn1.Unsigned;
        s: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            r: asn1.Unsigned;
            s: asn1.Unsigned;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
}
declare module "bcrypto/lib/ssh" {
    export namespace keyTypes {
        const DSA: string;
        const RSA: string;
        const P256: string;
        const P384: string;
        const P521: string;
        const ED25519: string;
    }
    export const keyTypesByVal: {
        [x: string]: string;
    };
    /**
     * SSHPublicKey
     */
    export class SSHPublicKey {
        type: string;
        p: any;
        q: any;
        g: any;
        y: any;
        n: any;
        e: any;
        point: any;
        comment: string;
        getCurve(): string;
        getSize(): number;
        write(bw: any): any;
        read(br: any): SSHPublicKey;
        toString(): string;
        fromString(str: any): SSHPublicKey;
        format(): SSHPublicKey | {
            type: string;
            p: any;
            q: any;
            g: any;
            y: any;
            comment: string;
            n?: undefined;
            e?: undefined;
            point?: undefined;
        } | {
            type: string;
            n: any;
            e: any;
            comment: string;
            p?: undefined;
            q?: undefined;
            g?: undefined;
            y?: undefined;
            point?: undefined;
        } | {
            type: string;
            point: any;
            comment: string;
            p?: undefined;
            q?: undefined;
            g?: undefined;
            y?: undefined;
            n?: undefined;
            e?: undefined;
        };
    }
    /**
     * SSHPrivateKey
     */
    export class SSHPrivateKey {
        type: string;
        p: any;
        q: any;
        g: any;
        y: any;
        x: any;
        n: any;
        e: any;
        d: any;
        dp: any;
        dq: any;
        qi: any;
        key: any;
        comment: string;
        modern: boolean;
        getCurve(): string;
        encodeSSH(passwd: any): any;
        decodeSSH(data: any, passwd: any): SSHPrivateKey;
        encode(passwd: any): any;
        toString(passwd: any): string;
        fromString(str: any, passwd: any): SSHPrivateKey;
        format(): SSHPrivateKey | {
            type: string;
            p: any;
            q: any;
            g: any;
            y: any;
            x: any;
            comment: string;
            modern: boolean;
            n?: undefined;
            e?: undefined;
            d?: undefined;
            dp?: undefined;
            dq?: undefined;
            qi?: undefined;
            key?: undefined;
        } | {
            type: string;
            n: any;
            e: any;
            d: any;
            p: any;
            q: any;
            dp: any;
            dq: any;
            qi: any;
            comment: string;
            modern: boolean;
            g?: undefined;
            y?: undefined;
            x?: undefined;
            key?: undefined;
        } | {
            type: string;
            key: any;
            comment: string;
            modern: boolean;
            p?: undefined;
            q?: undefined;
            g?: undefined;
            y?: undefined;
            x?: undefined;
            n?: undefined;
            e?: undefined;
            d?: undefined;
            dp?: undefined;
            dq?: undefined;
            qi?: undefined;
        };
    }
    /**
     * KDFOptions
     */
    export class KDFOptions {
        name: string;
        salt: any;
        rounds: number;
        getBodySize(): number;
        getSize(): number;
        write(bw: any): any;
        read(br: any): KDFOptions;
    }
    /**
     * RawPrivateKey
     */
    export class RawPrivateKey {
        type: string;
        p: any;
        q: any;
        g: any;
        y: any;
        x: any;
        n: any;
        e: any;
        d: any;
        qi: any;
        point: any;
        key: any;
        comment: string;
        getSize(useNonce: any): number;
        write(bw: any, useNonce: any): any;
        read(br: any): RawPrivateKey;
    }
}
declare module "bcrypto/lib/js/sha3" {
    export = SHA3;
    /**
     * SHA3
     */
    class SHA3 extends Keccak {
        static hash(): SHA3;
        static hmac(bits: any): import("bcrypto/lib/internal/hmac");
        static digest(data: any, bits: any): any;
        static root(left: any, right: any, bits: any): any;
        static multi(x: any, y: any, z: any, bits: any): any;
        static mac(data: any, key: any, bits: any): any;
    }
    namespace SHA3 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA3;
    }
    import Keccak = require("bcrypto/lib/js/keccak");
}
declare module "bcrypto/lib/native/sha3" {
    export = SHA3;
    /**
     * SHA3
     */
    class SHA3 extends Keccak {
        static hash(): SHA3;
        static hmac(bits: any): import("bcrypto/lib/internal/hmac");
        static digest(data: any, bits: any): any;
        static root(left: any, right: any, bits: any): any;
        static multi(x: any, y: any, z: any, bits: any): any;
        static mac(data: any, key: any, bits: any): any;
    }
    namespace SHA3 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA3;
    }
    import Keccak = require("bcrypto/lib/native/keccak");
}
declare module "bcrypto/lib/sha3" {
    const _exports: typeof import("bcrypto/lib/js/sha3") | typeof import("bcrypto/lib/native/sha3");
    export = _exports;
}
declare module "bcrypto/lib/sha3-224" {
    export = SHA3_224;
    /**
     * SHA3-224
     */
    class SHA3_224 {
        static hash(): SHA3_224;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
    }
    namespace SHA3_224 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA3_224;
    }
}
declare module "bcrypto/lib/sha3-256" {
    export = SHA3_256;
    /**
     * SHA3-256
     */
    class SHA3_256 {
        static hash(): SHA3_256;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
    }
    namespace SHA3_256 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA3_256;
    }
}
declare module "bcrypto/lib/sha3-384" {
    export = SHA3_384;
    /**
     * SHA3-384
     */
    class SHA3_384 {
        static hash(): SHA3_384;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
    }
    namespace SHA3_384 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA3_384;
    }
}
declare module "bcrypto/lib/sha3-512" {
    export = SHA3_512;
    /**
     * SHA3-512
     */
    class SHA3_512 {
        static hash(): SHA3_512;
        static hmac(): any;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        init(): any;
    }
    namespace SHA3_512 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHA3_512;
    }
}
declare module "bcrypto/lib/shake128" {
    export = SHAKE128;
    /**
     * SHAKE128
     */
    class SHAKE128 extends SHAKE {
        static hash(): SHAKE128;
        static hmac(len: any): any;
        static digest(data: any, len: any): any;
        static root(left: any, right: any, len: any): any;
        static multi(x: any, y: any, z: any, len: any): any;
        static mac(data: any, key: any, len: any): any;
        init(): any;
    }
    namespace SHAKE128 {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: SHAKE128;
    }
    import SHAKE = require("bcrypto/lib/shake");
}
declare module "bcrypto/lib/js/siphash" {
    export var native: number;
    /**
     * Javascript siphash 2-4 implementation.
     * Used by bitcoin for compact block relay.
     * @param {Buffer} data
     * @param {Buffer} key - 128 bit key.
     * @returns {Array} [hi, lo]
     */
    export function siphash(data: any, key: any): any[];
    /**
     * Javascript siphash 2-4 implementation (32 bit ints).
     * Used by legacy cuckoo cycle.
     * @param {Number} num
     * @param {Buffer} key - 128 bit key.
     * @returns {Number}
     */
    export function siphash32(num: number, key: any): number;
    /**
     * Javascript siphash 2-4 implementation (64 bit ints).
     * Used by legacy cuckoo cycle.
     * @param {Number} hi
     * @param {Number} lo
     * @param {Buffer} key - 128 bit key.
     * @returns {Array} [hi, lo]
     */
    export function siphash64(hi: number, lo: number, key: any): any[];
    /**
     * Javascript siphash 2-4 implementation
     * (32 bit ints with a 256 bit key).
     * Used by cuckoo cycle.
     * @param {Number} num
     * @param {Buffer} key - 256 bit key.
     * @returns {Number}
     */
    export function siphash32k256(num: number, key: any): number;
    /**
     * Javascript siphash 2-4 implementation
     * (64 bit ints with a 256 bit key).
     * Used by cuckoo cycle.
     * @param {Number} hi
     * @param {Number} lo
     * @param {Buffer} key - 256 bit key.
     * @returns {Array} [hi, lo]
     */
    export function siphash64k256(hi: number, lo: number, key: any): any[];
    /**
     * Javascript siphash 2-4 implementation
     * plus 128 bit reduction by a modulus.
     * Used by the neutrino protocol.
     * @param {Buffer} data
     * @param {Buffer} key - 128 bit key.
     * @param {Number} mhi - Modulus hi bits.
     * @param {Number} mlo - Modulus lo bits.
     * @returns {Array} [hi, lo]
     */
    export function sipmod(data: any, key: any, mhi: number, mlo: number): any[];
}
declare module "bcrypto/lib/native/siphash" {
    export var native: number;
    export function siphash(data: any, key: any): any;
    export function siphash32(num: any, key: any): any;
    export function siphash64(hi: any, lo: any, key: any): any;
    export function siphash32k256(num: any, key: any): any;
    export function siphash64k256(hi: any, lo: any, key: any): any;
    export function sipmod(data: any, key: any, mhi: any, mlo: any): any;
}
declare module "bcrypto/lib/siphash" {
    const _exports: typeof import("bcrypto/lib/native/siphash");
    export = _exports;
}
declare module "bcrypto/lib/js/whirlpool" {
    export = Whirlpool;
    /**
     * Whirlpool
     */
    class Whirlpool {
        static hash(): Whirlpool;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        state: Uint32Array;
        msg: Uint32Array;
        block: any;
        size: number;
        init(): Whirlpool;
        update(data: any): Whirlpool;
        final(): any;
        _update(data: any, len: any): void;
        _final(out: any): any;
        _transform(chunk: any, pos: any): void;
    }
    namespace Whirlpool {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Whirlpool;
    }
    import HMAC = require("bcrypto/lib/internal/hmac");
}
declare module "bcrypto/lib/native/whirlpool" {
    export = Whirlpool;
    class Whirlpool extends Hash {
        static hash(): Whirlpool;
        static hmac(): HMAC;
        static digest(data: any): any;
        static root(left: any, right: any): any;
        static multi(x: any, y: any, z: any): any;
        static mac(data: any, key: any): any;
        constructor();
    }
    namespace Whirlpool {
        const native: number;
        const id: string;
        const size: number;
        const bits: number;
        const blockSize: number;
        const zero: any;
        const ctx: Whirlpool;
    }
    import { Hash } from "bcrypto/lib/native/hash";
    import { HMAC } from "bcrypto/lib/native/hash";
}
declare module "bcrypto/lib/whirlpool" {
    const _exports: typeof import("bcrypto/lib/js/whirlpool") | typeof import("bcrypto/lib/native/whirlpool");
    export = _exports;
}
declare module "bcrypto/lib/js/x448" {
    const _exports: ECDH;
    export = _exports;
    import ECDH = require("bcrypto/lib/js/ecdh");
}
declare module "bcrypto/lib/native/x448" {
    const _exports: ECDH;
    export = _exports;
    import ECDH = require("bcrypto/lib/native/ecdh");
}
declare module "bcrypto/lib/x448" {
    const _exports: typeof import("bcrypto/lib/js/ecdh") | typeof import("bcrypto/lib/native/ecdh");
    export = _exports;
}
declare module "bcrypto/lib/bcrypto" {
    export var AEAD: typeof import("bcrypto/lib/js/aead") | typeof import("bcrypto/lib/native/aead");
    export var aes: typeof import("bcrypto/lib/js/aes");
    export var ARC4: typeof import("bcrypto/lib/js/arc4") | typeof import("bcrypto/lib/native/arc4");
    export var bcrypt: typeof import("bcrypto/lib/native/bcrypt");
    export var BLAKE2b: typeof import("bcrypto/lib/js/blake2b") | typeof import("bcrypto/lib/native/blake2b");
    export var BLAKE2b160: typeof import("bcrypto/lib/blake2b160");
    export var BLAKE2b256: typeof import("bcrypto/lib/blake2b256");
    export var BLAKE2b384: typeof import("bcrypto/lib/blake2b384");
    export var BLAKE2b512: typeof import("bcrypto/lib/blake2b512");
    export var BLAKE2s: typeof import("bcrypto/lib/js/blake2s") | typeof import("bcrypto/lib/native/blake2s");
    export var BLAKE2s128: typeof import("bcrypto/lib/blake2s128");
    export var BLAKE2s160: typeof import("bcrypto/lib/blake2s160");
    export var BLAKE2s224: typeof import("bcrypto/lib/blake2s224");
    export var BLAKE2s256: typeof import("bcrypto/lib/blake2s256");
    export var BN: typeof import("bcrypto/lib/native/bn") | typeof import("bcrypto/lib/js/bn");
    export var box: typeof import("bcrypto/lib/box");
    export var ChaCha20: typeof import("bcrypto/lib/js/chacha20") | typeof import("bcrypto/lib/native/chacha20");
    export var cipher: typeof import("bcrypto/lib/js/cipher") | typeof import("bcrypto/lib/native/cipher");
    export var cleanse: typeof import("bcrypto/lib/native/cleanse");
    export var CSHAKE: typeof import("bcrypto/lib/cshake");
    export var CSHAKE128: typeof import("bcrypto/lib/cshake128");
    export var CSHAKE256: typeof import("bcrypto/lib/cshake256");
    export var CtrDRBG: typeof import("bcrypto/lib/js/ctr-drbg") | typeof import("bcrypto/lib/native/ctr-drbg");
    export var dsa: typeof import("bcrypto/lib/js/dsa");
    export var dsaies: typeof import("bcrypto/lib/dsaies");
    export var eb2k: typeof import("bcrypto/lib/native/eb2k");
    export var ecies: typeof import("bcrypto/lib/ecies");
    export var ed25519: typeof import("bcrypto/lib/js/eddsa") | typeof import("bcrypto/lib/native/eddsa");
    export var ed448: typeof import("bcrypto/lib/js/eddsa") | typeof import("bcrypto/lib/native/eddsa");
    export var encoding: any;
    export var GOST94: typeof import("bcrypto/lib/js/gost94") | typeof import("bcrypto/lib/native/gost94");
    export var Hash160: typeof import("bcrypto/lib/js/hash160") | typeof import("bcrypto/lib/native/hash160");
    export var Hash256: typeof import("bcrypto/lib/js/hash256") | typeof import("bcrypto/lib/native/hash256");
    export var HashDRBG: typeof import("bcrypto/lib/js/hash-drbg") | typeof import("bcrypto/lib/native/hash-drbg");
    export var hkdf: typeof import("bcrypto/lib/js/hkdf");
    export var HmacDRBG: typeof import("bcrypto/lib/js/hmac-drbg") | typeof import("bcrypto/lib/native/hmac-drbg");
    export var Keccak: typeof import("bcrypto/lib/js/keccak") | typeof import("bcrypto/lib/native/keccak");
    export var Keccak224: typeof import("bcrypto/lib/keccak224");
    export var Keccak256: typeof import("bcrypto/lib/keccak256");
    export var Keccak384: typeof import("bcrypto/lib/keccak384");
    export var Keccak512: typeof import("bcrypto/lib/keccak512");
    export var KMAC: typeof import("bcrypto/lib/kmac");
    export var KMAC128: typeof import("bcrypto/lib/kmac128");
    export var KMAC256: typeof import("bcrypto/lib/kmac256");
    export var MD2: typeof import("bcrypto/lib/js/md2") | typeof import("bcrypto/lib/native/md2");
    export var MD4: typeof import("bcrypto/lib/js/md4") | typeof import("bcrypto/lib/native/md4");
    export var MD5: typeof import("bcrypto/lib/js/md5") | typeof import("bcrypto/lib/native/md5");
    export var MD5SHA1: typeof import("bcrypto/lib/js/md5sha1") | typeof import("bcrypto/lib/native/md5sha1");
    export var merkle: typeof import("bcrypto/lib/merkle");
    export var mrkl: typeof import("bcrypto/lib/mrkl");
    export var murmur3: typeof import("bcrypto/lib/native/murmur3");
    export var p192: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export var p224: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export var p256: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export var p384: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export var p521: typeof import("bcrypto/lib/js/ecdsa") | typeof import("bcrypto/lib/native/ecdsa");
    export var pbkdf2: typeof import("bcrypto/lib/js/pbkdf2");
    export var pgp: typeof import("bcrypto/lib/pgp");
    export var Poly1305: typeof import("bcrypto/lib/js/poly1305") | typeof import("bcrypto/lib/native/poly1305");
    export var random: typeof import("bcrypto/lib/native/random-openssl");
    export var RIPEMD160: typeof import("bcrypto/lib/js/ripemd160") | typeof import("bcrypto/lib/native/ripemd160");
    export var rsa: typeof import("bcrypto/lib/native/rsa");
    export var rsaies: typeof import("bcrypto/lib/rsaies");
    export var safe: typeof import("bcrypto/lib/safe");
    export var Salsa20: typeof import("bcrypto/lib/js/salsa20") | typeof import("bcrypto/lib/native/salsa20");
    export var schnorr: typeof import("bcrypto/lib/native/schnorr-libsecp256k1") | {
        id: any;
        type: string;
        native: number;
        _ctx: any;
        readonly _handle: any;
        readonly size: any;
        readonly bits: any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): any;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: any): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): any;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any;
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): any;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        verify(msg: any, sig: any, key: any): any;
        verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
        Schnorr: typeof import("bcrypto/lib/native/schnorr-torsion").Schnorr;
    } | {
        id: any;
        type: string;
        hash: any;
        native: number;
        _pre: any;
        _curve: any;
        _rng: import("bcrypto/lib/js/batch-rng");
        _auxTag: any;
        _nonceTag: any;
        _challengeTag: any;
        readonly curve: any;
        readonly rng: import("bcrypto/lib/js/batch-rng");
        readonly size: any;
        readonly bits: any;
        hashInt(...items: any[]): any;
        hashAux(a: any, d: any): any;
        hashNonce(a: any, A: any, m: any, d: any): any;
        hashChallenge(R: any, A: any, m: any): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): boolean;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): boolean;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any[];
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): boolean;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        _sign(msg: any, key: any, aux: any): any;
        verify(msg: any, sig: any, key: any): boolean;
        _verify(msg: any, sig: any, key: any): boolean;
        verifyBatch(batch: any): any;
        _verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
        Schnorr: any;
    };
    export var scrypt: typeof import("bcrypto/lib/js/scrypt");
    export var secp256k1: typeof import("bcrypto/lib/native/secp256k1-libsecp256k1") | typeof import("bcrypto/lib/native/ecdsa") | typeof import("bcrypto/lib/js/ecdsa");
    export var secretbox: typeof import("bcrypto/lib/js/secretbox");
    export var ssh: typeof import("bcrypto/lib/ssh");
    export var SHA1: typeof import("bcrypto/lib/js/sha1") | typeof import("bcrypto/lib/native/sha1");
    export var SHA224: typeof import("bcrypto/lib/js/sha224") | typeof import("bcrypto/lib/native/sha224");
    export var SHA256: typeof import("bcrypto/lib/js/sha256") | typeof import("bcrypto/lib/native/sha256");
    export var SHA384: typeof import("bcrypto/lib/js/sha384") | typeof import("bcrypto/lib/native/sha384");
    export var SHA512: typeof import("bcrypto/lib/js/sha512") | typeof import("bcrypto/lib/native/sha512");
    export var SHA3: typeof import("bcrypto/lib/js/sha3") | typeof import("bcrypto/lib/native/sha3");
    export var SHA3_224: typeof import("bcrypto/lib/sha3-224");
    export var SHA3_256: typeof import("bcrypto/lib/sha3-256");
    export var SHA3_384: typeof import("bcrypto/lib/sha3-384");
    export var SHA3_512: typeof import("bcrypto/lib/sha3-512");
    export var SHAKE: typeof import("bcrypto/lib/shake");
    export var SHAKE128: typeof import("bcrypto/lib/shake128");
    export var SHAKE256: typeof import("bcrypto/lib/shake256");
    export var siphash: typeof import("bcrypto/lib/native/siphash");
    export var Whirlpool: typeof import("bcrypto/lib/js/whirlpool") | typeof import("bcrypto/lib/native/whirlpool");
    export var x25519: typeof import("bcrypto/lib/js/ecdh") | typeof import("bcrypto/lib/native/ecdh");
    export var x448: typeof import("bcrypto/lib/js/ecdh") | typeof import("bcrypto/lib/native/ecdh");
    export var version: string;
    export { native };
}
declare module "bcrypto/lib/blake2b-browser" {
    const _exports: typeof import("bcrypto/lib/js/blake2b");
    export = _exports;
}
declare module "bcrypto/lib/blake2s-browser" {
    const _exports: typeof import("bcrypto/lib/js/blake2s");
    export = _exports;
}
declare module "bcrypto/lib/bn-browser" {
    const _exports: typeof import("bcrypto/lib/js/bn");
    export = _exports;
}
declare module "bcrypto/lib/chacha20-browser" {
    const _exports: typeof import("bcrypto/lib/js/chacha20");
    export = _exports;
}
declare module "bcrypto/lib/cipher-browser" {
    const _exports: typeof import("bcrypto/lib/js/cipher");
    export = _exports;
}
declare module "bcrypto/lib/cleanse-browser" {
    const _exports: typeof import("bcrypto/lib/js/cleanse");
    export = _exports;
}
declare module "bcrypto/lib/ctr-drbg-browser" {
    const _exports: typeof import("bcrypto/lib/js/ctr-drbg");
    export = _exports;
}
declare module "bcrypto/lib/dsa-browser" {
    const _exports: typeof import("bcrypto/lib/js/dsa");
    export = _exports;
}
declare module "bcrypto/lib/eb2k-browser" {
    const _exports: typeof import("bcrypto/lib/js/eb2k");
    export = _exports;
}
declare module "bcrypto/lib/ed25519-browser" {
    const _exports: typeof import("bcrypto/lib/js/eddsa");
    export = _exports;
}
declare module "bcrypto/lib/ed448-browser" {
    const _exports: typeof import("bcrypto/lib/js/eddsa");
    export = _exports;
}
declare module "bcrypto/lib/gost94-browser" {
    const _exports: typeof import("bcrypto/lib/js/gost94");
    export = _exports;
}
declare module "bcrypto/lib/hash-drbg-browser" {
    const _exports: typeof import("bcrypto/lib/js/hash-drbg");
    export = _exports;
}
declare module "bcrypto/lib/hash160-browser" {
    const _exports: typeof import("bcrypto/lib/js/hash160");
    export = _exports;
}
declare module "bcrypto/lib/hash256-browser" {
    const _exports: typeof import("bcrypto/lib/js/hash256");
    export = _exports;
}
declare module "bcrypto/lib/hkdf-browser" {
    const _exports: typeof import("bcrypto/lib/js/hkdf");
    export = _exports;
}
declare module "bcrypto/lib/hmac-drbg-browser" {
    const _exports: typeof import("bcrypto/lib/js/hmac-drbg");
    export = _exports;
}
declare module "bcrypto/lib/keccak-browser" {
    const _exports: typeof import("bcrypto/lib/js/keccak");
    export = _exports;
}
declare module "bcrypto/lib/md2-browser" {
    const _exports: typeof import("bcrypto/lib/js/md2");
    export = _exports;
}
declare module "bcrypto/lib/md4-browser" {
    const _exports: typeof import("bcrypto/lib/js/md4");
    export = _exports;
}
declare module "bcrypto/lib/md5-browser" {
    const _exports: typeof import("bcrypto/lib/js/md5");
    export = _exports;
}
declare module "bcrypto/lib/md5sha1-browser" {
    const _exports: typeof import("bcrypto/lib/js/md5sha1");
    export = _exports;
}
declare module "bcrypto/lib/murmur3-browser" {
    const _exports: typeof import("bcrypto/lib/js/murmur3");
    export = _exports;
}
declare module "bcrypto/lib/p192-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/p224-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/p256-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/p384-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/p521-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/pbkdf2-browser" {
    const _exports: typeof import("bcrypto/lib/js/pbkdf2");
    export = _exports;
}
declare module "bcrypto/lib/poly1305-browser" {
    const _exports: typeof import("bcrypto/lib/js/poly1305");
    export = _exports;
}
declare module "bcrypto/lib/js/random" {
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
declare module "bcrypto/lib/random-browser" {
    const _exports: typeof import("bcrypto/lib/js/random");
    export = _exports;
}
declare module "bcrypto/lib/ripemd160-browser" {
    const _exports: typeof import("bcrypto/lib/js/ripemd160");
    export = _exports;
}
declare module "bcrypto/lib/rsa-browser" {
    const _exports: typeof import("bcrypto/lib/js/rsa");
    export = _exports;
}
declare module "bcrypto/lib/salsa20-browser" {
    const _exports: typeof import("bcrypto/lib/js/salsa20");
    export = _exports;
}
declare module "bcrypto/lib/schnorr-browser" {
    const _exports: {
        id: any;
        type: string;
        hash: any;
        native: number;
        _pre: any;
        _curve: any;
        _rng: import("bcrypto/lib/js/batch-rng");
        _auxTag: any;
        _nonceTag: any;
        _challengeTag: any;
        readonly curve: any;
        readonly rng: import("bcrypto/lib/js/batch-rng");
        readonly size: any;
        readonly bits: any;
        hashInt(...items: any[]): any;
        hashAux(a: any, d: any): any;
        hashNonce(a: any, A: any, m: any, d: any): any;
        hashChallenge(R: any, A: any, m: any): any;
        privateKeyGenerate(): any;
        privateKeyVerify(key: any): boolean;
        privateKeyExport(key: any): {
            d: any;
            x: any;
            y: any;
        };
        privateKeyImport(json: any): any;
        privateKeyTweakAdd(key: any, tweak: any): any;
        privateKeyTweakMul(key: any, tweak: any): any;
        privateKeyInvert(key: any): any;
        publicKeyCreate(key: any): any;
        publicKeyFromUniform(bytes: any): any;
        publicKeyToUniform(key: any, hint?: number): any;
        publicKeyFromHash(bytes: any): any;
        publicKeyToHash(key: any): any;
        publicKeyVerify(key: any): boolean;
        publicKeyExport(key: any): {
            x: any;
            y: any;
        };
        publicKeyImport(json: any): any;
        publicKeyTweakAdd(key: any, tweak: any): any;
        publicKeyTweakMul(key: any, tweak: any): any;
        publicKeyTweakSum(key: any, tweak: any): any[];
        publicKeyTweakCheck(key: any, tweak: any, expect: any, negated: any): boolean;
        publicKeyCombine(keys: any): any;
        sign(msg: any, key: any, aux?: any): any;
        _sign(msg: any, key: any, aux: any): any;
        verify(msg: any, sig: any, key: any): boolean;
        _verify(msg: any, sig: any, key: any): boolean;
        verifyBatch(batch: any): any;
        _verifyBatch(batch: any): any;
        derive(pub: any, priv: any): any;
        Schnorr: any;
    };
    export = _exports;
}
declare module "bcrypto/lib/scrypt-browser" {
    const _exports: typeof import("bcrypto/lib/js/scrypt");
    export = _exports;
}
declare module "bcrypto/lib/secp256k1-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdsa");
    export = _exports;
}
declare module "bcrypto/lib/secretbox-browser" {
    const _exports: typeof import("bcrypto/lib/js/secretbox");
    export = _exports;
}
declare module "bcrypto/lib/sha1-browser" {
    const _exports: typeof import("bcrypto/lib/js/sha1");
    export = _exports;
}
declare module "bcrypto/lib/sha224-browser" {
    const _exports: typeof import("bcrypto/lib/js/sha224");
    export = _exports;
}
declare module "bcrypto/lib/sha256-browser" {
    const _exports: typeof import("bcrypto/lib/js/sha256");
    export = _exports;
}
declare module "bcrypto/lib/sha3-browser" {
    const _exports: typeof import("bcrypto/lib/js/sha3");
    export = _exports;
}
declare module "bcrypto/lib/sha384-browser" {
    const _exports: typeof import("bcrypto/lib/js/sha384");
    export = _exports;
}
declare module "bcrypto/lib/sha512-browser" {
    const _exports: typeof import("bcrypto/lib/js/sha512");
    export = _exports;
}
declare module "bcrypto/lib/siphash-browser" {
    const _exports: typeof import("bcrypto/lib/js/siphash");
    export = _exports;
}
declare module "bcrypto/lib/whirlpool-browser" {
    const _exports: typeof import("bcrypto/lib/js/whirlpool");
    export = _exports;
}
declare module "bcrypto/lib/x25519-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdh");
    export = _exports;
}
declare module "bcrypto/lib/x448-browser" {
    const _exports: typeof import("bcrypto/lib/js/ecdh");
    export = _exports;
}
declare module "bcrypto/lib/js/base16" {
    export var native: number;
    export function encode(data: any): string;
    export function decode(str: any): any;
    export function test(str: any): boolean;
    export function encodeLE(data: any): string;
    export function decodeLE(str: any): any;
    export function testLE(str: any): boolean;
}
declare module "bcrypto/lib/encoding/base16-browser" {
    const _exports: typeof import("bcrypto/lib/js/base16");
    export = _exports;
}
declare module "bcrypto/lib/native/base16" {
    export var native: number;
    export function encode(data: any): any;
    export function decode(str: any): any;
    export function test(str: any): any;
    export function encodeLE(data: any): any;
    export function decodeLE(str: any): any;
    export function testLE(str: any): any;
}
declare module "bcrypto/lib/encoding/base16" {
    const _exports: typeof import("bcrypto/lib/native/base16");
    export = _exports;
}
declare module "bcrypto/lib/js/base32" {
    export var native: number;
    /**
     * Encode a base32 string.
     * @param {Buffer} data
     * @param {Boolean} [pad=false]
     * @returns {String}
     */
    export function encode(data: any, pad?: boolean): string;
    /**
     * Decode a base32 string.
     * @param {String} str
     * @param {Boolean} [unpad=false]
     * @returns {Buffer}
     */
    export function decode(str: string, unpad?: boolean): any;
    /**
     * Test a base32 string.
     * @param {String} str
     * @param {Boolean} [unpad=false]
     * @returns {Buffer}
     */
    export function test(str: string, unpad?: boolean): any;
    /**
     * Encode a base32hex string.
     * @param {Buffer} data
     * @param {Boolean} [pad=false]
     * @returns {String}
     */
    export function encodeHex(data: any, pad?: boolean): string;
    /**
     * Decode a base32hex string.
     * @param {String} str
     * @param {Boolean} [unpad=false]
     * @returns {Buffer}
     */
    export function decodeHex(str: string, unpad?: boolean): any;
    /**
     * Test a base32 hex string.
     * @param {String} str
     * @param {Boolean} [unpad=false]
     * @returns {Buffer}
     */
    export function testHex(str: string, unpad?: boolean): any;
}
declare module "bcrypto/lib/encoding/base32-browser" {
    const _exports: typeof import("bcrypto/lib/js/base32");
    export = _exports;
}
declare module "bcrypto/lib/native/base32" {
    export var native: number;
    export function encode(data: any, pad?: boolean): any;
    export function decode(str: any, unpad?: boolean): any;
    export function test(str: any, unpad?: boolean): any;
    export function encodeHex(data: any, pad?: boolean): any;
    export function decodeHex(str: any, unpad?: boolean): any;
    export function testHex(str: any, unpad?: boolean): any;
}
declare module "bcrypto/lib/encoding/base32" {
    const _exports: typeof import("bcrypto/lib/native/base32");
    export = _exports;
}
declare module "bcrypto/lib/js/base58" {
    export var native: number;
    /**
     * Encode a base58 string.
     * @param {Buffer} data
     * @returns {String}
     */
    export function encode(data: any): string;
    /**
     * Decode a base58 string.
     * @param {String} str
     * @returns {Buffer}
     * @throws on non-base58 character.
     */
    export function decode(str: string): any;
    /**
     * Test whether the string is a base58 string.
     * @param {String} str
     * @returns {Buffer}
     */
    export function test(str: string): any;
}
declare module "bcrypto/lib/encoding/base58-browser" {
    const _exports: typeof import("bcrypto/lib/js/base58");
    export = _exports;
}
declare module "bcrypto/lib/native/base58" {
    export var native: number;
    export function encode(data: any): any;
    export function decode(str: any): any;
    export function test(str: any): any;
}
declare module "bcrypto/lib/encoding/base58" {
    const _exports: typeof import("bcrypto/lib/native/base58");
    export = _exports;
}
declare module "bcrypto/lib/encoding/base64-browser" {
    const _exports: typeof import("bcrypto/lib/js/base64");
    export = _exports;
}
declare module "bcrypto/lib/js/bech32" {
    export var native: number;
    /**
     * Encode hrp and data as a bech32 string.
     * @param {String} hrp
     * @param {Buffer} data
     * @returns {String}
     */
    export function serialize(hrp: string, data: any): string;
    /**
     * Decode a bech32 string.
     * @param {String} str
     * @returns {Array} [hrp, data]
     */
    export function deserialize(str: string): any[];
    /**
     * Test whether a string is a bech32 string.
     * @param {String} str
     * @returns {Boolean}
     */
    export function is(str: string): boolean;
    /**
     * Convert serialized data to another base.
     * @param {Buffer} data
     * @param {Number} srcbits
     * @param {Number} dstbits
     * @param {Boolean} pad
     * @returns {Buffer}
     */
    export function convertBits(data: any, srcbits: number, dstbits: number, pad: boolean): any;
    /**
     * Serialize data to bech32 address.
     * @param {String} hrp
     * @param {Number} version
     * @param {Buffer} hash
     * @returns {String}
     */
    export function encode(hrp: string, version: number, hash: any): string;
    /**
     * Deserialize data from bech32 address.
     * @param {String} addr
     * @returns {Array}
     */
    export function decode(addr: string): any[];
    /**
     * Test whether a string is a bech32 string.
     * @param {String} addr
     * @returns {Boolean}
     */
    export function test(addr: string): boolean;
}
declare module "bcrypto/lib/encoding/bech32-browser" {
    const _exports: typeof import("bcrypto/lib/js/bech32");
    export = _exports;
}
declare module "bcrypto/lib/native/bech32" {
    export var native: number;
    export function serialize(hrp: any, data: any): any;
    export function deserialize(str: any): any;
    export function is(str: any): any;
    export function convertBits(data: any, srcbits: any, dstbits: any, pad: any): any;
    export function encode(hrp: any, version: any, hash: any): any;
    export function decode(addr: any): any;
    export function test(addr: any): any;
}
declare module "bcrypto/lib/encoding/bech32" {
    const _exports: typeof import("bcrypto/lib/native/bech32");
    export = _exports;
}
declare module "bcrypto/lib/js/cash32" {
    export var native: number;
    /**
     * Serialize data to cash32.
     * @param {String} prefix
     * @param {Buffer} data
     * @returns {String}
     */
    export function serialize(prefix: string, data: any): string;
    /**
     * Decode cash32 string.
     * @param {String} str
     * @param {String} fallback
     * @returns {Array} [prefix, data]
     */
    export function deserialize(str: string, fallback: string): any[];
    /**
     * Test whether a string is a cash32 string.
     * @param {String} str
     * @param {String} fallback
     * @returns {Boolean}
     */
    export function is(str: string, fallback: string): boolean;
    /**
     * Convert serialized data to another base.
     * @param {Buffer} data
     * @param {Number} srcbits
     * @param {Number} dstbits
     * @param {Boolean} pad
     * @returns {Buffer}
     */
    export function convertBits(data: any, srcbits: number, dstbits: number, pad: boolean): any;
    /**
     * Serialize data to cash32
     * @param {String} prefix
     * @param {Number} type - (0 = P2PKH, 1 = P2SH)
     * @param {Buffer} hash
     * @returns {String}
     */
    export function encode(prefix: string, type: number, hash: any): string;
    /**
     * Deserialize data from cash32 address.
     * @param {String} addr
     * @param {String} expect
     * @returns {Array}
     */
    export function decode(addr: string, expect?: string): any[];
    /**
     * Test whether a string is a cash32 string.
     * @param {String} addr
     * @param {String} expect
     * @returns {Boolean}
     */
    export function test(addr: string, expect?: string): boolean;
}
declare module "bcrypto/lib/encoding/cash32-browser" {
    const _exports: typeof import("bcrypto/lib/js/cash32");
    export = _exports;
}
declare module "bcrypto/lib/native/cash32" {
    export var native: number;
    export function serialize(prefix: any, data: any): any;
    export function deserialize(str: any, fallback: any): any;
    export function is(str: any, fallback: any): any;
    export function convertBits(data: any, srcbits: any, dstbits: any, pad: any): any;
    export function encode(prefix: any, type: any, hash: any): any;
    export function decode(addr: any, expect?: string): any;
    export function test(addr: any, expect?: string): any;
}
declare module "bcrypto/lib/encoding/cash32" {
    const _exports: typeof import("bcrypto/lib/native/cash32");
    export = _exports;
}
declare module "bcrypto/lib/encoding/pkcs3" {
    /**
     * DHParams
     */
    export class DHParams extends asn1.Sequence {
        constructor(p: any, g: any);
        p: asn1.Unsigned;
        g: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            p: asn1.Unsigned;
            g: asn1.Unsigned;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
}
declare module "bcrypto/lib/encoding/pkcs5" {
    export function pad(pt: any, size: any): any;
    export function pad(pt: any, size: any): any;
    export function unpad(pt: any, size: any): any;
    export function unpad(pt: any, size: any): any;
}
declare module "bcrypto/lib/encoding/x509" {
    /**
     * Certificate
     */
    export class Certificate extends asn1.Sequence {
        constructor();
        tbsCertificate: TBSCertificate;
        signatureAlgorithm: AlgorithmIdentifier;
        signature: asn1.BitString;
        toPEM(): string;
        format(): {
            type: any;
            tbsCertificate: TBSCertificate;
            signatureAlgorithm: AlgorithmIdentifier;
            signature: asn1.BitString;
        };
    }
    /**
     * TBSCertificate
     */
    export class TBSCertificate extends asn1.Sequence {
        constructor();
        version: asn1.Unsigned;
        serialNumber: asn1.Integer;
        signature: AlgorithmIdentifier;
        issuer: RDNSequence;
        validity: Validity;
        subject: RDNSequence;
        subjectPublicKeyInfo: SubjectPublicKeyInfo;
        issuerUniqueID: asn1.BitString;
        subjectUniqueID: asn1.BitString;
        extensions: Extensions;
        toPEM(): string;
        format(): {
            type: any;
            version: asn1.Unsigned;
            serialNumber: asn1.Integer;
            signature: AlgorithmIdentifier;
            issuer: RDNSequence;
            validity: Validity;
            subject: RDNSequence;
            subjectPublicKeyInfo: SubjectPublicKeyInfo;
            issuerUniqueID: asn1.BitString;
            subjectUniqueID: asn1.BitString;
            extensions: Extensions;
        };
    }
    /**
     * AlgorithmIdentifier
     */
    export class AlgorithmIdentifier extends asn1.Sequence {
        constructor(algorithm: any, parameters: any);
        algorithm: asn1.OID;
        parameters: asn1.Any;
        format(): {
            type: any;
            algorithm: asn1.OID;
            parameters: asn1.Any;
        };
    }
    /**
     * RDNSequence
     */
    export class RDNSequence extends asn1.Sequence {
        constructor();
        names: any[];
        format(): {
            type: any;
            names: any[];
        };
    }
    /**
     * RDN
     */
    export class RDN extends asn1.Set {
        constructor(id: any, value: any);
        attributes: Attribute[];
        format(): {
            type: any;
            attributes: Attribute[];
        };
    }
    /**
     * Attribute
     */
    export class Attribute extends asn1.Sequence {
        constructor(id: any, value: any);
        id: asn1.OID;
        value: asn1.Any;
        format(): {
            type: any;
            id: asn1.OID;
            value: asn1.Any;
        };
    }
    /**
     * Validity
     */
    export class Validity extends asn1.Sequence {
        constructor();
        notBefore: Time;
        notAfter: Time;
        format(): {
            type: any;
            notBefore: Time;
            notAfter: Time;
        };
    }
    /**
     * Time
     */
    export class Time extends asn1.Choice {
        constructor(options: any);
    }
    export class SubjectPublicKeyInfo extends asn1.Sequence {
        constructor(algorithm: any, parameters: any, publicKey: any);
        algorithm: AlgorithmIdentifier;
        publicKey: asn1.BitString;
        toPEM(): string;
        format(): {
            type: any;
            algorithm: AlgorithmIdentifier;
            publicKey: asn1.BitString;
        };
    }
    /**
     * Extensions
     */
    export class Extensions extends asn1.Sequence {
        constructor();
        extensions: any[];
        format(): {
            type: any;
            extensions: any[];
        };
    }
    /**
     * Extension
     */
    export class Extension extends asn1.Sequence {
        constructor();
        extnID: asn1.OID;
        critical: {
            value: boolean;
            readonly type: number;
            getBodySize(): number;
            writeBody(bw: any): any;
            readBody(br: any): any;
            set(value: any): any;
            clean(): boolean;
            format(): string;
            flags: number;
            mode: number;
            opt: boolean;
            target: number;
            readonly isRaw: boolean;
            explicit(target: any): any;
            implicit(target: any): any;
            optional(value?: boolean): any;
            encodeBody(extra: any): any;
            decodeBody(data: any, extra: any): any;
            from(options: any, ...extra: any[]): any;
            error(str: any): any;
            getSize(extra: any): number;
            write(bw: any, extra: any): any;
            read(br: any, extra: any): any;
            raw: any;
            fromArray(value: any): any;
            fromNumber(num: any): any;
            fromPEM(num: any): any;
        };
        extnValue: asn1.OctString;
        format(): {
            type: any;
            extnID: asn1.OID;
            critical: {
                value: boolean;
                readonly type: number;
                getBodySize(): number;
                writeBody(bw: any): any;
                readBody(br: any): any;
                set(value: any): any;
                clean(): boolean;
                format(): string;
                flags: number;
                mode: number;
                opt: boolean;
                target: number;
                readonly isRaw: boolean;
                explicit(target: any): any;
                implicit(target: any): any;
                optional(value?: boolean): any;
                encodeBody(extra: any): any;
                decodeBody(data: any, extra: any): any;
                from(options: any, ...extra: any[]): any;
                error(str: any): any;
                getSize(extra: any): number;
                write(bw: any, extra: any): any;
                read(br: any, extra: any): any;
                raw: any;
                fromArray(value: any): any;
                fromNumber(num: any): any;
                fromPEM(num: any): any;
            };
            extnValue: asn1.OctString;
        };
    }
    /**
     * DigestInfo
     */
    export class DigestInfo extends asn1.Sequence {
        constructor(algorithm: any, digest: any);
        algorithm: AlgorithmIdentifier;
        digest: asn1.OctString;
        format(): {
            type: any;
            algorithm: AlgorithmIdentifier;
            digest: asn1.OctString;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
}
declare module "bcrypto/lib/encoding/pkcs8" {
    /**
     * PublicKeyInfo
     */
    export class PublicKeyInfo extends asn1.Sequence {
        constructor(algorithm: any, identifier: any, publicKey: any);
        algorithm: x509.AlgorithmIdentifier;
        publicKey: asn1.BitString;
        toPEM(): string;
        format(): {
            type: any;
            algorithm: x509.AlgorithmIdentifier;
            publicKey: asn1.BitString;
        };
    }
    /**
     * PrivateKeyInfo
     */
    export class PrivateKeyInfo extends asn1.Sequence {
        constructor(version: any, algorithm: any, parameters: any, privateKey: any);
        version: asn1.Unsigned;
        algorithm: x509.AlgorithmIdentifier;
        privateKey: asn1.OctString;
        toPEM(): string;
        format(): {
            type: any;
            version: asn1.Unsigned;
            algorithm: x509.AlgorithmIdentifier;
            privateKey: asn1.OctString;
        };
    }
    /**
     * EncryptedPrivateKeyInfo
     */
    export class EncryptedPrivateKeyInfo extends asn1.Sequence {
        constructor(algorithm: any, identifier: any, data: any);
        algorithm: x509.AlgorithmIdentifier;
        data: asn1.OctString;
        toPEM(): string;
        format(): {
            type: any;
            algorithm: x509.AlgorithmIdentifier;
            data: asn1.OctString;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
    import x509 = require("bcrypto/lib/encoding/x509");
}
declare module "bcrypto/lib/encoding/rfc3279" {
    /**
     * DSA Parms
     */
    export class DSAParams extends asn1.Sequence {
        constructor(p: any, q: any, g: any);
        p: asn1.Unsigned;
        q: asn1.Unsigned;
        g: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            p: asn1.Unsigned;
            q: asn1.Unsigned;
            g: asn1.Unsigned;
        };
    }
    /**
     * DSA Public Key
     */
    export class DSAPublicKey extends asn1.Unsigned {
        constructor(y: any);
        set y(arg: any);
        get y(): any;
        toPEM(): string;
    }
    /**
     * DSA Signature
     */
    export class DSASignature extends asn1.Sequence {
        constructor(r: any, s: any);
        r: asn1.Unsigned;
        s: asn1.Unsigned;
        toPEM(): string;
        format(): {
            type: any;
            r: asn1.Unsigned;
            s: asn1.Unsigned;
        };
    }
    import asn1 = require("bcrypto/lib/encoding/asn1");
}
declare module "bcrypto/lib/encoding/index" {
    export var asn1: typeof import("bcrypto/lib/encoding/asn1");
    export var base16: typeof import("bcrypto/lib/native/base16");
    export var base32: typeof import("bcrypto/lib/native/base32");
    export var base58: typeof import("bcrypto/lib/native/base58");
    export var base64: typeof import("bcrypto/lib/native/base64");
    export var bech32: typeof import("bcrypto/lib/native/bech32");
    export var cash32: typeof import("bcrypto/lib/native/cash32");
    export var lines: typeof import("bcrypto/lib/encoding/lines");
    export var openssl: typeof import("bcrypto/lib/encoding/openssl");
    export var pem: typeof import("bcrypto/lib/encoding/pem");
    export var pemcrypt: typeof import("bcrypto/lib/encoding/pemcrypt");
    export var pkcs1: typeof import("bcrypto/lib/encoding/pkcs1");
    export var pkcs3: typeof import("bcrypto/lib/encoding/pkcs3");
    export var pkcs5: {
        pad(pt: any, size: any): any;
        unpad(pt: any, size: any): any;
    };
    export var pkcs8: typeof import("bcrypto/lib/encoding/pkcs8");
    export var rfc3279: typeof import("bcrypto/lib/encoding/rfc3279");
    export var sec1: typeof import("bcrypto/lib/encoding/sec1");
    export var util: typeof import("bcrypto/lib/encoding/util");
    export var x509: typeof import("bcrypto/lib/encoding/x509");
}
declare module "bcrypto/lib/internal/custom-browser" {
    export var custom: string;
}
declare module "bcrypto/lib/internal/pgpdf-browser" {
    const _exports: typeof import("bcrypto/lib/js/pgpdf");
    export = _exports;
}
declare module "bcrypto/lib/js/ristretto" {
    export = Ristretto;
    /**
     * Ristretto
     */
    class Ristretto {
        constructor(curve: any);
        curve: any;
        Point: any;
        ad: any;
        amd: any;
        adm1s: any;
        adm1si: any;
        dpa: any;
        dma: any;
        dmaddpa: any;
        qnr: any;
        amdsi: any;
        dmasi: any;
        qnrds: any;
        _fix(): void;
        _invsqrt(v: any): any[];
        _isqrt(u: any, v: any): any[];
        encode(p: any): any;
        decode(bytes: any): any;
        encodeBatch(points: any): any[];
        eq(p: any, q: any): boolean;
        isInfinity(p: any): boolean;
        pointFromUniform(r0: any): any;
        pointToUniform(p: any, hint: any): any;
        _quartic(p: any): any[][];
        _invert(s: any, t: any, hint: any): any;
        pointFromHash(bytes: any): any;
        pointToHash(p: any, rng: any): any;
        randomPoint(rng: any): any;
    }
}
