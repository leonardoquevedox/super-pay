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

let PaymentCtrl = require("./payment");
let Config = require("./config");
let config = {};

let Subscription = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return Subscription;
    },
    createPlan: (plan) => {
        return new Promise(async (resolve, reject) => {
            try {
                let credentials = Config.getCredentials();
                if (plan.expiration) plan.expiration.value = parseInt(plan.expiration.split(" ")[0]);
                if (plan.expiration) plan.expiration.unit = plan.expiration.split(" ")[1];
                if (plan.expiration && plan.expiration.unit) plan.expiration.unit += (plan.expiration.unit.toLowerCase()[plan.expiration.unit.length - 1] == "s" ? "" : "S");
                plan.charge_type = plan.charge_manually ? "MANUAL" : "AUTO";
                let create_url = `${config.gateway_url}/v2/pre-approvals/request`;
                let data = {
                    preApprovalRequest: {
                        reference: "FUNKZIE",
                        preApproval: {
                            name: plan.name,
                            charge: plan.charge_type.toUpperCase(),
                            period: plan.charge_periodicity.toUpperCase(),
                            amountPerPayment: parseFloat(plan.charge_amount).toFixed(2),
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
                })
                let body = `<?xml version="1.0" encoding="utf-8"?>\n` + xmlJS.json2xml(data, { compact: true });
                let url = create_url + `?${querystring.stringify(credentials)}`;
                let response = (await axios.post(url, body, {
                    headers: {
                        "Content-Type": "application/xml;charset=ISO-8859-1"
                    }
                })).data;
                let created = xmlJS.xml2js(response, { compact: true });
                let id = created.preApprovalRequest.code._text;
                resolve({ id: id });
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }
            }
        });
    },
    subscribe: (subscription) => {
        return new Promise(async (resolve, reject) => {
            try {
                let created = await PaymentCtrl.create(PaymentCtrl.SUBSCRIPTION, subscription);
                resolve(created.directPreApproval.code._text);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }
            }
        });
    }
};