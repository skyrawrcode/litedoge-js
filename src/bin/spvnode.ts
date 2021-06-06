#!/usr/bin/env node

'use strict';

process.title = 'bcoin';

import assert from 'assert';
import {Outpoint, SPVNode} from '../lib/index.js';
import * as plugin from "../lib/wallet/plugin.js";

const node = new SPVNode({
  file: true,
  argv: true,
  env: true,
  logFile: true,
  logConsole: true,
  logLevel: 'debug',
  db: 'leveldb',
  memory: false,
  persistent: true,
  workers: true,
  listen: true,
  loader: require
});

// Temporary hack
if (!node.config.bool('no-wallet') && !node.has('walletdb')) {
  node.use(plugin);
}

process.on('unhandledRejection', (err, promise) => {
  throw err;
});

process.on('SIGINT', async () => {
  await node.close();
});

(async () => {
  await node.ensure();
  await node.open();
  await node.connect();

  if (node.config.bool('test')) {
    node.pool.watchAddress('1VayNert3x1KzbpzMGt2qdqrAThiRovi8');
    node.pool.watchOutpoint(new Outpoint());
    node.on('block', (block) => {
      assert(block.txs.length >= 1);
      if (block.txs.length > 1)
        console.log(block.txs[1]);
    });
  }

  node.startSync();
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
