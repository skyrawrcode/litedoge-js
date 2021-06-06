/*!
 * parser.js - worker parser for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
import {EventEmitter} from 'events';
import * as packets from './packets.js';
import {WorkerPacketTypes} from './packets.js';

/**
 * Parser
 * @alias module:workers.Parser
 * @extends EventEmitter
 */

export class Parser extends EventEmitter {
  waiting: number;
  total: number;
  header: Header;
  pending: Buffer[];

  /**
   * Create a parser.
   * @constructor
   */

  constructor() {
    super();

    this.waiting = 9;
    this.header = null;
    this.pending = [];
    this.total = 0;
  }

  feed(data: Buffer) {
    this.total += data.length;
    this.pending.push(data);

    while (this.total >= this.waiting) {
      const chunk = this.read(this.waiting);
      this.parse(chunk);
    }
  }

  read(size) {
    assert(this.total >= size, 'Reading too much.');

    if (size === 0)
      return Buffer.alloc(0);

    const pending = this.pending[0];

    if (pending.length > size) {
      const chunk = pending.slice(0, size);
      this.pending[0] = pending.slice(size);
      this.total -= chunk.length;
      return chunk;
    }

    if (pending.length === size) {
      const chunk = this.pending.shift();
      this.total -= chunk.length;
      return chunk;
    }

    const chunk = Buffer.allocUnsafe(size);
    let off = 0;

    while (off < chunk.length) {
      const pending = this.pending[0];
      const len = pending.copy(chunk, off);
      if (len === pending.length)
        this.pending.shift();
      else
        this.pending[0] = pending.slice(len);
      off += len;
    }

    assert.strictEqual(off, chunk.length);

    this.total -= chunk.length;

    return chunk;
  }

  parse(data) {
    let header = this.header;

    if (!header) {
      try {
        header = this.parseHeader(data);
      } catch (e) {
        this.emit('error', e);
        return;
      }

      this.header = header;
      this.waiting = header.size + 1;

      return;
    }

    this.waiting = 9;
    this.header = null;

    let packet;
    try {
      packet = this.parsePacket(header, data);
    } catch (e) {
      this.emit('error', e);
      return;
    }

    if (data[data.length - 1] !== 0x0a) {
      this.emit('error', new Error('No trailing newline.'));
      return;
    }

    packet.id = header.id;

    this.emit('packet', packet);
  }

  parseHeader(data) {
    const id = data.readUInt32LE(0);
    const cmd = data.readUInt8(4);
    const size = data.readUInt32LE(5);
    return new Header(id, cmd, size);
  }

  parsePacket(header, data) {
    switch (header.cmd) {
      case WorkerPacketTypes.ENV:
        return packets.EnvPacket.fromRaw(data);
      case WorkerPacketTypes.EVENT:
        return packets.EventPacket.fromRaw(data);
      case WorkerPacketTypes.LOG:
        return packets.LogPacket.fromRaw(data);
      case WorkerPacketTypes.ERROR:
        return packets.ErrorPacket.fromRaw(data);
      case WorkerPacketTypes.ERRORRESULT:
        return packets.ErrorResultPacket.fromRaw(data);
      case WorkerPacketTypes.CHECK:
        return packets.CheckPacket.fromRaw(data);
      case WorkerPacketTypes.CHECKRESULT:
        return packets.CheckResultPacket.fromRaw(data);
      case WorkerPacketTypes.SIGN:
        return packets.SignPacket.fromRaw(data);
      case WorkerPacketTypes.SIGNRESULT:
        return packets.SignResultPacket.fromRaw(data);
      case WorkerPacketTypes.CHECKINPUT:
        return packets.CheckInputPacket.fromRaw(data);
      case WorkerPacketTypes.CHECKINPUTRESULT:
        return packets.CheckInputResultPacket.fromRaw(data);
      case WorkerPacketTypes.SIGNINPUT:
        return packets.SignInputPacket.fromRaw(data);
      case WorkerPacketTypes.SIGNINPUTRESULT:
        return packets.SignInputResultPacket.fromRaw(data);
      case WorkerPacketTypes.ECVERIFY:
        return packets.ECVerifyPacket.fromRaw(data);
      case WorkerPacketTypes.ECVERIFYRESULT:
        return packets.ECVerifyResultPacket.fromRaw(data);
      case WorkerPacketTypes.ECSIGN:
        return packets.ECSignPacket.fromRaw(data);
      case WorkerPacketTypes.ECSIGNRESULT:
        return packets.ECSignResultPacket.fromRaw(data);
      case WorkerPacketTypes.MINE:
        return packets.MinePacket.fromRaw(data);
      case WorkerPacketTypes.MINERESULT:
        return packets.MineResultPacket.fromRaw(data);
      case WorkerPacketTypes.SCRYPT:
        return packets.ScryptPacket.fromRaw(data);
      case WorkerPacketTypes.SCRYPTRESULT:
        return packets.ScryptResultPacket.fromRaw(data);
      default:
        throw new Error('Unknown packet.');
    }
  }
}

/**
 * Header
 * @ignore
 */

class Header {
  id: any;
  cmd: any;
  size: any;

  /**
   * Create a header.
   * @constructor
   */

  constructor(id, cmd, size) {
    this.id = id;
    this.cmd = cmd;
    this.size = size;
  }
}

