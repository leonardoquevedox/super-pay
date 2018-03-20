/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * @module SuperPay
 * Latin American Multi-gateway integration module for Node.js.
 */

/**
 * @typedef {object} SuperAddress
 * @property {string} street Address street.
 * @property {string} neighbourhood Address neighbourhood.
 * @property {string} city Address city.
 * @property {string} state Address state (Two letter code).
 * @property {string} country Address country (Two letter code).
 * @property {string} postalCode Address postal code.
 */

/**
 * @typedef {object} SuperDocument
 * @property {string} type Either "CPF" or "CNPJ".
 * @property {string} number Document number (can be either formatted or not).
 */

/**
 * @typedef {object} SuperCardHolder
 * @property {string} name Holder full name.
 * @property {SuperAddress} address Card holder address.
 * @property {SuperDocument} document Card holder document.
 */

/**
 * @typedef {object} SuperBuyer
 * @property {string} name Buyer full name.
 * @property {SuperAddress} address Buyer address.
 * @property {SuperDocument} document Buyer document.
 */


/**
 * @typedef {object} SuperPaymentInstrument
 * @property {SuperCard|SuperCardToken|SuperBoleto} instrument The instrument (credit, debit, boleto) whith which the payment will be processed.
 * @property {SuperHolder} [holder] Card holder.
 */

/**
 * @typedef {object} SuperOrder
 * @property {string} reference Order reference on your database.
 * @property {string} description Order reference on your database.
 * @property {string} currency Order currency code (Three letters).
 * @property {SuperPaymentInstrument} paymentInstrument Order payment instrument.
 * @property {SuperBuyer} buyer Order buyer.
 */

/**
 * @typedef {object} SuperPayment
 * @property {string} country Country Code (Two letters).
 * @property {string} reference Payment reference on your database.
 * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
 * @property {string} paymentMethod The method (credit, debit, boleto) with which the payment will be processed.
 * @property {string} [ip] Buyer IP address.
 */

/**
 * @typedef {object} SuperSession
 * @property {string} token Session token.
 */

/**
 * @typedef {object} Session
 * @property {Function} create Create Session Token.
 */


/**
 * @typedef {object} SuperId
 * @property {string} id Item id.
 */

/**
 * @typedef {object} SuperCard
 * @property {string} payerRef Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} holder Card Holder (complete name).
 * @property {string} brand Card brand.
 * @property {string} number Card number.
 * @property {Date} expirationDate Card Expiration Date.
 */

/**
 * @typedef {object} SuperCardToken
 * @property {string} payerRef Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} holder Card Holder (complete name).
 * @property {string} brand Card brand.
 * @property {string} token Card number.
 * @property {Date} expirationDate Card Expiration Date .
 */

/**
 * @typedef {object} Payment
 * @property {Function()} list List item.
 * @property {Function(SuperPayment)} create Create item.
 * @property {Function(SuperId)} read Read item.
 * @property {Function(SuperPayment)} update Update item.
 * @property {Function(SuperId)} delete Delete item.
 */

/**
 * @typedef {object} Card
 * @property {Function(SuperCard)} create Create Session Token.
 */

/**
 * @typedef {object} CRUD
 * @property {Function} [list] List item.
 * @property {Function} [create] Create item.
 * @property {Function} [read] Read item.
 * @property {Function} [update] Update item.
 * @property {Function} [delete] Delete item.
 */


/**
 * @typedef {object} GatewayBackend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */

/**
 * @typedef {object} GatewayBackendSettings
 * @property {string} [gateway] Gateway name property from SuperPay.SUPPORTED_GATEWAYS.
 * @property {string} [api_token] API Token: Required for most gateways.
 * @property {string} [api_email] API Email: Required for few gateways.
 */

/**
 * @typedef {object} GatewayFrontend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */

/**
 * @typedef {object} GatewayFrontendSettings
 * @property {string} [server_url] Application server address.
 */

const colors = require("colors");
let PagSeguro = require("./pagseguro");
let PayU = require("./pay-u");

const Gateways = {
    PAG_SEGURO: PagSeguro,
    PAY_U: PayU
};

const SUPPORTED_GATEWAYS = {
    PAG_SEGURO: "PAG_SEGURO",
    PAY_U: "PAY_U"
};

let init = (settings, layer) => {
    try {
        let gateway = Gateways[settings.gateway][layer];
        gateway.init(settings);
        return gateway;
    } catch (e) {
        console.log("Hi! This is SuperPay to Major Tom:".bold.red);
        console.log("ERROR: It seems that you've chosen an unsupported payment gateway.".bold.red);
        /* console.log("Exception message for searching purposes:")*/
        console.log(`${e}`.bold.red);
        console.log("Please, use of the values below:".green);
        for (var gateway in SuperPay.SUPPORTED_GATEWAYS) {
            console.log(`- SuperPay.SUPPORTED_GATEWAYS.${gateway}`.green);
        }
    }
};

const SuperPay = {

    SUPPORTED_GATEWAYS: SUPPORTED_GATEWAYS,
    /**
     * @param {GatewayBackendSettings} settings Gateway specific settings
     * @return {GatewayBackend} Gateway service instance
     */
    Backend: {
        init: (settings) => this.init(settings, "Backend")
    },
    /**
     * @param {GatewayFrontendSettings} settings Gateway specific settings
     * @return {GatewayFrontend} Gateway service instance
     */
    Frontend: {
        init: (settings) => this.init(settings, "Frontend")
    }
};

exports = module.exports = SuperPay;