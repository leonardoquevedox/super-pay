/**
 * @typedef {Object} SuperAddress
 * @property {string} street Address street.
 * @property {string} neighbourhood Address neighbourhood.
 * @property {string} city Address city.
 * @property {string} state Address state (Two letter code).
 * @property {string} country Address country (Two letter code).
 * @property {string} postalCode Address postal code.
 */

/**
 * @typedef {Object} SuperDocument
 * @property {string} type Either "CPF" or "CNPJ".
 * @property {string} number Document number (can be either formatted or not).
 */

/**
 * @typedef {Object} SuperId
 * @property {string} id Item id.
 */

/**
* @typedef {Object} SuperBuyer
* @property {string} name Buyer full name.
* @property {string} email Buyer e-mail.
* @property {string} birthDate Buyer birth date.
* @property {SuperAddress} address Buyer address.
* @property {SuperDocument} document Buyer document.
*/
"use strict";