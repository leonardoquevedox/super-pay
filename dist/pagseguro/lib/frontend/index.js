/* Internal Modules */
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
    init: async options => {
        options = options || {};
        config = Config.init(options);
        await Session.init(options);
        Payment.init(options);
        Card.init(options);
    }
};