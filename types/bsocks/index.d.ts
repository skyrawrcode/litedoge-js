declare module "bsocks/lib/socks" {
    export var unsupported: boolean;
    export function connect(proxy: any, destPort: any, destHost: any): ProxySocket;
    export function resolve(proxy: any, name: any): any;
    /**
     * Proxy Socket
     * @extends EventEmitter
     */
    class ProxySocket {
        /**
         * Create a proxy socket.
         * @constructor
         * @param {String} host
         * @param {Number} port
         * @param {String?} user
         * @param {String?} pass
         */
        constructor(host: string, port: number, user: string | null, pass: string | null);
        socket: any;
        host: string;
        port: number;
        username: string;
        password: string;
        remoteAddress: string;
        remoteFamily: string;
        remotePort: number;
        ops: any[];
        get encrypted(): any;
        get readable(): any;
        get writable(): any;
        get destroyed(): any;
        get connecting(): any;
        get bufferSize(): any;
        get bytesWritten(): any;
        get bytesRead(): any;
        get localAddress(): any;
        get localPort(): any;
        connect(port: any, host: any): Promise<void>;
        setKeepAlive(enable: any, delay: any): ProxySocket;
        setNoDelay(enable: any): ProxySocket;
        setTimeout(timeout: any, callback: any): ProxySocket;
        setEncoding(enc: any): ProxySocket;
        address(): {
            address: string;
            family: string;
            port: number;
        };
        ref(): ProxySocket;
        unref(): ProxySocket;
        write(data: any, enc: any, callback: any): any;
        end(data: any, enc: any): ProxySocket;
        pause(): ProxySocket;
        resume(): ProxySocket;
        destroy(err: any): ProxySocket;
    }
    export {};
}
declare module "bsocks" {
    const _exports: typeof import("bsocks/lib/socks");
    export = _exports;
}
declare module "bsocks/lib/bsocks" {
    const _exports: typeof import("bsocks/lib/socks");
    export = _exports;
}
declare module "bsocks/lib/socks-browser" {
    export var unsupported: boolean;
    export function connect(proxy: any, destPort: any, destHost: any): never;
    export function resolve(proxy: any, name: any): Promise<never>;
}
