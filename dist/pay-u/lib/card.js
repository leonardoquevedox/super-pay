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
let config = require("./config");

export default {
    init: options => {
        config = config(options);
    },
    tokenize: card => {
        return new _Promise(async (resolve, reject) => {
            let expMonth = card.expirationDate.getMonth().length > 0 ? card.expirationDate.getMonth() : `0${card.expirationDate.getMonth()}`;
            let expDate = `${card.expirationDate.getFullYear()}/${expMonth}`;
            let operation = {
                "test": config.development,
                "language": config.language,
                "merchant": {
                    "apiLogin": config.api_login,
                    "apiKey": config.api_key
                },
                "command": "CREATE_TOKEN",
                "creditCardToken": {
                    "identificationNumber": card.id, // Card Identification Number
                    "payerId": card.payerRef, // Your internal database payer ID
                    "name": card.holder, // Card holder name
                    "paymentMethod": card.brand.toUpperCase(), // Card brand (VISA, ELO, etc.)
                    "number": card.number, // Card Number
                    "expirationDate": expDate // Card expiration date (YYYY/MM)
                }
            };
            let response = (await axios.post(config.payments_url, operation)).data;
            if (response.error) reject(response);else resolve(response);
        });
    },
    remove: card => {
        return new _Promise(async (resolve, reject) => {
            let operation = {
                "test": config.development,
                "language": config.language,
                "merchant": {
                    "apiLogin": config.api_login,
                    "apiKey": config.api_key
                },
                "command": "REMOVE_TOKEN",
                "removeCreditCardToken": {
                    "payerId": card.payerId,
                    "creditCardTokenId": card.token
                }
            };
            console.log(card);
            let response = (await axios.post(config.payments_url, operation)).data;
            if (response.error) reject(response);else resolve(response);
        });
    }

};

export const Card = module.exports;