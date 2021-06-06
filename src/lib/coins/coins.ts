/*!
 * coins.js - coins object for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */


import assert from 'bsert';

import {Coin, Output} from '../primitives/index.js';
import {CoinEntry} from './coinentry.js';

/**
 * Coins
 * Represents the outputs for a single transaction.
 * @alias module:coins.Coins
 * @property {Map[]} outputs - Coins.
 */

export class Coins {
  outputs: Map<any, any>;

  /**
   * Create coins.
   * @constructor
   */

  constructor() {
    this.outputs = new Map();
  }

  /**
   * Instantiate a coins object from a transaction.
   * @param {TX} tx
   * @param {Number} height
   * @returns {Coins}
   */

  static fromTX(tx: any, height: any): Coins {
    return new this().fromTX(tx, height);
  }

  /**
   * Add a single entry to the collection.
   * @param {Number} index
   * @param {CoinEntry} coin
   * @returns {CoinEntry}
   */

  add(index: number, coin: any): CoinEntry {
    assert((index >>> 0) === index);
    assert(coin);
    this.outputs.set(index, coin);
    return coin;
  }

  /**
   * Add a single output to the collection.
   * @param {Number} index
   * @param {Output} output
   * @returns {CoinEntry}
   */

  addOutput(index: any, output: any): CoinEntry {
    return this.add(index, CoinEntry.fromOutput(output));
  }

  /**
   * Add an output to the collection by output index.
   * @param {TX} tx
   * @param {Number} index
   * @param {Number} height
   * @returns {CoinEntry}
   */

  addIndex(tx: any, index: any, height: any): CoinEntry {
    return this.add(index, CoinEntry.fromTX(tx, index, height));
  }

  /**
   * Add a single coin to the collection.
   * @param {Coin} coin
   * @returns {CoinEntry}
   */

  addCoin(coin: { index: any; }): CoinEntry {
    return this.add(coin.index, CoinEntry.fromCoin(coin));
  }

  /**
   * Test whether the collection has a coin.
   * @param {Number} index
   * @returns {Boolean}
   */

  has(index: any): boolean {
    return this.outputs.has(index);
  }

  /**
   * Test whether the collection has an unspent coin.
   * @param {Number} index
   * @returns {Boolean}
   */

  isUnspent(index: any): boolean {
    const coin = this.outputs.get(index);

    if (!coin || coin.spent)
      return false;

    return true;
  }

  /**
   * Get a coin entry.
   * @param {Number} index
   * @returns {CoinEntry|null}
   */

  get(index: any): CoinEntry | null {
    return this.outputs.get(index) || null;
  }

  /**
   * Get an output.
   * @param {Number} index
   * @returns {Output|null}
   */

  getOutput(index: any): Output | null {
    const coin = this.outputs.get(index);

    if (!coin)
      return null;

    return coin.output;
  }

  /**
   * Get a coin.
   * @param {Outpoint} prevout
   * @returns {Coin|null}
   */

  getCoin(prevout: { index: any; }): Coin | null {
    const coin = this.outputs.get(prevout.index);

    if (!coin)
      return null;

    return coin.toCoin(prevout);
  }

  /**
   * Spend a coin entry and return it.
   * @param {Number} index
   * @returns {CoinEntry|null}
   */

  spend(index: any): CoinEntry | null {
    const coin = this.get(index);

    if (!coin || coin.spent)
      return null;

    coin.spent = true;

    return coin;
  }

  /**
   * Remove a coin entry and return it.
   * @param {Number} index
   * @returns {CoinEntry|null}
   */

  remove(index: any): CoinEntry | null {
    const coin = this.get(index);

    if (!coin)
      return null;

    this.outputs.delete(index);

    return coin;
  }

  /**
   * Test whether the coins are fully spent.
   * @returns {Boolean}
   */

  isEmpty(): boolean {
    return this.outputs.size === 0;
  }

  /**
   * Inject properties from tx.
   * @private
   * @param {TX} tx
   * @param {Number} height
   * @returns {Coins}
   */

  fromTX(tx: { outputs: string | any[]; }, height: any): Coins {
    assert(typeof height === 'number');

    for (let i = 0; i < tx.outputs.length; i++) {
      const output = tx.outputs[i];

      if (output.script.isUnspendable())
        continue;

      const entry = CoinEntry.fromTX(tx, i, height);

      this.outputs.set(i, entry);
    }

    return this;
  }
}

