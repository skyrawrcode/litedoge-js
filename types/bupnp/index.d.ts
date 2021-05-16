declare module "bupnp/lib/upnp" {
    export = UPNP;
    /**
     * UPNP
     */
    class UPNP {
        /**
         * Parse UPNP datagram.
         * @private
         * @param {String} str
         * @returns {Object}
         */
        private static parseHeader;
        /**
         * Discover gateway and resolve service.
         * @param {String?} host - Multicast IP.
         * @param {Number?} port - Multicast port.
         * @param {String?} gateway - Gateway type.
         * @param {String[]?} targets - Target service types.
         * @returns {Promise} Service.
         */
        static discover(host?: string | null, port?: number | null, gateway?: string | null, targets?: string[] | null): Promise<any>;
        /**
         * Create a UPNP context.
         * @constructor
         * @param {String} [host=239.255.255.250] - Multicast IP.
         * @param {Number} [port=1900] - Multicast port.
         * @param {String?} gateway - Gateway name.
         */
        constructor(host?: string, port?: number, gateway?: string | null);
        host: string;
        port: number;
        gateway: string;
        timeout: any;
        job: {
            resolve: any;
            reject: any;
        };
        /**
         * Clean up current job.
         * @private
         * @returns {Job}
         */
        private cleanupJob;
        socket: any;
        /**
         * Reject current job.
         * @private
         * @param {Error} err
         */
        private rejectJob;
        /**
         * Resolve current job.
         * @private
         * @param {Object} result
         */
        private resolveJob;
        /**
         * Start gateway timeout.
         * @private
         */
        private startTimeout;
        /**
         * Stop gateway timeout.
         * @private
         */
        private stopTimeout;
        /**
         * Discover gateway.
         * @private
         * @returns {Promise} Location string.
         */
        private discover;
        /**
         * Handle incoming UDP message.
         * @private
         * @param {String} msg
         * @returns {Promise}
         */
        private handleMsg;
        /**
         * Resolve service parameters from location.
         * @param {String} location
         * @param {String[]} targets - Target services.
         * @returns {Promise}
         */
        resolve(location: string, targets: string[]): Promise<any>;
    }
    namespace UPNP {
        const INTERNET_GATEWAY: string;
        const WAN_SERVICES: string[];
        const RESPONSE_TIMEOUT: number;
        const unsupported: boolean;
    }
}
declare module "bupnp"{
    const _exports: typeof import("bupnp/lib/upnp");
    export = _exports;
}
declare module "bupnp/lib/bupnp" {
    const _exports: typeof import("bupnp/lib/upnp");
    export = _exports;
}
declare module "bupnp/lib/upnp-browser" {
    export = UPNP;
    /**
     * UPNP
     */
    class UPNP {
        /**
         * Discover gateway and resolve service.
         * @param {String?} host - Multicast IP.
         * @param {Number?} port - Multicast port.
         * @param {String?} gateway - Gateway type.
         * @param {String[]?} targets - Target service types.
         * @returns {Promise} Service.
         */
        static discover(host: string | null, port: number | null, gateway: string | null, targets: string[] | null): Promise<any>;
        /**
         * Create a UPNP context.
         * @constructor
         * @param {String?} host - Multicast IP.
         * @param {Number?} port - Multicast port.
         * @param {String?} gateway - Gateway name.
         */
        constructor(host: string | null, port: number | null, gateway: string | null);
    }
    namespace UPNP {
        const unsupported: boolean;
    }
}
