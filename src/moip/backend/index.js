/* Internal Modules */
let BackendConfig = require('./config');
let CardBackend = require('./card');
let CustomerBackend = require('./customer');
let PaymentBackend = require('./payment');
let SubscriptionBackend = require('./subscription');

let config = {};

let Backend = module.exports = {
    /* Backend Card Related Functions */
    card: CardBackend,
    /* Backend Customer Related Functions */
    customer: CustomerBackend,
    /* Backend Payment Related Functions */
    payment: PaymentBackend,
    /* Backend Subscription Related Functions */
    subscription: SubscriptionBackend,
    /* Initialization function */
    init: async (options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            config = BackendConfig.init(options);
            CardBackend.init(options);
            CustomerBackend.init(options);
            PaymentBackend.init(options);
            SubscriptionBackend.init(options);
            resolve(config);
        });
    }
};