/**
 * @description - share module combine several controller, filter, service, directive
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { promptFactory } from './service/prompt.factory';
import { postfixFilter } from './filter/postfix.filter';
import { BkShowcaseController } from './controller/showcase.controller';
import { bkValidateCaptchaDirective } from './directive/validate.directive';

// share module name
const SHARE_MODULE = 'app.share';

/**
 * @description - never declare any deps here, because deps should declare into root module
 */
angular.module(SHARE_MODULE, [])
  .factory('bkPrompt', promptFactory)
  .filter('bkPostfix', postfixFilter)
  // About controller
  // anonymous better than declaration in product module
  // anonymous better than declaration in share module
  .controller('BkShowcaseController', BkShowcaseController)
  .directive('bkValidateCaptcha', bkValidateCaptchaDirective);

// just export module name for root module
export { SHARE_MODULE };