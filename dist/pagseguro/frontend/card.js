var _this = this;

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
let Globals = require("./globals");
let Utils = require("./utils");
let CardUtils = require("../../utils/card.utils");

let formatCardNumber = cardNumber => {
    return cardNumber.replace(/ /g, "");
};
/* let dev_card_brand_url = `${config.images_url}/payment-methods-flags/42x20`; */

let config = {};

let Card = module.exports = {
    /** 
     * @property {Object} expirationOptions
     */
    expirationOptions: {
        years: [],
        months: []
    },
    init: options => {
        config = Config.init(options); // Initialize module.
        CardUtils.initExpirationDates(Card.expirationOptions); // Initialize expiration years and months.
        return _this; // Returns the module.
    },
    create: async card => {
        return new Promise((resolve, reject) => {
            PagSeguroDirectPayment.createCardToken({
                cardNumber: formatCardNumber(card.cardNumber),
                brand: card.brand,
                cvv: card.cvv,
                expirationMonth: card.expirationMonth,
                expirationYear: card.expirationYear,
                success: response => {
                    resolve(response.card.token);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    },
    getBrand: async cardNumber => {
        let brand = await CardUtils.getBrand(cardNumber);
        return brand;
    }
};