/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

import Frontend from "./lib/frontend";
import Backend from "./lib/backend";

let PagSeguro = {
    Frontend: Frontend,
    Backend: Backend
};

export default PagSeguro;