/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 */

/* External Dependencies */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment-mini");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

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
            try {
                let response = await axios.post(`${config.server_url}/payment`);
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }

        });
    },
    getPaymentMethods(amount) {
        return new Promise((resolve, reject) => {

        });
    }
}