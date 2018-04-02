/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let axios = require("axios");
let Promise = require("bluebird");

/* Util modules */
let ErrorUtils = require("../../utils/error.utils");

let Customer = require("./customer");
let Config = require("./config");
let config = {};

let Order = module.exports = {
    init: (options) => {
        config = Config.init(options);
    },
    list: () => {
        return new Promise(async (resolve, reject) => {
            try {
                /* Payment instrument */
                let url = `${Config.gateway_url}/v2/orders`;
                let response = (await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": Config.base64Auth
                    }
                })).data;
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    },
    create: (transaction) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (transaction.receivers) {
                    transaction.receivers.map((receiver, index) => {
                        let amount = receiver.fee || (transaction.amount * (receiver.percentage * 100));
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
                        "product": transaction.order.description,
                        "quantity": 1,
                        "price": transaction.order.amount
                    }],
                    "customer": {
                        "id": transaction.buyer.id
                    },
                    receivers: transaction.receivers
                };
                let url = `${Config.gateway_url}/v2/orders`;
                let response = (await axios.post(url, data, {
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
    },
    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/orders/${id}`;
                let response = (await axios.delete(url, {
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
    }
}