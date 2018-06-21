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

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let Utils = require("./utils");

let config = {};

let Order = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Order; // Returns the module.
    },
    create: async (order, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let create_order_url = `${config.server_url}/order`;
                let created = (await axios.post(create_order_url, order, reqConfig)).data;
                resolve(created);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    list: async (orderId, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let list_orders_url = `${config.server_url}/${orderId}/orders`;
                let list = (await axios.get(list_orders_url, order, reqConfig)).data;
                resolve(list);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
};