let Promise = require("bluebird");
let CardInfo = require("card-info");

export default {
    getInfo: async (cardNumber) => {
        return new Promise((resolve, reject) => {
            resolve(new CardInfo(cardNumber));
        });
    }
}

export const CardUtils = module.exports;