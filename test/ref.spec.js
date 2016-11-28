/**
 * @description - analyze reference implement case
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');

const { analyzeInstanceReference, analyzeTemplateReference } = require('../src/ref');

describe('ng-hot-analyze reference', function () {
  it('analyze instance reference', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });
    const [prompt, fighter, postfix, showcase, validate, analyzer, collection] = analyzeInstanceReference(shareModuleTemplate);

    prompt.should.eql({type: 'destruct', name: 'promptFactory', location: './service/prompt.factory'});
    fighter.should.eql({type: 'destruct', name: 'FighterService', location: './service/fighter.service'});
    postfix.should.eql({type: 'destruct', name: 'postfixFilter', location: './filter/postfix.filter'});
    showcase.should.eql({type: 'destruct', name: 'ShowcaseController', location: './controller/showcase.controller'});
    validate.should.eql({type: 'destruct', name: 'validateCaptchaDirective', location: './directive/validate.directive'});
    analyzer.should.eql({type: 'default', name: 'analyzerFactory', location: './service/analyzer.factory'});
    collection.should.eql({type: 'default', name: 'CollectionController', location: './controller/collection.controller'});
  });

  it('analyze template reference', function () {
    const shareRouteTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.route.js'), { encoding: 'utf8' });
    const [todo, love] = analyzeTemplateReference(shareRouteTemplate);

    todo.should.eql({type: 'template', location: './template/todo.html'});
    love.should.eql({type: 'template', location: './template/love.html'});
  });

  it('analyze empty reference', function () {
    const shareRouteTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'service', 'analyzer.factory.js'), { encoding: 'utf8' });

    analyzeTemplateReference(shareRouteTemplate).should.eql([]);
  });
});
