

declare module "btcp" {
    const _exports: typeof import("btcp/lib/btcp");
    export = _exports;
}
declare module "btcp/lib/tcp" {
    import EventEmitter from "node:events";
    export var unsupported: boolean;
    export function createServer(handler: Function | null): any;
    /**
     * Server
     * @extends EventEmitter
     */
    export class Server extends EventEmitter {
        /**
         * Create a TCP server.
         * @constructor
         * @param {Function?} handler
         */
        constructor(handler: Function | null);
        server: any;
        _reject: any;
        address(): any;
        close(): any;
        getConnections(): any;
        listen(...args: any[]): any;
        set listening(arg: any);
        get listening(): any;
        set maxConnections(arg: any);
        get maxConnections(): any;
        ref(): Server;
        unref(): Server;
    }
    export { Socket, connect, createSocket, createConnection } from "btcp/lib/tcp-browser";
    
}
declare module "btcp/lib/btcp" {
    import btc from "btcp/lib/tcp"
    export default btc;
}
declare module "btcp/lib/tcp-browser" {
    export var unsupported: boolean;
    export function connect(port: number, host: string): any;
    export function createServer(handler: Function | null): any;
    /**
     * Socket
     * @extends EventEmitter
     */
    export class Socket {
        readable: boolean;
        writable: boolean;
        encrypted: boolean;
        bufferSize: number;
        bytesRead: number;
        bytesWritten: number;
        connecting: boolean;
        destroyed: boolean;
        localAddress: string;
        localPort: number;
        remoteAddress: string;
        remoteFamily: string;
        remotePort: number;
        address(): {
            address: string;
            family: string;
            port: number;
        };
        connect(port: any, host: any): void;
        destroy(err: any): Socket;
        end(data: any, enc: any): void;
        pause(): Socket;
        ref(): Socket;
        resume(): Socket;
        setEncoding(enc: any): Socket;
        setKeepAlive(enable: any, delay: any): Socket;
        setNoDelay(value: any): Socket;
        setTimeout(timeout: any, callback: any): Socket;
        unref(): Socket;
        write(data: any, enc: any): void;
    }
    /**
     * Server
     * @extends EventEmitter
     */
    export class Server  extends EventEmitter{
        /**
         * Create a TCP server.
         * @constructor
         * @param {Function?} handler
         */
        constructor(handler: Function | null);
        address(): {
            address: string;
            family: string;
            port: number;
        };
        close(): Promise<void>;
        getConnections(): Promise<number>;
        listen(...args: any[]): Promise<{
            address: string;
            family: string;
            port: number;
        }>;
        set listening(arg: boolean);
        get listening(): boolean;
        set maxConnections(arg: any);
        get maxConnections(): any;
        ref(): Server;
        unref(): Server;
    }
    export { connect as createSocket, connect as createConnection };
}
