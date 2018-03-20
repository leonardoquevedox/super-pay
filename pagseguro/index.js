/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

let isFrontEnd = typeof window !== "undefined";
console.log("SuperPay Enviornment:", isFrontEnd ? "Frontend" : "Backend");
if (isFrontEnd) exports.Frontend = require("./lib/frontend");
else exports.Backend = require("./lib/backend");

const PagSeguro = module.exports = exports;