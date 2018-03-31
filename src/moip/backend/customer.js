/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let axios = require("axios");
let Promise = require("bluebird");

let Config = require("./config");
let config = {};

let Customer = module.exports = {
    init: (options) => {
        config = Config.init(options);
        return config;
    },
    create: (customer) => {
        return new Promise(async (resolve, reject) => {
            try {
                let phone = new PhoneNumber(customer.phone, "BR").getNumber("significant");
                if (customer.address && customer.address.country && (customer.address.country.length < 3))
                    customer.address.country = countries.toAlpha3(customer.address.country);
                /* Sender information */
                let data = {
                    ownId: customer.reference,
                    fullname: customer.name,
                    email: customer.email,
                    birthDate: birthDate,
                    phone: {
                        countryCode: "55",
                        areaCode: phone ? phone.substring(0, 2) : undefined,
                        number: phone ? phone.substring(2, phone.length - 1) : undefined
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
                        zipCode: customer.address.postalCode ? customer.address.postalCode.replace(/[^\d]/g, "") : undefined,
                    }
                };
                let url = `${Config.gateway_url}/v2/customers`;
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
    read: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/customers/${id}`;
                let response = (await axios.get(url, {
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
    list: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `${Config.gateway_url}/v2/customers`;
                let response = (await axios.get(url, {
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
    }
}