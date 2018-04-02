/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5 
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let PhoneNumber = require("awesome-phonenumber");
let querystring = require("querystring");
let Promise = require("bluebird");
let ip = require("ip");
let axios = require("axios");
let md5 = require("md5");
const countries = require("i18n-iso-countries");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let config = {};

let Session = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return Session;
    },
    create: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    client_id: Config.app_id,
                    redirect_uri: Config.redirect_uri,
                    client_secret: Config.client_secret,
                    grant_type: 'authorization_code'
                };
                let url = `${Config.gateway_url}/oauth/token`;
                let response = (await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `OAuth ${Config.api_token}`
                    }
                })).data;
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        })
    }
}