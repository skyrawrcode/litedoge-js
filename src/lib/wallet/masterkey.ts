/*!
 * masterkey.js - master bip32 key object for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
import bio, { StaticWriter } from 'bufio';
import { Lock } from 'bmutex';
import { random } from 'bcrypto';
import { cleanse } from 'bcrypto';
import { aes } from 'bcrypto';
import sha256 from 'bcrypto/lib/sha256';
import hash256 from 'bcrypto/lib/hash256';
import secp256k1 from 'bcrypto/lib/secp256k1';
import pbkdf2 from 'bcrypto/lib/pbkdf2';
import scrypt from 'bcrypto/lib/scrypt';
import * as  util from '../utils/util';
import { HDPrivateKey } from '../hd/private';
import { Mnemonic } from '../hd/mnemonic';
const { encoding } = bio;
import { inspectSymbol } from '../utils';
import { BufferWriter } from 'bufio';
import { Network } from '../protocol';

/**
 * Key derivation algorithms.
 * @enum {Number}
 * @default
 */

export enum MasterKeyAlg {
  PBKDF2 = 0,
  SCRYPT = 1
};


export class MasterKeyOptions {
  encrypted: any;
  iv: any;
  ciphertext: any;
  key: any;
  mnemonic: any;
  alg: any;
  rounds: any;
  n: any;
  r: any;
  p: any;

}

/**
 * Master Key
 * Master BIP32 key which can exist
 * in a timed out encrypted state.
 * @alias module:wallet.MasterKey
 */

export class MasterKey {
  encrypted: boolean;
  iv: any;
  ciphertext: any;
  key: any;
  mnemonic: any;
  alg: any;
  n: number;
  r: number;
  p: number;
  aesKey: any;
  timer: any;
  until: number;
  locker: Lock;
  static algByVal: any;
  rounds: any;
  static SALT: any;
  static alg: MasterKeyAlg;
  /**
   * Create a master key.
   * @constructor
   * @param {Object} options
   */

  constructor(options?: MasterKeyOptions) {
    this.encrypted = false;
    this.iv = null;
    this.ciphertext = null;
    this.key = null;
    this.mnemonic = null;

    this.alg = MasterKeyAlg.PBKDF2;
    this.n = 50000;
    this.r = 0;
    this.p = 0;

    this.aesKey = null;
    this.timer = null;
    this.until = 0;
    this.locker = new Lock();

    if (options)
      this.fromOptions(options);
  }

  /**
   * Inject properties from options object.
   * @private
   * @param {Object} options
   */

  fromOptions(options: MasterKeyOptions) {
    assert(options);

    if (options.encrypted != null) {
      assert(typeof options.encrypted === 'boolean');
      this.encrypted = options.encrypted;
    }

    if (options.iv) {
      assert(Buffer.isBuffer(options.iv));
      this.iv = options.iv;
    }

    if (options.ciphertext) {
      assert(Buffer.isBuffer(options.ciphertext));
      this.ciphertext = options.ciphertext;
    }

    if (options.key) {
      assert(HDPrivateKey.isHDPrivateKey(options.key));
      this.key = options.key;
    }

    if (options.mnemonic) {
      assert(options.mnemonic instanceof Mnemonic);
      this.mnemonic = options.mnemonic;
    }

    if (options.alg != null) {
      if (typeof options.alg === 'string') {
        this.alg = MasterKeyAlg[options.alg.toUpperCase()];
        assert(this.alg != null, 'Unknown algorithm.');
      } else {
        assert(typeof options.alg === 'number');
        assert(MasterKeyAlg[options.alg]);
        this.alg = options.alg;
      }
    }

    if (options.rounds != null) {
      assert((options.rounds >>> 0) === options.rounds);
      this.rounds = options.rounds;
    }

    if (options.n != null) {
      assert((options.n >>> 0) === options.n);
      this.n = options.n;
    }

    if (options.r != null) {
      assert((options.r >>> 0) === options.r);
      this.r = options.r;
    }

    if (options.p != null) {
      assert((options.p >>> 0) === options.p);
      this.p = options.p;
    }

    assert(this.encrypted ? !this.key : this.key);

    return this;
  }

  /**
   * Instantiate master key from options.
   * @returns {MasterKey}
   */

  static fromOptions(options): MasterKey {
    return new this().fromOptions(options);
  }

