/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 */

/* External Dependencies */
const querystring = require('querystring');
const axios = require("axios");

let config = require("./config");

const Payment = module.exports = {
    init: (options) => {
        config = config(options);
        return this;
    },
    create(payment) {
        return new Promise(async (resolve, reject) => {
            let data = {
                hash: PagSeguroDirectPayment.getSenderHash(),
                items: payment.items,
                token: payment.creditCard.token,
                method: payment.method,
                total: payment.amount
            };
            let response = await axios.post(`${config.server_url}/payment`);
            resolve(response);
        });
    }
}

/* 
    
let transaction = {
        paymentMethod: "VISA",
        country: "BR",
        ip: "189.023.010",
        notificationURL: env.SERVER_ADDRESS + "/api/payment/notification",
        order: {
            ref: new mongoose.Types.ObjectId().toHexString(),
            amount: "10",
            currency: "BRL",
            paymentInstrument: {
                cardToken: "8116fce0-b20e-434f-9084-0f8ab5fb418b",
                holder: {
                    name: "Leonardo Pacheco Quevedo",
                    address: {
                        street: "Avenida Presidente Vargas, 2332",
                        neighbourhood: "Centro",
                        city: "Porto Alegre",
                        state: "RS",
                        country: "BR",
                        postalCode: "93208-118"
                    },
                    document: {
                        type: "CPF",
                        number: "031.874.610-77",
                    }
                }
            },
            description: "Petshop do Beto",
            buyer: {
                hash: "qowijeoqiwjeoqjwoeoqwje",
                ref: new mongoose.Types.ObjectId().toHexString(),
                name: "Leonardo Pacheco Quevedo",
                email: "pac.leo@hotmail.com",
                phone: "(51) 98535-8349",
                document: {
                    type: "CPF",
                    number: "031.874.610-77",
                },
                address: {
                    street: "Avenida Presidente Vargas, 2332",
                    neighbourhood: "Centro",
                    city: "Porto Alegre",
                    state: "RS",
                    country: "BR",
                    postalCode: "93208-118"
                }
            },
        },
    };
*/