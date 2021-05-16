/*!
 * common.js - common functions for hd
 * Copyright (c) 2015-2016, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
import LRU from 'blru';
import { HDPrivateKey } from './private';
import { HDPublicKey } from './public';

/**
 * Index at which hardening begins.
 * @const {Number}
 * @default
 */

export const HARDENED = 0x80000000;

/**
 * Min entropy bits.
 * @const {Number}
 * @default
 */

export const MIN_ENTROPY = 128;

/**
 * Max entropy bits.
 * @const {Number}
 * @default
 */

export const MAX_ENTROPY = 512;

/**
 * LRU cache to avoid deriving keys twice.
 * @type {LRU}
 */

export const cache = new LRU(500);

/**
 * Parse a derivation path and return an array of indexes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 * @param {String} path
 * @param {Boolean} hard
 * @returns {Number[]}
 */

export  function parsePath(path, hard) {
  assert(typeof path === 'string');
  assert(typeof hard === 'boolean');
  assert(path.length >= 1);
  assert(path.length <= 3062);

  const parts = path.split('/');
  const root = parts[0];

  if (root !== 'm'
      && root !== 'M'
      && root !== 'm\''
      && root !== 'M\'') {
    throw new Error('Invalid path root.');
  }

  const result = [];

  for (let i = 1; i < parts.length; i++) {
    let part = parts[i];

    const hardened = part[part.length - 1] === '\'';

    if (hardened)
      part = part.slice(0, -1);

    if (part.length > 10)
      throw new Error('Path index too large.');

    if (!/^\d+$/.test(part))
      throw new Error('Path index is non-numeric.');

    let index = parseInt(part, 10);

    if ((index >>> 0) !== index)
      throw new Error('Path index out of range.');

    if (hardened) {
      index |= HARDENED;
      index >>>= 0;
    }

    if (!hard && (index & HARDENED))
      throw new Error('Path index cannot be hardened.');

    result.push(index);
  }

  return result;
};

/**
 * Test whether the key is a master key.
 * @param {HDPrivateKey|HDPublicKey} key
 * @returns {Boolean}
 */

export  function isMaster(key) {
  return key.depth === 0
    && key.childIndex === 0
    && key.parentFingerPrint === 0;
};

/**
 * Test whether the key is (most likely) a BIP44 account key.
 * @param {HDPrivateKey|HDPublicKey} key
 * @param {Number?} account
 * @returns {Boolean}
 */

export function isAccount(key:HDPrivateKey|HDPublicKey, account?:number):boolean {
  if (account != null) {
    const index = (HARDENED | account) >>> 0;
    if (key.childIndex !== index)
      return false;
  }
  return key.depth === 3 && (key.childIndex & HARDENED) !== 0;
};

/**
 * A compressed pubkey of all zeroes.
 * @const {Buffer}
 * @default
 */

export const ZERO_KEY = Buffer.alloc(33, 0x00);
