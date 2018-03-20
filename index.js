/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * @module SuperPay
 * Latin American Multi-gateway integration module for Node.js.
 */
const colors = require("colors");
let PagSeguro = require("./pagseguro");
let PayU = require("./pay-u");

const Gateways = {
    PAG_SEGURO: PagSeguro,
    PAY_U: PayU
};

/**
 * @typedef {Object} SuperAddress
 * @property {string} street Address street.
 * @property {string} neighbourhood Address neighbourhood.
 * @property {string} city Address city.
 * @property {string} state Address state (Two letter code).
 * @property {string} country Address country (Two letter code).
 * @property {string} postalCode Address postal code.
 */

/**
 * @typedef {Object} SuperDocument
 * @property {string} type Either "CPF" or "CNPJ".
 * @property {string} number Document number (can be either formatted or not).
 */

/**
 * @typedef {Object} SuperCardHolder
 * @property {string} name Holder full name.
 * @property {SuperAddress} address Card holder address.
 * @property {SuperDocument} document Card holder document.
 */

/**
 * @typedef {Object} SuperBuyer
 * @property {string} name Buyer full name.
 * @property {SuperAddress} address Buyer address.
 * @property {SuperDocument} document Buyer document.
 */


/**
 * @typedef {Object} SuperPaymentInstrument
 * @property {SuperCard|SuperCardToken|SuperBoleto} instrument The instrument (credit, debit, boleto) whith which the payment will be processed.
 * @property {SuperHolder} [holder] Card holder.
 */

/**
 * @typedef {Object} SuperOrder
 * @property {string} reference Order reference on your database.
 * @property {string} description Order reference on your database.
 * @property {string} currency Order currency code (Three letters).
 * @property {SuperPaymentInstrument} paymentInstrument Order payment instrument.
 * @property {SuperBuyer} buyer Order buyer.
 */

/**
 * @typedef {Object} SuperPayment
 * @property {string} country Country Code (Two letters).
 * @property {string} reference Payment reference on your database.
 * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
 * @property {string} paymentMethod The method (credit, debit, boleto) with which the payment will be processed.
 * @property {string} [ip] Buyer IP address.
 */

/**
 * @typedef {Object} SuperSession
 * @property {string} token Session token.
 */

/**
 * @typedef {Object} Session
 * @property {Function} create Create Session Token.
 */

/**
 * @typedef {Object} CRUD
 * @property {Function} [list] List item.
 * @property {Function} [create] Create item.
 * @property {Function} [read] Read item.
 * @property {Function} [update] Update item.
 * @property {Function} [delete] Delete item.
 */

/**
 * @typedef {Object} SuperId
 * @property {string} id Item id.
 */

/**
 * @typedef {Object} Payment
 * @property {function()} list List item.
 * @property {function(SuperPayment)} create Create item.
 * @property {function(SuperId)} read Read item.
 * @property {function(SuperPayment)} update Update item.
 * @property {function(SuperId)} delete Delete item.
 */

/**
 * @typedef {Object} SuperCard
 * @property {string} payerRef Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} holder Card Holder (complete name).
 * @property {string} brand Card brand.
 * @property {string} number Card number.
 * @property {Date} expirationDate Card Expiration Date.
 */

/**
 * @typedef {Object} SuperCardToken
 * @property {string} payerRef Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} holder Card Holder (complete name).
 * @property {string} brand Card brand.
 * @property {string} token Card number.
 * @property {Date} expirationDate Card Expiration Date .
 */

/**
 * @typedef {Object} Card
 * @property {function(SuperCard)} create Create Session Token.
 */

/**
 * @typedef {Object} Gateway
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */

/**
 * @typedef {Object} GatewaySettings
 * @property {string} [gateway] Gateway name property from SuperPay.SUPPORTED_GATEWAYS.
 * @property {string} [api_token] API Token: Required for most gateways.
 * @property {string} [api_email] API Email: Required for few gateways.
 */

const SuperPay = module.exports = {
    SUPPORTED_GATEWAYS: {
        PAG_SEGURO: "PAG_SEGURO",
        PAY_U: "PAY_U"
    },
    /**
     * @param {GatewaySettings} settings Gateway specific settings
     * @return {Gateway} Gateway service instance
     */
    init: (settings) => {
        try {
            let gateway = Gateways[settings.gateway];
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
    }
};


/* 
    
let transaction = {
        paymentMethod: "VISA",
        country: "BR",
        ip: "189.023.010",
        notificationURL: env.SERVER_ADDRESS + "/api/payment/notification",
        order: {
            ref: new mongoose.Types.ObjectId().toHexString(),
            amount: "10",
            currency: "BRL",
            paymentInstrument: {
                cardToken: "8116fce0-b20e-434f-9084-0f8ab5fb418b",
                holder: {
                    name: "Leonardo Pacheco Quevedo",
                    address: {
                        street: "Avenida Presidente Vargas, 2332",
                        neighbourhood: "Centro",
                        city: "Porto Alegre",
                        state: "RS",
                        country: "BR",
                        postalCode: "93208-118"
                    },
                    document: {
                        type: "CPF",
                        number: "031.874.610-77",
                    }
                }
            },
            description: "Petshop do Beto",
            buyer: {
                hash: "qowijeoqiwjeoqjwoeoqwje",
                ref: new mongoose.Types.ObjectId().toHexString(),
                name: "Leonardo Pacheco Quevedo",
                email: "pac.leo@hotmail.com",
                phone: "(51) 98535-8349",
                document: {
                    type: "CPF",
                    number: "031.874.610-77",
                },
                address: {
                    street: "Avenida Presidente Vargas, 2332",
                    neighbourhood: "Centro",
                    city: "Porto Alegre",
                    state: "RS",
                    country: "BR",
                    postalCode: "93208-118"
                }
            },
        },
    };
*/