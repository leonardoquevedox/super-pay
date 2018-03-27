/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 */
export var chalk: any;

/**
 * @class SuperPay
 */
export class SuperPay {
   /**
    * @class SuperPay
    */
   constructor();

   /**
    * @property {Object} SUPPORTED_GATEWAYS Supported gateways list
    * @property {Object} SUPPORTED_GATEWAYS.PAG_SEGURO PagSeguro Gateway
    */
   static SUPPORTED_GATEWAYS: any;

   /**
    * @function
    * @param {object} settings Gateway specific settings
    * @param {string} settings.gateway Gateway specific settings
    * @param {string} [settings.api_token] Gateway specific settings
    * @param {string} [settings.api_email] Gateway specific settings
    * @return {GatewayBackend} Gateway service instance
    * @memberof SuperPay
    */
   static Backend(settings: { gateway: string, api_token?: string, api_email?: string }): GatewayBackend;

   /**
    * @function
    * @param {object} settings Gateway specific settings
    * @param {string} settings.gateway Gateway specific settings
    * @param {string} [settings.server_url] Gateway specific settings
    * @return {GatewayFrontend} Gateway service instance
    * @memberof SuperPay
    */
   static Frontend(settings: { gateway: string, server_url?: string }): GatewayFrontend;

}

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
export var querystring: any;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
export var PhoneNumber: any;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
export var Promise: any;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the Pay U payment service throught Node.js.
 */
export var Frontend: any;

/**
 * @typedef {Object} SuperCardHolder
 * @property {string} name Holder full name.
 * @property {SuperAddress} address Card holder address.
 * @property {SuperDocument} document Card holder document.
 */
export interface SuperCardHolder {
   name: string;
   address: SuperAddress;
   document: SuperDocument;
}


/**
 * @typedef {Object} SuperCard
 * @property {SuperCardHolder} [holder] Card Holder.
 * @property {string} [payerRef] Payer reference on your database.
 * @property {string} reference Card reference on your database.
 * @property {string} brand Card brand.
 * @property {string} number Card number.
 * @property {string} cvv Card security code.
 * @property {Date} expirationDate Card Expiration Date.
 */
export interface SuperCard {
   holder?: SuperCardHolder;
   payerRef?: string;
   reference: string;
   brand: string;
   number: string;
   cvv: string;
   expirationDate: Date;
}


/**
 * @typedef {Object} SuperCardToken
 * @property {string} token Card number.
 */
export interface SuperCardToken {
   token: string;
}


/**
 * @typedef {Function} CreateCard
 * @param {SuperCard} card Card information.
 * @returns {SuperCard} Created card information.
 */
type CreateCard = (card: SuperCard) => SuperCard;

/**
 * @typedef {Function} GetCardBrand
 * @param {string} number Card information.
 * @returns {Object} Created card information.
 */
type GetCardBrand = (number: string) => Object;

/**
 * @typedef {Object} CardExpirationOptions
 * @property {Array<string>} months Expiration months.
 * @property {Array<string>} years Expiration years.
 */
export interface CardExpirationOptions {
   months: string[];
   years: string[];
}


/**
 * @typedef {Function} GetExpirationOptions
 * @returns {CardExpirationOptions} months Expiration months.
 */
type GetExpirationOptions = () => CardExpirationOptions;

/**
 * @typedef {Object} Card
 * @property {GetExpirationOptions} getExpirationOptions Card expiration years and months (generated at runtime).
 * @property {GetCardBrand} getBrand Get Card Info Based On Number.
 * @property {CreateCard} create Create Card on Gateway.
 */
export interface Card {
   getExpirationOptions: GetExpirationOptions;
   getBrand: GetCardBrand;
   create: CreateCard;
}


/**
 * @typedef {Function} ListItems
 * @returns {Array<object>}
 */
type ListItems = () => Object[];

/**
 * @typedef {Function} CreateItem
 * @param {Object} item Item information.
 * @returns {Object} Created item information.
 */
type CreateItem = (item: Object) => Object;

/**
 * @typedef {Function} ReadItem
 * @param {SuperId} id Item id.
 * @returns {Object} Item informationt.
 */
type ReadItem = (id: SuperId) => Object;

/**
 * @typedef {Function} UpdateItem
 * @param {Object} item Item information.
 * @returns {Object} Created item information.
 */
type UpdateItem = (item: Object) => Object;

/**
 * @typedef {Function} DeleteItem
 * @param {SuperId} id Item id.
 * @returns {boolean} success Operation status.
 */
type DeleteItem = (id: SuperId) => boolean;

/**
 * @typedef {Object} CRUD
 * @property {ListItems} [list] List item.
 * @property {CreateItem} [create] Create item.
 * @property {ReadItem} [read] Read item.
 * @property {UpdateItem} [update] Update item.
 * @property {DeleteItem} [delete] Delete item.
 */
export interface CRUD {
   list?: ListItems;
   create?: CreateItem;
   read?: ReadItem;
   update?: UpdateItem;
   delete?: DeleteItem;
}


