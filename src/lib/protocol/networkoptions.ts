/*!
 * network.js - network object for ldogejs
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

import { BN } from "bcrypto";

import { BlockOptions } from "../primitives/index.js";
import {NetworkType} from "../types";

export interface NetworkOptions {
  magic?: number;
  port?: number;
  checkpointMap?: { [key: number]: Buffer; };
  type?: NetworkType;
  seeds?: string[];
  lastCheckpoint?: number;
  halvingInterval?: number;
  genesis?: BlockOptions
  genesisBlock?: string;
  pow?: {
    limit: BN;
    bits: number;
    chaintrust: BN;
    targetTimespan: number;
    targetSpacing: number;
    retargetInterval: number;
    targetReset: boolean;
    noRetargeting: boolean;
  };
  pos?: {
    limit: BN;
    bits: number;
    stakeMinAge: number;
    modifierInterval: number;
    coinbaseMaturity: number;
  };

  block?: {
    pruneAfterHeight: number;
    keepBlocks: number,
    maxTipAge: number,
    slowHeight: number;
  },
  bip30?: {};
  activationThreshold?: number;
  minerWindow?: number;
  deployments?: any;
  deploys?: any[]
  keyPrefix?: {
    privkey: number;
    xpubkey: number;
    xprivkey: number;
    xpubkey58: string;
    xprivkey58: string;
    coinType: number;
  },
  addressPrefix?: {
    pubkeyhash: number,
    scripthash: number,
    bech32: string
  },
  requireStandard?: boolean
  rpcPort?: number;
  walletPort?: number;
  minRelay?: bigint;
  feeRate?: bigint;
  maxFeeRate?: bigint;
  selfConnect?: boolean;
  requestMempool?: boolean;
}
