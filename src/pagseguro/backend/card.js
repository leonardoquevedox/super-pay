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

let Card = module.exports = {
    init: (options) => {
        config = Config.init(options);
    },
    create: (card) => {
        return new Promise((resolve, reject) => {
            resolve(card);
        });
    },
    delete: (card) => {
        return new Promise(async (resolve, reject) => {

        });
    }
}