/**
 * @description
 * - analyze es6 module import and export for ng-hot-loader.
 * - link angular component access token
 *
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// analyzeInstanceReference: require('./src/analyze.ref')

module.exports = Object.assign({}, require('./src/analyze.ref'), {
  analyzeAccessToken: require('./src/analyze.token'),
  linkAnalyzeStream: require('./src/analyze.link')
});