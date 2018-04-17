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
    init: (options) => {
        config = Config.init(options);
        return Subscription;
    },
    createPlan: (plan) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (plan.expiration) plan.expiration.length = parseInt(plan.expiration.split(" ")[0]);
                if (plan.expiration) plan.expiration.unit = plan.expiration.split(" ")[1];
                if (plan.expiration && plan.expiration.unit) plan.expiration.unit += (plan.expiration.unit.toLowerCase()[plan.expiration.unit.length - 1] == "s" ? "" : "S");
                let create_url = `${config.gateway_url}/assinaturas/v1/plans`;
                let data = {
                    code: plan.reference,
                    name: plan.name,
                    status: "ACTIVE",
                    amount: parseFloat(plan.charge_amount * 100).toFixed(0),
                };
                if (plan.expiration) Object.assign(data, {
                    expiration: {
                        length: plan.expiration && plan.expiration.value ? plan.expiration.value.toUpperCase() : undefined,
                        unit: plan.expiration && plan.expiration.unit ? plan.expiration.unit.toUpperCase() : undefined
                    }
                })
                let url = `${Config.gateway_url}/assinaturas/v1/plans`;
                let response = (await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Config.base64Auth}`
                    }
                })).data;
                resolve({ id: plan.reference });
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    subscribe: (subscription) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    code: subscription.reference,
                    amount: parseFloat(subscription.charge_amount * 100).toFixed(0),
                    payment_method: subscription.method,
                    plan: { code: subscription.plan.reference },
                    customer: { code: subscription.customer.reference }
                };
                let url = `${Config.gateway_url}/assinaturas/v1/subscriptions`;
                let response = (await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Config.base64Auth}`
                    }
                })).data;
                resolve({ id: subscription.reference });
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
};