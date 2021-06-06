declare module "binet" {
    import _exports from "binet/lib/ip";
    export default _exports;
}
declare module "binet/lib/inet" {
    export function pton4(src: any, dst: any, off: any): number;
    export function pton6(src: any, dst: any, off: any): number;
    export function pton(af: any, src: any, dst: any, off: any): number;
    export function ntop4(src: any, off: any): string;
    export function ntop6(src: any, off: any): string;
    export function ntop(af: any, src: any, off: any): string;
    export function family(str: any): 0 | 4 | 6;
    export function mapped(raw: any, off: any): boolean;
    export function onion(raw: any, off: any): boolean;
    export function normalize(str: any): string;
}
declare module "binet/lib/onion" {
    export function isString(str: string | null): boolean;
    export function is(raw: any): boolean;
    export function encode(raw: any, sha3: Function): string;
    export function decode(str: string, sha3: Function): any;
    export function normalize(str: string, sha3: Function): string;
    export function isLegacyString(str: string | null): boolean;
    export function isLegacy(raw: any): boolean;
    export function encodeLegacy(raw: any): string;
    export function decodeLegacy(str: string): any;
    export function normalizeLegacy(str: string): string;
    export function isNGString(str: string | null): boolean;
    export function isNG(raw: any): boolean;
    export function encodeNG(key: any, sha3: Function): string;
    export function decodeNG(str: string, sha3: Function): any;
    export function normalizeNG(str: string, sha3: Function): string;
}
declare module "binet/lib/ip" {
    export function encode(raw: any): string;
    export function decode(str: string): any;
    export function read(raw: any, off?: number, size?: number): string;
    export function write(dst: any, str: string, off?: number, size?: number): number;
    export function writeBW(bw: any, str: string, size?: number): any;
    export function readBR(br: any, size?: number): string;
    export function normalize(str: string): string;
    export function map(raw: any): any;
    export function unmap(raw: any): any;
    export function toHost(host: string, port: number, key: any | null): string;
    export function fromHost(addr: string, fport: number | null, fkey: any): any;
    export function getTypeString(str: string): number;
    export function isMappedString(str: string): boolean;
    export function isIPv4String(str: string): boolean;
    export function isIPv6String(str: string): boolean;
    export function isOnionString(str: string): boolean;
    export function isUnknownString(str: string): boolean;
    export function isIPString(str: string): number;
    export function isEqualString(a: string, b: string): boolean;
    export function maskString(str: string, mask: string): any;
    export function cidrString(str: string, bits: number): any;
    export function getType(raw: any): number;
    export function isMapped(raw: any): boolean;
    export function isIPv4(raw: any): boolean;
    export function isIPv6(raw: any): boolean;
    export function isOnion(raw: any): boolean;
    export function isIP(raw: any): number;
    export function isEqual(a: any, b: any): boolean;
    export function mask(raw: any, mask: any, dst: any): any;
    export function cidr(raw: any, bits: number, dst: any): any;
    export function isNull(raw: any): boolean;
    export function isBroadcast(raw: any): boolean;
    export function isRFC1918(raw: any): boolean;
    export function isRFC2544(raw: any): boolean;
    export function isRFC3927(raw: any): boolean;
    export function isRFC6598(raw: any): boolean;
    export function isRFC5737(raw: any): boolean;
    export function isRFC3849(raw: any): boolean;
    export function isRFC3964(raw: any): boolean;
    export function isRFC6052(raw: any): boolean;
    export function isRFC4380(raw: any): boolean;
    export function isRFC4862(raw: any): boolean;
    export function isRFC4193(raw: any): boolean;
    export function isRFC6145(raw: any): boolean;
    export function isRFC4843(raw: any): boolean;
    export function isRFC7343(raw: any): boolean;
    export function isLocal(raw: any): boolean;
    export function isMulticast(raw: any): boolean;
    export function isValid(raw: any): boolean;
    export function isRoutable(raw: any): boolean;
    export function getNetwork(raw: any): number;
    export function getReachability(src: any, dest: any): number;
    export function _interfaces(filter: number, af: number): string;
    export function getInterfaces(family: string | null): string;
    export function getLocal(family: string | null): string;
    export function getNonlocal(family: string | null): string;
    export function getPrivate(family: string | null): string;
    export function getPublic(family?: string | null): string;
    export function type(str: string): number;
    export function family(str: string): number;
    export function test(str: string): number;
    export function equal(a: string, b: string): boolean;
    export function toString(raw: any): string;
    export function toBuffer(str: string): any;
    export function toMapped(raw: any): any;
    export function isNameString(str: string): boolean;
    export function hasPrefix(raw: any, prefix: any): boolean;
    export function getStringType(str: string): number;
    export function isV4String(str: string): boolean;
    export function isV6String(str: string): boolean;
    export function isDNSString(str: string): boolean;
    export function fromHostname(addr: string, fport?: number | null, fkey?: any): any;
    export function toHostname(host: string, port: number, key?: any | null): string;
    export namespace IP {
        export { binet as ip };
        export { types };
        export { networks };
        export { ZERO_IP };
        export { onion };
        export { inet };
    }
    namespace binet { }
    /**
     * Address types.
     */
    export type types = number;
    export namespace types {
        const NAME: number;
        const DNS: number;
        const IPV4: number;
        const IPV6: number;
    }
    /**
     * Address networks.
     */
    type networks = number;
    namespace networks {
        const NONE: number;
        const INET4: number;
        const INET6: number;
        const ONION: number;
        const TEREDO: number;
    }
    export const ZERO_IP: any;
    import onion = require("binet/lib/onion");
    import inet = require("binet/lib/inet");
    export {};
}
declare module "binet/lib/binet" {
    const _exports: typeof import("binet/lib/ip");
    export = _exports;
}
