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
 * @property {SuperCard|SuperCardToken} instrument The instrument (credit, debit, boleto) whith which the payment will be processed.
 * @property {SuperCardHolder} [holder] Card holder.
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
 * @typedef {Object} SuperId
 * @property {string} id Item id.
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
 * @typedef {Function} ListPayments
 */

/**
 * @typedef {Function} CreatePayment
 * @param {SuperPayment} 
 */

/**
 * @typedef {Object} Payment
 * @property {ListPayments} list List item.
 * @property {function(SuperPayment)} create Create item.
 * @property {function(SuperId)} read Read item.
 * @property {function(SuperPayment)} update Update item.
 * @property {function(SuperId)} delete Delete item.
 */

/** 
 * @function 
 * @name Payment#create
 * @param {SuperPayment} payment 
 * @return {SuperPayment}
 */

/**
 * @typedef {Object} Card
 * @property {function(SuperCard)} create Create Session Token.
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
 * @typedef {Object} GatewayBackend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */

/**
 * @typedef {Object} GatewayFrontend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */