var _this = this;

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

export default (options => {

    // Avoiding exceptions...
    options = options || {};

    // Setting up credentials...
    _this.api_key = options.key; // Pay-U Merchant API Login
    _this.api_login = options.login; // Pay-U Merchant API key
    _this.account_id = options.account_id;

    // Configuring general options...
    _this.language = options.language || "en"; // Pay-U Responses Default Language

    // Selecting the environment...
    _this.development = options.development ? options.development : true; // Pay-U Type of Environment
    _this.payments_url = options.development ? dev_payments_url : prod_payments_url; // Pay-U Payments URL
    _this.reports_url = options.development ? dev_reports_url : prod_reports_url; // Pay-U Reports URL
    _this.subscriptions_url = options.development ? dev_subscriptions_url : prod_subscriptions_url; // Pay-U Recurrency URL

    return _this;
});

export const Config = module.exports;