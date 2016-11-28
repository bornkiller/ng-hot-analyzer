/**
 * @description
 * - analyze es6 module import
 * - analyze route template reference
 * - exclude uniq operation, take care when consumer need uniq feature
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// 标准ES6使用模式匹配, 解构引入, 默认引入
const destructImportCaptureReg = /^import\s+\{\s+(\w+)\s+\}\s+from\s+(['"])([^'"]+)\2/gm;
const defaultImportCaptureReg = /import\s+(\w+)\s+from\s+(['"])([^'"]+)\2/gm;
const explicitTemplateCaptureReg = /(?:var|let|const)\s+\w+\s*=\s*require\((['"])([^'"]+)\1\)/gm;
const implicitTemplateCaptureReg = /template:\s*require\((['"])([^'"]+)\1\)/gm;

/* eslint-disable no-cond-assign */
module.exports = {
  analyzeInstanceReference,
  analyzeTemplateReference
};

/**
 * @description - 分析模块声明中ES6模块应用
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

/**
 * @description - 分析路由声明中模板引用
 *
 * @param {string} template
 *
 * @returns {Array.<TemplateDescriptor>}
 *
 * @example
 * const LoveTemplate = require('./template/love.html');
 */
function analyzeTemplateReference(template) {
  let middleware;
  let architecture = [];
  
  // destruct import ways
  while (middleware = explicitTemplateCaptureReg.exec(template)) {
    architecture.push({
      location: middleware[2],
      type: 'template'
    });
  }
  
  // default import ways
  while (middleware = implicitTemplateCaptureReg.exec(template)) {
    architecture.push({
      location: middleware[2],
      type: 'template'
    });
  }
  
  return architecture;
}