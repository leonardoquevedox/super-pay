"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let querystring = require('querystring');
let axios = require("axios");
let Promise = require("bluebird");

let Config = require("./config");
let config = {};

let Plan = module.exports = {
    init: options => {
        Config = Config.init(options);
    },
    create: plan => {
        return new Promise((() => {
            var _ref = _asyncToGenerator(function* (resolve, reject) {});

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })());
    },
    read: plan => {
        return new Promise((() => {
            var _ref2 = _asyncToGenerator(function* (resolve, reject) {});

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })());
    },
    update: plan => {
        return new Promise((() => {
            var _ref3 = _asyncToGenerator(function* (resolve, reject) {});

            return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        })());
    },
    delete: plan => {
        return new Promise((() => {
            var _ref4 = _asyncToGenerator(function* (resolve, reject) {});

            return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
            };
        })());
    }
};