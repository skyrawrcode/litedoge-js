/*!
 * consensus.js - consensus constants and helpers for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';


import assert from 'bsert';
import {BN} from 'bcrypto';

/**
 * One LDoge in Ldogesatoshis.
 * @const {Amount}
 * @default
 */

export const COIN = 100000000n;

/**
 * A LDOGE Cent
 * @const {Amount}
 * @default
 */

export const CENT = 1000000n;

/**
 * Maximum amount of money in satoshis:
 * `50billion * 1btc` (consensus).
 * @const {Amount}
 * @default
 */

export const MAX_MONEY = 50000000000n * COIN;

/**
 * Base block subsidy (consensus).
 * Note to shitcoin implementors: if you
 * increase this to anything greater than
 * 33 bits, getProofOfWorkReward will have to be
 * modified to handle the shifts.
 * @const {Amount}
 * @default
 */

export const BASE_REWARD = 500n * COIN;

/**
 * Half base block subsidy. Required to
 * calculate the reward properly (with
 * only 32 bit shifts available).
 * @const {Amount}
 * @default
 */

export const HALF_REWARD = BASE_REWARD / 2n;

/**
 * RewardHalvingPeriod for blocks from height 40000 to 50999
 * @const {Number}
 * @default
 */

export const REWARD_HALVING_PERIOD = 2000000;


/**
 * Maximum block base size (consensus).
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_SIZE = 1000000;

/**
 * Maximum block base size (consensus).
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_SIZE_GEN = MAX_BLOCK_SIZE / 2;

/**
 * Maximum block serialization size (protocol).
 * @const {Number}
 * @default
 */

export const MAX_RAW_BLOCK_SIZE = 4000000;

/**
 * Maximum block weight (consensus).
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_WEIGHT = 4000000;

/**
 * Maximum block sigops (consensus).
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_SIGOPS = 1000000 / 50;

/**
 * Maximum block sigops cost (consensus).
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_SIGOPS_COST = 80000;

/**
 * Size of set to pick median time from.
 * @const {Number}
 * @default
 */

export const MEDIAN_TIMESPAN = 11;

/**
 * What bits to set in version
 * for versionbits blocks.
 * @const {Number}
 * @default
 */

export const VERSION_TOP_BITS = 0x20000000;

/**
 * What bitmask determines whether
 * versionbits is in use.
 * @const {Number}
 * @default
 */

export const VERSION_TOP_MASK = 0xe0000000;

/**
 * Number of blocks before a coinbase
 * spend can occur (consensus).
 * @const {Number}
 * @default
 */

export const COINBASE_MATURITY = 100;


/**
 * nLockTime threshold for differentiating
 * between height and time (consensus).
 * Tue Nov 5 00:53:20 1985 UTC
 * @const {Number}
 * @default
 */

export const LOCKTIME_THRESHOLD = 500000000;

/**
 * Highest nSequence bit -- disables
 * sequence locktimes (consensus).
 * @const {Number}
 */

export const SEQUENCE_DISABLE_FLAG = (1 << 31) >>> 0;

/**
 * Sequence time: height or time (consensus).
 * @const {Number}
 * @default
 */

export const SEQUENCE_TYPE_FLAG = 1 << 22;

/**
 * Sequence granularity for time (consensus).
 * @const {Number}
 * @default
 */

export const SEQUENCE_GRANULARITY = 9;

/**
 * Sequence mask (consensus).
 * @const {Number}
 * @default
 */

export const SEQUENCE_MASK = 0x0000ffff;

/**
 * Max serialized script size (consensus).
 * @const {Number}
 * @default
 */

export const MAX_SCRIPT_SIZE = 10000;

/**
 * Max stack size during execution (consensus).
 * @const {Number}
 * @default
 */

export const MAX_SCRIPT_STACK = 1000;

/**
 * Max script element size (consensus).
 * @const {Number}
 * @default
 */

export const MAX_SCRIPT_PUSH = 520;

/**
 * Max opcodes executed (consensus).
 * @const {Number}
 * @default
 */

export const MAX_SCRIPT_OPS = 201;

/**
 * Max `n` value for multisig (consensus).
 * @const {Number}
 * @default
 */

export const MAX_MULTISIG_PUBKEYS = 20;

/**
 * The date bip16 (p2sh) was activated (consensus).
 * @const {Number}
 * @default
 */

export const BIP16_TIME = 1333238400;

/**
 * A hash of all zeroes.
 */

export const ZERO_HASH = Buffer.alloc(32, 0x00);

/**
 * Convert a compact number to a big number.
 * Used for `block.bits` -> `target` conversion.
 * @param {Number} compact
 * @returns {BN}
 */

export function fromCompact(compact) {
  if (compact === 0)
    return new BN(0);

  const exponent = compact >>> 24;
  const negative = (compact >>> 23) & 1;

  let mantissa = compact & 0x7fffff;
  let num;

  if (exponent <= 3) {
    mantissa >>>= 8 * (3 - exponent);
    num = new BN(mantissa);
  } else {
    num = new BN(mantissa);
    num.iushln(8 * (exponent - 3));
  }

  if (negative)
    num.ineg();

  return num;
};

