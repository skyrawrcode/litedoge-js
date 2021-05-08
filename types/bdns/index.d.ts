declare module "bdns/lib/dns" {
    export var unsupported: boolean;
    export function resolve(host: string, record?: string, timeout?: number): Promise<any>;
    export function reverse(addr: string, timeout?: number): Promise<any>;
    export function lookup(host: string, family?: number, timeout?: number): Promise<any>;
    export function lookupService(addr: string, port?: number, timeout?: number): Promise<any>;
    export function getIPv4(timeout?: number): Promise<any>;
    export function getIPv6(timeout?: number): Promise<any>;
    export class Resolver {
        dns: dns.Resolver;
        getServers(): any;
        setServers(addrs: any): dns.Resolver;
        resolve(host: any, record: any, timeout: any): Promise<any>;
        reverse(addr: any, timeout: any): Promise<any>;
        cancel(): dns.Resolver;
    }
    import dns = require("dns");
    namespace __E__Projects_bcoin_types_bdns_lib_dns_ { }
    export {};
}

declare module "bdns" {
    const _exports: typeof import("bdns/lib/dns");
    export = _exports;
}
declare module "bdns/lib/bdns" {
    const _exports: typeof import("bdns/lib/dns");
    export = _exports;
}
declare module "bdns/lib/dns-browser" {
    export var unsupported: boolean;
    export function resolve(host: string, record?: string, timeout?: number): Promise<any>;
    export function reverse(addr: string, timeout?: number): Promise<any>;
    export function lookup(host: string, family?: number, timeout?: number): Promise<any>;
    export function lookupService(addr: string, port?: number, timeout?: number): Promise<any>;
    export function getIPv4(timeout?: number): Promise<any>;
    export function getIPv6(timeout?: number): Promise<any>;
    export class Resolver {
    }
}
