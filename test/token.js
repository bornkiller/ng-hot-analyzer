/**
 * @description - analyze export implement cases
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');
const analyzeAccessToken = require('../src/token');

describe('ng-hot-analyze token', function () {
  it('analyze access token', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });
    const [prompt, analyzer, fighter, postfix, showcase, collection, validate] = analyzeAccessToken(shareModuleTemplate);

    prompt.should.eql({category: 'factory', token: 'bkPrompt', name: 'promptFactory'});
    analyzer.should.eql({category: 'factory', token: 'bkAnalyzer', name: 'analyzerFactory'});
    fighter.should.eql({category: 'service', token: 'bkFighter', name: 'FighterService'});
    postfix.should.eql({category: 'filter', token: 'bkPostfix', name: 'postfixFilter'});
    showcase.should.eql({category: 'controller', token: 'ShowcaseController', name: 'ShowcaseController'});
    collection.should.eql({category: 'controller', token: 'CollectionController', name: 'CollectionController'});
    validate.should.eql({category: 'directive', token: 'bkValidateCaptcha', name: 'validateCaptchaDirective'});
  });
});
