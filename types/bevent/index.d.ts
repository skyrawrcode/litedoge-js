declare module "bevent/lib/asyncemitter" {
    export = AsyncEmitter;
    /**
     * Async Emitter
     * @alias module:utils.AsyncEmitter
     * @see EventEmitter
     */
    class AsyncEmitter {
        _events: any;
        /**
         * Add a listener.
         * @param {String} type
         * @param {Function} handler
         */
        addListener(type: string, handler: Function): void;
        /**
         * Add a listener.
         * @param {String} type
         * @param {Function} handler
         */
        on(type: string, handler: Function): void;
        /**
         * Add a listener to execute once.
         * @param {String} type
         * @param {Function} handler
         */
        once(type: string, handler: Function): void;
        /**
         * Prepend a listener.
         * @param {String} type
         * @param {Function} handler
         */
        prependListener(type: string, handler: Function): void;
        /**
         * Prepend a listener to execute once.
         * @param {String} type
         * @param {Function} handler
         */
        prependOnceListener(type: string, handler: Function): void;
        /**
         * Push a listener.
         * @private
         * @param {String} type
         * @param {Function} handler
         * @param {Boolean} once
         */
        private _push;
        /**
         * Unshift a listener.
         * @param {String} type
         * @param {Function} handler
         * @param {Boolean} once
         */
        _unshift(type: string, handler: Function, once: boolean): void;
        /**
         * Remove a listener.
         * @param {String} type
         * @param {Function} handler
         */
        removeListener(type: string, handler: Function): void;
        /**
         * Set max listeners.
         * @param {Number} max
         */
        setMaxListeners(max: number): void;
        /**
         * Remove all listeners.
         * @param {String?} type
         */
        removeAllListeners(type: string | null, ...args: any[]): void;
        /**
         * Get listeners array.
         * @param {String} type
         * @returns {Function[]}
         */
        listeners(type: string): Function[];
        /**
         * Get listener count for an event.
         * @param {String} type
         */
        listenerCount(type: string): any;
        /**
         * Get event names.
         * @returns {String[]}
         */
        eventNames(): string[];
        /**
         * Emit an event synchronously.
         * @param {String} type
         * @param {...Object} args
         * @returns {Promise}
         */
        emit(type: string, ...args: any[]): Promise<any>;
        /**
         * Emit an event synchronously.
         * @private
         * @param {String} type
         * @param {...Object} args
         * @returns {Promise}
         */
        private _emit;
        /**
         * Emit an event. Wait for promises to resolve.
         * @method
         * @param {String} type
         * @param {...Object} args
         * @returns {Promise}
         */
        emitAsync(type: string, ...args: any[]): Promise<any>;
        /**
         * Emit an event. Wait for promises to resolve.
         * @private
         * @param {String} type
         * @param {...Object} args
         * @returns {Promise}
         */
        private _emitAsync;
    }
}
declare module "bevent/lib/bevent" {
    const _exports: typeof import("bevent/lib/asyncemitter");
    export = _exports;
}
declare module "bevent"{
    import emitter from "bevent/lib/asyncemitter";
    export default emitter;
    export * from "bevent/lib/asyncemitter";
}