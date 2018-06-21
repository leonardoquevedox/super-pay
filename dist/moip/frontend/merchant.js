"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    init: options => {
        config = Config.init(options); // Initialize module.
        return Merchant; // Returns the module.
    },
    create: (() => {
        var _ref = _asyncToGenerator(function* (merchant, xAccessToken) {
            return new Promise((() => {
                var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                    try {
                        let reqConfig = { headers: {} };
                        if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                        let create_merchant_url = `${config.server_url}/merchant`;
                        let created = (yield axios.post(create_merchant_url, merchant, reqConfig)).data;
                        resolve(created);
                    } catch (e) {
                        ErrorUtils.handle(reject, e);
                    }
                });

                return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                };
            })());
        });

        return function create(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })()
};