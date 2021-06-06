/*!
 * input.js - input object for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import { Outpoint, OutpointJson, OutpointOptions } from "./outpoint.js";

import assert from 'bsert';
import bio, { BufferReader, BufferWriter, StaticWriter } from 'bufio';
import { inspectSymbol } from '../utils/index.js';
import { Script, ScriptOptions } from "../script/script.js";
import { Coin, CoinJson } from "./coin.js";
import { TX } from "./tx.js";
import { Address } from "./address.js";
import { Network } from "../protocol/index.js";
import { ScriptTypes } from "../script/common.js";
import { Output } from "./output.js";

export interface InputOptions {
  prevout?: OutpointOptions;
  script?: ScriptOptions;
  sequence?: number; 
}
export interface InputJson {  
  prevout: OutpointJson;
  script: string;
  sequence: number;
  address: string;
  coin: CoinJson;
  
}

/**
 * Input
 * Represents a transaction input.
 * @alias module:primitives.Input
 * @property {Outpoint} prevout - Outpoint.
 * @property {Script} script - Input script / scriptSig.
 * @property {Number} sequence - nSequence.
 */

export class Input {
  script: Script;
  sequence: number;
  prevout: Outpoint;
  /**
   * Create transaction input.
   */

  constructor(options?: InputOptions) {
    this.prevout = new Outpoint();
    this.script = new Script();
    this.sequence = 0xffffffff;

    if (options)
      this.fromOptions(options);
  }

  /**
   * Inject properties from options object.
   * @private
   * @param {Object} options
   */

  fromOptions(options: InputOptions) {
    assert(options, 'Input data is required.');

    this.prevout.fromOptions(options.prevout);

    if (options.script)
      this.script.fromOptions(options.script);

    if (options.sequence != null) {
      assert((options.sequence >>> 0) === options.sequence,
        'Sequence must be a uint32.');
      this.sequence = options.sequence;
    }


    return this;
  }

  /**
   * Instantiate an Input from options object.
   * @param {Object} options
   * @returns {Input}
   */

  static fromOptions(options: object | Input): Input {
    return new Input().fromOptions(options);
  }

  /**
   * Clone the input.
   * @returns {Input}
   */

  clone(): Input {
    const input = new Input();
    input.prevout = this.prevout;
    input.script.inject(this.script);
    input.sequence = this.sequence;
    return input;
  }

  /**
   * Test equality against another input.
   * @param {Input} input
   * @returns {Boolean}
   */

  equals(input: { prevout: any; }): boolean {
    assert(Input.isInput(input));
    return this.prevout.equals(input.prevout);
  }

  /**
   * Compare against another input (BIP69).
   * @param {Input} input
   * @returns {Number}
   */

  compare(input: { prevout: any; }): number {
    assert(Input.isInput(input));
    return this.prevout.compare(input.prevout);
  }

  /**
   * Get the previous output script type as a string.
   * Will "guess" based on the input script
   * @param {Coin?} coin
   * @returns {ScriptType} type
   */

  getType(coin: { getType: () => any; }): string {
    if (this.isCoinbase())
      return 'coinbase';


    if (coin)
      return coin.getType();

    let type = this.script.getInputType();

    return ScriptTypes[type].toLowerCase();
  }

  /**
   * Get the redeem script.
   * @param {Coin?} coin
   * @returns {Script?} Redeem script.
   */

  getRedeem(coin: { script: any; }): Script | null {
    if (this.isCoinbase())
      return null;

    if (!coin) {
      if (this.script.isScripthashInput())
        return this.script.getRedeem();

      return null;
    }

    let prev = coin.script;
    let redeem = null;

    if (prev.isScripthash()) {
      prev = this.script.getRedeem();
      redeem = prev;
    }

    return redeem;
  }

  /**
   * Get the redeem script type.
   * @param {Coin?} coin
   * @returns {String} subtype
   */

  getSubtype(coin: any): string {
    if (this.isCoinbase())
      return null;

    const redeem = this.getRedeem(coin);

    if (!redeem)
      return null;

    const type = redeem.getType();

    return ScriptTypes[type].toLowerCase();
  }

  /**
   * Get the previous output script's address. Will "guess"
   * based on the input script
   * @param {Coin?} coin
   * @returns {Address?} addr
   */

  getAddress(coin?: { getAddress: () => any; }): Address | null {
    if (this.isCoinbase())
      return null;

    if (coin)
      return coin.getAddress();

    if (this.script.code.length > 0)
      return this.script.getInputAddress();


    return null;
  }

  /**
   * Get the address hash.
   * @param {Coin?} coin
   * @param {String?} enc
   * @returns {Hash} hash
   */

  getHash(coin: any, enc: any): string |Buffer {
    const addr = this.getAddress(coin);

    if (!addr)
      return null;

    return addr.getHash(enc);
  }

  /**
   * Test to see if nSequence is equal to uint32max.
   * @returns {Boolean}
   */

  isFinal(): boolean {
    return this.sequence === 0xffffffff;
  }

  /**
   * Test to see if nSequence is less than 0xfffffffe.
   * @returns {Boolean}
   */

  isRBF(): boolean {
    return this.sequence < 0xfffffffe;
  }

  /**
   * Test to see if outpoint is null.
   * @returns {Boolean}
   */

  isCoinbase(): boolean {
    return this.prevout.isNull();
  }

  /**
   * Convert the input to a more user-friendly object.
   * @returns {Object}
   */

  [inspectSymbol]() {
    return this.format();
  }

  /**
   * Convert the input to a more user-friendly object.
   * @param {Coin?} coin
   * @returns {Object}
   */

