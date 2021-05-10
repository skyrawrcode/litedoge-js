declare module "buffer-map" {
    const _exports: typeof import("buffer-map/lib/buffer-map");
    export = _exports;
}
declare module "buffer-map/lib/custom" {
    export var custom: any;
}
declare module "buffer-map/lib/buffer-map" {
    /**
     * Buffer Map
     */
    export class BufferMap<T> {
        constructor(iterable?: any);
        map: any;
        get size(): any;
        get(key: Buffer): T;
        has(key: Buffer): boolean;
        set(key: Buffer, value: T): BufferMap<T>;
        delete(key: Buffer): any;
        clear(): void;
        [Symbol.iterator](): Iterator<>;
        entries(): [Buffer, T][];
        keys(): Buffer[];
        values(): T[];
        forEach(func: any, self: any): void;
        toKeys(): any[];
        toValues(): any[];
        toArray(): any[];
    }
    /**
     * Buffer Set
     */
    export class BufferSet {
        constructor(iterable?: any);
        map: any;
        get size(): any;
        has(key: any): any;
        add(key: any): BufferSet;
        delete(key: any): any;
        clear(): void;
        [Symbol.iterator](): any;
        entries(): {};
        keys(): any;
        values(): any;
        forEach(func: any, self: any): void;
        toKeys(): any[];
        toValues(): any[];
        toArray(): Buffer[];
    }
}
declare module "buffer-map/lib/custom-browser" {
    export var custom: string;
}
