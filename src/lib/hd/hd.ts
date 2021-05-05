/*!
 * hd.js - hd keys for ldogejs
 * Copyright (c) 2015-2016, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
export * from './mnemonic';
import {HDPrivateKey} from './private';
import {HDPublicKey} from './public';
export * from './private';
export * from './public';
export const PrivateKey = HDPrivateKey;
export const PublicKey = HDPublicKey;
export * as common from './common';
export * as wordlist from './wordlist';

/**
 * Instantiate an HD key (public or private) from an base58 string.
 * @param {Base58String} xkey
 * @param {Network?} network
 *
 */

export const fromBase58 = function fromBase58(xkey, network?) {
  if (HDPrivateKey.isBase58(xkey))
    return HDPrivateKey.fromBase58(xkey, network);
  return HDPublicKey.fromBase58(xkey, network);
};

/**
 * Generate an {@link HDPrivateKey}.
 * @param {Object} options
 * @param {Buffer?} options.privateKey
 * @param {Buffer?} options.entropy
 * @returns {HDPrivateKey}
 */

export const generate = function generate() {
  return HDPrivateKey.generate();
};

/**
 * Generate an {@link HDPrivateKey} from a seed.
 * @param {Object|Mnemonic|Buffer} options - seed,
 * mnemonic, mnemonic options.
 * @returns {HDPrivateKey}
 */

export const fromSeed = function fromSeed(options) {
  return HDPrivateKey.fromSeed(options);
};

/**
 * Instantiate an hd private key from a mnemonic.
 * @param {Mnemonic|Object} mnemonic
 * @returns {HDPrivateKey}
 */

export const fromMnemonic = function fromMnemonic(options, passphrase?) {
  return HDPrivateKey.fromMnemonic(options, passphrase);
};

/**
 * Instantiate an HD key from a jsonified key object.
 * @param {Object} json - The jsonified transaction object.
 * @param {Network?} network
 * @returns {HDPrivateKey|HDPublicKey}
 */

export const fromJSON = function fromJSON(json, network) {
  if (json.xprivkey)
    return HDPrivateKey.fromJSON(json, network);
  return HDPublicKey.fromJSON(json, network);
};

/**
 * Instantiate an HD key from serialized data.
 * @param {Buffer} data
 * @param {Network?} network
 * @returns {HDPrivateKey|HDPublicKey}
 */

export const fromRaw = function fromRaw(data, network) {
  if (HDPrivateKey.isRaw(data, network))
    return HDPrivateKey.fromRaw(data, network);
  return HDPublicKey.fromRaw(data, network);
};

/**
 * Generate an hdkey from any number of options.
 * @param {Object|Mnemonic|Buffer} options - mnemonic, mnemonic
 * options, seed, or base58 key.
 * @param {(Network|NetworkType)?} network
 * @returns {HDPrivateKey|HDPublicKey}
 */

export const from = function from(options, network) {
  assert(options, 'Options required.');

  if (isHD(options))
    return options;

  if (isBase58(options, network))
    return fromBase58(options, network);

  if (isRaw(options, network))
    return fromRaw(options, network);

  if (options && typeof options === 'object')
    return fromMnemonic(options);

  throw new Error('Cannot create HD key from bad options.');
};

/**
 * Test whether an object is in the form of a base58 hd key.
 * @param {String} data
 * @param {Network?} network
 * @returns {Boolean}
 */

export const isBase58 = function isBase58(data, network) {
  return HDPrivateKey.isBase58(data, network)
    || HDPublicKey.isBase58(data, network);
};

/**
 * Test whether an object is in the form of a serialized hd key.
 * @param {Buffer} data
 * @param {Network?} network
 * @returns {NetworkType}
 */

export const isRaw = function isRaw(data, network) {
  return HDPrivateKey.isRaw(data, network)
    || HDPublicKey.isRaw(data, network);
};

/**
 * Test whether an object is an HD key.
 * @param {Object} obj
 * @returns {Boolean}
 */

export const isHD = function isHD(obj) {
  return HDPrivateKey.isHDPrivateKey(obj)
    || HDPublicKey.isHDPublicKey(obj);
};

/**
 * Test whether an object is an HD private key.
 * @param {Object} obj
 * @returns {Boolean}
 */

export const isPrivate = function isPrivate(obj) {
  return HDPrivateKey.isHDPrivateKey(obj);
};

/**
 * Test whether an object is an HD public key.
 * @param {Object} obj
 * @returns {Boolean}
 */

export const isPublic = function isPublic(obj) {
  return HDPublicKey.isHDPublicKey(obj);
};

