/*!
 * plugin.js - wallet plugin for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import EventEmitter from 'events';
import Config from 'bcfg';
import LoggerContext from "blgr/lib/logger";
import {Staker} from "../staking/index.js";
import {RPC} from "./rpc.js";
import {HTTP} from "./http.js";
import {NodeClient} from "./nodeclient.js";
import {WalletDB} from "./walletdb.js";
import {Kernel} from "../staking/kernel.js";
import {WalletNode} from "./node.js";
import {Network} from "../protocol/index.js";
import {WorkerPool} from "../workers/index.js";

/**
 * Plugin
 * @extends EventEmitter
 */

export class Plugin extends EventEmitter {

  config: Config;
  kernel: Kernel;
  client: NodeClient;
  network: Network;
  logger: LoggerContext;
  wdb: WalletDB;
  workers: WorkerPool;
  rpc: RPC;
  http: HTTP;
  staker: Staker;

  /**
   * Create a plugin.
   * @constructor
   * @param {Node} node
   */

  constructor(node: WalletNode) {
    super();


    this.config = node.config.filter('wallet');

    if (node.config.options.file)
      this.config.open('wallet.conf');

    this.network = node.network;
    this.logger = node.logger;
    this.kernel = node.kernel;
    this.client = new NodeClient(node);


    this.wdb = new WalletDB({
      network: this.network,
      logger: this.logger,
      workers: this.workers,
      client: this.client,
      kernel: this.kernel,
      prefix: this.config.prefix,
      memory: this.config.bool('memory', node.memory),
      maxFiles: this.config.uint('max-files'),
      cacheSize: this.config.mb('cache-size'),
      wipeNoReally: this.config.bool('wipe-no-really'),
      reserveBalance: BigInt(this.config.uint('reserve-balance', 0)),
      spv: node.spv
    });

    this.rpc = new RPC(node);

    this.http = new HTTP({
      network: this.network,
      logger: this.logger,
      node: <any>this,
      ssl: this.config.bool('ssl'),
      keyFile: this.config.path('ssl-key'),
      certFile: this.config.path('ssl-cert'),
      host: this.config.str('http-host'),
      port: this.config.uint('http-port'),
      apiKey: this.config.str('api-key', node.config.str('api-key')),
      walletAuth: this.config.bool('wallet-auth'),
      noAuth: this.config.bool('no-auth'),
      cors: this.config.bool('cors'),
      adminToken: this.config.str('admin-token')
    });


    this.staker = new Staker({
      version: 7,
      staking: this.config.bool('staking'),
      preverify: this.config.bool('preverify'),
      network: this.network,
      logger: this.logger,
      workers: this.workers,
      chain: node.chain,
      pool: node.pool,
      mempool: node.mempool,
    })

    this.init();
  }

  init() {
    this.wdb.on('error', err => this.emit('error', err));
    this.http.on('error', err => this.emit('error', err));
    this.staker.on('error', err => this.emit('error', err))
  }

  async open() {
    await this.wdb.open();
    this.rpc.wallet = this.wdb.primary;
    this.staker.wallet = this.wdb.primary;
    await this.staker.open();
    await this.http.open();
  }

  async close() {
    await this.http.close();
    this.rpc.wallet = null;
    this.staker.wallet = null;
    await this.staker.close();
    await this.wdb.close();
  }
}

/**
 * Plugin name.
 * @const {String}
 */

export const id = 'walletdb';

/**
 * Plugin initialization.
 * @param {Node} node
 * @returns {WalletDB}
 */
export function init(node: WalletNode): Plugin {
  return new Plugin(node);
}
