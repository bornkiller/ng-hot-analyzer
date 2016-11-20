/**
 * @description - analyze es6 module export, support class controller now
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const exportDeclareCaptureReg = /export\s+(?:default\s+)?class\s+(\w+)/gm;

module.exports = analyzeExportDeclare;

/**
 * @description - analyze controller declare
 *
 * @param {string} template
 *
 * @return {string}
 */
function analyzeExportDeclare(template) {
  let middleware = exportDeclareCaptureReg.exec(template);
  
  return middleware ? middleware[1] : '';
}