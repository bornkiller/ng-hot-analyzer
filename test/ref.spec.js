/**
 * @description - analyze reference implement case
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');

const { analyzeInstanceReference } = require('../src/ref');

describe('ng-hot-analyze reference', function () {
  it('analyze empty reference', function () {
    const shareRouteTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'service', 'analyzer.factory.js'), { encoding: 'utf8' });

    analyzeInstanceReference(shareRouteTemplate).should.eql([]);
  });

  it('analyze instance reference', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });
    const [postfix, prompt, fighter, validate, LoveController, TodoController, love, todo] = analyzeInstanceReference(shareModuleTemplate);

    postfix.should.eql({type: 'destruct', name: 'postfixFilter', location: './filter/postfix.filter'});
    prompt.should.eql({type: 'destruct', name: 'promptFactory', location: './service/prompt.factory'});
    fighter.should.eql({type: 'destruct', name: 'FighterService', location: './service/fighter.service'});
    validate.should.eql({type: 'destruct', name: 'validateCaptchaDirective', location: './directive/validate.directive'});
    LoveController.should.eql({type: 'destruct', name: 'LoveController', location: './controller/love.controller'});
    TodoController.should.eql({type: 'destruct', name: 'TodoController', location: './controller/todo.controller'});
    love.should.eql({type: 'default', name: 'lovePageTemplate', location: './template/love.html'});
    todo.should.eql({type: 'default', name: 'todoPageTemplate', location: './template/todo.html'});
  });
});
