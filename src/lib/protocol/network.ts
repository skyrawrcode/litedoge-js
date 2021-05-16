/*!
 * network.js - network object for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';
import { BN } from 'bcrypto';
import assert from 'bsert';
import { binary } from '../utils';
import * as networks from './networks';
import * as consensus from './consensus';
import { TimeData } from './timedata';
import { inspectSymbol } from '../utils';
import { NetworkOptions } from './networkoptions';
import { NetworkType } from '../types'
import { AbstractBlock, BlockOptions } from '../primitives';
const MODIFIER_INTERVAL_RATIO = 3;

export interface NetworkPOS {
  limit: BN;
  bits: number;
  stakeMinAge: number;
  modifierInterval: number;
  coinbaseMaturity: number;
}

/**
 * Network
 * Represents a network.
 * @alias module:protocol.Network
 * @property {NetworkType} type
 */

export class Network {
  static main: Network;
  static primary: Network;
  genesis: BlockOptions;
  feeRate: any;
  type: NetworkType;
  seeds: string[];
  magic: number;
  port: number;
  checkpointMap: { [key: number]: Buffer }
  lastCheckpoint: number;
  checkpoints: any[];
  unknownBits: number;
  halvingInterval: number;
  genesisBlock: string;
  pow: { limit: BN; bits: number; chaintrust: BN; targetTimespan: number; targetSpacing: number; retargetInterval: number; targetReset: boolean; noRetargeting: boolean; };
  pos: NetworkPOS;
  block: { pruneAfterHeight: number; keepBlocks: number; maxTipAge: number; slowHeight: number; };
  bip30: {};
  activationThreshold: number;
  minerWindow: number;
  deployments: any;
  deploys: Deployment[];
  keyPrefix: { privkey: number; xpubkey: number; xprivkey: number; xpubkey58: string; xprivkey58: string; coinType: number; };
  addressPrefix: { pubkeyhash: number; scripthash: number; bech32: string; };
  requireStandard: boolean;
  rpcPort: number;
  walletPort: number;
  minRelay: bigint;
  maxFeeRate: bigint;
  selfConnect: boolean;
  requestMempool: boolean;
  time: TimeData;
  stakeModifierSelectionInterval: number;
  stakeModifierSections: any[];
  static type:NetworkType;
  static testnet: any;
  static regtest: any;
  /**
   * Create a network.
   * @constructor
   * @param {Object} options
   */

  constructor(options: NetworkOptions) {
    assert(!Network[options.type], 'Cannot create two networks.');

    this.type = options.type;
    this.seeds = options.seeds;
    this.magic = options.magic;
    this.port = options.port;
    this.checkpointMap = options.checkpointMap;
    this.lastCheckpoint = options.lastCheckpoint;
    this.checkpoints = [];
    this.halvingInterval = options.halvingInterval;
    this.genesis = options.genesis;
    this.genesisBlock = options.genesisBlock;
    this.pow = options.pow;
    this.pos = options.pos;
    this.block = options.block;
    this.bip30 = options.bip30;
    this.activationThreshold = options.activationThreshold;
    this.minerWindow = options.minerWindow;
    this.deployments = options.deployments;
    this.deploys = options.deploys;
    this.unknownBits = ~consensus.VERSION_TOP_MASK;
    this.keyPrefix = options.keyPrefix;
    this.addressPrefix = options.addressPrefix;
    this.requireStandard = options.requireStandard;
    this.rpcPort = options.rpcPort;
    this.walletPort = options.walletPort;
    this.minRelay = options.minRelay;
    this.feeRate = options.feeRate;
    this.maxFeeRate = options.maxFeeRate;
    this.selfConnect = options.selfConnect;
    this.requestMempool = options.requestMempool;
    this.time = new TimeData();
    this.stakeModifierSelectionInterval = 0;
    this.stakeModifierSections = [];
    this.init();

  }

  /**
   * Get a deployment by bit index.
   * @param {Number} bit
   */

  init() {
    let bits = 0;

    for (const deployment of this.deploys)
      bits |= 1 << deployment.bit;

    bits |= consensus.VERSION_TOP_MASK;

    this.unknownBits = ~bits >>> 0;

    for (const key of Object.keys(this.checkpointMap)) {
      const hash = this.checkpointMap[key];
      const height = Number(key);

      this.checkpoints.push({ hash, height });
    }

    this.checkpoints.sort(cmpNode);

    this.calculateStakeModifierSections();
    this.calculateStakeModifierSelectionInterval();
  }

  /**
   * Get a deployment by bit index.
   * @param {Number} bit
   * @returns {Object}
   */

