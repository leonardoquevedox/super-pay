"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* SuperPay General Modules */
let Utils = require("../../utils/utils");

/* Gateway Specific Modules */
let Config = require("./config");
let Card = require("./card");
let Customer = require("./customer");
let Merchant = require("./merchant");
let Order = require("./order");
let Payment = require("./payment");
let Subscriber = require("./subscriber");
let Subscription = require("./subscription");

let config = {};

let Frontend = module.exports = {
    /* Card Related Functions */
    card: Card,
    /* Customer Related Functions */
    customer: Customer,
    /* Merchant Related Functions */
    merchant: Merchant,
    /* Order Related Functions */
    order: Order,
    /* Payment Related Functions */
    payment: Payment,
    /* Subscriber Related Functions */
    subscriber: Subscriber,
    /* Subscription Related Functions */
    subscription: Subscription,
    /* Initialization function */
    init: (() => {
        var _ref = _asyncToGenerator(function* (options) {
            return new Promise((() => {
                var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                    options = options || {};
                    config = Config.init(options);
                    Card.init(options);
                    Customer.init(options);
                    Merchant.init(options);
                    Order.init(options);
                    Payment.init(options);
                    Subscriber.init(options);
                    Subscription.init(options);
                });

                return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                };
            })());
        });

        return function init(_x) {
            return _ref.apply(this, arguments);
        };
    })()
};