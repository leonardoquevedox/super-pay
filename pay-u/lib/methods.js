/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
const querystring = require('querystring');
const xmlJS = require('xml-js');
const axios = require("axios");
let config = require('./config');

const Methods = module.exports = {
    init: (options) => { config = config(options) },
    list: () => {
        return new Promise(async (resolve, reject) => {
            let operation = {
                "test": config.development,
                "language": config.language,
                "merchant": {
                    "apiLogin": config.api_login,
                    "apiKey": config.api_key
                },
                "command": "GET_PAYMENT_METHODS",
            };
            let response = (await axios.post(config.payments_url, operation)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    }
}