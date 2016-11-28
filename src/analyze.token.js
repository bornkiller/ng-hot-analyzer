/**
 * @description - analyze angular component access token
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

// 匹配过滤器导出与模块地址, 匹配工厂函数导出与模块地址, 匹配控制器导出与模块地址
const standardComponentCapture = [
  {category: 'factory', reg: /\.factory\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'service', reg: /\.service\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'filter', reg: /\.filter\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'controller', reg: /\.controller\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'directive', reg: /\.directive\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm}
];

/* eslint-disable no-cond-assign */
module.exports = analyzeAccessToken;

/**
 * @description - 分析模块声明中组件注册
 *
 * @param {string} template
 *
 * @returns {Array.<NgDescriptor>}
 *
 * @example
 * import { postfixFilter } from './filter/postfix.filter';
 */
function analyzeAccessToken(template) {
  let middleware;
  let architecture = [];

  standardComponentCapture.forEach(({category, reg}) => {
    // destruct import ways
    while (middleware = reg.exec(template)) {
      architecture.push({
        category: category,
        token: middleware[2],
        name: middleware[3]
      });
    }
  });

  return architecture;
}