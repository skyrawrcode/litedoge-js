/*!
 * common.js - mining utils
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

import assert from 'bsert';
import * as consensus from '../protocol/consensus';
import {BN} from 'bcrypto';
import * as common from './common';


/*
 * Constants
 */

export const DIFF = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
export const B192 = 0x1000000000000000000000000000000000000000000000000;
export const B128 = 0x100000000000000000000000000000000;
export const B64 = 0x10000000000000000;
export const B0 = 0x1;

/**
 * Swap 32 bit endianness of uint256.
 * @param {Buffer} data
 * @returns {Buffer}
 */

 export function swap32(data) {
  for (let i = 0; i < data.length; i += 4) {
    const field = data.readUInt32LE(i, true);
    data.writeUInt32BE(field, i, true);
  }

  return data;
};

/**
 * Compare two uint256le's.
 * @param {Buffer} a
 * @param {Buffer} b
 * @returns {Number}
 */

 export function rcmp(a, b) {
  assert(a.length === b.length);

  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] < b[i])
      return -1;
    if (a[i] > b[i])
      return 1;
  }

  return 0;
};

/**
 * Convert a uint256le to a double.
 * @param {Buffer} target
 * @returns {Number}
 */

 export function double256(target) {
  let n = 0;
  let hi, lo;

  assert(target.length === 32);

  hi = target.readUInt32LE(28, true);
  lo = target.readUInt32LE(24, true);
  n += (hi * 0x100000000 + lo) * B192;

  hi = target.readUInt32LE(20, true);
  lo = target.readUInt32LE(16, true);
  n += (hi * 0x100000000 + lo) * B128;

  hi = target.readUInt32LE(12, true);
  lo = target.readUInt32LE(8, true);
  n += (hi * 0x100000000 + lo) * B64;

  hi = target.readUInt32LE(4, true);
  lo = target.readUInt32LE(0, true);
  n += (hi * 0x100000000 + lo) * B0;

  return n;
};

/**
 * Calculate mining difficulty
 * from little-endian target.
 * @param {Buffer} target
 * @returns {Number}
 */

 export function getDifficulty(target) {
  const d = DIFF;
  const n = common.double256(target);

  if (n === 0)
    return d;

  return Math.floor(d / n);
};

/**
 * Get target from bits as a uint256le.
 * @param {Number} bits
 * @returns {Buffer}
 */

 export function getTarget(bits) {
  const target = consensus.fromCompact(bits);

  if (target.isNeg())
    throw new Error('Target is negative.');

  if (target.isZero())
    throw new Error('Target is zero.');

  return target.toArrayLike(Buffer, 'le', 32);
};

/**
 * Get bits from target.
 * @param {Buffer} data
 * @returns {Buffer}
 */

 export function getBits(data) {
  const target = new BN(data, 'le');

  if (target.isZero())
    throw new Error('Target is zero.');

  return consensus.toCompact(target);
};
