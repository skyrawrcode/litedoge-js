/*!
 * seeds.js - seeds for ldogejs
 * Copyright (c) 2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import { NetworkType } from '../../types';
import main from './main';
import testnet from './testnet';

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
