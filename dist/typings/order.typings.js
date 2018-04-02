/**
 * @typedef {Object} SuperOrder
 * @property {string} reference Order reference on your database.
 * @property {string} description Order reference on your database.
 * @property {Array<object>} items Order currency code (Three letters).
 */

/**
 * @typedef {Function} CreateOrder
 * @param {SuperOrder} order order information.
 * @param {string} [xAccessToken] Server access token.
 * @returns {object} Created order.
 */

/**
 * @typedef {Object} Order
 * @property {CreateOrder} create Create order.
 */
"use strict";