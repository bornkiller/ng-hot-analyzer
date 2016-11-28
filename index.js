/**
 * @description
 * - analyze es6 module import and export for ng-hot-loader.
 * - link angular component access token
 *
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

module.exports = Object.assign({},
  require('./src/ref.js'),
  require('./src/token.js'),
  require('./src/link.js'),
  require('./src/export.js')
);