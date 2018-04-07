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
let moment = require("moment");

let Config = require("./config");
let Utils = require("./utils");

let config = {};

let Payment = module.exports = {
    init: options => {
        config = Config.init(options);
        return Payment;
    },
    getPaymentMethods: (() => {
        var _ref = _asyncToGenerator(function* (amount) {
            return new Promise(function (resolve, reject) {
                PagSeguroDirectPayment.getPaymentMethods({
                    amount: amount,
                    success: function (response) {
                        resolve(response.paymentMethods);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        });

        return function getPaymentMethods(_x) {
            return _ref.apply(this, arguments);
        };
    })(),
    create: (() => {
        var _ref2 = _asyncToGenerator(function* (payment) {
            return new Promise((() => {
                var _ref3 = _asyncToGenerator(function* (resolve, reject) {
                    let data = {
                        hash: PagSeguroDirectPayment.getSenderHash(),
                        items: payment.items,
                        token: payment.creditCard.token,
                        method: payment.method,
                        total: payment.amount
                    };
                    let response = yield axios.post(`${config.server_url}/payment`);
                    resolve(response);
                });

                return function (_x3, _x4) {
                    return _ref3.apply(this, arguments);
                };
            })());
        });

        return function create(_x2) {
            return _ref2.apply(this, arguments);
        };
    })()
};