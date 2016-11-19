# ng-hot-analyzer
![Build Status](https://img.shields.io/travis/bornkiller/ng-hot-analyzer/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/ng-hot-analyzer/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/ng-hot-analyzer?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/ng-hot-analyzer.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/ng-hot-analyzer/dev-status.svg?style=flat)
analyze es6 module import and export, template reference for ng-hot-loader.

## Usage
`share.module.js` template:

```js
/**
 * @description - share module combine several controller, filter, service, directive
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { promptFactory } from './service/prompt.factory';
import { postfixFilter } from './filter/postfix.filter';
import { ShowcaseController } from './controller/showcase.controller';
import { validateCaptchaDirective } from './directive/validate.directive';

import analyzerFactory from './service/analyzer.factory';
import CollectionController from './controller/collection.controller';

// share module name
const SHARE_MODULE = 'app.share';

/**
 * @description - never declare any deps here, because deps should declare into root module
 */
angular.module(SHARE_MODULE, [])
  .factory('bkPrompt', promptFactory)
  .factory('bkAnalyzer', analyzerFactory)
  .filter('bkPostfix', postfixFilter)
  .controller('ShowcaseController', ShowcaseController)
  .controller('CollectionController', CollectionController)
  .directive('bkValidateCaptcha', validateCaptchaDirective);

// just export module name for root module
export { SHARE_MODULE };
```

```js
let instanceReference = analyzeInstanceReference(shareModuleTemplate);

// @return
[
  { 
    location: './service/prompt.factory',
    name: 'promptFactory',
    type: 'destruct' 
  },
  { 
    location: './filter/postfix.filter',
    name: 'postfixFilter',
    type: 'destruct'
  },
  { 
    location: './controller/showcase.controller',
    name: 'ShowcaseController',
    type: 'destruct'
  },
  { 
    location: './directive/validate.directive',
    name: 'validateCaptchaDirective',
    type: 'destruct'
  },
  { 
    location: './service/analyzer.factory',
    name: 'analyzerFactory',
    type: 'default'
  },
  { 
    location: './controller/collection.controller',
    name: 'CollectionController',
    type: 'default'
  } 
]
```

```js
let componentAccessToken = analyzeAccessToken(shareModuleTemplate);

// @return
[ 
  { token: 'bkPrompt', name: 'promptFactory', category: 'factory' },
  { token: 'bkAnalyzer', name: 'analyzerFactory', category: 'factory' },
  { token: 'bkPostfix', name: 'postfixFilter', category: 'filter' },
  { token: 'ShowcaseController', name: 'ShowcaseController', category: 'controller' },
  { token: 'CollectionController', name: 'CollectionController', category: 'controller' },
  { token: 'bkValidateCaptcha', name: 'validateCaptchaDirective', category: 'directive' }
]
```

`share.route.js` template:

```js
/**
 * @description - collection sub-module level router config.
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const TodoTemplate = require('./template/todo.html');

import { CollectionController } from './controller/collection.controller';

// router rule declare
export const ShareRoute = [
  {
    name: 'application.love',
    url: '/love',
    views: {
      'page': {
        template: require('./template/love.html'),
        controller: CollectionController,
        controllerAs: 'vm'
      }
    }
  },
  {
    name: 'application.todo',
    url: '/todo',
    views: {
      'page': {
        template: TodoTemplate,
        controller: CollectionController,
        controllerAs: 'vm'
      }
    }
  }
];
```

```js
let templateReference = analyzeTemplateReference(shareRouteTemplate);

// @return
[ 
  { location: './template/todo.html', type: 'template' },
  { location: './template/love.html', type: 'template' }
]
```

## License
MIT