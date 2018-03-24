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
/* const dev_card_brand_url = `${config.images_url}/payment-methods-flags/42x20`; */

const config = {};
const Card = module.exports = {
    /** 
     * @property {Object} expirationOptions
     */
    expirationOptions: {
        years: [],
        months: []
    },
    init: options => {
        config = Config.init(options);
        CardUtils.initExpirationDates();
        return _this;
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
    getInfo: async cardNumber => {
        let info = await CardUtils.getInfo(cardNumber);
        return info;
    }
    /*getBrandName: (cardBrand) => {
        let paymentMethodsIsDefined = typeof Globals.paymentMethods !== "undefined";
        if (!paymentMethodsIsDefined || !cardBrand) console.warn("SuperPay.js to Major Tom: Whoops! Please, make sure you init the payment methods before calling this function ;)");
        else return (Globals.paymentMethods && cardBrand) ? Globals.paymentMethods.CREDIT_CARD.options[cardBrand.name.toUpperCase()].displayName : ";
    },
    getCardImage: (cardBrand) => {
        return `${this.CARD_BRAND_URL}/${cardBrand}.png`;
    }, */
};