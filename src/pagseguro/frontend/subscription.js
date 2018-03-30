/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

/* External Dependencies */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment");

let Config = require("./config");
let Globals = require("./globals");
let Utils = require("./utils");

let config = {};

let Subscription = module.exports = {
    init: async (options) => {
        config = Config.init(options);
        return Subscription;
    },
    createPlan: (plan) => {
        return new Promise(async (resolve, reject) => {
            try {
                let create_plan_url = `${config.server_url}/subscription/plan`;
                let created = (await axios.post(create_plan_url, plan)).data;
                resolve(created);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e.message);
                }
            }
        });
    },
    subscribe: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                data.buyer.hash = PagSeguroDirectPayment.getSenderHash();
                let subscribe_plan_url = `${config.server_url}/subscription/subscribe`;
                let subscribed = (await axios.post(subscribe_plan_url, data)).data;
                resolve(subscribed);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e.message);
                }
            }
        });
    },
}