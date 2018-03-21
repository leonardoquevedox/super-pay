/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let xmlJS = require('xml-js');
let axios = require("axios");
let config = require("./config");

let Plan = module.exports = {
    init: (options) => { config = config(options) },
    create: (plan) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.post(`${config.recurrency_url}/plans`, plan)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    read: (plan) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.get(`${config.recurrency_url}/plans/${plan.id}`)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    update: (plan) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.put(`${config.recurrency_url}/plans/${plan.id}`, plan)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    },
    delete: (plan) => {
        return new Promise(async (resolve, reject) => {
            let response = (await axios.delete(`${config.recurrency_url}/plans/${plan.id}`, plan)).data;
            if (response.error) reject(response)
            else resolve(response);
        });
    }
}

export const Plan;