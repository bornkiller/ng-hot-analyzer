/**
 * @description - analyze es6 module export on specific situation
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const exportCaptureReg = /export\s+(?:default\s+)?(?:class|function)\s+(\w+)/m;

module.exports = {
  analyzeExportInstance
};

/**
 * @description - analyze export declare about controller, filter, factory, directive class or function
 *
 * @param {string} template
 *
 * @return {string|boolean}
 */
function analyzeExportInstance(template) {
  let middleware = exportCaptureReg.exec(template);

  return middleware ? middleware[1] : false;
}