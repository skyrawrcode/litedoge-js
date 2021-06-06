// /*!
//  * ldogejs.js - a javascript bitcoin library.
//  * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
//  * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
//  * https://github.com/bcoin-org/bcoin
//  */
//
// import {Network} from "./protocol/network.js";
// import {NetworkType} from "./types.js";
//
//
// /**
//  * A ldogejs "environment" which exposes all
//  * constructors for primitives, the blockchain,
//  * mempool, wallet, etc. It also exposes a
//  * global worker pool.
//  *
//  */
//
//
// /**
//  * Set the default network.
//  * @param {String} network
//  */
//
// export function set(network: NetworkType) {
//   Network.set(network);
// }
//
// /*
//  * Expose
//  */
//
// // Blockchain
// export * as blockchain from './blockchain';
// export {Chain} from './blockchain/chain';
// export {ChainEntry} from './blockchain/chainentry';
//
// // BTC
// export * as btc from './btc';
// bcoin.Amount = require('./btc/amount');
// bcoin.URI = require('./btc/uri');
//
// // Client
// bcoin.client = require('./client');
// bcoin.NodeClient = require('./client/node');
// bcoin.WalletClient = require('./client/wallet');
//
// // Coins
// bcoin.coins = require('./coins');
// bcoin.Coins = require('./coins/coins');
// bcoin.CoinEntry = require('./coins/coinentry');
// bcoin.CoinView = require('./coins/coinview');
//
// // HD
// bcoin.hd = require('./hd');
// bcoin.HDPrivateKey = require('./hd/private');
// bcoin.HDPublicKey = require('./hd/public');
// bcoin.Mnemonic = require('./hd/mnemonic');
//
// // Index
// bcoin.indexer = require('./indexer');
// bcoin.Indexer = require('./indexer/indexer');
// bcoin.TXIndexer = require('./indexer/txindexer');
// bcoin.AddrIndexer = require('./indexer/addrindexer');
//
// // Mempool
// bcoin.mempool = require('./mempool');
// bcoin.Fees = require('./mempool/fees');
// bcoin.Mempool = require('./mempool/mempool');
// bcoin.MempoolEntry = require('./mempool/mempoolentry');
//
// // Miner
// bcoin.mining = require('./mining');
// bcoin.Miner = require('./mining/miner');
//
// // Net
// export * as net from './net';
// export * as packets from './net/packets';
// export {Peer} from './net/peer';
// export {Pool} from './net/pool';
//
// // Node
// export * as node from './node';
// export {Node} from './node/node';
// export {FullNode} from './node/fullnode';
// export {SPVNode} from './node/spvnode';
//
// // Primitives
// export * as primitives from './primitives';
// export {Address} from './primitives/address';
// export {Block} from './primitives/block';
// export {Coin} from './primitives/coin';
// export {Headers} from './primitives/headers';
// export {Input} from './primitives/input';
// export {InvItem} from './primitives/invitem';
// export {KeyRing} from './primitives/keyring';
// export {MerkleBlock} from './primitives/merkleblock';
// export {MTX} from './primitives/mtx';
// export {Outpoint} from './primitives/outpoint';
// export {Output} from './primitives/output';
// export {TX} from './primitives/tx';
//
// // Protocol
// export * as protocol from './protocol';
// export * as consensus from './protocol/consensus';
// export {Network} from './protocol/network';
// export * as networks from './protocol/networks';
// export * as policy from './protocol/policy';
//
// // Script
// export * as script from './script';
// export {Opcode} from './script/opcode';
// export {Script} from './script/script';
// export {ScriptNum} from './script/scriptnum';
// export {SigCache} from './script/sigcache';
// export {Stack} from './script/stack';
//
// // Utils
// export * as utils from './utils';
// export * as util from './utils/util';
//
// // Wallet
// export * as wallet from './wallet';
// export {WalletDB} from './wallet/walletdb';
//
// // Workers
// export * as workers from './workers';
// export {WorkerPool} from './workers/workerpool';
//
// // Package Info
// export * as pkg from './pkg';
