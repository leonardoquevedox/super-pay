/* SuperPay General Modules */
let Utils = require("../../utils/utils");

/* Gateway Specific Modules */
let Config = require("./config");
let Session = require("./session");
let Payment = require("./payment");
let Card = require("./card");

let config = {};

let Frontend = module.exports = {
    /* Session Related Functions */
    session: Session,
    /* Payment Related Functions */
    payment: Payment,
    /* Card Related Functions */
    card: Card,
    /* Initialization function */
    init: async (options) => {
        return new Promise(async (resolve, reject) => {
            options = options || {};
            config = Config.init(options);
            await Utils.loadLib(config.lib_url);
            await Session.init(options);
            Payment.init(options);
            Card.init(options);
        });
    }
};