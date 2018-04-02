/* Internal Modules */
let Config = require('./config');
let Card = require('./card');
let Customer = require('./customer');
let Merchant = require('./merchant');
let Order = require('./order');
let Payment = require('./payment');
let Subscriber = require("./subscriber");
let Subscription = require('./subscription');

let config = {};

let Backend = module.exports = {
    /* Card Related Functions */
    card: Card,
    /* Customer Related Functions */
    customer: Customer,
    /* Merchant Related Functions */
    merchant: Merchant,
    /* Order Related Functions */
    order: Order,
    /* Payment Related Functions */
    payment: Payment,
    /* Subscriber Related Functions */
    subscriber: Subscriber,
    /* Subscription Related Functions */
    subscription: Subscription,
    /* Initialization function */
    init: async (options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            config = Config.init(options);
            Card.init(options);
            Customer.init(options);
            Merchant.init(options);
            Order.init(options);
            Payment.init(options);
            Subscriber.init(options);
            Subscription.init(options);
            resolve(config);
        });
    }
};