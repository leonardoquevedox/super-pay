/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment-mini");

let Config = require("./config");
let Utils = require("./utils");
let CardUtils = require("../../utils/card.utils");
let ErrorUtils = require("../../utils/error.utils");

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
    create: async (card, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let tokenize_card_url = `${config.server_url}/card`;
                let tokenized = (await axios.post(tokenize_card_url, card, reqConfig)).data;
                resolve(tokenized);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    delete: async (card, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let delete_card_url = `${config.server_url}/card/${card.id}`;
                let deleted = (await axios.delete(delete_card_url, reqConfig)).data;
                resolve(deleted);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    list: async (customer, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let list_cards_url = `${config.server_url}/customer/${customer.id}/cards`;
                let list = (await axios.get(list_cards_url, reqConfig)).data;
                resolve(list);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    getExpirationOptions: async () => {
        return CardUtils.initExpirationDates();
    }
};