/*!
 * pkg.js - package constants
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */


/**
 * Package Name
 * @const {String}
 * @default
 */

export const name = 'ldogejs';

 /**
  * Project Name
  * @const {String}
  * @default
  */
 
export const  core = 'ldogejs';
 
 /**
  * Organization Name
  * @const {String}
  * @default
  */
 
export const organization = 'ldoge';
 
 /**
  * Currency Name
  * @const {String}
  * @default
  */
 
 export const currency = 'litedoge';
 
 /**
  * Currency Unit
  * @const {String}
  * @default
  */
 
 export const unit = 'ldoge';
 
 /**
  * Base Unit
  * @const {String}
  * @default
  */
 
 export const base = 'ldogetoshi';
 
 /**
  * Config file name.
  * @const {String}
  * @default
  */
 
export const cfg = `${core}.conf`;
 
 /**
  * Repository URL.
  * @const {String}
  * @default
  */
 
export const  url = `https://github.com/${organization}/${name}`;
 
 /**
  * Current version string.
  * @const {String}
  */
  import pkg from '../../package.json';
  const { version } = pkg;
export {version};
 
