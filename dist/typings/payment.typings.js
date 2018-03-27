/**
 * @typedef {Object} SuperPayment
 * @property {SuperCard|SuperCardToken} instrument Payment instrument.
 * @property {string} amount Order currency code (Three letters).
 * @property {string} reference Payment reference on your database.
 * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
 * @property {string} method The method (credit, debit, boleto) with which the payment will be processed.
 * @property {SuperOrder} [order] Order information.
 * @property {string} [country] Country Code (Two letters).
 * @property {string} [currency] Order currency code (Three letters).
 * @property {string} [ip] Buyer IP address.
 */

/**
 * @typedef {Function} ListPaymentMethods
 * @param {string} [amount] Payment amount in cents.
 * @returns {Array<object>}
 */

/**
 * @typedef {Function} ListPayments
 * @returns {Array<SuperPayment>}
 */

/**
 * @typedef {Function} CreatePayment
 * @param {SuperPayment} payment Payment information.
 * @returns {SuperPayment} Created payment information.
 */

/**
 * @typedef {Function} ReadPayment
 * @param {SuperId} id Payment id.
 * @returns {SuperPayment} Payment informationt.
 */

/**
 * @typedef {Function} UpdatePayment
 * @param {SuperPayment} payment Payment information.
 * @returns {SuperPayment} Created payment information.
 */

/**
 * @typedef {Function} DeletePayment
 * @param {SuperId} id Payment id.
 * @returns {boolean} success Operation status.
 */

/**
 * @typedef {Object} Payment
 * @property {ListPaymentMethods} getPaymentMethods List available payment methods.
 * @property {ListPayments} list List user payments.
 * @property {CreatePayment} create Create payment.
 * @property {ReadPayment} read Read payment.
 * @property {UpdatePayment} update Update payment.
 * @property {DeletePayment} delete Delete payment.
 */
"use strict";