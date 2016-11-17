/**
 * @description
 * - analyze es6 module import and export for ng-hot-loader.
 * - link angular component access token
 *
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
 * @property {string} token - ng register name
 * @property {string} name - ng component implement, link import and token together
 * @property {string} category - ng component type, support factory, filter, controller till now
 */

/**
 * @typedef {object} NgHotDescriptor
 *
 * @property {string} location - import file source path
 * @property {string} name - import keyword variable
 * @property {string} type - ES6 import style, default or destruct
 * @property {string} token - ng register name
 * @property {string} category - ng component type, support factory, filter, controller till now
 */

/* eslint-disable no-cond-assign */
module.exports = {
  analyzeAccessToken,
  analyzeInstanceReference,
  linkAnalyzeStream
};

// 匹配过滤器导出与模块地址, 匹配工厂函数导出与模块地址, 匹配控制器导出与模块地址
const destructImportCaptureReg = /^import\s+\{\s+(\w+)\s+\}\s+from\s+(['"])([^'"]+)\2/gm;
const defaultImportCaptureReg = /import\s+(\w+)\s+from\s+(['"])([^'"]+)\2/gm;
const standardComponentCapture = [
  {category: 'factory', reg: /\.factory\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm,},
  {category: 'filter', reg: /\.filter\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'controller', reg: /\.controller\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm},
  {category: 'directive', reg: /\.directive\((['"])([a-zA-Z]+)\1\,\s*([a-zA-Z]+)\)/gm}
];

/**
 * @description - link instance ref and token for ng-hot-engine
 *
 * @param {Array.<ExternalDescriptor>} componentInstanceRef
 * @param {Array.<NgDescriptor>} componentAccessToken
 *
 * @return {Array.<NgHotDescriptor>}
 */
function linkAnalyzeStream(componentInstanceRef, componentAccessToken) {
  let storage = new Map();
  
  [...componentInstanceRef, ...componentAccessToken].forEach((item) => {
    let record = storage.get(item.name);
    let next = record ? Object.assign({}, record, item) : item;
    
    storage.set(item.name, next);
  });
  
  return Array.from(storage.values());
}

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
        token: middleware[2],
        name: middleware[3],
        category: category
      });
    }
  });
  
  return architecture;
}

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