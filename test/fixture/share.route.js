/**
 * @description - collection sub-module level router config.
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const LoveTemplate = require('./template/love.html');

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
    name: 'application.secondary',
    url: '/secondary',
    views: {
      'page': {
        template: LoveTemplate,
        controller: CollectionController,
        controllerAs: 'vm'
      }
    }
  }
];