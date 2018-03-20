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

const Customer = module.exports = {
    init: (options) => { config = config(options) },
    create: (customer) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.post(`${config.recurrency_url}/customers`, customer)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    read: (customer) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.get(`${config.recurrency_url}/customers/${customer.id}`)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    update: (customer) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.put(`${config.recurrency_url}/customers/${customer.id}`, customer)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    delete: (customer) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.delete(`${config.recurrency_url}/customers/${customer.id}`, customer)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    }
}