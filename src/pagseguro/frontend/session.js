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
let Utils = require("./utils");

let config = {};

let Session = module.exports = {
    token: "",
    init: async (options) => {
        try {
            config = Config.init(options);
            let token = await Session.create();
            PagSeguroDirectPayment.setSessionId(token);
            return Session;
        } catch (e) {
            console.warn(e);
        }
    },
    create: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let session_url = `${config.server_url}/session`;
                let sessionToken = (await axios.get(session_url)).data;
                let senderHash = PagSeguroDirectPayment.getSenderHash();
                PagSeguroDirectPayment.setSessionId(sessionToken);
                resolve(sessionToken);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
}