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
    let instanceReferenceList = [
      { location: './service/prompt.factory', name: 'promptFactory', type: 'destruct' },
      { location: './template/todo.html', name: 'todoPageTemplate', type: 'default' }
    ];

    let accessTokenList = [
      { token: 'bkPrompt', name: 'promptFactory', category: 'factory' },
      { token: 'RouteMark', name: 'todoPageTemplate', category: 'RouteTemplate' }
    ];

    let [prompt, todo] = linkAnalyzeStream(instanceReferenceList, accessTokenList);

    prompt.should.eql(Object.assign({}, instanceReferenceList[0], { token: 'bkPrompt', category: 'factory' }));
    todo.should.eql(Object.assign({}, instanceReferenceList[1], { token: 'RouteMark', category: 'RouteTemplate' }));
  });

  it('should clean unnecessary reference', function () {
    let list = [
      { token: 'bkPrompt', name: 'promptFactory', category: 'factory' },
      { location: './service/prompt.factory', name: 'promptFactory', type: 'destruct' },
      { location: './filter/postfix.filter', name: 'postfixFilter', type: 'destruct' },
      { token: 'bkPrompt', location: './filter/postfix.filter', name: 'promptFactory' }
    ];

    cleanAnalyzeStream(list).should.eql([list[3]]);
  });
});
