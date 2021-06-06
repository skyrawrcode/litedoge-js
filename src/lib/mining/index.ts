/*!
 * mining/index.ts - mining infrastructure for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module mining
 */

export * as common from "./common.js";
export {CPUMiner} from "./cpuminer.js";
export {mine} from "./mine.js"
export {Miner} from "./miner.js";
export {BlockTemplate} from "./template.js";
