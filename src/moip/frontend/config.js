
/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */

let Config = module.exports = {
    /** 
     * @function 
     * @param {string} [server_url] Application server url
     * 
     * @returns {object} config
     * */
    init: (options) => {
        // Avoiding exceptions...
        options = options || {};

        // Selecting the environment...
        Config.development = options.development ? options.development : true; // Reports URL
        Config.server_url = options.server_url; // Application Server

        return Config;
    }
}