// Type definitions for bdb 1.3
// Project: https://github.com/bcoin-org/bdb
// Definitions by: skyrawrcode <https://github.com/ldoge>



// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'bdb' {
    export class IteratorItem {
        key: Buffer;
        value: Buffer;
    }
      
    interface IteratorOptions {

    }
    export class Iterator {
        each(callback: Function): Promise<void>;
        end(): Promise<void>
    ;
    }
    export class Batch {
        put(...args: any[]): Batch;
        write(): Promise<any>;
        del(heightEntry: any) : Batch;
    }
    
    export class DB {
        constructor(...args: any[]);

        approximateSize(...args: any[]): void;

        backup(...args: any[]): void;

        batch(...args: any[]): Batch;

        bucket(...args: any[]): any;

        child(...args: any[]): void;

        clone(...args: any[]): void;

        cloneTo(...args: any[]): void;

        close(...args: any[]): void;

        compactRange(...args: any[]): void;

        del(...args: any[]): void;

        destroy(...args: any[]): void;

        dump(...args: any[]): void;

        get(...args: any[]): Promise<any>;

        getProperty(...args: any[]): void;

        has(key: Buffer): Promise<boolean>;

        init(...args: any[]): void;

        iterator(...args: any[]): Iterator;

        keys(...args: any[]): Promise<any[]>;

        load(...args: any[]): void;

        open(...args: any[]): void;

        put(...args: any[]): void;

        range(options?: IteratorOptions): Promise<IteratorItem[]>;

        repair(...args: any[]): void;

        root(...args: any[]): void;

        unload(...args: any[]): void;

        values(...args: any[]): void;

        verify(...args: any[]): void;

        wrap(...args: any[]): void;

    }

    export class Key {
        constructor(...args: any[]);

        decode(...args: any[]): void;

        encode(...args: any[]): void;

        max(...args: any[]): void;

        min(...args: any[]): void;

        root(...args: any[]): void;

    }

    export function create(options: any): any;

    export function key(id: any, args?: any): any;

}