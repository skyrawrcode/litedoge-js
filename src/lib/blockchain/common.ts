/*!
 * common.js - bitcoin constants for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import { Verify } from "node:crypto";

/**
 * @module blockchain/common
 */

/**
 * Locktime flags.
 * @enum {Number}
 */

export enum LockFlags  {
  VERIFY_SEQUENCE= 1 << 0,
  MEDIAN_TIME_PAST = 1 << 1,
  MANDATORY_LOCKTIME_FLAGS= 0,
  /**
   * Standard locktime flags
   */
   STANDARD_LOCKTIME_FLAGS = 0 | LockFlags.VERIFY_SEQUENCE | LockFlags.MEDIAN_TIME_PAST
};


/**
 * Threshold states for versionbits
 * @enum {Number}
 * @default
 */

export enum ThresholdStates  {
  DEFINED=  0,
  STARTED=  1,
  LOCKED_IN=  2,
  ACTIVE= 3,
  FAILED= 4
};

/**
 * Verify flags for blocks.
 * @enum {Number}
 * @default
 */

export enum VerifyFlags  {
  VERIFY_NONE= 0,
  VERIFY_POW= 1 << 0,
  VERIFY_BODY= 1 << 1,
  VERIFY_POS= 1 << 2,
  DEFAULT_FLAGS = 0 | VerifyFlags.VERIFY_POW | VerifyFlags.VERIFY_BODY | VerifyFlags.VERIFY_POS
};
