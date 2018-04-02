"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    init: options => {
        config = Config.init(options);
        return Session;
    },
    create: () => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let data = {
                        client_id: Config.app_id,
                        redirect_uri: Config.redirect_uri,
                        client_secret: Config.client_secret,
                        grant_type: 'authorization_code'
                    };
                    let url = `${Config.gateway_url}/oauth/token`;
                    let response = (yield axios.post(url, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `OAuth ${Config.api_token}`
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    }
};