/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

/* Internal Modules */
let config = require('./lib/config');
const card = require('./lib/card');
const payment = require('./lib/payment');
const methods = require('./lib/methods');

const PayU = module.exports = {
    /* Initialization function */
    init: (options) => {
        options = options || {};
        config = config(options);
        card.init(options);
        payment.init(options);
        methods.init(options);
    },
    /* Payment Methods Related Functions */
    methods: methods,
    /* Credit Card Related Functions */
    card: card,
    /* Payment Related Functions */
    payment: payment
};