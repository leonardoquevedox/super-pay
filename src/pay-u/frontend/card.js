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

let formatCardNumber = (cardNumber) => {
    return cardNumber.replace(/ /g, "");
};
/* let dev_card_brand_url = `${config.images_url}/payment-methods-flags/42x20`; */

let config = {};

let Card = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Card; // Returns the module.
    },
    create: async (card) => {
        return new Promise(async (resolve, reject) => {
            try {
                let tokenize_card_url = `${config.server_url}/card`;
                let tokenized = (await axios.post(tokenize_card_url, card)).data;
                resolve(tokenized);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }
            }
        });
    },
    getExpirationOptions: async () => {
        return CardUtils.initExpirationDates();
    }
};