/*!
 * index.ts - wordlists for ldogejs
 * Copyright (c) 2015-2016, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

export const chinese = {
  simplified: import('./chinese-simplified.js'),
  traditional: import('./chinese-traditional.js')
};

exports.english = import('./english.js');
exports.french = import('./french.js');
exports.italian = import('./italian.js');
exports.japanese = import('./japanese.js');
exports.spanish = import('./spanish.js');
