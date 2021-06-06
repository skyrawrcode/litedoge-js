/*!
 * common.js - blockstore constants for ldogejs
 * Copyright (c) 2019, Braydon Fuller (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

import Logger from 'blgr';
import { LoggerContext } from 'blgr/lib/logger';
import { Network } from '../protocol/index.js';
/**
 * @module blockstore/common
 */

/**
 * Block data types.
 * @enum {Number}
 */

export enum  BlockStoreTypes {
  BLOCK=  1,
  UNDO = 2,
  FILTER=  3,
  MERKLE=  4
};

/**
 * File prefixes for block data types.
 * @enum {String}
 */

export const BlockStorePrefixes = {
  1: 'blk',
  2: 'blu',
  3: 'blf',
  4: 'blm'
};

export interface BlockStoreOptions {
  prefix?:string;
  cacheSize?: number;
  network?: Network;
  memory?: boolean;
  logger?:Logger|LoggerContext;
}
