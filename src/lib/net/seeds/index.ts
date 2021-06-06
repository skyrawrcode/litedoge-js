/*!
 * seeds.js - seeds for ldogejs
 * Copyright (c) 2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import {NetworkType} from '../../types.js';
import main from './main.js';
import testnet from './testnet.js';

export function get(type: NetworkType) {
  switch (type) {
    case 'main':
      return main;
    case 'testnet':
      return testnet;
    default:
      return [];
  }
};
