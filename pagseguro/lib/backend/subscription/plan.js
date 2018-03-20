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

const Plan = module.exports = {
    init: (options) => { config = config(options) },
    create: (plan) => {
        return new Promise(async (resolve, reject) => {

        });
    },
    read: (plan) => {
        return new Promise(async (resolve, reject) => {

        });
    },
    update: (plan) => {
        return new Promise(async (resolve, reject) => {

        });
    },
    delete: (plan) => {
        return new Promise(async (resolve, reject) => {
            
        });
    }
}