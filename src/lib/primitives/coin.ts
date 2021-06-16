/*!
 * coin.js - coin object for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
import bio, {BufferReader, BufferWriter, StaticWriter} from 'bufio';
import {inspectSymbol, util} from '../utils/index.js';
import {Amount} from '../btc/amount.js';
import {Output} from './output.js';
import {Network} from '../protocol/network.js';
import {consensus} from '../protocol/index.js';
import {Outpoint} from './outpoint.js';
import {TX} from './tx.js';
import {Script} from '../script/index.js';
import {Address} from './address.js';

export interface CoinJson {
  index: number;
  hash: string;
  script: string;
  coinstake: boolean;
  coinbase: boolean;
  value: string;
  height: number;
  version: number;
  address: Address;
}

export interface CoinOptions {
  index?: number;
  hash?: Buffer;
  value?: number | bigint;
  height?: number;
  version?: number;
  script?: Script;
  coinstake?: boolean;
  coinbase?: boolean;
}

/**
 * Coin
 * Represents an unspent output.
 * @alias module:primitives.Coin
 * @extends Output
 * @property {Number} version
 * @property {Number} height
 * @property {Amount} value
 * @property {Script} script
 * @property {Boolean} coinbase
 * @property {Boolean} coinstake
 * @property {Hash} hash
 * @property {Number} index
 */

export class Coin extends Output {
  version: number;
  height: number;
  coinbase: boolean;
  coinstake: boolean;
  hash: any;
  index: number;

  /**
   * Create a coin.
   * @constructor
   * @param {Object} options
   */

  constructor(options: any = null) {
    super();

    this.version = 1;
    this.height = -1;
    this.coinbase = false;
    this.coinstake = false;
    this.hash = consensus.ZERO_HASH;
    this.index = 0;

    if (options)
      this.fromOptions(options);
  }

  /**
   * Instantiate Coin from options object.
   * @private
   * @param {Object} options
   */

  static fromOptions(options: object) {
    return new Coin().fromOptions(options);
  }

  /**
   * Instantiate coin from hash table key.
   * @param {String} key
   * @returns {Coin}
   */

  static fromKey(key: string): Coin {
    return new this().fromKey(key);
  }

  /**
   * Instantiate an Coin from a jsonified coin object.
   * @param {Object} json - The jsonified coin object.
   * @returns {Coin}
   */

  static fromJSON(json: CoinJson): Coin {
    return new this().fromJSON(json);
  }

  /**
   * Instantiate a coin from a buffer reader.
   * @param {BufferReader} br
   * @returns {Coin}
   */

  static fromReader(br: BufferReader): Coin {
    return new this().fromReader(br);
  }

  /**
   * Instantiate a coin from a serialized Buffer.
   * @param {Buffer} data
   * @param {String?} enc - Encoding, can be `'hex'` or null.
   * @returns {Coin}
   */

  static fromRaw(data: Buffer, enc?: 'hex' | null): Coin {
    if (typeof data === 'string')
      data = Buffer.from(data, enc);
    return new this().fromRaw(data);
  }

  /**
   * Instantiate a coin from a TX
   * @param {TX} tx
   * @param {Number} index - Output index.
   * @returns {Coin}
   */

  static fromTX(tx: TX, index: number, height): Coin {
    return new this().fromTX(tx, index, height);
  }

  /**
   * Test an object to see if it is a Coin.
   * @param {Object} obj
   * @returns {Boolean}
   */

  static isCoin(obj: object): boolean {
    return obj instanceof Coin;
  }

  /**
   * Inject options into coin.
   * @private
   * @param {Object} options
   */

  fromOptions(options: CoinOptions) {
    assert(options, 'Coin data is required.');

    if (options.version != null) {
      assert((options.version >>> 0) === options.version,
        'Version must be a uint32.');
      this.version = options.version;
    }

    if (options.height != null) {
      if (options.height !== -1) {
        assert((options.height >>> 0) === options.height,
          'Height must be a uint32.');
        this.height = options.height;
      } else {
        this.height = -1;
      }
    }

    if (options.value != null) {
      this.value = BigInt(options.value);
    }

    if (options.script)
      this.script.fromOptions(options.script);

    if (options.coinbase != null) {
      assert(typeof options.coinbase === 'boolean',
        'Coinbase must be a boolean.');
      this.coinbase = options.coinbase;
    }

    if (options.coinstake != null) {
      assert(typeof options.coinstake === 'boolean',
        'Coinstake must be a boolean.');
      this.coinstake = options.coinstake;
    }

    if (options.hash != null) {
      assert(Buffer.isBuffer(options.hash));
      this.hash = options.hash;
    }

    if (options.index != null) {
      assert((options.index >>> 0) === options.index,
        'Index must be a uint32.');
      this.index = options.index;
    }

    return this;
  }

  /**
   * Clone the coin.
   * @private
   * @returns {Coin}
   */

  clone(): Output {
    assert(false, 'Coins are not cloneable.');
    return null;
  }

  /**
   * Calculate number of confirmations since coin was created.
   * @param {Number?} height - Current chain height. Network
   * height is used if not passed in.
   * @return {Number}
   */

  getDepth(height: number | null): number {
    assert(typeof height === 'number', 'Must pass a height.');

    if (this.height === -1)
      return 0;

    if (height === -1)
      return 0;

    if (height < this.height)
      return 0;

    return height - this.height + 1;
  }

  /**
   * Serialize coin to a key
   * suitable for a hash table.
   * @returns {String}
   */

  toKey(): string {
    return Outpoint.toKey(this.hash, this.index);
  }

