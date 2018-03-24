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
    init: (options) => {

        // Avoiding exceptions...
        options = options || {};

        // Setting up credentials...
        this.api_email = options.email; // Merchant Login E-mail
        this.api_token = options.token; // Merchant API Token

        // Selecting the environment...
        this.development = options.development ? options.development : true; // Reports URL
        this.payments_url = options.development ? dev_payments_url : prod_payments_url; // Payments URL
        this.subscriptions_url = options.development ? dev_subscriptions_url : prod_subscriptions_url; // Payments URL

        return this;
    }
}