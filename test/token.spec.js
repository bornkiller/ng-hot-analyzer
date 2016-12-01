/**
 * @description - analyze export implement cases
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');
const { analyzeAccessToken } = require('../src/token');

describe('ng-hot-analyze token', function () {
  it('should analyze empty reference', function () {
    const shareRouteTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'service', 'analyzer.factory.js'), { encoding: 'utf8' });

    analyzeAccessToken(shareRouteTemplate).should.eql([]);
  });

  it('should analyze access token', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });
    const [postfix, prompt, fighter, validate, loveTemplate, todoTemplate, LoveController, TodoController] = analyzeAccessToken(shareModuleTemplate);

    postfix.should.eql({ category: 'Filter', token: 'bkPostfix', name: 'postfixFilter' });
    prompt.should.eql({ category: 'Factory', token: 'bkPrompt', name: 'promptFactory' });
    fighter.should.eql({ category: 'Service', token: 'bkFighter', name: 'FighterService' });
    validate.should.eql({ category: 'Directive', token: 'bkValidateCaptcha', name: 'validateCaptchaDirective' });
    loveTemplate.should.eql({ category: 'RouteTemplate', token: 'RouteMark', name: 'lovePageTemplate' });
    todoTemplate.should.eql({ category: 'RouteTemplate', token: 'RouteMark', name: 'todoPageTemplate' });
    LoveController.should.eql({ category: 'RouteController', token: 'RouteMark', name: 'LoveController' });
    TodoController.should.eql({ category: 'RouteController', token: 'RouteMark', name: 'TodoController' });
  });
});
