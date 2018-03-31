"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let axios = require("axios");
let Promise = require("bluebird");

let Customer = require("./customer");
let Config = require("./config");
let config = {};

let Order = module.exports = {
    init: options => {
        config = Config.init(options);
    },
    list: () => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                try {
                    /* Payment instrument */
                    let url = `${Config.gateway_url}/v2/orders`;
                    let response = (yield axios.get(url, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": Config.base64Auth
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    if (e.response && e.response) {
                        reject(e.response.data);
                    } else {
                        reject(e);
                    }
                }
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    },
    create: transaction => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    if (transaction.receivers) {
                        transaction.receivers.map(function (receiver, index) {
                            let amount = receiver.fee || transaction.amount * (receiver.percentage * 100);
                            transaction.receivers[index] = {
                                "moipAccount": {
                                    "id": receiver.id
                                },
                                "amount": {
                                    "total": amount
                                },
                                "type": receiver.isPrimary ? "PRIMARY" : "SECONDARY"
                            };
                        });
                    }
                    /* Payment instrument */
                    let data = {
                        "ownId": transaction.reference,
                        "amount": {
                            "currency": transaction.currency,
                            "subtotals": {
                                "shipping": transaction.order.shipping
                            }
                        },
                        "items": [{
                            "product": order.description,
                            "quantity": 1,
                            "price": transaction.amount
                        }],
                        "customer": {
                            "id": transaction.buyer.id
                        },
                        receivers: transaction.receivers
                    };
                    let url = `${Config.gateway_url}/v2/orders`;
                    let response = (yield axios.post(url, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": Config.base64Auth
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    if (e.response && e.response) {
                        reject(e.response.data);
                    } else {
                        reject(e);
                    }
                }
            });

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })());
    },
    delete: id => {
        return new Promise((() => {
            var _ref3 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let url = `${Config.gateway_url}/v2/orders/${id}`;
                    let response = (yield axios.delete(url, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": Config.base64Auth
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    if (e.response && e.response) {
                        reject(e.response.data);
                    } else {
                        reject(e);
                    }
                }
            });

            return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        })());
    }
};