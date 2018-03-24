let Promise = require("bluebird");
let CardInfo = require("card-info");

const CardUtils = module.exports = {
    getInfo: async cardNumber => {
        return new Promise((resolve, reject) => {
            resolve(new CardInfo(cardNumber));
        });
    },
    initExpirationDates: expiration => {
        for (let month = 1; month <= 12; month++) {
            expiration.months.push(Utils.pad(month));
        }
        for (let year = 0; year <= 30; year++) {
            expiration.years.push(moment().add(year, "years").format("YYYY"));
        }
    }
};