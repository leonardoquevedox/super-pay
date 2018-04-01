"use strict";

let ErrorUtils = module.exports = {
    handle: (reject, error) => {
        console.log(error.response.data.errors);
        if (error && error.response && error.response.data) return reject(new Error(error.response.data));
        if (error && error.data) return reject(new Error(error.data));
        return reject(error);
    }
};