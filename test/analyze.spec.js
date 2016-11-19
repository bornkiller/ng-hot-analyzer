/**
 * @description - analyze unit suit
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');

const { analyzeInstanceReference, analyzeTemplateReference, analyzeAccessToken, linkAnalyzeStream } = require('../');
// const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), {encoding: 'utf8'});
// const shareRouteTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.route.js'), {encoding: 'utf8'});

describe('ng-hot analyze implement', function () {
  it('analyze instance reference', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });
    
    let instanceReference = analyzeInstanceReference(shareModuleTemplate);
    
    instanceReference.should.be.an.Array();
    
    let analyzerFactory = instanceReference.find((descriptor) => descriptor.name === 'analyzerFactory');
    let ShowcaseController = instanceReference.find((descriptor) => descriptor.name === 'ShowcaseController');
    
    analyzerFactory.should.be.an.Object();
    ShowcaseController.should.be.an.Object();
    
    analyzerFactory.type.should.equal('default');
    analyzerFactory.location.should.equal('./service/analyzer.factory');
    
    ShowcaseController.type.should.equal('destruct');
    ShowcaseController.location.should.equal('./controller/showcase.controller');
  });
  
  it('analyze template reference', function () {
    const shareRouteTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.route.js'), { encoding: 'utf8' });
    
    let [todo, love] = analyzeTemplateReference(shareRouteTemplate);
    
    todo.should.be.an.Object();
    love.should.be.an.Object();
    
    todo.location.should.equal('./template/todo.html');
    love.location.should.equal('./template/love.html');
  });
  
  it('analyze access token', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });
    
    let componentAccessToken = analyzeAccessToken(shareModuleTemplate);
    let bkPromptFactory = componentAccessToken.find((descriptor) => descriptor.name === 'promptFactory');
    
    bkPromptFactory.should.be.an.Object();
    bkPromptFactory.category.should.equal('factory');
    bkPromptFactory.token.should.equal('bkPrompt');
  });
  
  it('analyze stream link', function () {
    let componentAccessToken = [{ token: 'bkPrompt', name: 'promptFactory', category: 'factory' }];
    let componentInstanceReference = [{
      location: './service/prompt.factory',
      name: 'promptFactory',
      type: 'destruct'
    }];
    
    let [match] = linkAnalyzeStream(componentInstanceReference, componentAccessToken);
    
    match.should.be.an.Object();
    match.location.should.equal('./service/prompt.factory');
    match.type.should.equal('destruct');
    match.token.should.equal('bkPrompt');
  });
});
