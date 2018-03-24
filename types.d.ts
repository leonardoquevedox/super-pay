/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * @module SuperPay
 */
declare namespace SuperPay {
    /**
     * @typedef {Object} SuperAddress
     * @property {string} street Address street.
     * @property {string} neighbourhood Address neighbourhood.
     * @property {string} city Address city.
     * @property {string} state Address state (Two letter code).
     * @property {string} country Address country (Two letter code).
     * @property {string} postalCode Address postal code.
     */
    type SuperAddress = any;

    /**
     * @typedef {Object} SuperDocument
     * @property {string} type Either "CPF" or "CNPJ".
     * @property {string} number Document number (can be either formatted or not).
     */
    type SuperDocument = any;

    /**
     * @typedef {Object} SuperCardHolder
     * @property {string} name Holder full name.
     * @property {SuperAddress} address Card holder address.
     * @property {SuperDocument} document Card holder document.
     */
    type SuperCardHolder = any;

    /**
     * @typedef {Object} SuperBuyer
     * @property {string} name Buyer full name.
     * @property {SuperAddress} address Buyer address.
     * @property {SuperDocument} document Buyer document.
     */
    type SuperBuyer = any;

    /**
     * @typedef {Object} SuperPaymentInstrument
     * @property {SuperCard|SuperCardToken|SuperBoleto} instrument The instrument (credit, debit, boleto) whith which the payment will be processed.
     * @property {SuperHolder} [holder] Card holder.
     */
    type SuperPaymentInstrument = any;

    /**
     * @typedef {Object} SuperOrder
     * @property {string} reference Order reference on your database.
     * @property {string} description Order reference on your database.
     * @property {string} currency Order currency code (Three letters).
     * @property {SuperPaymentInstrument} paymentInstrument Order payment instrument.
     * @property {SuperBuyer} buyer Order buyer.
     */
    type SuperOrder = any;

    /**
     * @typedef {Object} SuperPayment
     * @property {string} country Country Code (Two letters).
     * @property {string} reference Payment reference on your database.
     * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
     * @property {string} paymentMethod The method (credit, debit, boleto) with which the payment will be processed.
     * @property {string} [ip] Buyer IP address.
     */
    type SuperPayment = any;

    /**
     * @typedef {Object} SuperSession
     * @property {string} token Session token.
     */
    type SuperSession = any;

    /**
     * @typedef {Object} Session
     * @property {Function} create Create Session Token.
     */
    type Session = any;

    /**
     * @typedef {Object} SuperId
     * @property {string} id Item id.
     */
    type SuperId = any;

    /**
     * @typedef {Object} SuperCard
     * @property {string} payerRef Payer reference on your database.
     * @property {string} reference Card reference on your database.
     * @property {string} holder Card Holder (complete name).
     * @property {string} brand Card brand.
     * @property {string} number Card number.
     * @property {Date} expirationDate Card Expiration Date.
     */
    type SuperCard = any;

    /**
     * @typedef {Object} SuperCardToken
     * @property {string} payerRef Payer reference on your database.
     * @property {string} reference Card reference on your database.
     * @property {string} holder Card Holder (complete name).
     * @property {string} brand Card brand.
     * @property {string} token Card number.
     * @property {Date} expirationDate Card Expiration Date .
     */
    type SuperCardToken = any;

    /**
     * @typedef {Object} Payment
     * @property {function()} list List item.
     * @property {function(SuperPayment)} create Create item.
     * @property {function(SuperId)} read Read item.
     * @property {function(SuperPayment)} update Update item.
     * @property {function(SuperId)} delete Delete item.
     */
    type Payment = any;

    /**
     * @typedef {Object} Card
     * @property {function(SuperCard)} create Create Session Token.
     */
    type Card = any;

    /**
     * @typedef {Object} CRUD
     * @property {Function} [list] List item.
     * @property {Function} [create] Create item.
     * @property {Function} [read] Read item.
     * @property {Function} [update] Update item.
     * @property {Function} [delete] Delete item.
     */
    type CRUD = any;

    /**
     * @typedef {Object} GatewayBackend
     * @property {Card} card Card Related Functions.
     * @property {Payment} payment Payment Related Functions.
     * @property {CRUD} subscription Payment Related Functions.
     * @property {Session} [session] Session Related Functions.
     */
    type GatewayBackend = any;

    /**
     * @typedef {Object} GatewayBackendSettings
     * @property {string} [gateway] Gateway name property from SuperPay.SUPPORTED_GATEWAYS.
     * @property {string} [api_token] API Token: Required for most gateways.
     * @property {string} [api_email] API Email: Required for few gateways.
     */
    type GatewayBackendSettings = any;

    /**
     * @typedef {Object} GatewayFrontend
     * @property {Card} card Card Related Functions.
     * @property {Payment} payment Payment Related Functions.
     * @property {CRUD} subscription Payment Related Functions.
     * @property {Session} [session] Session Related Functions.
     */
    type GatewayFrontend = any;

    /**
     * @typedef {Object} GatewayFrontendSettings
     * @property {string} [server_url] Application server address.
     */
    type GatewayFrontendSettings = any;

}