  byBit(bit: number): Deployment {
    const index = binary.search(this.deploys, bit, cmpBit);

    if (index === -1)
      return null;

    return this.deploys[index];
  }

  /**
   * Get network adjusted time.
   * @returns {Number}
   */

  now(): number {
    return this.time.now();
  }

  /**
   * Get acceptable future drifted network adjusted time.
   * @returns {Number}
   * @param {Number} time
   * @param {Number} height
   */
  futureDrift(time: number, height: number): number {
    return this.isProtocolV2(height) ?
      time + 15 :
      time + 10 * 60;
  }

  /**
   * Get acceptable past drifted network adjusted time.
   * @param time
   * @param height
   */
  pastDrift(time, height) {
    return this.isProtocolV2(height) ?
      time :
      time - 10 * 60;
  }


  /**
   *
   */
  calculateStakeModifierSelectionInterval(): number {
    let selectionInterval = 0;
    for (let section = 0; section < 64; section++)
      selectionInterval += this.getStakeModifierSelectionIntervalSection(section);
    this.stakeModifierSelectionInterval = selectionInterval;
    return selectionInterval;
  }

  calculateStakeModifierSections() {
    for (let section = 0; section < 64; section++)
      this.stakeModifierSections[section] = Math.floor((this.pos.modifierInterval * 63 / (63 + ((63 - section) * (MODIFIER_INTERVAL_RATIO - 1)))));
  }

  /**
   *
   * @returns {Number}
   */
  getStakeModifierSelectionInterval(): number {
    return this.stakeModifierSelectionInterval;
  }

  /**
   *
   * @param section
   * @returns {Number}
   */
  getStakeModifierSelectionIntervalSection(section): number {
    assert(section >= 0 && section < 64);
    return this.stakeModifierSections[section];
  }


  /**
   * Get network adjusted time in milliseconds.
   * @returns {Number}
   */

  ms(): number {
    return this.time.ms();
  }

  /**
   * Create a network. Get existing network if possible.
   * @param {NetworkType|Object} options
   * @returns {Network}
   */

  static create(options: NetworkType | NetworkOptions): Network {
    if (typeof options === 'string')
      options = networks[options];

    options = options as NetworkOptions;

    assert(options, 'Unknown network.');

    if (Network[options.type])
      return Network[options.type];

    const network = new Network(options);

    Network[network.type] = network;

    if (!Network.primary)
      Network.primary = network;

    return network;
  }

  /**
   * Set the default network. This network will be used
   * if nothing is passed as the `network` option for
   * certain objects.
   * @param {NetworkType} type - Network type.
   * @returns {Network}
   */

  static set(type: NetworkType): Network {
    assert(typeof type === 'string', 'Bad network.');
    Network.primary = Network.get(type);
    Network.type = type;
    return Network.primary;
  }

  /**
   * Get a network with a string or a Network object.
   * @param {NetworkType|Network} type - Network type.
   * @returns {Network}
   */

  static get(type: NetworkType | Network): Network {
    if (!type) {
      assert(Network.primary, 'No default network.');
      return Network.primary;
    }

    if (type instanceof Network)
      return type;

    if (typeof type === 'string')
      return Network.create(type);

    throw new Error('Unknown network.');
  }

  /**
   * Get a network with a string or a Network object.
   * @param {NetworkType|Network} type - Network type.
   * @returns {Network}
   */

  static ensure(type: NetworkType | Network): Network {
    if (!type) {
      assert(Network.primary, 'No default network.');
      return Network.primary;
    }

    if (type instanceof Network)
      return type;

    if (typeof type === 'string') {
      if (networks[type])
        return Network.create(type);
    }

    assert(Network.primary, 'No default network.');

    return Network.primary;
  }

  /**
   * Get a network by an associated comparator.
   * @private
   * @param value
   * @param compare
   * @param  network
   * @param  name
   */

  static by(value: any, compare: Function, network: Network |NetworkType| null, name: string): Network {
    if (network) {
      network = Network.get(network);
      if (compare(network, value))
        return network;
      throw new Error(`Network mismatch for ${name}.`);
    }

    for (const type of networks.types) {
      const net = networks[type];
      if (compare(net, value))
        return Network.get(type);
    }

    throw new Error(`Network not found for ${name}.`);
  }

  /**
   * Get a network by its magic number.
   * @param {Number} value
   * @param {Network?} network
   * @returns {Network}
   */

  static fromMagic(value: number, network?: Network | null): Network {
    return Network.by(value, cmpMagic, network, 'magic number');
  }

  /**
   * Get a network by its WIF prefix.
   * @param {Number} value
   * @param {Network?} network
   * @returns {Network}
   */

  static fromWIF(prefix, network: Network | null): Network {
    return Network.by(prefix, cmpWIF, network, 'WIF');
  }

