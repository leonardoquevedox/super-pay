/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment");

let Config = require("./config");
let Utils = require("./utils");
let CardUtils = require("../../utils/card.utils");

/* let dev_card_brand_url = `${config.images_url}/payment-methods-flags/42x20`; */

let config = {};

let Card = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Card; // Returns the module.
    },
    create: async (card) => {
        return new Promise((resolve, reject) => {
            if (card.brand) card.brand = card.brand.toLowerCase();
            PagSeguroDirectPayment.createCardToken({
                number: CardUtils.numbersOnly(card.number),
                brand: card.brand,
                cvv: card.cvv,
                expirationMonth: card.expirationMonth,
                expirationYear: card.expirationYear,
                success: (response) => {
                    resolve({ token: response.card.token });
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    },
    getExpirationOptions: async () => {
        return CardUtils.initExpirationDates();
    }
};