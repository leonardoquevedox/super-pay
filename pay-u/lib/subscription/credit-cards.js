/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
const querystring = require('querystring');
const xmlJS = require('xml-js');
const axios = require("axios");
let config = require("./config");

const CreditCard = module.exports = {
    init: (options) => { config = config(options) },
    create: (customerId, creditCard) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.post(`${config.recurrency_url}/customers/${customerId}/creditCards`, creditCard)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    read: (creditCard) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.get(`${config.recurrency_url}/creditCards/${creditCard.id}`)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    update: (creditCard) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.put(`${config.recurrency_url}/creditCards/${creditCard.id}`, creditCard)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    delete: (customerId, creditCard) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.delete(`${config.recurrency_url}/customers/${customerId}/creditCards/${creditCard.id}`, creditCard)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    }
}