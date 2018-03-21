/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

// Dev environment variables
let dev_payments_url = "https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi";
let dev_reports_url = "https://sandbox.api.payulatam.com/payments-api/4.0/reports.cgi";
let dev_subscriptions_url = "";

// Prod environment variables
let prod_payments_url = "https://api.payulatam.com/payments-api/4.0/service.cgi";
let prod_reports_url = "https://api.payulatam.com/payments-api/4.0/reports.cgi";
let prod_subscriptions_url = "";

let Config = module.exports = (options) => {

    // Avoiding exceptions...
    options = options || {};
    
    // Setting up credentials...
    this.api_key = options.key; // Pay-U Merchant API Login
    this.api_login = options.login; // Pay-U Merchant API key
    this.account_id = options.account_id;

    // Configuring general options...
    this.language = options.language || "en"; // Pay-U Responses Default Language

    // Selecting the environment...
    this.development = options.development ? options.development : true;  // Pay-U Type of Environment
    this.payments_url = options.development ? dev_payments_url : prod_payments_url; // Pay-U Payments URL
    this.reports_url = options.development ? dev_reports_url : prod_reports_url; // Pay-U Reports URL
    this.subscriptions_url = options.development ? dev_subscriptions_url : prod_subscriptions_url; // Pay-U Recurrency URL

    return this;
};

export const Config;