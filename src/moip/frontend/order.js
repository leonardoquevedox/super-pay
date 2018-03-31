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

let config = {};

let Order = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Order; // Returns the module.
    },
    create: async (order) => {
        return new Promise(async (resolve, reject) => {
            try {
                let tokenize_order_url = `${config.server_url}/order`;
                let tokenized = (await axios.post(tokenize_order_url, order)).data;
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
    list: async (customerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let tokenize_order_url = `${config.server_url}/orders`;
                let tokenized = (await axios.post(tokenize_order_url, order)).data;
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
        return OrderUtils.initExpirationDates();
    }
};