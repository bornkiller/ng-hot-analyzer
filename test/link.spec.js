/**
 * @description - analyze unit suit
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');

const { linkAnalyzeStream, cleanAnalyzeStream } = require('../src/link');

describe('ng-hot-analyze link', function () {
  it('should link analyze stream', function () {
    let componentAccessToken = [{ token: 'bkPrompt', name: 'promptFactory', category: 'factory' }];
    let componentInstanceReference = [
      { location: './service/prompt.factory', name: 'promptFactory', type: 'destruct' },
      { location: './filter/postfix.filter', name: 'postfixFilter', type: 'destruct' }
    ];

    let [prompt, postfix] = linkAnalyzeStream(componentInstanceReference, componentAccessToken);

    prompt.should.eql({
      name: 'promptFactory',
      token: 'bkPrompt',
      category: 'factory',
      location: './service/prompt.factory',
      type: 'destruct'
    });

    // ignore none-match reference
    postfix.should.eql(componentInstanceReference[1]);
  });

  it('should clean unnecessary stream', function () {
    let componentAccessToken = [{ token: 'bkPrompt', name: 'promptFactory', category: 'factory' }];
    let componentInstanceReference = [
      { location: './service/prompt.factory', name: 'promptFactory', type: 'destruct' },
      { location: './filter/postfix.filter', name: 'postfixFilter', type: 'destruct' }
    ];

    let pristine = cleanAnalyzeStream(linkAnalyzeStream(componentInstanceReference, componentAccessToken));

    pristine.length.should.equal(1);
  });
});
