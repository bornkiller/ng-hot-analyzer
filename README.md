# ng-hot-analyzer
![Build Status](https://img.shields.io/travis/bornkiller/ng-hot-analyzer/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/ng-hot-analyzer/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/ng-hot-analyzer?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/ng-hot-analyzer.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/ng-hot-analyzer/dev-status.svg?style=flat)

Analyze es6 module import and export, template reference for ng-hot-loader.

## API
+ `analyzeExportInstance` - capture export instance name

```javascript
// love.controller.js
export default class LoveController {
  /* @ngInject */
  constructor(bkPrompt) {
    this.bkPrompt = bkPrompt;
  }

  handleAbnormalSituation(structure) {
  }
}
```

```javascript
analyzeExportInstance(LoveControllerTemplate);
// @return LoveController
```

+ `analyzeInstanceReference` - analyze ES6 import in source code

```js
// share.module.js
/**
 * @description - share module combine several controller, filter, service, directive
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// share module dependency
import { postfixFilter } from './filter/postfix.filter';
import { promptFactory } from './service/prompt.factory';
import { FighterService } from './service/fighter.service';
import { validateCaptchaDirective } from './directive/validate.directive';

// share module route dependency
import lovePageTemplate from './template/love.html';
import todoPageTemplate from './template/todo.html';
import { LoveController } from './controller/love.controller';
import { TodoController } from './controller/todo.controller';

// share module name
const SHARE_MODULE = 'app.share';

// share module route
const ShareRoute = [
  {
    name: 'application.love',
    url: '/love',
    views: {
      'page': {
        template: lovePageTemplate,
        controller: LoveController,
        controllerAs: 'vm'
      }
    }
  },
  {
    name: 'application.todo',
    url: '/todo',
    views: {
      'page': {
        template: todoPageTemplate,
        controller: TodoController,
        controllerAs: 'vm'
      }
    }
  }
];

/**
 * @description - never declare any dependency here, because dependency should declare into root module
 */
angular.module(SHARE_MODULE, [])
  .filter('bkPostfix', postfixFilter)
  .factory('bkPrompt', promptFactory)
  .service('bkFighter', FighterService)
  .directive('bkValidateCaptcha', validateCaptchaDirective)
  // eslint-disable-next-line angular/di
  .config(['$stateProvider', function ($stateProvider) {
    ShareRoute.forEach((route) => {
      $stateProvider.state(route);
    });
  }]);

// just export module name for root module
export { SHARE_MODULE };
```

```js
analyzeInstanceReference(shareModuleTemplate);

// @return
[
  { type: 'destruct', name: 'postfixFilter', location: './filter/postfix.filter' },
  { type: 'destruct', name: 'promptFactory', location: './service/prompt.factory' },
  { type: 'destruct', name: 'FighterService', location: './service/fighter.service' },
  { type: 'destruct', name: 'validateCaptchaDirective', location: './directive/validate.directive' },
  { type: 'destruct', name: 'LoveController', location: './controller/love.controller' },
  { type: 'destruct', name: 'TodoController', location: './controller/todo.controller' },
  { type: 'default', name: 'lovePageTemplate', location: './template/love.html' },
  { type: 'default', name: 'todoPageTemplate', location: './template/todo.html' }
]
```

+ `analyzeAccessToken` - analyze ng-component register token and template usage

```javascript
analyzeAccessToken(shareModuleTemplate);
// @return
[
  { category: 'Filter', token: 'bkPostfix', name: 'postfixFilter' },
  { category: 'Factory', token: 'bkPrompt', name: 'promptFactory' },
  { category: 'Service', token: 'bkFighter', name: 'FighterService' },
  { category: 'Directive', token: 'bkValidateCaptcha', name: 'validateCaptchaDirective' },
  { category: 'Template', token: 'ShortcutMark', name: 'lovePageTemplate' },
  { category: 'Template', token: 'ShortcutMark', name: 'todoPageTemplate' },
  { category: 'ExplicitController', token: 'ShortcutMark', name: 'LoveController' },
  { category: 'ExplicitController', token: 'ShortcutMark', name: 'TodoController' }
]
```

+ `resolveAnalyzeStream` - compose ES6 import and instance usage together

```javascript
resolveAnalyzeStream(analyzeInstanceReference(shareModuleTemplate), analyzeAccessToken(shareModuleTemplate));

// @return
[
  {
    type: 'destruct',
    name: 'postfixFilter',
    location: './filter/postfix.filter',
    category: 'Filter',
    token: 'bkPostfix'
  },
  {
    type: 'destruct',
    name: 'promptFactory',
    location: './service/prompt.factory',
    category: 'Factory',
    token: 'bkPrompt'
  },
  {
    type: 'destruct',
    name: 'FighterService',
    location: './service/fighter.service',
    category: 'Service',
    token: 'bkFighter'
  },
  {
    type: 'destruct',
    name: 'validateCaptchaDirective',
    location: './directive/validate.directive',
    category: 'Directive',
    token: 'bkValidateCaptcha'
  },
  {
    type: 'destruct',
    name: 'LoveController',
    location: './controller/love.controller',
    category: 'ExplicitController',
    token: 'ShortcutMark'
  },
  {
    type: 'destruct',
    name: 'TodoController',
    location: './controller/todo.controller',
    category: 'ExplicitController',
    token: 'ShortcutMark'
  },
  {
    type: 'default',
    name: 'lovePageTemplate',
    location: './template/love.html',
    category: 'Template',
    token: 'ShortcutMark'
  },
  {
    type: 'default',
    name: 'todoPageTemplate',
    location: './template/todo.html',
    category: 'Template',
    token: 'ShortcutMark'
  }
]
```

## License
MIT
