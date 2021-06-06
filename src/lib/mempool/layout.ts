/*!
 * layout.js - mempool data layout for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import bdb from 'bdb';


interface layout{
  V: bdb.Key;
  v: bdb.Key;
  R: bdb.Key;
  F: bdb.Key;
  e: bdb.Key;
}
/*
 * Database Layout:
 *   V -> db version
 *   v -> serialization version
 *   R -> tip hash
 *   e[hash] -> entry
 */

export const layout: layout = {
  V: bdb.key('V'),
  v: bdb.key('v'),
  R: bdb.key('R'),
  F: bdb.key('F'),
  e: bdb.key('e', ['hash256'])
};

