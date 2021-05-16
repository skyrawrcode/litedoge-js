/*!
 * mining/index.ts - mining infrastructure for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module mining
 */

export * as common from "./common";
export {CPUMiner} from "./cpuminer";
export {mine} from "./mine"
export {Miner} from "./miner";
export {BlockTemplate} from "./template";