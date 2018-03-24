/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

const Frontend = require("./lib/frontend");
const Backend = require("./lib/backend");

const PagSeguro = module.exports = {
    Frontend: Frontend,
    Backend: Backend
};