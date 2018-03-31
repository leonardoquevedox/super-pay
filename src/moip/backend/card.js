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

let Card = module.exports = {
    init: (options) => {
        config = Config.init(options);
    },
    list: () => {
        return new Promise(async (resolve, reject) => {
            resolve();
        });
    },
    create: (customer, card) => {
        return new Promise(async (resolve, reject) => {
            try {
                let phone = new PhoneNumber(card.holder.phone, "BR").getNumber("significant");
                let birthDate = (card.holder.birthDate || "").replace(/\//g, "-");
                /* Payment instrument */
                let data = {
                    method: "CREDIT_CARD",
                    creditCard: {
                        number: formatCardNumber(card.number),
                        cvv: card.cvv,
                        expirationMonth: card.expirationMonth,
                        expirationYear: card.expirationYear,
                        holder: {
                            fullname: card.holder.name,
                            email: card.holder.email,
                            birthDate: birthDate,
                            phone: {
                                countryCode: "55",
                                areaCode: phone ? phone.substring(0, 2) : undefined,
                                number: phone ? phone.substring(2, phone.length - 1) : undefined
                            },
                            taxDocument: {
                                type: card.holder.document.type,
                                number: card.holder.document.number ? card.holder.document.number.replace(/[^\d]/g, "") : undefined
                            }
                        }
                    }
                };
                let url = `${Config.gateway_url}/v2/customers/${customer.id}/fundinginstruments`;
                let response = (await axios.post(url, data, {
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
    },
    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/fundinginstruments/${id}`;
                let response = (await axios.delete(url, data, { headers: { "Authorization": Config.base64Auth } })).data;
                resolve(response);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }
            }
        });
    }
}