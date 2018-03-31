/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */

// Dev environment variables
let dev_gateway_url = "https://ws.sandbox.pagseguro.uol.com.br";

// Prod environment variables
let prod_gateway_url = "https://ws.pagseguro.uol.com.br";

let Config = module.exports = {
    init: (options) => {

        // Avoiding exceptions...
        options = options || {};

        // Setting up credentials...
        if (!options.api_email) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the api_email option ;)");
        Config.api_email = options.api_email; // Merchant Login E-mail
        if (!options.api_token) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the api_token option ;)");
        Config.api_token = options.api_token; // Merchant API Token

        // Selecting the environment...
        Config.development = options.development || true; // Reports URL
        Config.gateway_url = Config.development ? dev_gateway_url : prod_gateway_url; // Payments URL
        return Config;
    },
    getCredentials() {
        return {
            email: Config.api_email,
            token: Config.api_token
        }
    }
}