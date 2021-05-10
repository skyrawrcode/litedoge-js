/*!
 * policy.js - bitcoin constants for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/policy
 */

import assert from 'bsert';
import * as consensus from './consensus';

/**
 * Maximum transaction version (policy).
 * @const {Number}
 * @default
 */

export const MAX_TX_VERSION = 2;

/**
 * Maximum transaction base size (policy).
 * @const {Number}
 * @default
 */

export const MAX_TX_SIZE = consensus.MAX_BLOCK_SIZE / 10;

/**
 * Maximum transaction weight (policy).
 * @const {Number}
 * @default
 */

export const MAX_TX_WEIGHT = consensus.MAX_BLOCK_WEIGHT / 10;

/**
 * Maximum number of transaction sigops (policy).
 * @const {Number}
 * @default
 */

export const MAX_TX_SIGOPS = consensus.MAX_BLOCK_SIGOPS / 5;

/**
 * Maximum cost of transaction sigops (policy).
 * @const {Number}
 * @default
 */

export const MAX_TX_SIGOPS_COST = consensus.MAX_BLOCK_SIGOPS_COST / 5;

/**
 * How much weight a sigop should
 * add to virtual size (policy).
 * @const {Number}
 * @default
 */

export const BYTES_PER_SIGOP = 20;

/**
 * Minimum relay fee rate (policy).
 * @const {Rate}
 */

export const MIN_RELAY = 1000000n;


/**
 * Minimum relay fee rate (policy) after block
 */
export const MIN_RELAYv2 = 10000000n;

/**
 * Minimum tx fee rate
 *  Fees smaller than this (in satoshi) are considered zero fee (for transaction creation)
 * @const {Rate}
 */

export const MIN_TX_FEE = 1000000n;

/**
 * Minimum tx fee rate
 *  Fees smaller than this (in satoshi) are considered zero fee (for transaction creation) after block
 * @const {Rate}
 */

export const MIN_TX_FEEv2 = 10000000n;





/**
 * Whether bare multisig outputs
 * should be relayed (policy).
 * @const {Boolean}
 * @default
 */

export const BARE_MULTISIG = true;

/**
 * Priority threshold for
 * free transactions (policy).
 * @const {Number}
 * @default
 */

export const FREE_THRESHOLD = consensus.COIN * 144n / 250n;

/**
 * Max sigops per redeem script (policy).
 * @const {Number}
 * @default
 */

export const MAX_P2SH_SIGOPS = 15;

/**
 * Max serialized nulldata size (policy).
 * @const {Number}
 * @default
 */

export const MAX_OP_RETURN_BYTES = 83;

/**
 * Max pushdata size in nulldata (policy).
 * @const {Number}
 * @default
 */

export const MAX_OP_RETURN = 80;

export const MEMPOOL_MAX_ANCESTORS = 25;

/**
 * Default maximum mempool size in bytes.
 * @const {Number}
 * @default
 */

export const MEMPOOL_MAX_SIZE = 100 * 1000000;

/**
 * Time at which transactions
 * fall out of the mempool.
 * @const {Number}
 * @default
 */

export const MEMPOOL_EXPIRY_TIME = 72 * 60 * 60;

/**
 * Maximum number of orphan transactions.
 * @const {Number}
 * @default
 */

export const  MEMPOOL_MAX_ORPHANS = 100;

/**
 * Minimum block size to create. Block will be
 * filled with free transactions until block
 * reaches this weight.
 * @const {Number}
 * @default
 */

export const MIN_BLOCK_WEIGHT = 0;

/**
 * Maximum block weight to be mined.
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_WEIGHT = 1000000;

/**
 * How much of the block should be dedicated to
 * high-priority transactions (included regardless
 * of fee rate).
 * @const {Number}
 * @default
 */

export const BLOCK_PRIORITY_WEIGHT = 0;

/**
 * Priority threshold to be reached before
 * switching to fee rate comparison.
 * @const {Number}
 * @default
 */

export const BLOCK_PRIORITY_THRESHOLD = FREE_THRESHOLD;

/**
 * Calculate minimum fee based on rate and size.
 * @param {Number?} size
 * @param {Rate?} rate - Rate of satoshi per kB.
 * @returns {Amount} fee
 */

export  function getMinFee(size:number, rate?:bigint) {
  if (rate == null)
    rate =  MIN_RELAY;

  assert(size >= 0);
  assert(rate >= 0n);

  if (size === 0)
    return 0n;

  let fee = rate * BigInt(size) / 1000n;

  if (fee === 0n && rate > 0n)
    fee = rate;

  return fee;
};

/**
 * Calculate the minimum fee in order for the transaction
 * to be relayable, but _round to the nearest kilobyte
 * when taking into account size.
 * @param {Number?} size
 * @param {Rate?} rate - Rate of satoshi per kB.
 * @returns {Amount} fee
 */

export function getRoundFee(size:number, rate:bigint):bigint {
  if (rate == null)
    rate =  MIN_RELAY;

  assert(size >= 0);
  assert(rate >= 0n);

  if (size === 0)
    return 0n;

  let fee = rate * BigInt(Math.ceil(size / 1000));

  if (fee === 0n && rate > 0n)
    fee = rate;

  return fee;
};

/**
 * Calculate a fee rate based on size and fees.
 * @param {Number} size
 * @param {Amount} fee
 * @returns {Rate}
 */

export  function getRate(size:number, fee:bigint):bigint {
  assert(size >= 0);
  assert(fee >= 0);

  if (size === 0)
    return 0n;

  return fee * 1000n / BigInt(size);
};
