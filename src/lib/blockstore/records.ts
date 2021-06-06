/*!
 * blockstore/records.js - blockstore records
 * Copyright (c) 2019, Braydon Fuller (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';
import bio from 'bufio';

/**
 * @module blockstore/records
 */

/**
 * Block Record
 */

export class BlockRecord {
  file: number;
  position: number;
  length: number;
  /**
   * Create a block record.
   * @constructor
   */

  constructor(options: {file?:number, position?:number, length?:number} = {} ) {
    this.file = options.file || 0;
    this.position = options.position || 0;
    this.length = options.length || 0;

    assert((this.file >>> 0) === this.file);
    assert((this.position >>> 0) === this.position);
    assert((this.length >>> 0) === this.length);
  }

  /**
   * Inject properties from serialized data.
   * @private
   * @param {Buffer} data
   */

  fromRaw(data:Buffer):BlockRecord {
    const br = bio.read(data);

    this.file = br.readU32();
    this.position = br.readU32();
    this.length = br.readU32();

    return this;
  }

  /**
   * Instantiate block record from serialized data.
   * @param {Hash} hash
   * @param {Buffer} data
   * @returns {BlockRecord}
   */

  static fromRaw(data:Buffer):BlockRecord {
    return new this().fromRaw(data);
  }

  /**
   * Serialize the block record.
   * @returns {Buffer}
   */

  toRaw():Buffer {
    const bw = bio.write(12);

    bw.writeU32(this.file);
    bw.writeU32(this.position);
    bw.writeU32(this.length);

    return bw.render();
  }
}

/**
 * File Record
 */

export class FileRecord {
  blocks:number;
  used:number;
  length:number;
  /**
   * Create a file record.
   * @constructor
   */

  constructor(options:{blocks?:number, used?:number ,length?:number} = {}) {
    this.blocks = options.blocks || 0;
    this.used = options.used || 0;
    this.length = options.length || 0;

    assert((this.blocks >>> 0) === this.blocks);
    assert((this.used >>> 0) === this.used);
    assert((this.length >>> 0) === this.length);
  }

  /**
   * Inject properties from serialized data.
   * @private
   * @param {Buffer} data
   */

  fromRaw(data) {
    const br = bio.read(data);

    this.blocks = br.readU32();
    this.used = br.readU32();
    this.length = br.readU32();

    return this;
  }

  /**
   * Instantiate file record from serialized data.
   * @param {Hash} hash
   * @param {Buffer} data
   * @returns {ChainState}
   */

  static fromRaw(data) {
    return new this().fromRaw(data);
  }

  /**
   * Serialize the file record.
   * @returns {Buffer}
   */

  toRaw() {
    const bw = bio.write(12);

    bw.writeU32(this.blocks);
    bw.writeU32(this.used);
    bw.writeU32(this.length);

    return bw.render();
  }
}

