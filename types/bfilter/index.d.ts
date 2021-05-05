// Type definitions for bfilter 1.0
// Project: https://github.com/bcoin-org/bfilter
// Definitions by: skyrawrcode <https://github.com/ldoge>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export class BloomFilter {
    constructor(...args: any[]);

    add(...args: any[]): void;

    added(...args: any[]): void;

    fromOptions(...args: any[]): void;

    getSize(...args: any[]): void;

    hash(...args: any[]): void;

    isWithinConstraints(...args: any[]): void;

    read(...args: any[]): void;

    reset(...args: any[]): void;

    test(...args: any[]): void;

    write(...args: any[]): void;

    static MAX_BLOOM_FILTER_SIZE: number;

    static MAX_HASH_FUNCS: number;

    static decode(...args: any[]): void;

    static flags: {
        ALL: number;
        NONE: number;
        PUBKEY_ONLY: number;
    };

    static flagsByVal: string[];

    static from(...args: any[]): void;

    static fromBase64(...args: any[]): void;

    static fromHex(...args: any[]): void;

    static fromJSON(...args: any[]): void;

    static fromOptions(...args: any[]): void;

    static fromRate(...args: any[]): void;

    static fromRaw(...args: any[]): void;

    static fromReader(...args: any[]): void;

    static fromString(...args: any[]): void;

    static read(...args: any[]): void;

}

export class RollingFilter {
    constructor(...args: any[]);

    add(...args: any[]): void;

    added(...args: any[]): void;

    fromRate(...args: any[]): void;

    hash(...args: any[]): void;

    reset(...args: any[]): void;

    test(...args: any[]): void;

    static fromRate(...args: any[]): void;

}

