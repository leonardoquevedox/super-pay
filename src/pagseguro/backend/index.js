/* Internal Modules */
let BackendConfig = require('./config');
let SessionBackend = require('./session');
let PaymentBackend = require('./payment');
let CardBackend = require('./card');

let config = {};

let Backend = module.exports = {
    /* SessionBackend Related Functions */
    session: SessionBackend,
    /* PaymentBackend Related Functions */
    payment: PaymentBackend,
    /* CardBackend Related Functions */
    card: CardBackend,
    /* Initialization function */
    init: (options) => {
        options = options || {};
        config = BackendConfig.init(options);
        SessionBackend.init(options);
        PaymentBackend.init(options);
        CardBackend.init(options);
    }
};