/**
 * @description - link angular component access token and implement
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const { has } = require('lodash');

module.exports = {
  linkAnalyzeStream,
  cleanAnalyzeStream
};

/**
 * @description - link instance ref and token for ng-hot-loader
 *
 * @param {Array.<ExternalDescriptor>} componentInstanceRef
 * @param {Array.<NgDescriptor>} componentAccessToken
 *
 * @return {Array.<NgHotDescriptor>}
 */
function linkAnalyzeStream(componentInstanceRef, componentAccessToken) {
  let storage = new Map();

  [...componentInstanceRef, ...componentAccessToken].forEach((item) => {
    let record = storage.get(item.name);
    let next = record ? Object.assign({}, record, item) : item;

    storage.set(item.name, next);
  });

  return Array.from(storage.values());
}

/**
 * @description - clean unnecessary instance reference, like import component but not declare
 *
 * @param {Array.<NgHotDescriptor>} descriptor
 */
function cleanAnalyzeStream(descriptor) {
  return descriptor.filter((item) => has(item, 'token') && has(item, 'name') && has(item, 'location'));
}