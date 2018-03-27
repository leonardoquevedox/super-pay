"use strict";

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

let Frontend = require("./frontend");
let Backend = require("./backend");

let PagSeguro = module.exports = {
  Frontend: Frontend,
  Backend: Backend
};