  /**
   * Decrypt the key and set a timeout to destroy decrypted data.
   * @param {Buffer|String} passphrase - Zero this yourself.
   * @param {Number} [timeout=60000] timeout in ms.
   * @returns {Promise} - Returns {@link HDPrivateKey}.
   */

  async unlock(passphrase: Buffer | string, timeout: number): Promise<any> {
    const _unlock = await this.locker.lock();
    try {
      return await this._unlock(passphrase, timeout);
    } finally {
      _unlock();
    }
  }

  /**
   * Decrypt the key without a lock.
   * @private
   * @param {Buffer|String} passphrase - Zero this yourself.
   * @param {Number} [timeout=60000] timeout in ms.
   * @returns {Promise} - Returns {@link HDPrivateKey}.
   */

  async _unlock(passphrase: Buffer | string, timeout: number): Promise<any> {
    if (this.key) {
      if (this.encrypted) {
        assert(this.timer != null);
        this.start(timeout);
      }
      return this.key;
    }

    if (!passphrase)
      throw new Error('No passphrase.');

    assert(this.encrypted);

    const key = await this.derive(passphrase);
    const data = aes.decipher(this.ciphertext, key, this.iv);

    this.readKey(data);

    this.start(timeout);

    this.aesKey = key;

    return this.key;
  }

  /**
   * Start the destroy timer.
   * @private
   * @param {Number} [timeout=60] timeout in seconds.
   */

  start(timeout: number) {
    if (!timeout)
      timeout = 60;

    this.stop();

    if (timeout === -1)
      return;

    assert((timeout >>> 0) === timeout);

    this.until = util.now() + timeout;
    this.timer = setTimeout(() => this.lock(), timeout * 1000);
  }

  /**
   * Stop the destroy timer.
   * @private
   */

