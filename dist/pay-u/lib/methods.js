import _Promise from 'bluebird';
/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let xmlJS = require('xml-js');
let axios = require("axios");
let config = require('./config');

export default {
    init: options => {
        config = config(options);
    },
    list: () => {
        return new _Promise(async (resolve, reject) => {
            let operation = {
                "test": config.development,
                "language": config.language,
                "merchant": {
                    "apiLogin": config.api_login,
                    "apiKey": config.api_key
                },
                "command": "GET_PAYMENT_METHODS"
            };
            let response = (await axios.post(config.payments_url, operation)).data;
            if (response.error) reject(response);else resolve(response);
        });
    }
};

export const Methods = module.exports;