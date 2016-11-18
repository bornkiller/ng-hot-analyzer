/**
 * @description - link angular component access token and implement
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

module.exports = linkAnalyzeStream;

/**
 * @description - link instance ref and token for ng-hot-engine
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