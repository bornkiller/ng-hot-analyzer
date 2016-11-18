/**
 * @description - analyze es6 module import and export for ng-hot-loader.
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// 标准ES6使用模式匹配, 解构引入, 默认引入
const destructImportCaptureReg = /^import\s+\{\s+(\w+)\s+\}\s+from\s+(['"])([^'"]+)\2/gm;
const defaultImportCaptureReg = /import\s+(\w+)\s+from\s+(['"])([^'"]+)\2/gm;

/* eslint-disable no-cond-assign */
module.exports = analyzeInstanceReference;

/**
 * @description - 分析模块声明中过滤器引用
 *
 * @param {string} template
 *
 * @returns {Array.<ExternalDescriptor>}
 *
 * @example
 * import { postfixFilter } from './filter/postfix.filter';
 */
function analyzeInstanceReference(template) {
  let middleware;
  let architecture = [];

  // destruct import ways
  while (middleware = destructImportCaptureReg.exec(template)) {
    architecture.push({
      location: middleware[3],
      name: middleware[1],
      type: 'destruct'
    });
  }

  // default import ways
  while (middleware = defaultImportCaptureReg.exec(template)) {
    architecture.push({
      location: middleware[3],
      name: middleware[1],
      type: 'default'
    });
  }

  return architecture;
}