/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
const querystring = require("querystring");
const xmlJS = require("xml-js");
const axios = require("axios");
const md5 = require("md5");
let config = require("./config");
let Card = require("./card");

const sign_order = (order) => {
    let amount = order.additionalValues.TX_VALUE.value;
    let currency = order.additionalValues.TX_VALUE.currency;
    let merchant = order.accountId;
    let reference = order.referenceCode;
    return md5(`${config.api_key}~${merchant}~${reference}~${amount}~${currency}`);
};

const Pay = module.exports = {
    init: (options) => { config = config(options) },
    create: (transaction) => {
        return new Promise(async (resolve, reject) => {
            const operation = {
                test: config.development,
                language: config.language,
                merchant: {
                    apiLogin: config.api_login,
                    apiKey: config.api_key
                },
                command: "SUBMIT_TRANSACTION",
                transaction: {
                    paymentMethod: transaction.paymentMethod,
                    paymentCountry: transaction.country || "BR",
                    ipAddress: transaction.ip,
                    type: "AUTHORIZATION_AND_CAPTURE",
                    order: {
                        accountId: config.account_id,
                        referenceCode: transaction.order.ref,
                        description: transaction.order.description,
                        language: transaction.language || config.language,
                        notifyUrl: transaction.notificationURL,
                        additionalValues: {
                            TX_VALUE: {
                                value: parseInt(transaction.order.amount),
                                currency: transaction.order.currency
                            }
                        },
                        buyer: {
                            merchantBuyerId: transaction.order.buyer.ref,
                            fullName: transaction.order.buyer.name,
                            emailAddress: transaction.order.buyer.email,
                            contactPhone: transaction.order.buyer.phone ? transaction.order.buyer.phone.replace(/ /g, "").replace(/-/g, "") : undefined,
                            dniNumber: transaction.order.buyer.cpf,
                            cnpj: transaction.order.buyer.cnpj ? transaction.order.buyer.cnpj.replace(/ /g, "") : undefined,
                            shippingAddress: {
                                street1: transaction.order.buyer.address.street ? transaction.order.buyer.address.street.split(",")[0] : undefined,
                                street2: transaction.order.buyer.address.street ? transaction.order.buyer.address.street.split(",")[1] : undefined,
                                city: transaction.order.buyer.address.city,
                                state: transaction.order.buyer.address.state,
                                country: transaction.order.buyer.address.country,
                                postalCode: transaction.order.buyer.address.postalCode,
                                phone: transaction.order.buyer.phone
                            }
                        }
                    },
                    extraParameters: {
                        INSTALLMENTS_NUMBER: transaction.installments || 1
                    },
                    creditCardTokenId: transaction.order.paymentInstrument.cardToken,
                }
            };
            operation.transaction.order.signature = sign_order(operation.transaction.order);
            console.log(operation.transaction.order.signature);
            let response = (await axios.post(config.payments_url, operation)).data;
            if (response.error) reject(response)
            else resolve(response);
        })
    }
}