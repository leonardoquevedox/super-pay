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

let Merchant = module.exports = {
    init: (options) => {
        config = Config.init(options); // Initialize module.
        return Merchant; // Returns the module.
    },
    create: async (merchant, xAccessToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                let reqConfig = { headers: {} };
                if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                let create_merchant_url = `${config.server_url}/merchant`;
                let created = (await axios.post(create_merchant_url, merchant, reqConfig)).data;
                resolve(created);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
};