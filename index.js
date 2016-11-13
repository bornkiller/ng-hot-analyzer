/**
 * @description - analyze es6 module import and export for ng-hot-loader.
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/* eslint-disable no-cond-assign */

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
 * @property {string} access - ng register name
 * @property {string} category - ng component type
 */

module.exports = analyzeInstanceReference;

// 匹配过滤器导出与模块地址, 匹配工厂函数导出与模块地址, 匹配控制器导出与模块地址
const defaultExportCaptureReg = /import\s+(\w+)\s+from\s+(['"])([^'"]+)\2/gm;
const destructExportCaptureReg = /^import\s+\{\s+(\w+)\s+\}\s+from\s+(['"])([^'"]+)\2/gm;

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
  while (middleware = destructExportCaptureReg.exec(template)) {
    architecture.push({
      location: middleware[3],
      name: middleware[1],
      type: 'destruct'
    });
  }
  
  // default import ways
  while (middleware = defaultExportCaptureReg.exec(template)) {
    architecture.push({
      location: middleware[3],
      name: middleware[1],
      type: 'default'
    });
  }
  
  return architecture;
}