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
                    installmentCount: transaction.installments || 1,
                    statementDescriptor: transaction.description,
                };
                /* Payment instrument */
                if (transaction.instrument && transaction.instrument.creditCard) {
                    data.fundingInstrument = {
                        method: "CREDIT_CARD",
                        creditCard: transaction.instrument.creditCard
                    };
                };
                /* Order information */
                if (type == Payment.ORDER) {
                    data.order_id = transaction.order.id;
                };
                let url = type == Payment.ORDER ? `${Config.gateway_url}/v2/orders/${data.order_id}/payments` : `${Config.gateway_url}/v2/orders/${data.order_id}/payments`;
                let response = (await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Config.base64Auth}`
                    }
                })).data;
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        })
    }
}