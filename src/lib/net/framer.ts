/*!
 * framer.js - packet framer for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
import hash256 from 'bcrypto/lib/hash256.js';

import {Network} from '../protocol/network.js';
/**
 * Protocol Message Framer
 * @alias module:net.Framer
 */

export class Framer {
  
  network:Network;
  /**
   * Create a framer.
   * @constructor
   * @param {Network} network
   */

  constructor(network:Network) {
    this.network = Network.get(network);
  }

  /**
   * Frame a payload with a header.
   * @param {String} cmd - Packet type.
   * @param {Buffer} payload
   * @param {Buffer?} checksum - Precomputed checksum.
   * @returns {Buffer} Payload with header prepended.
   */

  packet(cmd, payload, checksum) {
    assert(payload, 'No payload.');
    assert(cmd.length < 12);
    assert(payload.length <= 0xffffffff);

    const msg = Buffer.allocUnsafe(24 + payload.length);

    // Magic value
    msg.writeUInt32LE(this.network.magic, 0);

    // Command
    msg.write(cmd, 4, 'ascii');

    for (let i = 4 + cmd.length; i < 16; i++)
      msg[i] = 0;

    // Payload length
    msg.writeUInt32LE(payload.length, 16);

    if (!checksum)
      checksum = hash256.digest(payload);

    // Checksum
    checksum.copy(msg, 20, 0, 4);

    payload.copy(msg, 24);

    return msg;
  }
}

