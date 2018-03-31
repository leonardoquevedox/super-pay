/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 */

/* External Dependencies */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment");

let Config = require("./config");
let Utils = require("./utils");

let config = {};

let Payment = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return Payment;
    },
    create(payment) {
        return new Promise(async (resolve, reject) => {
            let data = {
                hash: PagSeguroDirectPayment.getSenderHash(),
                items: payment.items,
                token: payment.creditCard.token,
                method: payment.method,
                total: payment.amount
            };
            let response = await axios.post(`${config.server_url}/payment`);
            resolve(response);
        });
    },
    getPaymentMethods(amount) {
        return new Promise((resolve, reject) => {
            PagSeguroDirectPayment.getPaymentMethods({
                amount: amount,
                success: (response) => {
                    resolve(response.paymentMethods)
                },
                error: (error) => {
                    reject(error)
                },
            });
        });
    }
}