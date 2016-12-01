/**
 * @description
 * - analyze es6 module import
 * - analyze route template reference
 * - exclude unique operation, take care when consumer need unique feature
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// 标准ES6使用模式匹配, 解构引入, 默认引入
const captureRegList = [
  { type: 'destruct', reg: /^import\s+\{\s+(\w+)\s+\}\s+from\s+(['"])([^'"]+)\2/gm },
  { type: 'default', reg: /import\s+(\w+)\s+from\s+(['"])([^'"]+)\2/gm }
];

module.exports = {
  analyzeInstanceReference
};

/* eslint-disable no-cond-assign */

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

  captureRegList.forEach(({ type, reg }) => {
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