/**
 * Convert a big number to a compact number.
 * Used for `target` -> `block.bits` conversion.
 * @param {BN} num
 * @returns {Number}
 */

export  function toCompact(num) {
  if (num.isZero())
    return 0;

  let exponent = num.byteLength();
  let mantissa;

  if (exponent <= 3) {
    mantissa = num.toNumber();
    mantissa <<= 8 * (3 - exponent);
  } else {
    mantissa = num.ushrn(8 * (exponent - 3)).toNumber();
  }

  if (mantissa & 0x800000) {
    mantissa >>= 8;
    exponent++;
  }

  let compact = (exponent << 24) | mantissa;

  if (num.isNeg())
    compact |= 0x800000;

  compact >>>= 0;

  return compact;
};

/**
 * Verify proof-of-work.
 * @param {Hash} hash
 * @param {Number} bits
 * @returns {Boolean}
 */

export  function verifyPOW(hash, bits) {

  const target = fromCompact(bits);

  if (target.isNeg() || target.isZero())
    return false;

  if (target.bitLength() > 256)
    return false;

  const num = new BN(hash, 'le');

  if (num.gt(target))
    return false;
  return true;
};

/**
 * Verify proof-of-work.
 * @param {Block} block
 * @param {Number} bits
 * @returns {Boolean}
 */
export  function verifyPOS(block) {
  let txs = block.txs;
  // Coinbase output should be empty if proof-of-stake block
  if (txs[0].outputs.length !== 1 || !txs[0].outputs[0].isEmpty())
    return false;

  // Second transaction must be coinstake, the rest must not be
  if (txs.length === 0 || !txs[1].isCoinstake())
    return false;

  for (let i = 2; i < txs.length; i++) {

    if (txs[i] && txs[i].isCoinstake())
      return false;
  }
  return true;
}

/**
 * Calculate block subsidy.
 * @param {Number} height - Reward era by height.
 * @returns {Amount}
 */

export function getProofOfWorkReward(height:number) {
  assert(height >= 0, 'Bad height for reward.');

  if (height < 30) {
    return 1000n * COIN;
  } else if (height < 1000) {
    return 1000000n * COIN;
  } else if (height < 2000) {
    return 500000n * COIN;
  } else if (height < 3000) {
    return 250000n * COIN;
  } else if (height < 4000) {
    return 125000n * COIN;
  } else if (height < 5000) {
    return 62500n * COIN;
  } else if (height < 6000) {
    return 31250n * COIN;
  } else if (height < 7000) {
    return 15625n * COIN;
  } else if (height <= 8000) {
    return 10000n * COIN;
  }

  return BigInt(height);
};

/**
 * Calculate block subsidy.
 * @param {Number} height - Reward era by height.
 * @returns {Amount}
 */

export  function getProofOfStakeReward(height) {
  assert(height >= 0, 'Bad height for reward.');


  if (height < 10000) {
    return 100000n * COIN;
  } else if (height < 20000) {
    return 50000n * COIN;
  } else if (height < 30000) {
    return 25000n * COIN;
  } else if (height < 40000) {
    return 12500n * COIN;
  } else if (height < 51000) {
    let nSubsidy = 10000n * COIN;
    // Subsidy is cut in half every g_RewardHalvingPeriod blocks which will occur approximately every 4 years.
    let halvings = height / REWARD_HALVING_PERIOD;
    nSubsidy = (halvings >= 64) ? 0n : (nSubsidy >> BigInt(halvings));
    nSubsidy -= nSubsidy * BigInt((height % REWARD_HALVING_PERIOD) / (2 * REWARD_HALVING_PERIOD));
    return nSubsidy;
  } else if (height < 144999) {
    return 30000n * COIN;
  } else if (height < 189999) {
    return 28000n * COIN;
  } else if (height < 234999) {
    return 26000n * COIN;
  } else if (height < 279999) {
    return 24000n * COIN;
  } else if (height < 324999) {
    return 22000n * COIN;
  } else if (height < 369999) {
    return 20000n * COIN;
  } else if (height < 414999) {
    return 18000n * COIN;
  } else if (height < 459999) {
    return 16000n * COIN;
  } else if (height < 504999) {
    return 14000n * COIN;
  } else if (height < 549999) {
    return 12000n * COIN;
  } else if (height < 594999) {
    return 10000n * COIN;
  } else if (height < 639999) {
    return 4000n * COIN;
  } else if (height < 684999) {
    return 2000n * COIN;
  } else if (height < 729999) {
    return 1000n * COIN;
  } else {
    return 500n * COIN;
  }
};

/**
 * Test version bit.
 * @param {Number} version
 * @param {Number} bit
 * @returns {Boolean}
 */

export function hasBit(version, bit) {
  const TOP_MASK = VERSION_TOP_MASK;
  const TOP_BITS = VERSION_TOP_BITS;
  const bits = (version & TOP_MASK) >>> 0;
  const mask = 1 << bit;
  return bits === TOP_BITS && (version & mask) !== 0;
};


