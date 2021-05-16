/*!
 * ldogejs.js - a javascript bitcoin library.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

/* eslint prefer-arrow-callback: "off" */

import {Network} from './protocol'
import { NetworkType } from './types';


/**
 * A ldogejs "environment" which exposes all
 * constructors for primitives, the blockchain,
 * mempool, wallet, etc. It also exposes a
 * global worker pool.
 *
 */

/**
 * Set the default network.
 */
export function set(network: NetworkType) {
  Network.set(network);
}

/*
 * Expose
 */

// Blockchain
export * as blockchain from './blockchain';
export * as blockstore from './blockstore';
export * from './blockchain/chain';
export * from './blockchain/chainentry';

// BTC
export * as btc from './btc';
export * from './btc/amount';
export * from './btc/uri';

// Client
export * as client from './client';
export * from './client/node';
export * from './client/wallet';

// Coins
export * as coins from './coins';
export * from './coins/coins';
export * from './coins/coinentry';
export * from './coins/coinview';

// HD
export * as hd from './hd';
export * from './hd/private';
export * from './hd/public';
export * from './hd/mnemonic';

// Index
export * as indexer from './indexer';
export * from './indexer/indexer';
export * from './indexer/txindexer';
export * from './indexer/addrindexer';

// Mempool
export * as mempool from './mempool';
export * as Fees from './mempool/fees';
export * from './mempool/mempool';
export * from './mempool/mempoolentry';

// Miner
export * as mining from './mining';
export * from './mining/miner';

// Net
export * as net from './net';
export * as packets from './net/packets';
export * from './net/peer';
export * from './net/pool';

// Node
export * as node from './node';
export * from './node/node';
export * from './node/fullnode';
export * from './node/spvnode';

// Primitives
export * as primitives from './primitives';
export * from './primitives/address';
export * from './primitives/block';
export * from './primitives/coin';
export * from './primitives/headers';
export * from './primitives/input';
export * from './primitives/invitem';
export * from './primitives/keyring';
export * from './primitives/merkleblock';
export * from './primitives/mtx';
export * from './primitives/outpoint';
export * from './primitives/output';
export * from './primitives/tx';

// Protocol
export * as protocol from './protocol';
export * as consensus from './protocol/consensus';
export * from './protocol/network';
export * as networks from './protocol/networks';
export * as policy from './protocol/policy';

// Script
export * as script from './script';
export * from './script/opcode';
export * from './script/script';
export * from './script/scriptnum';
export * from './script/sigcache';
export * from './script/stack';

// Utils
export * from './utils';
export * from './utils/util';

// Wallet
export * as wallet from './wallet';
export * from './wallet/path';
export * from './wallet/walletkey';
export * from './wallet/walletdb';

// Workers
export * as workers from './workers';
export * from './workers/workerpool';

// Package Info
export * as pkg from './pkg';
