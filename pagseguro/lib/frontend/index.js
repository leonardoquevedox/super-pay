/* Internal Modules */
let FrontendConfig = require('./lib/backend/config');
let SessionFrontend = require('./lib/backend/session');
let PaymentFrontend = require('./lib/backend/payment');
let CardFrontend = require('./lib/backend/card');

const Frontend = {
    /* SessionFrontend Related Functions */
    session: SessionFrontend,
    /* PaymentFrontend Related Functions */
    payment: PaymentFrontend,
    /* CardFrontend Related Functions */
    card: CardFrontend,
    /* Initialization function */
    init: async (options) => {
        options = options || {};
        config = FrontendConfig(options);
        await SessionFrontend.init(options);
        PaymentFrontend.init(options);
        CardFrontend.init(options);
    }
};