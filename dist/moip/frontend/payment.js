"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 */

/* External Dependencies */
let Promise = require("bluebird");
let querystring = require("querystring");
let axios = require("axios");
let moment = require("moment-mini");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Config = require("./config");
let Utils = require("./utils");

let config = {};

let Payment = module.exports = {
    init: options => {
        config = Config.init(options);
        return Payment;
    },
    create(payment) {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let response = yield axios.post(`${config.server_url}/payment`);
                    resolve(response);
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    },
    getPaymentMethods(amount) {
        return new Promise((resolve, reject) => {});
    }
};