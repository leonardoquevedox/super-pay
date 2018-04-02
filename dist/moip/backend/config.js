"use strict";

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */
const base64 = require('base-64');

const dev_gateway_url = "https://sandbox.moip.com.br";

const prod_gateway_url = "https://sandbox.moip.com.br";

let Config = module.exports = {
    init: options => {
        // Avoiding exceptions...
        options = options || {};

        // Setting up credentials...
        // Checking for API Token...
        if (!options.api_token) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the api_token option ;)");
        Config.api_token = options.api_token; // Merchant API Token
        // Checking for API Key...
        if (!options.api_key) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the api_key option ;)");
        Config.api_key = options.api_key; // Merchant API Key
        // Checking for App id...
        if (!options.app_id) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the app_id option ;)");
        Config.app_id = options.app_id; // Merchant API Key
        // Checking for App secret...
        if (!options.app_secret) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the app_secret option ;)");
        Config.app_secret = options.app_secret; // Merchant API Key
        // Checking for App token...
        if (!options.app_token) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the app_token option ;)");
        Config.app_token = options.app_token; // Merchant API Key


        // Selecting the environment...
        Config.development = options.development || true; // Reports URL
        Config.gateway_url = Config.development ? dev_gateway_url : prod_gateway_url;
        Config.base64Auth = base64.encode(`${Config.api_token}:${Config.api_key}`);
        return Config;
    },
    getCredentials() {
        return {
            token: Config.api_token
        };
    }
};