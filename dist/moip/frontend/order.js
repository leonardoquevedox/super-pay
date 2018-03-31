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
let moment = require("moment");

let Config = require("./config");
let Utils = require("./utils");

let config = {};

let Order = module.exports = {
    init: options => {
        config = Config.init(options); // Initialize module.
        return Order; // Returns the module.
    },
    create: (() => {
        var _ref = _asyncToGenerator(function* (order) {
            return new Promise((() => {
                var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                    try {
                        let tokenize_order_url = `${config.server_url}/order`;
                        let tokenized = (yield axios.post(tokenize_order_url, order)).data;
                        resolve(tokenized);
                    } catch (e) {
                        if (e.response && e.response) {
                            reject(e.response.data);
                        } else {
                            reject(e);
                        }
                    }
                });

                return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                };
            })());
        });

        return function create(_x) {
            return _ref.apply(this, arguments);
        };
    })(),
    list: (() => {
        var _ref3 = _asyncToGenerator(function* (customerId) {
            return new Promise((() => {
                var _ref4 = _asyncToGenerator(function* (resolve, reject) {
                    try {
                        let tokenize_order_url = `${config.server_url}/orders`;
                        let tokenized = (yield axios.post(tokenize_order_url, order)).data;
                        resolve(tokenized);
                    } catch (e) {
                        if (e.response && e.response) {
                            reject(e.response.data);
                        } else {
                            reject(e);
                        }
                    }
                });

                return function (_x5, _x6) {
                    return _ref4.apply(this, arguments);
                };
            })());
        });

        return function list(_x4) {
            return _ref3.apply(this, arguments);
        };
    })(),
    getExpirationOptions: (() => {
        var _ref5 = _asyncToGenerator(function* () {
            return OrderUtils.initExpirationDates();
        });

        return function getExpirationOptions() {
            return _ref5.apply(this, arguments);
        };
    })()
};