var _this = this;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let PhoneNumber = require('awesome-phonenumber');
let querystring = require("querystring");
let Promise = require("bluebird");
let axios = require("axios");
let md5 = require("md5");

let Config = require("./config");
let config = {};

let Payment = module.exports = {
    init: options => {
        config = Config.init(options);
        return _this;
    },
    create: transaction => {
        return new Promise(async (resolve, reject) => {
            try {
                let phone = new PhoneNumber(transaction.order.buyer.phone, 'BR').getNumber('significant');
                let total = parseFloat(transaction.order.amount).toFixed(2);
                let payment = {
                    /* Transaction information */
                    mode: "default",
                    method: "creditCard",
                    /* Order information */
                    reference: transaction.order.ref,
                    currency: transaction.order.currency,
                    extraAmount: transaction.order.extraFees ? parseFloat(transaction.order.extraFees).toFixed(2) : undefined,
                    notificationURL: transaction.notificationURL,
                    items: {
                        item: {
                            id: "0001",
                            description: transaction.order.description,
                            amount: total,
                            quantity: "1"
                        }
                    },
                    /* Payment information */
                    creditCard: {
                        token: transaction.order.paymentInstrument.cardToken,
                        /* Installments (commonly known as PARCELAS) */
                        installment: {
                            quantity: transaction.order.installments || "1",
                            value: total
                        },
                        holder: {
                            name: transaction.order.paymentInstrument.holder.name,
                            documents: {
                                document: {
                                    type: transaction.order.paymentInstrument.holder.document.type,
                                    value: transaction.order.paymentInstrument.holder.document.number ? transaction.order.paymentInstrument.holder.document.number.replace(/[^\d]/g, "") : undefined
                                }
                            }
                        },
                        /* Billing address */
                        billingAddress: {
                            street: transaction.order.paymentInstrument.holder.address.street ? transaction.order.paymentInstrument.holder.address.street.split(",")[0] : undefined,
                            number: transaction.order.paymentInstrument.holder.address.street ? transaction.order.paymentInstrument.holder.address.street.split(",")[1] : undefined,
                            district: transaction.order.paymentInstrument.holder.address.neighbourhood,
                            city: transaction.order.paymentInstrument.holder.address.city,
                            state: transaction.order.paymentInstrument.holder.address.state,
                            country: transaction.order.paymentInstrument.holder.address.country,
                            postalCode: transaction.order.paymentInstrument.holder.address.postalCode ? transaction.order.paymentInstrument.holder.address.postalCode.replace(/[^\d]/g, "") : undefined
                        }
                    },
                    shipping: {
                        addressRequired: false
                    },
                    /* Sender information */
                    sender: {
                        hash: transaction.order.buyer.hash,

                        phone: {
                            areaCode: phone ? phone.substring(0, 2) : undefined,
                            number: phone ? phone.substring(2, phone.length - 1) : undefined
                        },
                        email: transaction.order.buyer.email,
                        name: transaction.order.buyer.name,
                        documents: {
                            document: {
                                type: transaction.order.buyer.document.type,
                                value: transaction.order.buyer.document.number ? transaction.order.buyer.document.number.replace(/[^\d]/g, "") : undefined
                            }
                        }
                    }
                };
                let credentials = {
                    email: config.api_email,
                    token: config.api_token
                };
                let url = config.checkout_url + "/transactions?" + querystring.stringify(credentials);
                let response = (await axios.post(url, content.toString(), {
                    headers: {
                        "Content-Type": "application/xml; charset=ISO-8859-1"
                    }
                })).data;
                resolve(response);
            } catch (e) {
                if (e.response && e.response) {
                    let response = e.response.data;
                } else {
                    reject(e.message);
                }
            }
        });
    }
};