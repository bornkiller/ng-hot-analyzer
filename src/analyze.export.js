/**
 * @description - analyze es6 module export, support class controller now
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const exportControllerCaptureReg = /export\s+(?:default\s+)?class\s+(\w+)/m;
const exportFunctionCaptureReg = /export\s+(?:default\s+)?function\s*(\w+)/m;

module.exports = analyzeExportDeclare;

/**
 * @description - analyze controller declare
 *
 * @param {string} template
 *
 * @return {string}
 */
function analyzeExportDeclare(template) {
  let middleware = exportControllerCaptureReg.exec(template) || exportFunctionCaptureReg.exec(template);
  
  return middleware ? middleware[1] : '';
}