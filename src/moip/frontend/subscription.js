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

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");

let config = {};

let Subscription = module.exports = {
    init: async (options) => {
        config = Config.init(options);
        return Subscription;
    },
    createPlan: (plan) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let create_plan_url = `${config.server_url}/subscription/plan`;
                let created = (await axios.post(create_plan_url, plan, reqConfig)).data;
                resolve(created);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    subscribe: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let subscribe_plan_url = `${config.server_url}/subscription/subscribe`;
                let subscribed = (await axios.post(subscribe_plan_url, data, reqConfig)).data;
                resolve(subscribed);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
}