  stop() {
    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
      this.until = 0;
    }
  }

  /**
   * Derive an aes key based on params.
   * @param {String|Buffer} passphrase
   * @returns {Promise}
   */

  async derive(passwd): Promise<any> {
    const salt = MasterKey.SALT;
    const n = this.n;
    const r = this.r;
    const p = this.p;

    if (typeof passwd === 'string')
      passwd = Buffer.from(passwd, 'utf8');

    switch (this.alg) {
      case MasterKeyAlg.PBKDF2:
        return pbkdf2.deriveAsync(sha256, passwd, salt, n, 32);
      case MasterKeyAlg.SCRYPT:
        return scrypt.deriveAsync(passwd, salt, n, r, p, 32);
      default:
        throw new Error(`Unknown algorithm: ${this.alg}.`);
    }
  }

  /**
   * Encrypt data with in-memory aes key.
   * @param {Buffer} data
   * @param {Buffer} iv
   * @returns {Buffer}
   */

  encipher(data: Buffer, iv: Buffer): Buffer {
    if (!this.aesKey)
      return null;

    return aes.encipher(data, this.aesKey, iv.slice(0, 16));
  }

  /**
   * Decrypt data with in-memory aes key.
   * @param {Buffer} data
   * @param {Buffer} iv
   * @returns {Buffer}
   */

  decipher(data: Buffer, iv: Buffer): Buffer {
    if (!this.aesKey)
      return null;

    return aes.decipher(data, this.aesKey, iv.slice(0, 16));
  }

  /**
   * Destroy the key by zeroing the
   * privateKey and chainCode. Stop
   * the timer if there is one.
   * @returns {Promise}
   */

  async lock(): Promise<any> {
    const unlock = await this.locker.lock();
    try {
      return await this._lock();
    } finally {
      unlock();
    }
  }

  /**
   * Destroy the key by zeroing the
   * privateKey and chainCode. Stop
   * the timer if there is one.
   */

  _lock() {
    if (!this.encrypted) {
      assert(this.timer == null);
      assert(this.key);
      return;
    }

    this.stop();

    if (this.key) {
      this.key.destroy(true);
      this.key = null;
    }

    if (this.aesKey) {
      cleanse(this.aesKey);
      this.aesKey = null;
    }
  }

  /**
   * Destroy the key permanently.
   */

  async destroy() {
    await this.lock();
    this.locker.destroy();
  }

  /**
   * Decrypt the key permanently.
   * @param {Buffer|String} passphrase - Zero this yourself.
   * @returns {Promise}
   */

  async decrypt(passphrase: Buffer | string, clean): Promise<any> {
    const unlock = await this.locker.lock();
    try {
      return await this._decrypt(passphrase, clean);
    } finally {
      unlock();
    }
  }

  /**
   * Decrypt the key permanently without a lock.
   * @private
   * @param {Buffer|String} passphrase - Zero this yourself.
   * @returns {Promise}
   */

  async _decrypt(passphrase: Buffer | string, clean): Promise<any> {
    if (!this.encrypted)
      throw new Error('Master key is not encrypted.');

    if (!passphrase)
      throw new Error('No passphrase provided.');

    this._lock();

    const key = await this.derive(passphrase);
    const data = aes.decipher(this.ciphertext, key, this.iv);

    this.readKey(data);
    this.encrypted = false;
    this.iv = null;
    this.ciphertext = null;

    if (!clean) {
      cleanse(key);
      return null;
    }

    return key;
  }

  /**
   * Encrypt the key permanently.
   * @param {Buffer|String} passphrase - Zero this yourself.
   * @returns {Promise}
   */

  async encrypt(passphrase: Buffer | string, clean?: boolean): Promise<any> {
    const unlock = await this.locker.lock();
    try {
      return await this._encrypt(passphrase, clean);
    } finally {
      unlock();
    }
  }

  /**
   * Encrypt the key permanently without a lock.
   * @private
   * @param {Buffer|String} passphrase - Zero this yourself.
   * @returns {Promise}
   */

  async _encrypt(passphrase: Buffer | string, clean?: boolean): Promise<any> {
    if (this.encrypted)
      throw new Error('Master key is already encrypted.');

    if (!passphrase)
      throw new Error('No passphrase provided.');

    const raw = this.writeKey();
    const iv = random.randomBytes(16);

    this.stop();

    const key = await this.derive(passphrase);
    const data = aes.encipher(raw, key, iv);

    this.key = null;
    this.mnemonic = null;
    this.encrypted = true;
    this.iv = iv;
    this.ciphertext = data;

    if (!clean) {
      cleanse(key);
      return null;
    }

    return key;
  }

  /**
   * Calculate key serialization size.
   * @returns {Number}
   */

  keySize(): number {
    let size = 0;

    size += 64;
    size += 1;

    if (this.mnemonic)
      size += this.mnemonic.getSize();

    return size;
  }

  /**
   * Serialize key and menmonic to a single buffer.
   * @returns {Buffer}
   */

  writeKey(): Buffer {
    const bw = bio.write(this.keySize());

    bw.writeBytes(this.key.chainCode);
    bw.writeBytes(this.key.privateKey);

    if (this.mnemonic) {
      bw.writeU8(1);
      this.mnemonic.toWriter(bw);
    } else {
      bw.writeU8(0);
    }

    return bw.render();
  }

  /**
   * Inject properties from serialized key.
   * @param {Buffer} data
   */

  readKey(data: Buffer) {
    const br = bio.read(data);

    this.key = new HDPrivateKey();

    if (isLegacy(data)) {
      br.seek(13);
      this.key.chainCode = br.readBytes(32);
      assert(br.readU8() === 0);
      this.key.privateKey = br.readBytes(32);
    } else {
      this.key.chainCode = br.readBytes(32);
      this.key.privateKey = br.readBytes(32);
    }

    this.key.publicKey = secp256k1.publicKeyCreate(this.key.privateKey, true);

    if (br.readU8() === 1)
      this.mnemonic = Mnemonic.fromReader(br);

    return this;
  }

  /**
   * Calculate serialization size.
   * @returns {Number}
   */

  getSize(): number {
    let size = 0;

    if (this.encrypted) {
      size += 1;
      size += encoding.sizeVarBytes(this.iv);
      size += encoding.sizeVarBytes(this.ciphertext);
      size += 13;
      return size;
    }

    size += 1;
    size += this.keySize();

    return size;
  }

  /**
   * Serialize the key in the form of:
   * `[enc-flag][iv?][ciphertext?][extended-key?]`
   */

  toWriter(bw: BufferWriter | StaticWriter): BufferWriter|StaticWriter {
    if (this.encrypted) {
      bw.writeU8(1);
      bw.writeVarBytes(this.iv);
      bw.writeVarBytes(this.ciphertext);

      bw.writeU8(this.alg);
      bw.writeU32(this.n);
      bw.writeU32(this.r);
      bw.writeU32(this.p);

      return bw;
    }

    bw.writeU8(0);

    bw.writeBytes(this.key.chainCode);
    bw.writeBytes(this.key.privateKey);

    if (this.mnemonic) {
      bw.writeU8(1);
      this.mnemonic.toWriter(bw);
    } else {
      bw.writeU8(0);
    }

    return bw;
  }

  /**
   * Serialize the key in the form of:
   * `[enc-flag][iv?][ciphertext?][extended-key?]`
   * @returns {Buffer}
   */

  toRaw(): Buffer {
    const size = this.getSize();
    return this.toWriter(bio.write(size)).render();
  }

  /**
   * Inject properties from serialized data.
   * @private
   * @param {Buffer} raw
   */

  fromReader(br) {
    this.encrypted = br.readU8() === 1;

    if (this.encrypted) {
      this.iv = br.readVarBytes();
      this.ciphertext = br.readVarBytes();

      this.alg = br.readU8();

      assert(this.alg < MasterKey.algByVal.length);

      this.n = br.readU32();
      this.r = br.readU32();
      this.p = br.readU32();

      return this;
    }

    this.key = new HDPrivateKey();
    this.key.chainCode = br.readBytes(32);
    this.key.privateKey = br.readBytes(32);
    this.key.publicKey = secp256k1.publicKeyCreate(this.key.privateKey, true);

    if (br.readU8() === 1)
      this.mnemonic = Mnemonic.fromReader(br);

    return this;
  }

  /**
   * Instantiate master key from serialized data.
   * @returns {MasterKey}
   */

  static fromReader(br): MasterKey {
    return new this().fromReader(br);
  }

  /**
   * Inject properties from serialized data.
   * @private
   * @param {Buffer} raw
   */

  fromRaw(raw: Buffer) {
    return this.fromReader(bio.read(raw));
  }

  /**
   * Instantiate master key from serialized data.
   * @returns {MasterKey}
   */

  static fromRaw(raw): MasterKey {
    return new this().fromRaw(raw);
  }

  /**
   * Inject properties from an HDPrivateKey.
   * @private
   * @param {HDPrivateKey} key
   * @param {Mnemonic?} mnemonic
   */

  fromKey(key: HDPrivateKey, mnemonic: Mnemonic | null) {
    this.encrypted = false;
    this.iv = null;
    this.ciphertext = null;
    this.key = key;
    this.mnemonic = mnemonic || null;
    return this;
  }

  /**
   * Instantiate master key from an HDPrivateKey.
   * @param {HDPrivateKey} key
   * @param {Mnemonic?} mnemonic
   * @returns {MasterKey}
   */

  static fromKey(key: HDPrivateKey, mnemonic: Mnemonic | null): MasterKey {
    return new this().fromKey(key, mnemonic);
  }

  /**
   * Convert master key to a jsonifiable object.
   * @param {Network?} network
   * @param {Boolean?} unsafe - Whether to include
   * the key data in the JSON.
   * @returns {Object}
   */

  toJSON(network: Network | null, unsafe: boolean | null): {
    encrypted:boolean,
    key?: any,
    mnemonic?: any
    until?: any;
    iv?: string;
    ciphertext?: string;
    algorithm?:string,
    n?: number,
    r?: number,
    p?:number
  } {
    if (this.encrypted) {
      return {
        encrypted: true,
        until: this.until,
        iv: this.iv.toString('hex'),
        ciphertext: unsafe ? this.ciphertext.toString('hex') : undefined,
        algorithm: MasterKeyAlg[this.alg].toLowerCase(),
        n: this.n,
        r: this.r,
        p: this.p
      };
    }

    return {
      encrypted: false,
      key: unsafe ? this.key.toJSON(network) : undefined,
      mnemonic: unsafe && this.mnemonic ? this.mnemonic.toJSON() : undefined
    };
  }

  /**
   * Inspect the key.
   * @returns {Object}
   */

  [inspectSymbol]() {
    const json = this.toJSON(null, true);

    if (this.key)
      json.key = this.key.toJSON();

    if (this.mnemonic)
      json.mnemonic = this.mnemonic.toJSON();

    return json;
  }

  /**
   * Test whether an object is a MasterKey.
   * @param {Object} obj
   * @returns {Boolean}
   */

  static isMasterKey(obj: object): boolean {
    return obj instanceof MasterKey;
  }
}

/**
 * Key derivation salt.
 * @const {Buffer}
 * @default
 */

MasterKey.SALT = Buffer.from('bcoin', 'ascii');



/*
 * Helpers
 */

function isLegacy(data) {
  if (data.length < 82)
    return false;

  const key = data.slice(0, 78);
  const chk = data.readUInt32LE(78, true);

  const hash = hash256.digest(key);

  return hash.readUInt32LE(0, true) === chk;
}

