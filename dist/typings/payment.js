/**
 * @typedef {Object} SuperPaymentInstrument
 * @property {SuperCard|SuperCardToken} instrument The instrument (credit, debit, boleto) whith which the payment will be processed.
 * @property {SuperCardHolder} [holder] Card holder.
 */

/**
 * @typedef {Object} SuperPayment
 * @property {string} country Country Code (Two letters).
 * @property {string} reference Payment reference on your database.
 * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
 * @property {string} method The method (credit, debit, boleto) with which the payment will be processed.
 * @property {SuperPaymentInstrument} instrument Payment instrument.
 * @property {string} [ip] Buyer IP address.
 */

/**
 * @typedef {Function} ListPayments
 * @returns {Array}
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
 * @property {ListPayments} list List item.
 * @property {CreatePayment} create Create item.
 * @property {ReadPayment} read Read item.
 * @property {UpdatePayment} update Update item.
 * @property {DeletePayment} delete Delete item.
 */