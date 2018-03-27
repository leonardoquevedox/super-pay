"use strict";

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */

// Dev environment variables
let dev_payments_url = "https://ws.sandbox.pagseguro.uol.com.br/v2";
let dev_subscriptions_url = "https://ws.sandbox.pagseguro.uol.com.br/v2";

// Prod environment variables
let prod_payments_url = "https://ws.pagseguro.uol.com.br/v2";
let prod_subscriptions_url = "https://ws.pagseguro.uol.com.br/v2";

let Config = module.exports = {
    init: options => {

        // Avoiding exceptions...
        options = options || {};

        // Setting up credentials...
        if (!options.api_email) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the api_email option ;)");
        undefined.api_email = options.api_email; // Merchant Login E-mail
        if (!options.api_email) console.warn("SuperPay to Major Tom: Whoops! It looks like you have forgotten the api_token option ;)");
        undefined.api_token = options.api_token; // Merchant API Token

        // Selecting the environment...
        undefined.development = options.development || true; // Reports URL
        undefined.payments_url = undefined.development ? dev_payments_url : prod_payments_url; // Payments URL
        undefined.subscriptions_url = undefined.development ? dev_subscriptions_url : prod_subscriptions_url; // Payments URL
        return undefined;
    }
};