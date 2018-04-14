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
let xmlJS = require("xml-js");
let Promise = require("bluebird");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let PaymentCtrl = require("./payment");
let Config = require("./config");
let config = {};

let Subscription = module.exports = {
    init: options => {
        config = Config.init(options);
        return Subscription;
    },
    createPlan: plan => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let credentials = Config.getCredentials();
                    if (plan.expiration) plan.expiration.value = parseInt(plan.expiration.split(" ")[0]);
                    if (plan.expiration) plan.expiration.unit = plan.expiration.split(" ")[1];
                    if (plan.expiration && plan.expiration.unit) plan.expiration.unit += plan.expiration.unit.toLowerCase()[plan.expiration.unit.length - 1] == "s" ? "" : "S";
                    plan.charge_type = plan.charge_manually ? "MANUAL" : "AUTO";
                    let create_url = `${config.gateway_url}/v2/pre-approvals/request`;
                    let data = {
                        preApprovalRequest: {
                            reference: "FUNKZIE",
                            preApproval: {
                                name: plan.name,
                                charge: plan.charge_type.toUpperCase(),
                                period: plan.charge_periodicity.toUpperCase(),
                                amountPerPayment: parseFloat(plan.charge_amount).toFixed(2)
                            },
                            receiver: {
                                email: credentials.email
                            }
                        }
                    };
                    if (plan.expiration) Object.assign(data, {
                        expiration: {
                            value: plan.expiration && plan.expiration.value ? plan.expiration.value.toUpperCase() : undefined,
                            unit: plan.expiration && plan.expiration.unit ? plan.expiration.unit.toUpperCase() : undefined
                        }
                    });
                    let body = `<?xml version="1.0" encoding="utf-8"?>\n` + xmlJS.json2xml(data, { compact: true });
                    let url = create_url + `?${querystring.stringify(credentials)}`;
                    let response = (yield axios.post(url, body, {
                        headers: {
                            "Content-Type": "application/xml;charset=ISO-8859-1"
                        }
                    })).data;
                    let created = xmlJS.xml2js(response, { compact: true });
                    let id = created.preApprovalRequest.code._text;
                    resolve({ id: id });
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    },
    subscribe: subscription => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {
                try {
                    let created = yield PaymentCtrl.create(PaymentCtrl.SUBSCRIPTION, subscription);
                    resolve({ id: created.directPreApproval.code._text });
                } catch (e) {
                    ErrorUtils.handle(reject, e);
                }
            });

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })());
    }
};