
declare module "bweb/lib/mime" {
    export function file(path: any): any;
    export function textual(ext: any): any;
    export function type(ext: any): any;
    export function ext(type: any): any;
}
declare module "bweb/lib/util" {
    export function parseURL(uri: any): {
        url: any;
        pathname: any;
        path: any;
        query: any;
        trailing: boolean;
    };
    export function parseForm(str: any, limit: any): any;
    export function unescape(str: any): any;
    export function isAscii(str: any): boolean;
    export function call(fn: any, ...args: any[]): any;
    export function extendError(err: any): any;
}
declare module "bweb/lib/request" {
    export = Request;
    /**
     * Request
     */
    class Request {
        /**
         * Create a request.
         * @constructor
         * @ignore
         */
        constructor(req: any, res: any, url: any);
        req: any;
        res: any;
        socket: any;
        method: string;
        headers: any;
        type: string;
        url: string;
        pathname: string;
        path: any[];
        trailing: boolean;
        original: {
            url: any;
            pathname: any;
            path: any;
            query: any;
            trailing: boolean;
        };
        username: any;
        query: any;
        params: any;
        body: any;
        cookies: any;
        hasBody: boolean;
        readable: boolean;
        writable: boolean;
        admin: boolean;
        wallet: any;
        init(req: any, res: any, url: any): void;
        parse(url: any): void;
        navigate(url: any): void;
        prefix(): string;
        pipe(dest: any): any;
        pause(): any;
        resume(): any;
        destroy(): any;
    }
}
declare module "bweb/lib/response" {
    export = Response;
    /**
     * Response
     */
    class Response {
        /**
         * Create a response.
         * @constructor
         * @ignore
         */
        constructor(req: any, res: any);
        req: any;
        res: any;
        sent: boolean;
        readable: boolean;
        writable: boolean;
        statusCode: number;
        init(req: any, res: any): void;
        setStatus(code: any): Response;
        setType(type: any): Response;
        setLength(length: any): Response;
        setCookie(key: any, value: any, options: any): Response;
        destroy(): Response;
        setHeader(key: any, value: any): Response;
        getHeader(key: any): Response;
        read(stream: any): Response;
        write(data: any, enc: any): any;
        end(data: any, enc: any): any;
        redirect(code: any, path: any): Response;
        text(code: any, msg: any): Response;
        buffer(code: any, msg: any): Response;
        json(code: any, json: any): Response;
        form(code: any, data: any): Response;
        html(code: any, msg: any): Response;
        send(code: any, msg: any, type: any): Response;
        sendFile(file: any, hint: any): Promise<any>;
        _sendFile(file: any, stat: any, resolve: any, reject: any): void;
    }
}
declare module "bweb/lib/route" {
    export = Route;
    /**
     * Route
     */
    class Route {
        /**
         * Create a route.
         * @constructor
         * @ignore
         */
        constructor(path: any, handler: any);
        path: any;
        regex: RegExp;
        handler: any;
        arity: any;
        map: any[];
        compiled: boolean;
        compile(): void;
        match(pathname: any): any;
    }
}
declare module "bweb/lib/hook" {
    export = Hook;
    /**
     * Hook
     */
    class Hook {
        /**
         * Create a hook.
         * @constructor
         * @ignore
         */
        constructor(path: any, handler: any);
        path: any;
        handler: any;
        arity: any;
        isPrefix(pathname: any): any;
    }
}
declare module "bweb/lib/router" {
    export = Router;
    /**
     * Router
     */
    class Router {
        _get: any[];
        _post: any[];
        _put: any[];
        _del: any[];
        _patch: any[];
        hooks: any[];
        /**
         * Get method handlers.
         * @private
         * @param {String} method
         * @returns {Promise}
         */
        private _handlers;
        /**
         * Handle route stack.
         * @private
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */
        private handle;
        /**
         * Handle hook stack.
         * @private
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */
        private _handleHooks;
        /**
         * Add a hook to the stack.
         * @param {String?} path
         * @param {Function} handler
         */
        hook(path: string | null, handler: Function): void;
        /**
         * Add a GET route.
         * @param {String} path
         * @param {Function} handler
         */
        get(path: string, handler: Function): void;
        /**
         * Add a POST route.
         * @param {String} path
         * @param {Function} handler
         */
        post(path: string, handler: Function): void;
        /**
         * Add a PUT route.
         * @param {String} path
         * @param {Function} handler
         */
        put(path: string, handler: Function): void;
        /**
         * Add a DELETE route.
         * @param {String} path
         * @param {Function} handler
         */
        del(path: string, handler: Function): void;
        /**
         * Add a PATCH route.
         * @param {String} path
         * @param {Function} handler
         */
        patch(path: string, handler: Function): void;
    }
}
declare module "bweb/lib/rpc" {
    export = RPC;
    /**
     * JSON RPC
     * @extends EventEmitter
     */
    class RPC {
        calls: any;
        mounts: any[];
        /**
         * Convert error to RPC error code.
         * @param {Error} err
         */
        getCode(err: Error): any;
        /**
         * Handle call (abstract).
         * @param {Object} cmd
         * @param {Object} query
         */
        handleCall(cmd: any, query: any): void;
        /**
         * Handle error (abstract).
         * @param {Error} err
         */
        handleError(err: Error): void;
        /**
         * Execute batched RPC calls.
         * @param {Object|Object[]} body
         * @param {Object} query
         * @returns {Promise}
         */
        call(body: any | any[], query: any): Promise<any>;
        /**
         * Execute an RPC call.
          * @param {Object} json
         * @param {Boolean} help
         * @returns {Promise}
         */
        execute(json: any,help:boolean):Promise<any>;
        /**
         * Add an RPC call.
         * @param {String} name
         * @param {Function} func
         * @param {Object?} ctx
         */
        add(name: string, func: Function, ctx?: any | null): void;
        /**
         * Mount another RPC object.
         * @param {Object} rpc
         */
        mount(rpc: any): void;
        /**
         * Attach to another RPC object.
         * @param {Object} rpc
         */
        attach(rpc: any): void;
    }
    namespace RPC {
        export { RPC };
        export { errors };
        export { RPCError };
    }
    namespace errors {
        const INVALID_REQUEST: number;
        const METHOD_NOT_FOUND: number;
        const INVALID_PARAMS: number;
        const INTERNAL_ERROR: number;
        const PARSE_ERROR: number;
    }
    /**
     * RPC Error
     * @extends Error
     */
    class RPCError extends Error {
        /**
         * Create an RPC error.
         * @param {Number} code
         * @param {String} msg
         */
        constructor(code: number, msg: string);
        type: string;
        code: number;
    }
}
declare module "bweb/lib/server" {
    import EventEmitter from "events";

