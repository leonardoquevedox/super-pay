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
 * @property {string} cvv Card security code.
 * @property {Date} expirationDate Card Expiration Date.
 */

/**
 * @typedef {Object} SuperCardToken
 * @property {string} token Card number.
 */

/**
 * @typedef {Function} CreateCard
 * @param {SuperCard} card Card information.
 * @returns {SuperCard} Created card information.
 */

/**
 * @typedef {Function} GetCardInfo
 * @param {string} cardNumber Card information.
 * @returns {Object} Created card information.
 */

/**
 * @typedef {Object} CardExpirationOptoins
 * @property {Array<string>} months Expiration months.
 * @property {Array<string>} years Expiration years.
 */

/**
 * @typedef {Object} Card
 * @property {CardExpirationOptoins} expirationOptions Card expiration years and months (generated at runtime).
 * @property {CreateCard} create Create Card on Gateway.
 * @property {GetCardInfo} getInfo Get Card Info Based On Number.
 */