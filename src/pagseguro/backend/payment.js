/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5 
 * Module for integrating with the Pay U payment service throught Node.js.
 */
let PhoneNumber = require("awesome-phonenumber");
let querystring = require("querystring");
let Promise = require("bluebird");
let ip = require("ip");
let xmlJS = require("xml-js");
let axios = require("axios");
let md5 = require("md5");
const countries = require("i18n-iso-countries");

let Config = require("./config");
let config = {};

let Payment = module.exports = {
    SUBSCRIPTION: "subscription",
    ORDER: "order",
    init: (options) => {
        config = Config.init(options);
        return Payment;
    },
    create: (type, transaction) => {
        return new Promise(async (resolve, reject) => {
            try {
                let creditCard;
                let phone = new PhoneNumber(transaction.buyer.phone, "BR").getNumber("significant");
                if (transaction && transaction.buyer && transaction.buyer.address && transaction.buyer.address.country && (transaction.buyer.address.country.length < 3))
                    transaction.buyer.address.country = countries.toAlpha3(transaction.buyer.address.country);
                /* Payment information */
                let data = {
                    /* Transaction information */
                    mode: "default",
                    currency: transaction.currency,
                    reference: transaction.reference,
                    notificationURL: ip.address() + "/payment/update",
                    /* Sender information */
                    sender: {
                        hash: transaction.buyer.hash,
                        phone: {
                            areaCode: phone ? phone.substring(0, 2) : undefined,
                            number: phone ? phone.substring(2, phone.length - 1) : undefined
                        },
                        email: transaction.buyer.email,
                        name: transaction.buyer.name,
                        documents: [{
                            document: {
                                type: transaction.buyer.document.type,
                                value: transaction.buyer.document.number ? transaction.buyer.document.number.replace(/[^\d]/g, "") : undefined
                            }
                        }],
                        address: {
                            street: transaction.buyer.address.street ? transaction.buyer.address.street.split(",")[0] : "",
                            number: transaction.buyer.address.number,
                            district: transaction.buyer.address.neighbourhood,
                            city: transaction.buyer.address.city,
                            state: transaction.buyer.address.state,
                            country: transaction.buyer.address.country,
                            postalCode: transaction.buyer.address.postalCode ? transaction.buyer.address.postalCode.replace(/[^\d]/g, "") : undefined,
                        }
                    }
                };
                let isCreditCardPayment = transaction.method == "CREDIT_CARD";
                if (isCreditCardPayment) {
                    /* Payment method */
                    creditCard = {
                        token: transaction.instrument.token,
                        holder: {
                            phone: {
                                areaCode: phone ? phone.substring(0, 2) : undefined,
                                number: phone ? phone.substring(2, phone.length - 1) : undefined
                            },
                            email: transaction.instrument.holder.email,
                            name: transaction.instrument.holder.name,
                            birthDate: transaction.instrument.holder.birthDate,
                            document: {
                                type: transaction.instrument.holder.document.type,
                                value: transaction.instrument.holder.document.number ? transaction.instrument.holder.document.number.replace(/[^\d]/g, "") : undefined
                            }
                        },
                        /* Billing address */
                        billingAddress: {
                            street: transaction.instrument.holder.address.street ? transaction.instrument.holder.address.street.split(",")[0] : "",
                            number: transaction.instrument.holder.address.number,
                            district: transaction.instrument.holder.address.neighbourhood,
                            city: transaction.instrument.holder.address.city,
                            state: transaction.instrument.holder.address.state,
                            country: transaction.instrument.holder.address.country,
                            postalCode: transaction.instrument.holder.address.postalCode ? transaction.instrument.holder.address.postalCode.replace(/[^\d]/g, "") : undefined,
                        }
                    };
                    if (creditCard && creditCard.billingAddress && creditCard.billingAddress.country && (creditCard.billingAddress.country.length < 3)) {
                        creditCard.billingAddress.country = countries.toAlpha3(creditCard.billingAddress.country);
                    }
                };

                /* Order information */
                if (type == Payment.ORDER) {
                    data.method = transaction.method;
                    data.extraAmount = transaction.extraFees ? parseFloat(transaction.extraFees).toFixed(2) : undefined;
                    data.items = {
                        item: {
                            id: "0001",
                            description: transaction.description,
                            amount: parseFloat(transaction.amount).toFixed(2),
                            quantity: "1"
                        }
                    };
                    /* In case the payment type is credit card */
                    if (isCreditCardPayment) {
                        data.creditCard = creditCard;
                        /* Installments (commonly known as PARCELAS) */
                        data.creditCard.installment = {
                            quantity: transaction.installments || "1",
                            value: total
                        };
                    }
                };
                /* Subscription information */
                if (type == Payment.SUBSCRIPTION) {
                    data.plan = transaction.plan;
                    data.paymentMethod = {
                        type: transaction.method.replace(/[^a-zA-Z ]/g, "")
                    };
                    if (isCreditCardPayment) {
                        data.paymentMethod.creditCard = creditCard;
                    }
                };
                /* API credentials */
                let credentials = {
                    email: config.api_email,
                    token: config.api_token
                };
                let content = type == Payment.SUBSCRIPTION ? { directPreApproval: data } : { checkout: data }
                let body = `<?xml version="1.0" encoding="utf-8"?>` + xmlJS.json2xml(content, { compact: true });
                let endpoint = type == Payment.SUBSCRIPTION ? "/pre-approvals" : "/transactions";
                let url = config.gateway_url + `${endpoint}?` + querystring.stringify(credentials);
                let response = (await axios.post(url, body, {
                    headers: {
                        "Content-Type": "application/xml; charset=ISO-8859-1",
                        "Accept": " application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1",
                    }
                })).data;
                let parsed = xmlJS.xml2js(response, { compact: true });
                resolve(parsed);
            } catch (e) {
                if (e.response && e.response) {
                    reject(e.response.data);
                } else {
                    reject(e);
                }
            }
        })
    }
}