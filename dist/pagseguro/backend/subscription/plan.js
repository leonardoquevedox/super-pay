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

let Plan = module.exports = {
    init: options => {
        Config = Config.init(options);
    },
    create: plan => {
        return new Promise(async (resolve, reject) => {});
    },
    read: plan => {
        return new Promise(async (resolve, reject) => {});
    },
    update: plan => {
        return new Promise(async (resolve, reject) => {});
    },
    delete: plan => {
        return new Promise(async (resolve, reject) => {});
    }
};