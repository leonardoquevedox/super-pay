/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
const querystring = require('querystring');
const axios = require("axios");
const moment = require("moment");

let config = require("./config");
let globals = require("./globals");

const dev_card_brand_url = `${config.images_url}/payment-methods-flags/42x20`;

let formatCardNumber = (cardNumber) => {
    return cardNumber.replace(/ /g, "");
};

let initExpirationDates = () => {
    for (let month = 1; month <= 12; month++) {
        globals.cardExpirationMonths.push(utils.pad(month));
    }
    for (let year = 0; year <= 30; year++) {
        globals.cardExpirationYears.push(moment().add(year, 'years').format('YYYY'));
    }
};

const Card = module.exports = {
    init: (options) => {
        config = config(options);
        this.initExpirationDates();
        return this;
    },
    create: (card) => {
        return new Promise((resolve, reject) => {
            PagSeguroDirectPayment.createCardToken({
                cardNumber: this.formatCardNumber(card.cardNumber),
                brand: card.brand,
                cvv: card.cvv,
                expirationMonth: card.expirationMonth,
                expirationYear: card.expirationYear,
                success: (response) => {
                    resolve(response.card.token);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    },
    getBrand: (cardNumber) => {
        return new Promise((resolve, reject) => {
            let bin = this.formatCardNumber(cardNumber);
            PagSeguroDirectPayment.getBrand({
                cardBin: bin,
                success: (response) => {
                    resolve(response.brand.name);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    },
    /*getBrandName: (cardBrand) => {
        let paymentMethodsIsDefined = typeof globals.paymentMethods !== "undefined";
        if (!paymentMethodsIsDefined || !cardBrand) console.warn("SuperPay.js to Major Tom: Whoops! Please, make sure you init the payment methods before calling this function ;)");
        else return (globals.paymentMethods && cardBrand) ? globals.paymentMethods.CREDIT_CARD.options[cardBrand.name.toUpperCase()].displayName : '';
    },
    getCardImage: (cardBrand) => {
        return `${this.CARD_BRAND_URL}/${cardBrand}.png`;
    }, */
}