    /**
      * HTTP Server
      * @extends EventEmitter
      */
    export default class Server extends EventEmitter {
        /**
         * Create an http server.
         * @constructor
         * @param {Object?} options
         */
        constructor(options: any | null);
        options: any;
        config: ServerOptions;
        http: any;
        io: any;
        rpc: RPC;
        routes: Router;
        mounts: any[];
        stack: any[];
        opened: boolean;
        mounted: boolean;
        parent: any;
        bound: boolean;
        _reject: any;
        /**
         * Bind to events.
         * @private
         */
        private _bind;
        /**
         * Handle an error.
         * @private
         * @param {Error} err
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */
        private _handleError;
        /**
         * Handle a request.
         * @private
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */
        private _handleRequest;
        /**
         * Handle mount stack.
         * @private
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */
        private _handleMounts;
        /**
         * Handle middleware stack.
         * @private
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */
        private _handleStack;
        /**
         * Handle socket (abstract).
         * @param {Object} socket
         */
        handleSocket(socket: any): void;
        /**
         * Handle call (abstract).
         * @param {Object} cmd
         * @param {Object} query
         */
        handleCall(cmd: any, query: any): void;
        /**
         * Open the server.
         * @returns {Promise}
         */
        open(): Promise<any>;
        /**
         * Close the server.
         * @returns {Promise}
         */
        close(): Promise<any>;
        /**
         * Setup error handler.
         * @param {Function} handler
         */
        error(handler: Function): void;
        onError: Function;
        /**
         * Mount a server.
         * @param {String} path
         * @param {Server} server
         */
        mount(path: string, server: Server): void;
        /**
         * Attach a server.
         * @param {String} path
         * @param {Server} server
         */
        attach(path: string, server: Server): void;
        /**
         * Add a middleware to the stack.
         * @param {String?} path
         * @param {Function} handler
         */
        use(path: Function)
        use(path: string, handler: Function)
        use(path: string | Function | null, handler?: Function | null): void;
        /**
         * Add a hook to the stack.
         * @param {String?} path
         * @param {Function} handler
         */
        hook(handler: Function)
        hook(path: string, handler: Function)
        hook(path: string | null, handler: Function): void;
        /**
         * Add a GET route.
         * @param {String} path
         * @param {Function} handler
         */
        get(path: string, handler: Function): void;
        /**
         * Add a POST route.
         * @param {String} path
         * @param {Function} handler
         */
        post(path: string, handler: Function): void;
        /**
         * Add a PUT route.
         * @param {String} path
         * @param {Function} handler
         */
        put(path: string, handler: Function): void;
        /**
         * Add a DELETE route.
         * @param {String} path
         * @param {Function} handler
         */
        del(path: string, handler: Function): void;
        /**
         * Add a PATCH route.
         * @param {String} path
         * @param {Function} handler
         */
        patch(path: string, handler: Function): void;
        /**
         * Get a channel.
         * @param {String} name
         * @returns {Set|null}
         */
        channel(name: string): any | null;
        /**
         * Join a channel.
         * @param {Object} socket
         * @param {String} name
         */
        join(socket: any, name: string): any;
        /**
         * Leave a channel.
         * @param {Object} socket
         * @param {String} name
         */
        leave(socket: any, name: string): any;
        /**
         * Emit event to channel.
         */
        to(...args: any[]): any;
        /**
         * Emit event to all sockets.
         */
        all(...args: any[]): any;
        /**
         * Execute an RPC call.
         * @private
         * @param {Object} json
         * @param {Boolean} help
         * @returns {Promise}
         */
        private execute;
        /**
         * Add an RPC call.
         * @param {String} name
         * @param {Function} func
         * @param {Object?} ctx
         */
        add(name: string, func: Function, ctx: any | null): void;
        /**
         * Get server address.
         * @returns {Object}
         */
        address(): any;
        /**
         * Router middleware.
         * @returns {Function}
         */
        router(routes?: any): Function;
        /**
         * CORS middleware.
         * @returns {Function}
         */
        cors(): Function;
        /**
         * Basic auth middleware.
         * @param {Object} options
         * @returns {Function}
         */
        basicAuth(options: any): Function;
        /**
         * Body parser middleware.
         * @param {Object} options
         * @returns {Function}
         */
        bodyParser(options: any): Function;
        /**
         * JSON rpc middleware.
         * @param {Object} rpc
         * @returns {Function}
         */
        jsonRPC(rpc?: any): Function;
        /**
         * Static file middleware.
         * @param {String} prefix
         * @returns {Function}
         */
        fileServer(prefix: string): Function;
        /**
         * Cookie parsing middleware.
         * @returns {Function}
         */
        cookieParser(): Function;
    }
    /**
     * HTTP Server Options
     */
    class ServerOptions {
        /**
         * Instantiate http server options from object.
         * @param {Object} options
         * @returns {ServerOptions}
         */
        static fromOptions(options: any): ServerOptions;
        /**
         * Create http server options.
         * @constructor
         * @param {Object} options
         */
        constructor(options: any);
        host: string;
        port: number;
        ssl: boolean;
        keyFile: any;
        certFile: any;
        key: any;
        cert: any;
        ca: any;
        sockets: boolean;
        /**
         * Inject properties from object.
         * @private
         * @param {Object} options
         * @returns {ServerOptions}
         */
        private fromOptions;
        /**
         * Load key and cert file.
         * @private
         */
        private load;
        /**
         * Get HTTP server backend.
         * @private
         * @returns {Object}
         */
        private getBackend;
        /**
         * Get HTTP server options.
         * @private
         * @returns {Object}
         */
        private toHTTP;
    }
    import RPC = require("bweb/lib/rpc");
    import Router = require("bweb/lib/router");
}
declare module "bweb/lib/middleware/basicauth" {
    export = basicAuth;
    /**
     * Basic auth middleware.
     * @param {Object} options
     * @returns {Function}
     */
    function basicAuth(options: any): Function;
}
declare module "bweb/lib/middleware/bodyparser" {
    export = bodyParser;
    /**
     * Body parser middleware.
     * @param {Object} options
     * @returns {Function}
     */
    function bodyParser(options: any): Function;
}
declare module "bweb/lib/middleware/cookie" {
    export = cookieParser;
    /**
     * Cookie parsing middleware.
     * @param {String} prefix
     * @returns {Function}
     */
    function cookieParser(): Function;
}
declare module "bweb/lib/middleware/cors" {
    export = cors;
    /**
     * CORS middleware.
     * @returns {Function}
     */
    function cors(): Function;
}
declare module "bweb/lib/middleware/file" {
    export = fileServer;
    /**
     * Static file middleware.
     * @param {Object|String} options
     * @returns {Function}
     */
    function fileServer(options: any | string): Function;
}
declare module "bweb/lib/middleware/jsonrpc" {
    export = jsonRPC;
    /**
     * JSON rpc middleware.
     * @param {Object} rpc
     * @returns {Function}
     */
    function jsonRPC(rpc: any): Function;
}
declare module "bweb/lib/middleware/router" {
    export = router;
    /**
     * Router middleware.
     * @returns {Function}
     */
    function router(routes: any): Function;
}
declare module "bweb/lib/middleware/index" {
    export var basicAuth: typeof import("bweb/lib/middleware/basicauth");
    export var bodyParser: typeof import("bweb/lib/middleware/bodyparser");
    export var cookieParser: typeof import("bweb/lib/middleware/cookie");
    export var cors: typeof import("bweb/lib/middleware/cors");
    export var fileServer: typeof import("bweb/lib/middleware/file");
    export var jsonRPC: typeof import("bweb/lib/middleware/jsonrpc");
    export var router: typeof import("bweb/lib/middleware/router");
}

