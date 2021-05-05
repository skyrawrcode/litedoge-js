// Type definitions for bsert 0.0
// Project: https://github.com/chjj/bsert
// Definitions by: skyrawrcode <https://github.com/ldoge>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'bsert' {

    export default bsert;

    export function bsert(value: any, message?: any, ...args: any[]): void;

    export namespace bsert {
        // Circular reference from bsert
        const assert: any;

        // Circular reference from bsert
        const ok: any;

        // Circular reference from bsert
        const strict: any;

        function AssertionError(...args: any[]): void;

        function bufferEqual(actual: any, expected: any, enc: any, message: any): void;

        function deepEqual(actual: any, expected: any, message: any): void;

        function deepStrictEqual(actual: any, expected: any, message: any): void;

        function doesNotReject(func: any, expected: any, message: any): void;

        function doesNotThrow(func: any, expected: any, message: any): void;

        function enforce(value: any, name: any, type: any): void;

        function equal(actual: any, expected: any, message: any): void;

        function fail(message: any): void;

        function ifError(err: any): void;

        function notBufferEqual(actual: any, expected: any, enc: any, message: any): void;

        function notDeepEqual(actual: any, expected: any, message: any): void;

        function notDeepStrictEqual(actual: any, expected: any, message: any): void;

        function notEqual(actual: any, expected: any, message: any): void;

        function notStrictEqual(actual: any, expected: any, message: any): void;

        function range(value: any, name: any): void;

        function rejects(func: any, expected: any, message: any): void;

        function strictEqual(actual: any, expected: any, message: any): void;

        namespace AssertionError {
            const stackTraceLimit: number;

            function captureStackTrace(p0: any, p1: any): any;

        }

    }


}