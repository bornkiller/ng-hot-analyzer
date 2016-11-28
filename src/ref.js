/**
 * @description
 * - analyze es6 module import
 * - analyze route template reference
 * - exclude unique operation, take care when consumer need unique feature
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// 标准ES6使用模式匹配, 解构引入, 默认引入
const importCaptureReg = [
  { type: 'destruct', reg: /^import\s+\{\s+(\w+)\s+\}\s+from\s+(['"])([^'"]+)\2/gm },
  { type: 'default', reg: /import\s+(\w+)\s+from\s+(['"])([^'"]+)\2/gm }
];

const templateCaptureReg = [
  { type: 'template', reg: /(?:var|let|const)\s+\w+\s*=\s*require\((['"])([^'"]+)\1\)/gm },
  { type: 'template', reg: /template:\s*require\((['"])([^'"]+)\1\)/gm }
];

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

  importCaptureReg.forEach(({ type, reg }) => {
    while (middleware = reg.exec(template)) {
      architecture.push({
        type: type,
        name: middleware[1],
        location: middleware[3]
      });
    }
  });

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

  templateCaptureReg.forEach(({type, reg}) => {
    while (middleware = reg.exec(template)) {
      architecture.push({
        type: type,
        location: middleware[2]
      });
    }
  });

  return architecture;
}