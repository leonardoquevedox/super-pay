/* Internal Modules */
let FrontendConfig = require('./config');
let SessionFrontend = require('./session');
let PaymentFrontend = require('./payment');
let CardFrontend = require('./card');

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