/*!
 * jobs.js - worker jobs for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */
'use strict';
import secp256k1 from 'bcrypto/lib/secp256k1';
import { derive } from 'bcrypto/lib/scrypt';
import { packetTypes, CheckResultPacket, CheckInputResultPacket, SignResultPacket, SignInputResultPacket, ECVerifyResultPacket, ECSignResultPacket, ScryptResultPacket, ErrorResultPacket } from './packets';
/**
 * @exports workers/jobs
 */
const jobs = exports;
/**
 * Execute a job on the worker.
 * @param {String} cmd
 * @param {Array} args
 * @returns {Object}
 * @throws on unknown command
 */
jobs.execute = function execute(p) {
    try {
        return jobs.handle(p);
    }
    catch (e) {
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
jobs.handle = function handle(p) {
    switch (p.cmd) {
        case packetTypes.CHECK:
            return jobs.check(p.tx, p.view, p.flags);
        case packetTypes.CHECKINPUT:
            return jobs.checkInput(p.tx, p.index, p.coin, p.flags);
        case packetTypes.SIGN:
            return jobs.sign(p.tx, p.rings, p.type);
        case packetTypes.SIGNINPUT:
            return jobs.signInput(p.tx, p.index, p.coin, p.ring, p.type);
        case packetTypes.ECVERIFY:
            return jobs.ecVerify(p.msg, p.sig, p.key);
        case packetTypes.ECSIGN:
            return jobs.ecSign(p.msg, p.key);
        case packetTypes.MINE:
            return jobs.mine(p.data, p.target, p.min, p.max);
        case packetTypes.SCRYPT:
            return jobs.scrypt(p.passwd, p.salt, p.N, p.r, p.p, p.len);
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
jobs.check = function check(tx, view, flags) {
    try {
        tx.check(view, flags);
    }
    catch (err) {
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
jobs.checkInput = function checkInput(tx, index, coin, flags) {
    try {
        tx.checkInput(index, coin, flags);
    }
    catch (err) {
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
jobs.sign = function sign(tx, ring, type) {
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
jobs.signInput = function signInput(tx, index, coin, ring, type) {
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
jobs.ecVerify = function ecVerify(msg, sig, key) {
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
jobs.ecSign = function ecSign(msg, key) {
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
jobs.scrypt = function scrypt(passwd, salt, N, r, p, len) {
    const key = derive(passwd, salt, N, r, p, len);
    return new ScryptResultPacket(key);
};
//# sourceMappingURL=jobs.js.map