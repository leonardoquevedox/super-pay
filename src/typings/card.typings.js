/**
 * @typedef {Object} SuperCardHolder
 * @property {string} name Holder full name.
 * @property {SuperAddress} address Card holder address.
 * @property {SuperDocument} document Card holder document.
 */

/**
 * @typedef {Object} SuperCard
 * @property {SuperCardHolder} [holder] Card Holder.
 * @property {string} [payerRef] Payer reference on your database.
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
 * @param {string} [xAccessToken] Server access token.
 * @returns {any} Created card information.
 */

/**
 * @typedef {Function} DeleteCard
 * @param {SuperId} id Customer id.
 * @param {string} [xAccessToken] Server access token.
 * @returns {Array<SuperCard>}
 */

/**
 * @typedef {Object} CardExpirationOptions
 * @property {Array<string>} months Expiration months.
 * @property {Array<string>} years Expiration years.
 */

/**
 * @typedef {Function} GetExpirationOptions
 * @returns {CardExpirationOptions} months Expiration months.
 */

/**
 * @typedef {Function} ListCards
 * @param {SuperId} id Customer id.
 * @param {string} [xAccessToken] Server access token.
 * @returns {Array<SuperCard>}
 */

/**
 * @typedef {Object} Card
 * @property {GetExpirationOptions} getExpirationOptions Card expiration years and months (generated at runtime).
 * @property {CreateCard} create Create Card on Gateway.
 * @property {DeleteCard} [delete] Delete card.
 * @property {ListCards} [list] List user cards.
 */