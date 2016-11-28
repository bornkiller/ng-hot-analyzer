/**
 * @description - analyze export implement cases
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');
const analyzeExportInstance = require('../src/export');

describe('ng-hot-analyze export', function () {
  it('analyze export controller declare', function () {
    const collectionControllerTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'controller', 'collection.controller.js'), {encoding: 'utf8'});
    const showcaseControllerTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'controller', 'showcase.controller.js'), {encoding: 'utf8'});

    analyzeExportInstance(collectionControllerTemplate).should.equal('CollectionController');
    analyzeExportInstance(showcaseControllerTemplate).should.equal('ShowcaseController');
  });

  it('analyze export function declare', function () {
    const promptFactoryTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'service', 'prompt.factory.js'), {encoding: 'utf8'});
    const analyzerFactoryTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'service', 'analyzer.factory.js'), {encoding: 'utf8'});

    analyzeExportInstance(promptFactoryTemplate).should.equal('promptFactory');
    analyzeExportInstance(analyzerFactoryTemplate).should.equal('analyzerFactory');
  });

  it('analyze export nothing declare', function () {
    const shareModuleTemplate = fs.readFileSync(path.resolve(__dirname, 'fixture', 'share.module.js'), { encoding: 'utf8' });

    analyzeExportInstance(shareModuleTemplate).should.be.false();
  });
});
