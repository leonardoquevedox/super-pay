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
let CardUtils = require("../../utils/card.utils");

let Customer = require("./customer");
let Config = require("./config");
let config = {};

let Card = module.exports = {
    init: options => {
        config = Config.init(options);
    },
    list: () => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                resolve();
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    },
    create: (customer, card) => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let cvv = card.cvv;
                    let phone = new PhoneNumber(card.holder.phone, "BR").getNumber("significant");
                    let birthDate = (card.holder.birthDate ? new Date(card.holder.birthDate) : new Date()).toISOString().split("T")[0];;
                    /* Payment instrument */
                    let data = {
                        method: "CREDIT_CARD",
                        creditCard: {
                            ownId: card.reference,
                            number: yield CardUtils.numbersOnly(card.number),
                            cvc: card.cvv,
                            expirationMonth: card.expirationMonth,
                            expirationYear: card.expirationYear,
                            holder: {
                                fullname: card.holder.name,
                                email: card.holder.email,
                                birthdate: birthDate,
                                phone: {
                                    countryCode: "55",
                                    areaCode: phone ? phone.substring(0, 2) : undefined,
                                    number: phone ? phone.substring(2, phone.length) : undefined
                                },
                                taxDocument: {
                                    type: card.holder.document.type,
                                    number: card.holder.document.number ? card.holder.document.number.replace(/[^\d]/g, "") : undefined
                                }
                            }
                        }
                    };
                    let url = `${Config.gateway_url}/v2/customers/${customer.id}/fundinginstruments`;
                    let response = (yield axios.post(url, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Basic ${Config.base64Auth}`
                        }
                    })).data;
                    resolve(Object.assign(response.creditCard, { cvv: cvv }));
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })());
    },
    delete: card => {
        return new Promise((() => {
            var _ref3 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let url = `${Config.gateway_url}/v2/fundinginstruments/${card.id}`;
                    let response = (yield axios.delete(url, {
                        headers: {
                            "Authorization": `Basic ${Config.base64Auth}`
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        })());
    }
};