/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

/* Internal Modules */
let Config = require('./lib/config');
let Session = require('./lib/session');
let Payment = require('./lib/payment');
let Card = require('./lib/card');

const PagSeguro = module.exports = {
    /* Session Related Functions */
    session: Session,
    /* Payment Related Functions */
    payment: Payment,
    /* Card Related Functions */
    card: Card,
    /* Initialization function */
    init: (options) => {
        options = options || {};
        config = Config(options);
        Session.init(options);
        Payment.init(options);
        Card.init(options);
    }
};