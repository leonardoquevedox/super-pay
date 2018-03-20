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

const Subscription = module.exports = {
    init: (options) => { config = config(options) },
    create: (subscription) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.post(`${config.recurrency_url}/subscriptions`, subscription)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    read: (subscription) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.get(`${config.recurrency_url}/subscriptions/${subscription.id}`)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    update: (subscription) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.put(`${config.recurrency_url}/subscriptions/${subscription.id}`, subscription)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    delete: (subscription) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.delete(`${config.recurrency_url}/subscriptions/${subscription.id}`, subscription)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    }
}