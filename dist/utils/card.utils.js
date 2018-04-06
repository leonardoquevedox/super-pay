"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* External Dependencies */
let moment = require("moment");
let Promise = require("bluebird");
let CardInfo = require("@polvo-labs/card-type");

/* Internal Modules */
let Utils = require("../utils/utils");

let CardUtils = module.exports = {
    numbersOnly: (() => {
        var _ref = _asyncToGenerator(function* (cardNumber) {
            return new Promise(function (resolve, reject) {
                resolve(cardNumber.replace(/ /g, ""));
            });
        });

        return function numbersOnly(_x) {
            return _ref.apply(this, arguments);
        };
    })(),
    initExpirationDates: (() => {
        var _ref2 = _asyncToGenerator(function* () {
            return new Promise(function (resolve, reject) {
                let expiration = {
                    months: [],
                    years: []
                };
                for (let month = 1; month <= 12; month++) {
                    expiration.months.push(Utils.pad(month));
                }
                for (let year = 0; year <= 30; year++) {
                    expiration.years.push(moment().add(year, "years").format("YYYY"));
                }
                resolve(expiration);
            });
        });

        return function initExpirationDates() {
            return _ref2.apply(this, arguments);
        };
    })()
};