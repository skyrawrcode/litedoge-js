// Type definitions for bmutex 0.1
// Project: https://github.com/bcoin-org/bmutex
// Definitions by: skyrawrcode <https://github.com/ldoge>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'bmutex' {
    export class Lock {
        constructor(...args: any[]);

        destroy(...args: any[]): void;

        has(...args: any[]): Promise<boolean>;

        lock(...args: any[]): Promise;

        pending(...args: any[]): Promise<boolean>;

        unlock(...args: any[]): void;

        static create(...args: any[]): void;

    }

    export class MapLock {
        constructor(...args: any[]);

        destroy(...args: any[]): void;

        has(...args: any[]): void;

        lock(...args: any[]): void;

        pending(...args: any[]): void;

        unlock(...args: any[]): void;

        static create(...args: any[]): void;

    }

}