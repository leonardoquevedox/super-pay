var _this = this;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let axios = require("axios");
let Promise = require("bluebird");

let Config = require("./config");
let config = {};

let Session = module.exports = {
    init: options => {
        config = Config.init(options);
        return _this;
    },
    create: () => {
        return new Promise(async (resolve, reject) => {
            let session_token_url = `${config.checkout_url}/sessions/`;
            let credentials = {
                email: config.api_email,
                token: config.api_token
            };
            let url = session_token_url + "?" + querystring.stringify(credentials);
            let response = (await axios.post(url)).data;
            resolve(token);
        });
    }
};