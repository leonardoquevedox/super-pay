/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

/* External Dependencies */
const querystring = require('querystring');
const axios = require("axios");

let config = require("./config");
let globals = require("./globals");
let utils = require("./utils");

const Session = module.exports = {
    init: (options) => {
        config = config(options);
        return this;
    },
    list: (amount) => {
        return new Promise((resolve, reject) => {
            PagSeguroDirectPayment.getPaymentMethods({
                amount: amount,
                success: (response) => {
                    resolve(response.paymentMethods)
                },
                error: (error) => {
                    reject(error)
                },
            });
        });
    }
}