  /**
   * Inject properties from hash table key.
   * @private
   * @param {String} key
   * @returns {Coin}
   */

  fromKey(key: string): Coin {
    const {hash, index} = Outpoint.fromKey(key);
    this.hash = hash;
    this.index = index;
    return this;
  }

  /**
   * Get little-endian hash.
   * @returns {Hash}
   */

  rhash(): string {
    return util.revHex(this.hash);
  }

  /**
   * Get little-endian hash.
   * @returns {Hash}
   */

  txid(): string {
    return this.rhash();
  }

  /**
   * Convert the coin to a more user-friendly object.
   * @returns {Object}
   */

  [inspectSymbol]() {
    return {
      type: this.getType(),
      version: this.version,
      height: this.height,
      value: Amount.btc(this.value),
      script: this.script,
      coinbase: this.coinbase,
      coinstake: this.coinstake,
      hash: this.hash ? util.revHex(this.hash) : null,
      index: this.index,
      address: this.getAddress()
    };
  }

  /**
   * Convert the coin to an object suitable
   * for JSON serialization.
   * @returns {Object}
   */

  toJSON(): object {
    return this.getJSON();
  }

  /**
   * Convert the coin to an object suitable
   * for JSON serialization. Note that the hash
   * will be reversed to abide by bitcoind's legacy
   * of little-endian uint256s.
   * @param {Network} network
   * @param {Boolean} minimal
   * @returns {Object}
   */
  getJSON(network: Network = null, minimal?: boolean): CoinJson {
    let addr = this.getAddress();

    network = Network.get(network);

    if (addr)
      addr = addr.toString(network);

    return {
      version: this.version,
      height: this.height,
      value: this.value.toString(),
      script: this.script.toJSON(),
      address: addr,
      coinbase: this.coinbase,
      coinstake: this.coinstake,
      hash: !minimal ? this.rhash() : undefined,
      index: !minimal ? this.index : undefined
    };
  }

  /**
   * Inject JSON properties into coin.
   * @private
   * @param {Object} json
   */

  fromJSON(json: CoinJson) {
    assert(json, 'Coin data required.');
    assert((json.version >>> 0) === json.version, 'Version must be a uint32.');
    assert(json.height === -1 || (json.height >>> 0) === json.height,
      'Height must be a uint32.');
    assert(BigInt(json.value) >= 0n, 'Value must be a uint64.');
    assert(typeof json.coinbase === 'boolean', 'Coinbase must be a boolean.');
    assert(typeof json.coinstake === 'boolean', 'Coinstake must be a boolean.');

    this.version = json.version;
    this.height = json.height;
    this.value = BigInt(json.value);
    this.script.fromJSON(json.script);
    this.coinbase = json.coinbase;
    this.coinstake = json.coinstake;
    if (json.hash != null) {
      assert(typeof json.hash === 'string', 'Hash must be a string.');
      assert(json.hash.length === 64, 'Hash must be a string.');
      assert((json.index >>> 0) === json.index, 'Index must be a uint32.');
      this.hash = util.fromRev(json.hash);
      this.index = json.index;
    }

    return this;
  }

  /**
   * Calculate size of coin.
   * @returns {Number}
   */

  getSize(): number {
    return 17 + this.script.getVarSize();
  }

  /**
   * @param network
   * @param tipHeight
   */
  getBlocksToMaturity(network: Network, tipHeight: number) {
    network = Network.get(network);

    if (!(this.coinbase || this.coinstake))
      return 0;
    return Math.max(0, ((network.pos.coinbaseMaturity + 1) - this.getDepth(tipHeight)));
  }

  /**
   * Write the coin to a buffer writer.
   * @param {BufferWriter} bw
   */

  toWriter(bw: BufferWriter | StaticWriter) {
    let height = this.height;

    if (height === -1)
      height = 0x7fffffff;

    bw.writeU32(this.version);
    bw.writeU32(height);
    bw.writeI64BI(this.value);
    bw.writeVarBytes(this.script.toRaw());

    let flags;
    flags = (this.coinbase ? 1 : 0) << 0
    flags |= (this.coinstake ? 1 : 0) << 1
    bw.writeU8(flags);
    return bw;
  }

  /**
   * Serialize the coin.
   * @returns {Buffer|String}
   */

  toRaw(): Buffer | string {
    const size = this.getSize();
    return this.toWriter(bio.write(size)).render();
  }

  /**
   * Inject properties from serialized buffer writer.
   * @private
   * @param {BufferReader} br
   */

  fromReader(br: BufferReader) {
    this.version = br.readU32();
    this.height = br.readU32();
    this.value = br.readI64BI();
    this.script.fromRaw(br.readVarBytes());
    const flags = br.readU8();
    this.coinbase = !!(flags & (1 << 0));
    this.coinstake = !!(flags & (1 << 1));
    if (this.height === 0x7fffffff)
      this.height = -1;

    return this;
  }

  /**
   * Inject properties from serialized data.
   * @private
   * @param {Buffer} data
   */

  fromRaw(data: Buffer) {
    return this.fromReader(bio.read(data));
  }

  /**
   * Inject properties from TX.
   * @param {TX} tx
   * @param {Number} index
   */

  fromTX(tx: TX, index: number, height) {
    assert(typeof index === 'number');
    assert(typeof height === 'number');
    assert(index >= 0 && index < tx.outputs.length);
    this.version = tx.version;
    this.height = height;
    this.value = tx.outputs[index].value;
    this.script = tx.outputs[index].script;
    this.coinbase = tx.isCoinbase();
    this.coinstake = tx.isCoinstake();
    this.hash = tx.hash();
    this.index = index;
    return this;
  }
}


