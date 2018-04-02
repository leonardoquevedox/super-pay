/* SuperPay General Modules */
let Utils = require("../../utils/utils");

/* Gateway Specific Modules */
let Config = require("./config");
let Card = require("./card");
let Customer = require("./customer");
let Merchant = require("./merchant");
let Payment = require("./payment");
let Subscription = require("./subscription");

let config = {};

let Frontend = module.exports = {
    /* Card Related Functions */
    card: Card,
    /* Customer Related Functions */
    customer: Customer,
    /* Merchant Related Functions */
    merchant: Merchant,
    /* Payment Related Functions */
    payment: Payment,
    /* Subscription Related Functions */
    subscription: Subscription,
    /* Initialization function */
    init: async (options) => {
        return new Promise(async (resolve, reject) => {
            options = options || {};
            config = Config.init(options);
            Card.init(options);
            Customer.init(options);
            Merchant.init(options);
            Payment.init(options);
            Subscription.init(options);
        });
    }
};