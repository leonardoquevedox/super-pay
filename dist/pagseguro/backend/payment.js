"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let PhoneNumber = require('awesome-phonenumber');
let querystring = require("querystring");
let Promise = require("bluebird");
let axios = require("axios");
let md5 = require("md5");

let Config = require("./config");
let config = {};

let Payment = module.exports = {
    init: options => {
        config = Config.init(options);
        return Payment;
    },
    create: (transaction, endpoint) => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let phone = new PhoneNumber(transaction.buyer.phone, 'BR').getNumber('significant');
                    let total = parseFloat(transaction.amount).toFixed(2);
                    let data = {

                        /* Transaction information */
                        mode: "default",
                        method: transaction.method,
                        currency: transaction.currency,
                        /* Order information */
                        reference: transaction.reference,
                        notificationURL: transaction.notificationURL,

                        /* Payment information */
                        creditCard: {
                            token: transaction.instrument.cardToken,
                            /* Installments (commonly known as PARCELAS) */
                            installment: {
                                quantity: transaction.installments || "1",
                                value: total
                            },
                            holder: {
                                name: transaction.instrument.holder.name,
                                documents: [{
                                    type: transaction.instrument.holder.document.type,
                                    value: transaction.instrument.holder.document.number ? transaction.instrument.holder.document.number.replace(/[^\d]/g, "") : undefined
                                }]
                            },
                            /* Billing address */
                            billingAddress: {
                                street: transaction.instrument.holder.address.street,
                                number: transaction.instrument.holder.address.number,
                                district: transaction.instrument.holder.address.neighbourhood,
                                city: transaction.instrument.holder.address.city,
                                state: transaction.instrument.holder.address.state,
                                country: transaction.instrument.holder.address.country,
                                postalCode: transaction.instrument.holder.address.postalCode ? transaction.instrument.holder.address.postalCode.replace(/[^\d]/g, "") : undefined
                            }
                        },
                        shipping: {
                            addressRequired: false
                        },
                        /* Sender information */
                        sender: {
                            hash: transaction.buyer.hash,
                            phone: {
                                areaCode: phone ? phone.substring(0, 2) : undefined,
                                number: phone ? phone.substring(2, phone.length - 1) : undefined
                            },
                            email: transaction.buyer.email,
                            name: transaction.buyer.name,
                            documents: [{
                                type: transaction.buyer.document.type,
                                value: transaction.buyer.document.number ? transaction.buyer.document.number.replace(/[^\d]/g, "") : undefined
                            }]
                        }
                    };
                    if (transaction.order) {
                        data.extraAmount = transaction.extraFees ? parseFloat(transaction.extraFees).toFixed(2) : undefined;
                        data.items = {
                            item: {
                                id: "0001",
                                description: transaction.description,
                                amount: total,
                                quantity: "1"
                            }
                        };
                    }
                    if (transaction.plan) {
                        data.plan = transaction.plan;
                    }
                    let credentials = {
                        email: config.api_email,
                        token: config.api_token
                    };
                    endpoint = endpoint || "/transactions";
                    let body = `<?xml version="1.0" encoding="utf-8"?>\n` + xmlJS.json2xml(data, { compact: true });
                    let url = config.checkout_url + `${endpoint}?` + querystring.stringify(credentials);
                    let response = (yield axios.post(url, body, {
                        headers: {
                            "Content-Type": "application/xml; charset=ISO-8859-1"
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    if (e.response && e.response) {
                        reject(e.response.data);
                    } else {
                        reject(e.message);
                    }
                }
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    }
};