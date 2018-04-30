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

let Merchant = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return config;
    },
    create: (merchant) => {
        return new Promise(async (resolve, reject) => {
            try {
                let phone = new PhoneNumber(merchant.phone, "BR").getNumber("significant");
                let birthDate = (merchant.birthDate || "").replace(/\//g, "-");
                if (merchant.address && merchant.address.country && (merchant.address.country.length < 3))
                    merchant.address.country = countries.toAlpha3(merchant.address.country);
                let structuredName = merchant.name.split(" ");
                let name = structuredName[0];
                let lastName = "";
                structuredName.map((part, index) => {
                    if (index > 1) lastName += " ";
                    if (index > 0) lastName += part;
                });
                /* Sender information */
                let data = {
                    type: "MERCHANT",
                    transparentAccount: false,
                    email: { address: merchant.email },
                    person: {
                        name: merchant.name.split(" ")[0],
                        lastName: merchant.name.split(" ")[0],
                        birthDate: birthDate,
                        phone: {
                            countryCode: "55",
                            areaCode: phone ? phone.substring(0, 2) : undefined,
                            number: phone ? phone.substring(2, phone.length) : undefined
                        },
                        taxDocument: {
                            type: merchant.document.type,
                            number: merchant.document.number ? merchant.document.number.replace(/[^\d]/g, "") : undefined
                        },
                        address: {
                            street: merchant.address.street ? merchant.address.street.split(",")[0] : "",
                            streetNumber: merchant.address.number,
                            complement: merchant.address.complement,
                            district: merchant.address.neighbourhood,
                            city: merchant.address.city,
                            state: merchant.address.state,
                            country: merchant.address.country,
                            zipCode: merchant.address.postalCode ? merchant.address.postalCode.replace(/[^\d]/g, "") : undefined,
                        }
                    }
                };
                let url = `${Config.gateway_url}/v2/accounts`;
                let response = (await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `OAuth ${Config.app_token}`
                    }
                })).data;
                resolve(response);
            } catch (e) {
                console.log(e);
                ErrorUtils.handle(reject, e);
            }
        });
    },
    read: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/accounts/${id}`;
                let response = (await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `OAuth ${Config.app_token}`
                    }
                })).data;
                resolve(response);
            } catch (e) {
                ErrorUtils.handle(reject, e);
            }
        });
    }
}