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

export const english = import('./english.js');
export const french =  import('./french.js');
export const italian =  import('./italian.js');
export const japanese = import('./japanese.js');
export const spanish =  import('./spanish.js');
