/**
 * @description - analyze es6 module import and export for ng-hot-loader.
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

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

const path = require('path');
const fs = require('fs');

// 匹配过滤器路径不带引号
const filterCaptureReg = /import\s+\{\s+(\w+Filter)\s+\}\s+from\s+\'([^']+)\'/gm;
// 匹配工厂函数路径不带引号
const factoryCaptureReg = /import\s+\{\s+(\w+Factory)\s+\}\s+from\s+\'([^']+)\'/gm;

let target = path.resolve(__dirname, 'test', 'fixture', 'share.module.js');
let template = fs.readFileSync(target, {encoding: 'utf8'});
let statistic = [...analyzeFilterReference(template), ...analyzeFactoryReference(template)];


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
function analyzeFilterReference(template) {
  let middleware;
  let ngHotFilter = [];

  while (middleware = filterCaptureReg.exec(template)) {
    ngHotFilter.push({
      location: middleware[2],
      name: middleware[1],
      type: 'destruct'
    });
  }

  return ngHotFilter;
}

/**
 * @description - 分析路由声明中控制器
 *
 * @param {string} template
 *
 * @returns {Array.<ExternalDescriptor>}
 *
 * @example
 * import { SidebarController } from './flow/sidebar.controller
 */
function analyzeFactoryReference(template) {
  let middleware;
  let ngHotFactory = [];

  while (middleware = factoryCaptureReg.exec(template)) {
    ngHotFactory.push({
      location: middleware[2],
      name: middleware[1],
      type: 'destruct'
    });
  }

  return ngHotFactory;
}