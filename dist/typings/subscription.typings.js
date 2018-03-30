/**
 * @typedef {Object} SuperSubscriptionPlan
 * @property {string} name Subscription name.
 * @property {string} charge_periodicity Subscription periodicity.
 * @property {number} charge_amount Subscription amount per payment.
 * @property {boolean} [charge_manually] Subscription charge type.
 * @property {string} [expiration] Subscription expiration.
 */

/**
 * @typedef {Function} CreateSubscriptionPlan
 * @param {SuperSubscriptionPlan} plan subscription plan information.
 * @returns {object} Created subscription plan id.
 */

/**
 * @typedef {Object} Subscription
 * @property {CreateSubscriptionPlan} createPlan Create subscription plan.
 */
"use strict";