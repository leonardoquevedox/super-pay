"use strict";

let ErrorUtils = module.exports = {
    handle: (reject, error) => {
        if (error && error.response && error.response.data) console.warn(JSON.stringify(error.response.data));
        return reject(new Error("SuperPay to Major Tom: There was an error on the integration process. Please, check the logs above."));
    }
};