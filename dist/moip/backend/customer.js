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

let Config = require("./config");
let config = {};

let Customer = module.exports = {
    init: options => {
        config = Config.init(options);
        return config;
    },
    create: customer => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let phone = new PhoneNumber(customer.phone, "BR").getNumber("significant");
                    let birthDate = (customer.birthDate || "").replace(/\//g, "-");
                    if (customer.address && customer.address.country && customer.address.country.length < 3) customer.address.country = countries.toAlpha3(customer.address.country);
                    /* Sender information */
                    let data = {
                        ownId: customer.reference,
                        fullname: customer.name,
                        email: customer.email,
                        birthDate: birthDate,
                        phone: {
                            countryCode: "55",
                            areaCode: phone ? phone.substring(0, 2) : undefined,
                            number: phone ? phone.substring(2, phone.length) : undefined
                        },
                        taxDocument: {
                            type: customer.document.type,
                            number: customer.document.number ? customer.document.number.replace(/[^\d]/g, "") : undefined
                        },
                        shippingAddress: {
                            street: customer.address.street ? customer.address.street.split(",")[0] : "",
                            streetNumber: customer.address.number,
                            complement: customer.address.complement,
                            district: customer.address.neighbourhood,
                            city: customer.address.city,
                            state: customer.address.state,
                            country: customer.address.country,
                            zipCode: customer.address.postalCode ? customer.address.postalCode.replace(/[^\d]/g, "") : undefined
                        }
                    };
                    let url = `${Config.gateway_url}/v2/customers`;
                    let response = (yield axios.post(url, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Basic ${Config.base64Auth}`
                        }
                    })).data;
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
    read: id => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let url = `${Config.gateway_url}/v2/customers/${id}`;
                    let response = (yield axios.get(url, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Basic ${Config.base64Auth}`
                        }
                    })).data;
                    resolve(response);
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })());
    },
    list: () => {
        return new Promise((() => {
            var _ref3 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let url = `${Config.gateway_url}/v2/customers`;
                    let response = (yield axios.get(url, {
                        headers: {
                            "Content-Type": "application/json",
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