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
    * @property {Object} SUPPORTED_GATEWAYS.PAY_U Pay-U Gateway
    * @property {Object} SUPPORTED_GATEWAYS.MOIP Pay-U Gateway
    */
   static SUPPORTED_GATEWAYS: any;

   /**
    * @function
    * @param {object} settings Gateway specific settings
    * @param {string} settings.gateway Gateway specific settings
    * @param {string} [settings.api_token] Gateway specific settings
    * @param {string} [settings.api_email] Gateway specific settings
    * @returns {SuperGatewayBackend} Gateway service instance
    * @memberof SuperPay
    */
   static Backend(settings: { gateway: string, api_token?: string, api_email?: string }): SuperGatewayBackend;

   /**
    * @function
    * @param {object} settings Gateway specific settings
    * @param {string} settings.gateway Gateway specific settings
    * @param {string} [settings.server_url] Gateway specific settings
    * @returns {SuperGatewayFrontend} Gateway service instance
    * @memberof SuperPay
    */
   static Frontend(settings: { gateway: string, server_url?: string }): SuperGatewayFrontend;

}

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
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */
export const base64: any;

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
export var Promise: any;

/**
 * @author @vranahub.
 * @license MIT
 * @version 0.0.5
 * Module for integrating with the PagSeguro payment service throught Node.js.
 */
export var Config: any;

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
 * @param {string} [xAccessToken] Server access token.
 * @returns {any} Created card information.
 */
type CreateCard = (card: SuperCard, xAccessToken?: string) => any;

/**
 * @typedef {Function} DeleteCard
 * @param {SuperId} id Customer id.
 * @param {string} [xAccessToken] Server access token.
 * @returns {Array<SuperCard>}
 */
type DeleteCard = (id: SuperId, xAccessToken?: string) => SuperCard[];

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
 * @typedef {Function} ListCards
 * @param {SuperId} id Customer id.
 * @param {string} [xAccessToken] Server access token.
 * @returns {Array<SuperCard>}
 */
type ListCards = (id: SuperId, xAccessToken?: string) => SuperCard[];

/**
 * @typedef {Object} Card
 * @property {GetExpirationOptions} getExpirationOptions Card expiration years and months (generated at runtime).
 * @property {CreateCard} create Create Card on Gateway.
 * @property {DeleteCard} [delete] Delete card.
 * @property {ListCards} [list] List user cards.
 */
