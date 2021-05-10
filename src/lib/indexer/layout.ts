/*!
 * layout.js - indexer layout for ldogejs
 * Copyright (c) 2018, the ldogejs developers (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import bdb from 'bdb';

interface layout {
  V: bdb.Key;
  O: bdb.Key;
  h: bdb.Key;
  R: bdb.Key;
  
  A?: bdb.Key;
  C?: bdb.Key;
  c?: bdb.Key;

  t?: bdb.Key;
  b?: bdb.Key;
}
/*
 * Index database layout:
 * To be extended by indexer implementations.
 *
 *  V -> db version
 *  O -> flags
 *  h[height] -> block hash
 *  R -> index sync height
 */

export const layout:layout = {
  V: bdb.key('V'),
  O: bdb.key('O'),
  h: bdb.key('h', ['uint32']),
  R: bdb.key('R')
};
