/* Internal Modules */
let BackendConfig = require('./config');
let SessionBackend = require('./session');
let CardBackend = require('./card');
let PaymentBackend = require('./payment');
let SubscriptionBackend = require('./subscription');

let config = {};

let Backend = module.exports = {
    /* Backend Session Related Functions */
    session: SessionBackend,
    /* Backend Card Related Functions */
    card: CardBackend,
    /* Backend Payment Related Functions */
    payment: PaymentBackend,
    /* Backend Subscription Related Functions */
    subscription: SubscriptionBackend,
    /* Initialization function */
    init: async (options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            config = BackendConfig.init(options);
            SessionBackend.init(options);
            CardBackend.init(options);
            PaymentBackend.init(options);
            SubscriptionBackend.init(options);
            resolve(config);
        });
    }
};