/**
 * @typedef {Object} GatewayBackend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */
export interface GatewayBackend {
   card: Card;
   payment: Payment;
   subscription: CRUD;
   session?: Session;
}


/**
 * @typedef {Object} GatewayFrontend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {CRUD} subscription Payment Related Functions.
 * @property {Session} [session] Session Related Functions.
 */
export interface GatewayFrontend {
   card: Card;
   payment: Payment;
   subscription: CRUD;
   session?: Session;
}


/**
 * @typedef {Object} SuperAddress
 * @property {string} street Address street.
 * @property {string} neighbourhood Address neighbourhood.
 * @property {string} city Address city.
 * @property {string} state Address state (Two letter code).
 * @property {string} country Address country (Two letter code).
 * @property {string} postalCode Address postal code.
 */
export interface SuperAddress {
   street: string;
   neighbourhood: string;
   city: string;
   state: string;
   country: string;
   postalCode: string;
}


/**
 * @typedef {Object} SuperDocument
 * @property {string} type Either "CPF" or "CNPJ".
 * @property {string} number Document number (can be either formatted or not).
 */
export interface SuperDocument {
   type: string;
   number: string;
}


/**
 * @typedef {Object} SuperId
 * @property {string} id Item id.
 */
export interface SuperId {
   id: string;
}


/**
 * @typedef {Object} SuperBuyer
 * @property {string} name Buyer full name.
 * @property {SuperAddress} address Buyer address.
 * @property {SuperDocument} document Buyer document.
 */
export interface SuperBuyer {
   name: string;
   address: SuperAddress;
   document: SuperDocument;
}


/**
 * @typedef {Object} SuperOrder
 * @property {string} reference Order reference on your database.
 * @property {string} description Order reference on your database.
 * @property {Array<object>} items Order currency code (Three letters).
 * @property {SuperBuyer} buyer Order buyer.
 */
export interface SuperOrder {
   reference: string;
   description: string;
   items: Object[];
   buyer: SuperBuyer;
}


/**
 * @typedef {Object} SuperPayment
 * @property {SuperCard|SuperCardToken} instrument Payment instrument.
 * @property {string} amount Order currency code (Three letters).
 * @property {string} reference Payment reference on your database.
 * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
 * @property {string} method The method (credit, debit, boleto) with which the payment will be processed.
 * @property {SuperOrder} [order] Order information.
 * @property {string} [country] Country Code (Two letters).
 * @property {string} [currency] Order currency code (Three letters).
 * @property {string} [ip] Buyer IP address.
 */
export interface SuperPayment {
   instrument: (SuperCard|SuperCardToken);
   amount: string;
   reference: string;
   notificationURL: string;
   method: string;
   order?: SuperOrder;
   country?: string;
   currency?: string;
   ip?: string;
}


/**
 * @typedef {Function} ListPaymentMethods
 * @param {string} [amount] Payment amount in cents.
 * @returns {Array<object>}
 */
type ListPaymentMethods = (amount?: string) => Object[];

/**
 * @typedef {Function} ListPayments
 * @returns {Array<SuperPayment>}
 */
type ListPayments = () => SuperPayment[];

/**
 * @typedef {Function} CreatePayment
 * @param {SuperPayment} payment Payment information.
 * @returns {SuperPayment} Created payment information.
 */
type CreatePayment = (payment: SuperPayment) => SuperPayment;

/**
 * @typedef {Function} ReadPayment
 * @param {SuperId} id Payment id.
 * @returns {SuperPayment} Payment informationt.
 */
type ReadPayment = (id: SuperId) => SuperPayment;

/**
 * @typedef {Function} UpdatePayment
 * @param {SuperPayment} payment Payment information.
 * @returns {SuperPayment} Created payment information.
 */
type UpdatePayment = (payment: SuperPayment) => SuperPayment;

/**
 * @typedef {Function} DeletePayment
 * @param {SuperId} id Payment id.
 * @returns {boolean} success Operation status.
 */
type DeletePayment = (id: SuperId) => boolean;

/**
 * @typedef {Object} Payment
 * @property {ListPaymentMethods} getPaymentMethods List available payment methods.
 * @property {ListPayments} list List user payments.
 * @property {CreatePayment} create Create payment.
 * @property {ReadPayment} read Read payment.
 * @property {UpdatePayment} update Update payment.
 * @property {DeletePayment} delete Delete payment.
 */
export interface Payment {
   getPaymentMethods: ListPaymentMethods;
   list: ListPayments;
   create: CreatePayment;
   read: ReadPayment;
   update: UpdatePayment;
   delete: DeletePayment;
}


/**
 * @typedef {Object} SuperSession
 * @property {string} token Session token.
 */
export interface SuperSession {
   token: string;
}


/**
 * @typedef {Function} CreateSession
 * @returns {SuperSession} Created session information.
 */
type CreateSession = () => SuperSession;

/**
 * @typedef {Object} Session
 * @property {CreateSession} create Create Session Token.
 */
export interface Session {
   create: CreateSession;
}


