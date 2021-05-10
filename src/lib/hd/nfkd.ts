/*!
 * nfkd.js - unicode normalization for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * Normalize unicode string.
 * @alias module:utils.nfkd
 * @param {String} str
 * @returns {String}
 */

export default function nfkd(str:string):string {
  return str.normalize('NFKD');
}
