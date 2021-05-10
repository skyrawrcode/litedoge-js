/*!
 * blockstore/index.ts - bitcoin blockstore for ldogejs
 * Copyright (c) 2019, Braydon Fuller (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import { join } from 'path';

import {AbstractBlockStore, } from './abstract';
import {LevelBlockStore} from './level';
import {FileBlockStore} from './file';
import * as common from './common';

/**
 * @module blockstore
 */

export function create(options:common.BlockStoreOptions) {
  if (options.memory) {
    return new LevelBlockStore({
      network: options.network,
      logger: options.logger,
      cacheSize: options.cacheSize,
      memory: options.memory
    });
  }

  const location = join(options.prefix, 'blocks');

  return new FileBlockStore({
    network: options.network,
    logger: options.logger,
    location: location,
    cacheSize: options.cacheSize
  });
};

export {AbstractBlockStore, FileBlockStore, LevelBlockStore}
