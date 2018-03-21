var _this = this;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */

/* External Dependencies */
import * as Promise from "bluebird";
import * as querystring from "querystring";
import * as axios from "axios";

import Config from "./config";
import Globals from "./globals";
import Utils from "./utils";

let config = {};

let Methods = {
    init: options => {
        config = Config.init(options);
        return _this;
    },
    list: amount => {
        return new Promise((resolve, reject) => {
            PagSeguroDirectPayment.getPaymentMethods({
                amount: amount,
                success: response => {
                    resolve(response.paymentMethods);
                },
                error: error => {
                    reject(error);
                }
            });
        });
    }
};

export { Methods };