'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* Internal Modules */
let BackendConfig = require('./config');
let SessionBackend = require('./session');
let CardBackend = require('./card');
let PaymentBackend = require('./payment');
let SubscriptionBackend = require('./subscription');

let config = {};

let Backend = module.exports = {
    /* Backend Session Related Functions */
    session: SessionBackend,
    /* Backend Card Related Functions */
    card: CardBackend,
    /* Backend Payment Related Functions */
    payment: PaymentBackend,
    /* Backend Subscription Related Functions */
    subscription: SubscriptionBackend,
    /* Initialization function */
    init: (() => {
        var _ref = _asyncToGenerator(function* (options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                config = BackendConfig.init(options);
                SessionBackend.init(options);
                CardBackend.init(options);
                PaymentBackend.init(options);
                SubscriptionBackend.init(options);
                resolve(config);
            });
        });

        return function init(_x) {
            return _ref.apply(this, arguments);
        };
    })()
};