  format(coin?: Coin|Output): object {
    return {
      type: this.getType(coin),
      subtype: this.getSubtype(coin),
      address: this.getAddress(coin),
      script: this.script,
      redeem: this.getRedeem(coin),
      sequence: this.sequence,
      prevout: this.prevout,
      coin: coin || null
    };
  }

  /**
   * Convert the input to an object suitable
   * for JSON serialization.
   * @returns {Object}
   */

  toJSON(network: any, coin: any): InputJson {
    return this.getJSON(network, coin);
  }

  /**
   * Convert the input to an object suitable
   * for JSON serialization. Note that the hashes
   * will be reversed to abide by bitcoind's legacy
   * of little-endian uint256s.
   * @param {Network} network
   * @param {Coin} coin
   * @returns {Object}
   */

  getJSON(network?: Network, coin?: Coin): InputJson {
    network = Network.get(network);

    let addrStr: string;
    if (!coin) {
      let addr = this.getAddress();
      if (addr)
        addrStr = addr.toString(network);
    }

    return {
      prevout: this.prevout.toJSON(),
      script: this.script.toJSON(),
      sequence: this.sequence,
      address: addrStr,
      coin: coin ? coin.getJSON(network, true) : undefined
    };
  }

  /**
   * Inject properties from a JSON object.
   * @private
   * @param {Object} json
   */

  fromJSON(json: { sequence: number; prevout: any; script: any; }) {
    assert(json, 'Input data is required.');
    assert((json.sequence >>> 0) === json.sequence,
      'Sequence must be a uint32.');
    this.prevout.fromJSON(json.prevout);
    this.script.fromJSON(json.script);
    this.sequence = json.sequence;
    return this;
  }

  /**
   * Instantiate an Input from a jsonified input object.
   * @param {Object} json - The jsonified input object.
   * @returns {Input}
   */

  static fromJSON(json: any): Input {
    return new this().fromJSON(json);
  }

  /**
   * Calculate size of serialized input.
   * @returns {Number}
   */

  getSize(): number {
    return 40 + this.script.getVarSize();
  }

  /**
   * Serialize the input.
   * @param {String?} enc - Encoding, can be `'hex'` or null.
   * @returns {Buffer|String}
   */

  toRaw(): Buffer | string {
    const size = this.getSize();
    return this.toWriter(bio.write(size)).render();
  }

  /**
   * Write the input to a buffer writer.
   * prevout, script, sequence
   * @param {BufferWriter} bw
   */

  toWriter(bw: BufferWriter |StaticWriter) {
    this.prevout.toWriter(bw);
    bw.writeVarBytes(this.script.toRaw());
    bw.writeU32(this.sequence);
    return bw;
  }

  /**
   * Inject properties from buffer reader.
   * @private
   * @param {BufferReader} br
   */

  fromReader(br: { readVarBytes: () => any; readU32: () => number; }) {
    this.prevout.fromReader(br);
    this.script.fromRaw(br.readVarBytes());
    this.sequence = br.readU32();
    return this;
  }

  /**
   * Inject properties from serialized data.
   * @param {Buffer} data
   */

  fromRaw(data: any) {
    return this.fromReader(bio.read(data));
  }

  /**
   * Instantiate an input from a buffer reader.
   * @param {BufferReader} br
   * @returns {Input}
   */

  static fromReader(br: BufferReader): Input {
    return new this().fromReader(br);
  }

  /**
   * Instantiate an input from a serialized Buffer.
   * @param {Buffer} data
   * @param {String?} enc - Encoding, can be `'hex'` or null.
   * @returns {Input}
   */

  static fromRaw(data: Buffer, enc: 'hex' | null): Input {
     if (typeof data === 'string')
      data = Buffer.from(data, enc);
    return new this().fromRaw(data);
  }

  /**
   * Inject properties from outpoint.
   * @private
   * @param {Outpoint} outpoint
   */

  fromOutpoint(outpoint: { hash: Buffer; index: number; }) {
    assert(Buffer.isBuffer(outpoint.hash));
    assert(typeof outpoint.index === 'number');
    this.prevout.hash = outpoint.hash;
    this.prevout.index = outpoint.index;
    return this;
  }

  /**
   * Instantiate input from outpoint.
   * @param {Outpoint}
   * @returns {Input}
   */

  static fromOutpoint(outpoint: Outpoint): Input {
    return new this().fromOutpoint(outpoint);
  }

  /**
   * Inject properties from coin.
   * @private
   * @param {Coin} coin
   */

  fromCoin(coin: { hash: Buffer; index: number; }) {
    assert(Buffer.isBuffer(coin.hash));
    assert(typeof coin.index === 'number');
    this.prevout.hash = coin.hash;
    this.prevout.index = coin.index;
    return this;
  }

  /**
   * Instantiate input from coin.
   * @param {Coin}
   * @returns {Input}
   */

  static fromCoin(coin: Coin): Input {
    return new this().fromCoin(coin);
  }

  /**
   * Inject properties from transaction.
   * @private
   * @param {TX} tx
   * @param {Number} index
   */

  fromTX(tx, index: number) {
    assert(tx);
    assert(typeof index === 'number');
    assert(index >= 0 && index < tx.outputs.length);
    this.prevout.hash = tx.hash();
    this.prevout.index = index;
    return this;
  }

  /**
   * Instantiate input from tx.
   * @param {TX} tx
   * @param {Number} index
   * @returns {Input}
   */

  static fromTX(tx: TX, index: number): Input {
    return new this().fromTX(tx, index);
  }

  /**
   * Test an object to see if it is an Input.
   * @param {Object} obj
   * @returns {Boolean}
   */

  static isInput(obj: any): boolean {
    return obj instanceof Input;
  }
}

