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

let Customer = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Customer; // Returns the module.
    },
    create: async (customer) => {
        return new Promise(async (resolve, reject) => {
            try {
                let create_customer_url = `${config.server_url}/customer`;
                let created = (await axios.post(create_customer_url, customer)).data;
                resolve(created);
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
                let list_customers_url = `${config.server_url}/${customerId}/customers`;
                let list = (await axios.get(list_customers_url, customer)).data;
                resolve(list);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }
            }
        });
    }
};