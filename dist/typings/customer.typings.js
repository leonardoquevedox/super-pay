/**
 * @typedef {Function} CreateCustomer
 * @param {SuperBuyer} card Customer information.
 * @param {string} [xAccessToken] Server access token.
 * @returns {any} Created card information.
 */

/**
* @typedef {Function} ListCustomers
* @param {SuperId} id Customer id.
* @param {string} [xAccessToken] Server access token.
* @returns {Array<SuperBuyer>}
*/

/**
 * @typedef {Object} Customer
 * @property {CreateCustomer} create Create Customer on Gateway.
 * @property {ListCustomers} [list] List user payments.
 */
"use strict";