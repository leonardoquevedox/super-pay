/**
 * @typedef {Function} ListItems
 * @returns {Array}
 */

/**
 * @typedef {Function} CreateItem
 * @param {Object} payment Item information.
 * @returns {Object} Created payment information.
 */

/**
 * @typedef {Function} ReadItem
 * @param {SuperId} id Item id.
 * @returns {Object} Item informationt.
 */

/**
 * @typedef {Function} UpdateItem
 * @param {Object} payment Item information.
 * @returns {Object} Created payment information.
 */

/**
 * @typedef {Function} DeleteItem
 * @param {SuperId} id Item id.
 * @returns {boolean} success Operation status.
 */

/**
 * @typedef {Object} CRUD
 * @property {ListItems} [list] List item.
 * @property {CreateItem} [create] Create item.
 * @property {ReadItem} [read] Read item.
 * @property {UpdateItem} [update] Update item.
 * @property {DeleteItem} [delete] Delete item.
 */