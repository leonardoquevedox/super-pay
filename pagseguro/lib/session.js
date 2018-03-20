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

const Session = module.exports = {
    init: (options) => { config = config(options); return this; },
    create: () => {
        return new Promise(async (resolve, reject) => {
            const session_token_url = `${config.checkout_url}/sessions/`;
            const credentials = { email: config.api_email, token: config.api_token };
            const url = session_token_url + "?" + querystring.stringify(credentials);
            const response = (await axios.post(url)).data;
            const xml = JSON.parse(xmlJS.xml2json(response, { compact: true, spaces: 4 }));
            const token = xml.session.id._text;
            resolve(token);
        });
    }
}