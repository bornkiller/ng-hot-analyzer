/**
 * @description - ng-hot-analyzer type definition
 */

/**
 * @typedef {object} ExternalDescriptor
 *
 * @property {string} location - import file source path
 * @property {string} name - import keyword variable
 * @property {string} type - ES6 import style, default or destruct
 */

/**
 * @typedef {object} NgDescriptor
 *
 * @property {string} token - ng register name
 * @property {string} name - ng component implement, link import and token together
 * @property {string} category - ng component type, support factory, filter, controller till now
 */

/**
 * @typedef {object} NgHotDescriptor
 *
 * @property {string} location - import file source path
 * @property {string} name - import keyword variable
 * @property {string} type - ES6 import style, default or destruct
 * @property {string} token - ng register name
 * @property {string} category - ng component type, support factory, filter, controller till now
 */