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

let Subscriber = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return config;
    },
    create: (subscriber) => {
        return new Promise(async (resolve, reject) => {
            try {
                let phone = new PhoneNumber(subscriber.phone, "BR").getNumber("significant");
                let birthDate = (subscriber.birthDate || "").replace(/\//g, "-");
                if (subscriber.address && subscriber.address.country && (subscriber.address.country.length < 3))
                    subscriber.address.country = countries.toAlpha3(subscriber.address.country);
                /* Sender information */
                let data = {
                    ownId: subscriber.reference,
                    fullname: subscriber.name,
                    email: subscriber.email,
                    birthDate: birthDate,
                    phone: {
                        countryCode: "55",
                        areaCode: phone ? phone.substring(0, 2) : undefined,
                        number: phone ? phone.substring(2, phone.length - 1) : undefined
                    },
                    taxDocument: {
                        type: subscriber.document.type,
                        number: subscriber.document.number ? subscriber.document.number.replace(/[^\d]/g, "") : undefined
                    },
                    shippingAddress: {
                        street: subscriber.address.street ? subscriber.address.street.split(",")[0] : "",
                        streetNumber: subscriber.address.number,
                        complement: subscriber.address.complement,
                        district: subscriber.address.neighbourhood,
                        city: subscriber.address.city,
                        state: subscriber.address.state,
                        country: subscriber.address.country,
                        zipCode: subscriber.address.postalCode ? subscriber.address.postalCode.replace(/[^\d]/g, "") : undefined,
                    }
                };
                let url = `${Config.gateway_url}/v2/subscribers`;
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
    read: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/subscribers/${id}`;
                let response = (await axios.get(url, {
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
    list: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/subscribers`;
                let response = (await axios.get(url, {
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