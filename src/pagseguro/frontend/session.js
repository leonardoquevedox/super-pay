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

let Session = module.exports = {
    token: "",
    init: async (options) => {
        config = Config.init(options);
        let token = await Session.create();
        PagSeguroDirectPayment.setSessionId(token);
        return Session;
    },
    create: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let session_url = `${config.server_url}/session`;
                Globals.sessionToken = (await axios.get(session_url)).data;
                Globals.senderHash = PagSeguroDirectPayment.getSenderHash();
                PagSeguroDirectPayment.setSessionId(Globals.sessionToken);
                resolve(Globals.sessionToken);
            } catch (e) {
                console.log(e);
            }
        });
    }
}