declare module "bweb/lib/bweb" {
    export function createServer(options: any): Server;
    export function server(options: any): Server;
    export function router(): Router;
    export function rpc(): import("bweb/lib/rpc");
    import Server from "bweb/lib/server";
    import Router from "bweb/lib/router";
    import { RPC } from "bweb/lib/rpc";
    import { RPCError } from "bweb/lib/rpc";
    import { errors } from "bweb/lib/rpc";
    import middleware from "bweb/lib/middleware";
    export { Server, Router, RPC, RPCError, errors, middleware };
}

declare module "bweb" {
    export * from "bweb/lib/bweb";
}

declare module "bweb/lib/server-browser" {
    /**
     * HTTP Server
     * @extends EventEmitter
     */
    export default class Server extends EventEmitter {
        /**
         * Create an http server.
         * @constructor
         * @param {Object?} options
         */
        constructor(options: any | null);
        options: any;
        config: {};
        server: any;
        io: any;
        rpc: RPC;
        open(): Promise<void>;
        close(): Promise<void>;
        error(): void;
        mount(): void;
        use(): void;
        hook(): void;
        get(): void;
        post(): void;
        put(): void;
        del(): void;
        patch(): void;
        channel(): any;
        join(): void;
        leave(): void;
        to(): void;
        all(): void;
        execute(): Promise<void>;
        add(): void;
        address(): {
            address: string;
            port: number;
        };
        router(): () => Promise<void>;
        cors(): () => Promise<void>;
        basicAuth(): () => Promise<void>;
        bodyParser(): () => Promise<void>;
        jsonRPC(): () => Promise<void>;
        fileServer(): () => Promise<void>;
        cookieParser(): () => Promise<void>;
    }
    import RPC = require("bweb/lib/rpc");
}
declare module "bweb/lib/middleware/index-browser" {
    function middleware(): (req: any, res: any) => Promise<void>;
    export { middleware as basicAuth, middleware as bodyParser, middleware as cookieParser, middleware as cors, middleware as fileServer, middleware as jsonRPC, middleware as router };
}
