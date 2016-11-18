/**
 * @description - analyze unit suit
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');

const { analyzeAccessToken, analyzeInstanceReference, linkAnalyzeStream } = require('../');
const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), {encoding: 'utf8'});

describe('ng-hot analyze implement', function () {
  it('analyze access token', function () {
    let componentInstanceRef  = analyzeInstanceReference(shareModuleTemplate);
    let componentAccessToken = analyzeAccessToken(shareModuleTemplate);
    
    let result = linkAnalyzeStream(componentInstanceRef, componentAccessToken);
    console.log(result);
  });
});
