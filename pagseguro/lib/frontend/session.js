/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
const querystring = require('querystring');
const axios = require("axios");

let config = require("./config");
let globals = require("./globals");
let utils = require("./utils");

const Session = module.exports = {
    init: (options) => {
        config = config(options);
        return this;
    },
    create: () => {
        return new Promise(async (resolve, reject) => {
            try {
                globals.sessionToken = (await axios.get(config.session_url)).data;
                globals.senderHash = PagSeguroDirectPayment.getSenderHash();
                PagSeguroDirectPayment.setSessionId(globals.sessionToken);
                resolve(globals.sessionToken);
            } catch (e) {
                console.log(e);
            }
        });
    }
}