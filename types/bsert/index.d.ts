declare module "bsert" {
    const _exports: typeof import("bsert/lib/assert");
    export =_exports;
}

declare module "bsert/lib/assert" {
    export = assert;
    function assert(value: any, message?: any, ...args: any[]): void;
    namespace assert {
        export { AssertionError };
        export { assert };
        export { assert as strict };
        export { assert as ok };
        export { equal };
        export { notEqual };
        export { equal as strictEqual };
        export { notEqual as notStrictEqual };
        export { fail };
        export { throws };
        export { doesNotThrow };
        export { rejects };
        export { doesNotReject };
        export { ifError };
        export { deepEqual };
        export { notDeepEqual };
        export { deepEqual as deepStrictEqual };
        export { notDeepEqual as notDeepStrictEqual };
        export { bufferEqual };
        export { notBufferEqual };
        export { enforce };
        export { range };
    }
    /**
     * AssertionError
     */
    class AssertionError extends Error {
        constructor(options: any);
        type: string;
        code: string;
        generatedMessage: boolean;
        actual: any;
        expected: any;
        operator: string;
    }
    function equal(actual: any, expected: any, message?: any): void;
    function notEqual(actual: any, expected: any, message: any): void;
    function fail(message: any): void;
    function throws(func: any, expected: any, message: any): void;
    function doesNotThrow(func: any, expected: any, message: any): void;
    function rejects(func: any, expected: any, message: any): Promise<void>;
    function doesNotReject(func: any, expected: any, message: any): Promise<void>;
    function ifError(err: any): void;
    function deepEqual(actual: any, expected: any, message: any): void;
    function notDeepEqual(actual: any, expected: any, message: any): void;
    function bufferEqual(actual: any, expected: any, enc: any, message: any): void;
    function notBufferEqual(actual: any, expected: any, enc: any, message: any): void;
    function enforce(value: any, name: any, type: any): void;
    function range(value: any, name: any): void;
}
