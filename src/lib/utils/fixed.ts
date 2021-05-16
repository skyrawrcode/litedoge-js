/*!
 * fixed.js - fixed number parsing
 * Copyright (c) 2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import assert from 'bsert';

/**
 * Convert int to fixed number string and reduce by a
 * power of ten (uses no floating point arithmetic).
 * @param {Number} num
 * @param {Number} exp - Number of decimal places.
 * @returns {String} Fixed number string.
 */

export function encode(num: bigint, exp:number):string {

  let sign = '';

  if (num < 0n) {
    num = -num;
    sign = '-';
  }

  const mult = BigInt(pow10(exp));

  let lo: bigint = num % mult;
  let hi:bigint = (num - lo) / mult;

  let loStr = lo.toString(10);
  let hiStr = hi.toString(10);

  while (loStr.length < exp)
  loStr = '0' + loStr;

  loStr = loStr.replace(/0+$/, '');

  assert(loStr.length <= exp, 'Invalid integer value.');

  if (loStr.length === 0)
  loStr = '0';

  if (exp === 0)
    return `${sign}${hiStr}`;

  return `${sign}${hiStr}.${loStr}`;
};

/**
 * Parse a fixed number string and multiply by a
 * power of ten (uses no floating point arithmetic).
 * @param {String} str
 * @param {Number} exp - Number of decimal places.
 * @returns {Number} Integer.
 */

export  function decode(str:string, exp:number):bigint {
  assert(typeof str === 'string');
  assert(str.length <= 32, 'Fixed number string too large.');

  let sign = 1;

  if (str.length > 0 && str[0] === '-') {
    str = str.substring(1);
    sign = -1;
  }

  let hiStr = str;
  let loStr = '0';
  let hi:number;
  let lo: number;

  const index = str.indexOf('.');

  if (index !== -1) {
    hiStr = str.substring(0, index);
    loStr = str.substring(index + 1);
  }

  hiStr = hiStr.replace(/^0+/, '');
  loStr = loStr.replace(/0+$/, '');

  assert(loStr.length <= exp,
    'Too many decimal places in fixed number string.');

  if (hiStr.length === 0)
    hiStr = '0';

  while (loStr.length < exp)
    loStr += '0';

  if (loStr.length === 0)
    loStr = '0';

  assert(/^\d+$/.test(hiStr) && /^\d+$/.test(loStr),
    'Non-numeric characters in fixed number string.');

  hi = parseInt(hiStr, 10);
  lo = parseInt(loStr, 10);

  const mult = pow10(exp);
  const maxLo = modSafe(mult);
  const maxHi = divSafe(mult);

  assert(hi < maxHi || (hi === maxHi && lo <= maxLo),
    'Fixed number string exceeds 2^53-1.');

  return BigInt(sign * (hi * mult + lo));
};

/**
 * Convert int to float and reduce by a power
 * of ten (uses no floating point arithmetic).
 * @param {Number} num
 * @param {Number} exp - Number of decimal places.
 * @returns {Number} Double float.
 */

export  function toFloat(num:bigint, exp:number):number {
  return parseFloat(exports.encode(num, exp));
};

/**
 * Parse a double float number and multiply by a
 * power of ten (uses no floating point arithmetic).
 * @param {Number} num
 * @param {Number} exp - Number of decimal places.
 * @returns {Number} Integer.
 */

export function fromFloat(num:number, exp:number):bigint {
  assert(typeof num === 'number' && isFinite(num));
  assert(Number.isSafeInteger(exp));
  return exports.decode(num.toFixed(exp), exp);
};

/*
 * Helpers
 */

function pow10(exp) {
  switch (exp) {
    case 0:
      return 1;
    case 1:
      return 10;
    case 2:
      return 100;
    case 3:
      return 1000;
    case 4:
      return 10000;
    case 5:
      return 100000;
    case 6:
      return 1000000;
    case 7:
      return 10000000;
    case 8:
      return 100000000;
  }
  throw new Error('Exponent is too large.');
}

function modSafe(mod) {
  switch (mod) {
    case 1:
      return 0;
    case 10:
      return 1;
    case 100:
      return 91;
    case 1000:
      return 991;
    case 10000:
      return 991;
    case 100000:
      return 40991;
    case 1000000:
      return 740991;
    case 10000000:
      return 4740991;
    case 100000000:
      return 54740991;
  }
  throw new Error('Exponent is too large.');
}

function divSafe(div) {
  switch (div) {
    case 1:
      return 9007199254740991;
    case 10:
      return 900719925474099;
    case 100:
      return 90071992547409;
    case 1000:
      return 9007199254740;
    case 10000:
      return 900719925474;
    case 100000:
      return 90071992547;
    case 1000000:
      return 9007199254;
    case 10000000:
      return 900719925;
    case 100000000:
      return 90071992;
  }
  throw new Error('Exponent is too large.');
}