export interface Card {
   getExpirationOptions: GetExpirationOptions;
   create: CreateCard;
   delete?: DeleteCard;
   list?: ListCards;
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
 * @typedef {Function} CreateCustomer
 * @param {SuperBuyer} card Customer information.
 * @param {string} [xAccessToken] Server access token.
 * @returns {any} Created card information.
 */
type CreateCustomer = (card: SuperBuyer, xAccessToken?: string) => any;

/**
 * @typedef {Function} ListCustomers
 * @param {SuperId} id Customer id.
 * @param {string} [xAccessToken] Server access token.
 * @returns {Array<SuperBuyer>}
 */
type ListCustomers = (id: SuperId, xAccessToken?: string) => SuperBuyer[];

/**
 * @typedef {Object} Customer
 * @property {CreateCustomer} create Create Customer on Gateway.
 * @property {ListCustomers} [list] List user payments.
 */
export interface Customer {
   create: CreateCustomer;
   list?: ListCustomers;
}


/**
 * @typedef {Object} SuperGatewayBackend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {Subscription} subscription Payment Related Functions.
 * @property {Customer} [customer] Customer Related Functions.
 * @property {Merchant} [merchant] Merchant Related Functions.
 * @property {Session} [session] Session Related Functions.
 */
export interface SuperGatewayBackend {
   card: Card;
   payment: Payment;
   subscription: Subscription;
   customer?: Customer;
   merchant?: Merchant;
   session?: Session;
}


/**
 * @typedef {Object} SuperGatewayFrontend
 * @property {Card} card Card Related Functions.
 * @property {Payment} payment Payment Related Functions.
 * @property {Subscription} subscription Payment Related Functions.
 * @property {Customer} [customer] Customer Related Functions.
 * @property {Merchant} [merchant] Merchant Related Functions.
 * @property {Session} [session] Session Related Functions.
 */
export interface SuperGatewayFrontend {
   card: Card;
   payment: Payment;
   subscription: Subscription;
   customer?: Customer;
   merchant?: Merchant;
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
 * @property {string} email Buyer e-mail.
 * @property {string} birthDate Buyer birth date.
 * @property {SuperAddress} address Buyer address.
 * @property {SuperDocument} document Buyer document.
 */
export interface SuperBuyer {
   name: string;
   email: string;
   birthDate: string;
   address: SuperAddress;
   document: SuperDocument;
}


/**
 * @typedef {Function} CreateMerchant
 * @param {SuperBuyer} card Merchant information.
 * @param {string} [xAccessToken] Server access token.
 * @returns {any} Created card information.
 */
type CreateMerchant = (card: SuperBuyer, xAccessToken?: string) => any;

/**
 * @typedef {Function} ListMerchants
 * @param {SuperId} id Merchant id.
 * @param {string} [xAccessToken] Server access token.
 * @returns {Array<SuperBuyer>}
 */
type ListMerchants = (id: SuperId, xAccessToken?: string) => SuperBuyer[];

/**
 * @typedef {Object} Merchant
 * @property {CreateMerchant} create Create Merchant on Gateway.
 * @property {ListMerchants} [list] List user payments.
 */
export interface Merchant {
   create: CreateMerchant;
   list?: ListMerchants;
}


/**
 * @typedef {Object} SuperOrder
 * @property {string} reference Order reference on your database.
 * @property {string} description Order reference on your database.
 * @property {Array<object>} items Order currency code (Three letters).
 */
export interface SuperOrder {
   reference: string;
   description: string;
   items: Object[];
}


/**
 * @typedef {Object} SuperPayment
 * @property {SuperCard|SuperCardToken} instrument Payment instrument.
 * @property {SuperBuyer} buyer Payment buyer information.
 * @property {number} amount Payment currency code (Three letters).
 * @property {string} reference Payment reference on your database.
 * @property {string} notificationURL The URL to which the gateway service will postback when the payment updates.
 * @property {string} method The method (credit, debit, boleto) with which the payment will be processed.
 * @property {string} [plan] Subscription plan id.
 * @property {SuperOrder} [order] Order information.
 * @property {string} [country] Country Code (Two letters).
 * @property {string} [currency] Payment currency code (Three letters).
 * @property {string} [ip] Buyer IP address.
 */
export interface SuperPayment {
   instrument: (SuperCard|SuperCardToken);
   buyer: SuperBuyer;
   amount: number;
   reference: string;
   notificationURL: string;
   method: string;
   plan?: string;
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
 * @typedef {Object} SuperReceiver
 * @property {string} id Receiver id.
 * @property {boolean} isPrimary Receiver type.
 * @property {number} [percentage] Receiver percentage on the transaction.
 * @property {number} [fee] Receiver fee.
 */
export interface SuperReceiver {
   id: string;
   isPrimary: boolean;
   percentage?: number;
   fee?: number;
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


/**
 * @typedef {Object} SuperSubscriptionPlan
 * @property {string} name Subscription name.
 * @property {string} charge_periodicity Subscription periodicity.
 * @property {number} charge_amount Subscription amount per payment.
 * @property {boolean} [charge_manually] Subscription charge type.
 * @property {string} [expiration] Subscription expiration.
 */
export interface SuperSubscriptionPlan {
   name: string;
   charge_periodicity: string;
   charge_amount: number;
   charge_manually?: boolean;
   expiration?: string;
}


/**
 * @typedef {Function} CreateSubscriptionPlan
 * @param {SuperSubscriptionPlan} plan subscription plan information.
 * @returns {object} Created subscription plan id.
 */
type CreateSubscriptionPlan = (plan: SuperSubscriptionPlan) => Object;

/**
 * @typedef {Function} SubscribeToPlan
 * @param {SuperPayment} subscription subscription payment information.
 * @returns {object} Created subscription plan id.
 */
type SubscribeToPlan = (subscription: SuperPayment) => Object;

/**
 * @typedef {Object} Subscription
 * @property {CreateSubscriptionPlan} createPlan Create subscription plan.
 * @property {SubscribeToPlan} subscribe subscribe to subscription plan.
 */
export interface Subscription {
   createPlan: CreateSubscriptionPlan;
   subscribe: SubscribeToPlan;
}


