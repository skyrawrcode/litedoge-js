/*!
 * jobs.js - worker jobs for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import secp256k1 from 'bcrypto/lib/secp256k1';
import { derive } from 'bcrypto/lib/scrypt';
import {
  WorkerPacketTypes,
  CheckResultPacket,
  CheckInputResultPacket,
  SignResultPacket,
  SignInputResultPacket,
  ECVerifyResultPacket,
  ECSignResultPacket,
  MineResultPacket,
  ScryptResultPacket,
  ErrorResultPacket
} from './packets';
import {mine} from "../mining";

/**
 * @exports workers/jobs
 */

/**
 * Execute a job on the worker.
 * @param {String} cmd
 * @param {Array} args
 * @returns {Object}
 * @throws on unknown command
 */

export function execute(p) {
  try {
    return handle(p);
  } catch (e) {
    return new ErrorResultPacket(e);
  }
};

/**
 * Execute a job on the worker.
 * @param {String} cmd
 * @param {Array} args
 * @returns {Object}
 * @throws on unknown command
 */

export  function handle(p) {
  switch (p.cmd) {
    case WorkerPacketTypes.CHECK:
      return check(p.tx, p.view, p.flags);
    case WorkerPacketTypes.CHECKINPUT:
      return checkInput(p.tx, p.index, p.coin, p.flags);
    case WorkerPacketTypes.SIGN:
      return sign(p.tx, p.rings, p.type);
    case WorkerPacketTypes.SIGNINPUT:
      return signInput(p.tx, p.index, p.coin, p.ring, p.type);
    case WorkerPacketTypes.ECVERIFY:
      return ecVerify(p.msg, p.sig, p.key);
    case WorkerPacketTypes.ECSIGN:
      return ecSign(p.msg, p.key);
    case WorkerPacketTypes.MINE:
      return mine(p.data, p.target, p.min, p.max);
    case WorkerPacketTypes.SCRYPT:
      return scrypt(p.passwd, p.salt, p.N, p.r, p.p, p.len);
    default:
      throw new Error(`Unknown command: "${p.cmd}".`);
  }
};

/**
 * Execute tx.check() on worker.
 * @see TX#check
 * @param {TX} tx
 * @param {CoinView} view
 * @param {VerifyFlags} flags
 * @returns {CheckResultPacket}
 */

export function check(tx, view, flags) {
  try {
    tx.check(view, flags);
  } catch (err) {
    if (err.type === 'ScriptError')
      return new CheckResultPacket(err);
    throw err;
  }
  return new CheckResultPacket();
};

/**
 * Execute tx.checkInput() on worker.
 * @see TX#checkInput
 * @param {TX} tx
 * @param {Number} index
 * @param {Output} coin
 * @param {VerifyFlags} flags
 * @returns {CheckInputResultPacket}
 */

export  function checkInput(tx, index, coin, flags) {
  try {
    tx.checkInput(index, coin, flags);
  } catch (err) {
    if (err.type === 'ScriptError')
      return new CheckInputResultPacket(err);
    throw err;
  }
  return new CheckInputResultPacket();
};

/**
 * Execute tx.sign() on worker.
 * @see MTX#sign
 * @param {MTX} tx
 * @param {KeyRing[]} ring
 * @param {SighashType} type
 */

export function sign(tx, ring, type) {
  const total = tx.sign(ring, type);
  return SignResultPacket.fromTX(tx, total);
};

/**
 * Execute tx.signInput() on worker.
 * @see MTX#signInput
 * @param {MTX} tx
 * @param {Number} index
 * @param {Output} coin
 * @param {KeyRing} ring
 * @param {SighashType} type
 */

export function signInput(tx, index, coin, ring, type) {
  const result = tx.signInput(tx, index, coin, ring, type);
  return SignInputResultPacket.fromTX(tx, index, result);
};

/**
 * Execute secp256k1.verify() on worker.
 * @see secp256k1.verify
 * @param {TX} tx
 * @param {VerifyFlags} flags
 * @returns {Boolean}
 */

export function ecVerify(msg, sig, key) {
  const result = secp256k1.verifyDER(msg, sig, key);
  return new ECVerifyResultPacket(result);
};

/**
 * Execute secp256k1.sign() on worker.
 * @see secp256k1.sign
 * @param {TX} tx
 * @param {Number} index
 * @param {VerifyFlags} flags
 * @returns {Boolean}
 */

export function ecSign(msg, key) {
  const sig = secp256k1.signDER(msg, key);
  return new ECSignResultPacket(sig);
};

// /**
//  * Mine a block on worker.
//  * @param {Buffer} data
//  * @param {Buffer} target
//  * @param {Number} min
//  * @param {Number} max
//  * @returns {Number}
//  */

// jobs.mine = function mine(data, target, min, max) {
//   const nonce = hashcash(data, target, min, max);
//   return new MineResultPacket(nonce);
// };

/**
 * Execute scrypt() on worker.
 * @see scrypt
 * @param {Buffer} passwd
 * @param {Buffer} salt
 * @param {Number} N
 * @param {Number} r
 * @param {Number} p
 * @param {Number} len
 * @returns {Buffer}
 */

export function scrypt(passwd, salt, N, r, p, len) {
  const key = derive(passwd, salt, N, r, p, len);
  return new ScryptResultPacket(key);
};
