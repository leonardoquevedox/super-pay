/* Internal Modules */
let BackendConfig = require('./lib/backend/config');
let SessionBackend = require('./lib/backend/session');
let PaymentBackend = require('./lib/backend/payment');
let CardBackend = require('./lib/backend/card');

const Backend = {
    /* SessionBackend Related Functions */
    session: SessionBackend,
    /* PaymentBackend Related Functions */
    payment: PaymentBackend,
    /* CardBackend Related Functions */
    card: CardBackend,
    /* Initialization function */
    init: (options) => {
        options = options || {};
        config = BackendConfig(options);
        SessionBackend.init(options);
        PaymentBackend.init(options);
        CardBackend.init(options);
    }
};