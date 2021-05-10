declare module "bcurl/lib/client" {
    export = Client;
    /**
     * HTTP Client
     */
    class Client {
        /**
         * Create an HTTP client.
         * @constructor
         * @param {Object?} options
         */
        constructor(options: any | null);
        ssl: boolean;
        strictSSL: boolean;
        host: string;
        port: number;
        path: string;
        headers: any;
        username: any;
        password: any;
        id: any;
        token: any;
        timeout: number;
        limit: any;
        sequence: number;
        opened: boolean;
        socket: any;
        /**
         * Clone client.
         * @returns {Client}
         */
        clone(): Client;
        /**
         * Open client.
         * @returns {Promise}
         */
        open(): Promise<any>;
        /**
         * Close client.
         * @returns {Promise}
         */
        close(): Promise<any>;
        /**
         * Auth (abstract).
         */
        auth(): Promise<void>;
        /**
         * Add a hook.
         */
        hook(...args: any[]): any;
        /**
         * Remove a hook.
         */
        unhook(...args: any[]): any;
        /**
         * Call a hook.
         * @returns {Promise}
         */
        call(...args: any[]): Promise<any>;
        /**
         * Add an event listener.
         */
        bind(...args: any[]): any;
        /**
         * Remove an event listener.
         */
        unbind(...args: any[]): any;
        /**
         * Fire an event.
         */
        fire(...args: any[]): any;
        /**
         * Make an http request to endpoint.
         * @param {String} method
         * @param {String} endpoint - Path.
         * @param {Object} params - Body or query depending on method.
         * @returns {Promise}
         */
        request(method: string, endpoint: string, params?: any): Promise<any>;
        /**
         * Make a GET http request to endpoint.
         * @param {String} endpoint - Path.
         * @param {Object} params - Querystring.
         * @returns {Promise}
         */
        get(endpoint: string, params?: any): Promise<any>;
        /**
         * Make a POST http request to endpoint.
         * @param {String} endpoint - Path.
         * @param {Object} params - Body.
         * @returns {Promise}
         */
        post(endpoint: string, params?: any): Promise<any>;
        /**
         * Make a PUT http request to endpoint.
         * @param {String} endpoint - Path.
         * @param {Object} params - Body.
         * @returns {Promise}
         */
        put(endpoint: string, params?: any): Promise<any>;
        /**
         * Make a DELETE http request to endpoint.
         * @param {String} endpoint - Path.
         * @param {Object} params - Body.
         * @returns {Promise}
         */
        del(endpoint: string, params?: any): Promise<any>;
        /**
         * Make a PATCH http request to endpoint.
         * @param {String} endpoint - Path.
         * @param {Object} params - Body.
         * @returns {Promise}
         */
        patch(endpoint: string, params?: any): Promise<any>;
        /**
         * Make a json rpc request.
         * @param {String} endpoint - Path.
         * @param {String} method - RPC method name.
         * @param {Array} params - RPC parameters.
         * @returns {Promise} - Returns Object?.
         */
        execute(endpoint: string, method: string, params?: any[]): Promise<any>;
    }
}
declare module "bcurl/lib/bcurl" {
    export { Client };
    export function client(options: any): Client;
    import Client = require("bcurl/lib/client");
}
declare module "bcurl" {
    export * from "bcurl/lib/bcurl";
}
