/**
 * @typedef {Object} SuperCardHolder
 * @property {string} name Holder full name.
 * @property {SuperAddress} address Card holder address.
 * @property {SuperDocument} document Card holder document.
 */

/**
 * @typedef {Object} SuperCard
 * @property {SuperCardHolder} holder Card Holder (complete name).
 * @property {string} payerRef Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} brand Card brand.
 * @property {string} number Card number.
 * @property {Date} expirationDate Card Expiration Date.
 */

/**
 * @typedef {Object} SuperCardToken
 * @property {SuperCardHolder} holder Card Holder (complete name).
 * @property {string} payerRef Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} brand Card brand.
 * @property {string} token Card number.
 * @property {Date} expirationDate Card Expiration Date .
 */

/**
 * @typedef {Function} CreateCard
 * @param {SuperCard} card Card information.
 * @returns {SuperCard} Created card information.
 */

/**
 * @typedef {Object} Card
 * @property {CreateCard} create Create Session Token.
 */