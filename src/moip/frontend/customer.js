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

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let Utils = require("./utils");

let config = {};

let Customer = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Customer; // Returns the module.
    },
    create: async (customer, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let create_customer_url = `${config.server_url}/customer`;
                let created = (await axios.post(create_customer_url, customer, reqConfig)).data;
                resolve(created);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    list: async (customerId, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let list_customers_url = `${config.server_url}/${customerId}/customers`;
                let list = (await axios.get(list_customers_url, customer, reqConfig)).data;
                resolve(list);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
};