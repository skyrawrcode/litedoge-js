/*!
 * common.js - p2p constants for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module net/common
 */

import random from 'bcrypto/lib/random';
import * as pkg from '../pkg';

/**
 * Default protocol version.
 * @const {Number}
 * @default
 */

export const PROTOCOL_VERSION = 60066;

/**
 * Minimum protocol version we're willing to talk to.
 * @const {Number}
 * @default
 */

export const MIN_VERSION = 60065;

/**
 * Minimum version for getheaders.
 * @const {Number}
 * @default
 */

export const HEADERS_VERSION = 31800;

/**
 * Minimum version for pong.
 * @const {Number}
 * @default
 */

export const PONG_VERSION = 60000;

/**
 * Minimum version for bip37.
 * @const {Number}
 * @default
 */

export const BLOOM_VERSION = 9999999;

/**
 * Minimum version for bip152.
 * @const {Number}
 * @default
 */

export const SENDHEADERS_VERSION = 99999999;

/**
 * Minimum version for bip152.
 * @const {Number}
 * @default
 */

export const COMPACT_VERSION = 99999999;

/**
 * Service bits.
 * @enum {Number}
 * @default
 */

export enum ServiceBits {
  /**
   * Whether network services are enabled.
   */

  NETWORK= 1 << 0,

  /**
   * Whether the peer supports the getutxos packet.
   */

  GETUTXO= 1 << 1,

  /**
   * Whether the peer supports BIP37.
   */

  BLOOM= 1 << 2,

  LOCAL_SERVICES = 0 | ServiceBits.NETWORK,
  REQUIRED_SERVICES = 0 | ServiceBits.NETWORK
};

/**
 * Default user agent: `/ldogejs:[version]/`.
 * @const {String}
 * @default
 */
export const USER_AGENT = `/LDOGE.JS:${pkg.version}/`;

/**
 * Max message size (~4mb with segwit, formerly 2mb)
 * @const {Number}
 * @default
 */

export const MAX_MESSAGE = 4 * 1000 * 1000;

/**
 * Amount of time to ban misbheaving peers.
 * @const {Number}
 * @default
 */

export const BAN_TIME = 24 * 60 * 60;

/**
 * Ban score threshold before ban is placed in effect.
 * @const {Number}
 * @default
 */

export const BAN_SCORE = 100;

/**
 * Create a nonce.
 * @returns {Buffer}
 */

export function nonce():Buffer {
  return random.randomBytes(8);
};

/**
 * A compressed pubkey of all zeroes.
 * @const {Buffer}
 * @default
 */
export const ZERO_KEY = Buffer.alloc(33, 0x00);

/**
 * A 64 byte signature of all zeroes.
 * @const {Buffer}
 * @default
 */

export const ZERO_SIG = Buffer.alloc(64, 0x00);

/**
 * 8 zero bytes.
 * @const {Buffer}
 * @default
 */

export const ZERO_NONCE = Buffer.alloc(8, 0x00);

/**
 * Maximum inv/getdata size.
 * @const {Number}
 * @default
 */

export const MAX_INV = 50000;

/**
 * Maximum number of requests.
 * @const {Number}
 * @default
 */

export const MAX_REQUEST = 5000;

/**
 * Maximum number of block requests per peer.
 * @const {Number}
 * @default
 */

export const MAX_BLOCK_REQUEST = 500000 + 10000;

/**
 * Maximum number of tx requests.
 * @const {Number}
 * @default
 */

export const MAX_TX_REQUEST = 10000;
