/**
 * @description - analyze angular component access token
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const strip = require('strip-comment');

/**
 * @description
 * - 匹配过滤器导出与模块地址, 匹配工厂函数导出与模块地址, 匹配控制器导出与模块地址
 * - `ng-hmr` 暂时不支持注册`controller`的热更新,暂时搁置,后续`ng-hot-loader`无需修改,只需同步`ng-hmr`跟`ng-hot-analyzer`即可
 * @type {*[]}
 */
const captureRegList = [
  {category: 'Filter', reg: /\.filter\((['"])([\w]+)\1\,\s*([\w]+)\)/gm},
  {category: 'Factory', reg: /\.factory\((['"])([\w]+)\1\,\s*([\w]+)\)/gm},
  {category: 'Service', reg: /\.service\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'Directive', reg: /\.directive\((['"])([\w]+)\1\,\s*([\w]+)\)/gm},
  {category: 'ImplicitController', reg: /\.controller\((['"])([\w]+)\1\,\s*([\w]+)\)/gm},
  {category: 'Template', reg: /template:\s*(\w+)/gm},
  {category: 'ExplicitController', reg: /controller:\s*(\w+)/gm}
];

/* eslint-disable no-cond-assign */
module.exports = {
  analyzeAccessToken
};

/**
 * @description - 分析模块声明中组件注册
 *
 * @param {string} input - javascript source  code
 *
 * @returns {Array.<NgDescriptor>}
 *
 * @example
 * import { postfixFilter } from './filter/postfix.filter';
 */
function analyzeAccessToken(input) {
  let middleware;
  let architecture = [];
  let template = strip.js(input);

  captureRegList.forEach(({category, reg}) => {
    let isExplicitMode = category === 'Template' || category === 'ExplicitController';

    // destruct import ways
    while (middleware = reg.exec(template)) {
      architecture.push({
        category: category,
        // why add manual token here ?
        // make ng-hot-loader generate HMR code more convenient, ng-hmr implement HMR more convenient
        token: isExplicitMode ? 'ShortcutMark' : middleware[2],
        name: isExplicitMode ? middleware[1] : middleware[3]
      });
    }
  });

  return architecture;
}