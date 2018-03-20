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

const Card = module.exports = {
    init: (options) => { config = config(options) },
    create: (card) => {
        return new Promise((resolve, reject) => {
            resolve(card);
        });
    },
    read: (card) => {
        return new Promise(async (resolve, reject) => {

        });
    },
    update: (card) => {
        return new Promise(async (resolve, reject) => {

        });
    },
    delete: (card) => {
        return new Promise(async (resolve, reject) => {

        });
    }
}