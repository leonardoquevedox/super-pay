"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    init: (() => {
        var _ref = _asyncToGenerator(function* (options) {
            config = Config.init(options);
            return Subscription;
        });

        return function init(_x) {
            return _ref.apply(this, arguments);
        };
    })(),
    createPlan: (plan, xAccessToken) => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let reqConfig = { headers: {} };
                    if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                    let create_plan_url = `${config.server_url}/subscription/plan`;
                    let created = (yield axios.post(create_plan_url, plan, reqConfig)).data;
                    resolve(created);
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
            };
        })());
    },
    subscribe: (data, xAccessToken) => {
        return new Promise((() => {
            var _ref3 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let reqConfig = { headers: {} };
                    if (xAccessToken) reqConfig.headers["x-access-token"] = xAccessToken;
                    let subscribe_plan_url = `${config.server_url}/subscription/subscribe`;
                    let subscribed = (yield axios.post(subscribe_plan_url, data, reqConfig)).data;
                    resolve(subscribed);
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x4, _x5) {
                return _ref3.apply(this, arguments);
            };
        })());
    }
};