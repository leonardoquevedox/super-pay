/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5 
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let PhoneNumber = require("awesome-phonenumber");
let querystring = require("querystring");
let Promise = require("bluebird");
let ip = require("ip");
let axios = require("axios");
let md5 = require("md5");
const countries = require("i18n-iso-countries");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let config = {};

let Payment = module.exports = {
    SUBSCRIPTION: "subscription",
    ORDER: "order",
    init: (options) => {
        config = Config.init(options);
        return Payment;
    },
    create: (type, transaction) => {
        return new Promise(async (resolve, reject) => {
            try {
                /* Payment information */
                let data = {
                    /* Transaction information */
                    mode: "default",
                    currency: transaction.currency,
                    reference: transaction.reference,
                    notificationURL: ip.address() + "/payment/update",
                };
                resolve(parsed);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        })
    }
}