  /**
   * Get a network by its xpubkey prefix.
   * @param {Number} value
   * @param {Network?} network
   * @returns {Network}
   */

  static fromPublic(prefix, network: Network | null): Network {
    return Network.by(prefix, cmpPub, network, 'xpubkey');
  }

  /**
   * Get a network by its xprivkey prefix.
   * @param {Number} value
   * @param {Network?} network
   * @returns {Network}
   */

  static fromPrivate(prefix, network: Network |NetworkType | null): Network {
    return Network.by(prefix, cmpPriv, network, 'xprivkey');
  }

  /**
   * Get a network by its xpubkey base58 prefix.
   * @param {String} prefix
   * @param {Network?} network
   * @returns {Network}
   */

  static fromPublic58(prefix: string, network: Network | null): Network {
    return Network.by(prefix, cmpPub58, network, 'xpubkey');
  }

  /**
   * Get a network by its xprivkey base58 prefix.
   * @param {String} prefix
   * @param {Network?} network
   * @returns {Network}
   */

  static fromPrivate58(prefix: string, network: Network | null): Network {
    return Network.by(prefix, cmpPriv58, network, 'xprivkey');
  }

  /**
   * Get a network by its base58 address prefix.
   * @param {Number} value
   * @param {Network?} network
   * @returns {Network}
   */

  static fromAddress(prefix, network: Network | null): Network {
    return Network.by(prefix, cmpAddress, network, 'base58 address');
  }

  /**
   * Get a network by its bech32 address prefix.
   * @param {String} hrp
   * @param {Network?} network
   * @returns {Network}
   */

  static fromBech32(hrp: string, network: Network | null): Network {
    return Network.by(hrp, cmpBech32, network, 'bech32 address');
  }

  /**
   * Convert the network to a string.
   * @returns {String}
   */

  toString(): string {
    return this.type;
  }

  /**
   * Inspect the network.
   * @returns {String}
   */

  [inspectSymbol]() {
    return `<Network: ${this.type}>`;
  }

  /**
   * Test an object to see if it is a Network.
   * @param {Object} obj
   * @returns {Boolean}
   */

  static isNetwork(obj: object): boolean {
    return obj instanceof Network;
  }


  /**
   * Gets the spacing for blocks
   * @param {Number} height
   */
  getTargetSpacing(height: number) {
    return this.isProtocolV2(height) ? 64 : 60;
  }

  /**
   * isProtocolV2
   * @param {Number} height
   * @returns {boolean}
   */
  isProtocolV2(height: number): boolean {
    return this.type === 'testnet' || height > 2;
  }

  /**
   * isProtocolV1
   * @param height
   * @returns {boolean}
   */
  isProtocolV1(height): boolean {
    return this.type !== 'testnet' && height <= 2;
  }

  /**
   * Retargeting was fixed in protocol v1 at height 1
   * @param height
   * @returns {boolean}
   */
  isProtocolV1RetargetingFixed(height): boolean {

    return this.type === 'testnet' || height > 1;
  }
}

/**
 * Default network.
 * @type {Network}
 */

Network.primary = null;

/**
 * Default network type.
 * @type {String}
 */

Network.type = null;

/*
 * Networks (to avoid hash table mode).
 */

Network.main = null;
Network.testnet = null;
Network.regtest = null;

/*
 * Set initial network.
 */

Network.set(process.env.LDOGEJS_NETWORK as NetworkType || 'main');

export interface Deployment {
  bit: number;
  window: number;
  threshold: number;
  timeout: number;
  startTime: number;
  name:string;
  force?:boolean;
  required?:boolean;
}

/*
 * Helpers
 */

function cmpBit(a, b) {
  return a.bit - b;
}

function cmpNode(a, b) {
  return a.height - b.height;
}

function cmpMagic(network, magic) {
  return network.magic === magic;
}

function cmpWIF(network, prefix) {
  return network.keyPrefix.privkey === prefix;
}

function cmpPub(network, prefix) {
  return network.keyPrefix.xpubkey === prefix;
}

function cmpPriv(network, prefix) {
  return network.keyPrefix.xprivkey === prefix;
}

function cmpPub58(network, prefix) {
  return network.keyPrefix.xpubkey58 === prefix;
}

function cmpPriv58(network, prefix) {
  return network.keyPrefix.xprivkey58 === prefix;
}

function cmpAddress(network, prefix) {
  const prefixes = network.addressPrefix;

  switch (prefix) {
    case prefixes.pubkeyhash:
    case prefixes.scripthash:
      return true;
  }

  return false;
}

function cmpBech32(network, hrp) {
  return network.addressPrefix.bech32 === hrp;
}


