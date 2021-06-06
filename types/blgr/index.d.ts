
declare module "blgr/lib/inspect" {
    const _exports: any;
    export = _exports;
}
declare module "blgr/lib/format" {
    export = format;
    function format(args: any, colors: any): any;
}
declare module "blgr/lib/fs" {
    export var stat: any;
    export var open: any;
    export var close: any;
    export var read: any;
    export var write: any;
    export var ftruncate: any;
    export { createWriteStream };
    export var mkdir: any;
    export var rename: any;
    export var readdir: any;
    export var unlink: any;
}
declare module "blgr/lib/logger" {
    export = Logger;
    /**
     * Logger
     */
    class Logger {
        /**
         * Create a logger.
         * @constructor
         * @param {(String|Object)?} options/level
         * @param {String?} options.level
         * @param {Boolean} [options.colors=true]
         */
        constructor(options?: (string | any) | null);
        level: number;
        colors: boolean;
        maxFileSize: number;
        maxFiles: number;
        console: boolean;
        closed: boolean;
        closing: boolean;
        filename: any;
        stream: any;
        contexts: any;
        fmt: typeof format;
        rotating: boolean;
        _fileSize: number;
        _buffer: any[];
        /**
         * Set logger options.
         * @param {Object} options
         */
        set(options: any): void;
        /**
         * Open the logger.
         * @method
         * @returns {Promise}
         */
        open(): Promise<any>;
        /**
         * Destroy the write stream.
         * @method
         * @returns {Promise}
         */
        close(): Promise<any>;
        timer: any;
        /**
         * Rotate out the current log file.
         * @method
         * @private
         * @returns {Promise} - Returns String
         */
        private rotate;
        /**
         * Remove old log files
         * @method
         * @private
         * @param {String} dir
         * @param {String} base
         * @param {String} ext
         * @returns {Promise} - Returns Number
         */
        private prune;
        /**
         * Get the size of the current log file in bytes.
         * @method
         * @private
         * @returns {Promise} - Returns Number
         */
        private getSize;
        /**
         * Handle write stream error.
         * @param {Error} err
         */
        handleError(err: Error): void;
        /**
         * Try to reopen the logger.
         * @method
         * @private
         * @returns {Promise}
         */
        private reopen;
        /**
         * Try to reopen the logger after a timeout.
         * @method
         * @private
         * @returns {Promise}
         */
        private retry;
        /**
         * Set the log file location.
         * @param {String} filename
         */
        setFile(filename: string): void;
        /**
         * Set or reset the log level.
         * @param {String} level
         */
        setLevel(name: any): void;
        /**
         * Output a log to the `error` log level.
         * @param {String|Object|Error} err
         * @param {...Object} args
         */
        error(...args: any[]): void;
        /**
         * Output a log to the `warning` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        warning(...args: any[]): void;
        /**
         * Output a log to the `info` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        info(...args: any[]): void;
        /**
         * Output a log to the `debug` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        debug(...args: any[]): void;
        /**
         * Output a log to the `spam` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        spam(...args: any[]): void;
        /**
         * Output a log to the desired log level.
         * Note that this bypasses the level check.
         * @param {String} level
         * @param {String|null} module
         * @param {Object[]} args
         */
        log(level: string, module: string | null, args: any[]): void;
        /**
         * Create logger context.
         * @param {String} module
         * @returns {LoggerContext}
         */
        context(module: string): LoggerContext;
        /**
         * Write log to the console.
         * @param {String} level
         * @param {String|null} module
         * @param {Object[]} args
         */
        writeConsole(level: string, module: string | null, args: any[]): any;
        /**
         * Write a string to the output stream (usually a file).
         * @param {String} level
         * @param {String|null} module
         * @param {Object[]} args
         */
        writeStream(level: string, module: string | null, args: any[]): void;
        /**
         * Helper to parse an error into a nicer
         * format. Call's `log` internally.
         * @private
         * @param {Number} level
         * @param {String|null} module
         * @param {Error} err
         */
        private logError;
        /**
         * Get the current memory usage.
         * @returns {Object}
         */
        memoryUsage(): any;
        /**
         * Log the current memory usage.
         * @param {String|null} module
         */
        memory(module: string | null): void;
    }
    namespace Logger {
        const HAS_TTY: boolean;
        const MAX_FILE_SIZE: number;
        const MAX_ARCHIVAL_FILES: number;
        namespace levels {
            const NONE: number;
            const ERROR: number;
            const WARNING: number;
            const INFO: number;
            const DEBUG: number;
            const SPAM: number;
        }
        /**
         * Available log levels.
         */
        type levels = number;
        const levelsByVal: string[];
        const prefixByVal: string[];
        const styles: string[];
        const global: Logger;
    }
    import format = require("blgr/lib/format");
    /**
     * Logger Context
     */
    export class LoggerContext {
        /**
         * Create a logger context.
         * @constructor
         * @ignore
         * @param {Logger} logger
         * @param {String} module
         */
        constructor(logger: Logger, module: string);
        logger: Logger;
        module: string;
        /**
         * Open the logger.
         * @returns {Promise}
         */
        open(): Promise<any>;
        /**
         * Destroy the write stream.
         * @returns {Promise}
         */
        close(): Promise<any>;
        /**
         * Set the log file location.
         * @param {String} filename
         */
        setFile(filename: string): void;
        /**
         * Set or reset the log level.
         * @param {String} level
         */
        setLevel(name: any): void;
        /**
         * Output a log to the `error` log level.
         * @param {String|Object|Error} err
         * @param {...Object} args
         */
        error(...args: any[]): void;
        /**
         * Output a log to the `warning` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        warning(...args: any[]): void;
        /**
         * Output a log to the `info` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        info(...args: any[]): void;
        /**
         * Output a log to the `debug` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        debug(...args: any[]): void;
        /**
         * Output a log to the `spam` log level.
         * @param {String|Object} obj
         * @param {...Object} args
         */
        spam(...args: any[]): void;
        /**
         * Output a log to the desired log level.
         * Note that this bypasses the level check.
         * @param {String} level
         * @param {Object[]} args
         */
        log(level: string, args: any[]): void;
        /**
         * Create logger context.
         * @param {String} module
         * @returns {LoggerContext}
         */
        context(module: string): LoggerContext;
        /**
         * Helper to parse an error into a nicer
         * format. Call's `log` internally.
         * @private
         * @param {Number} level
         * @param {Error} err
         */
        private logError;
        /**
         * Get the current memory usage.
         * @returns {Object}
         */
        memoryUsage(): any;
        /**
         * Log the current memory usage.
         */
        memory(): void;
    }
}
declare module "blgr/lib/blgr" {
    import Logger from 'blgr/lib/logger';
    export * from "blgr/lib/logger";
    export default Logger;
}
declare module "blgr" {
  import Logger from 'blgr/lib/logger';
  export * from "blgr/lib/logger";
  export default Logger;
}
declare module "blgr/lib/fs-browser" {
    export var unsupported: boolean;
}
declare module "blgr/lib/inspect-browser" {
    function _exports(obj: any): string;
    export = _exports;
}
