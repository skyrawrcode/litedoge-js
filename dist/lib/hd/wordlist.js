/*!
 * wordlist.js - wordlists for ldogejs
 * Copyright (c) 2015-2016, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */
export async function get(name) {
    switch (name) {
        case 'simplified chinese':
            return await import('./words/chinese-simplified.js');
        case 'traditional chinese':
            return await import('./words/chinese-traditional.js');
        case 'english':
            return await import('./words/english.js');
        case 'french':
            return await import('./words/french.js');
        case 'italian':
            return await import('./words/italian.js');
        case 'japanese':
            return await import('./words/japanese.js');
        case 'spanish':
            return await import('./words/spanish.js');
        default:
            throw new Error(`Unknown language: ${name}.`);
    }
}
;
//# sourceMappingURL=wordlist.js.map