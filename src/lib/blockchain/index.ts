/*!
 * blockchain/index.ts - blockchain for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module blockchain
 */

export {ChainDB} from "./chaindb";
exports.ChainEntry = require('./chainentry');
exports.Chain = require('./chain');
export * as common from './common';
exports.layout = require('./layout');
