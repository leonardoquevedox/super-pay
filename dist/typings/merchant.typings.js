/**
 * @typedef {Function} CreateMerchant
 * @param {SuperBuyer} card Merchant information.
 * @param {string} [xAccessToken] Server access token.
 * @returns {any} Created card information.
 */

/**
* @typedef {Function} ListMerchants
* @param {SuperId} id Merchant id.
* @param {string} [xAccessToken] Server access token.
* @returns {Array<SuperBuyer>}
*/

/**
 * @typedef {Object} Merchant
 * @property {CreateMerchant} create Create Merchant on Gateway.
 * @property {ListMerchants} [list] List user payments.
 */
"use strict";