describe('angular-boilerplate-webpack postfix filter ', function () {
  var bkPostfix;
  
  beforeEach(angular.mock.module('AppMirror'));
  
  beforeEach(inject(function (_$filter_) {
    bkPostfix = _$filter_('bkPostfix');
  }));
  
  it('should add postfix after text', function () {
    var origin = 'hello world';
    expect(bkPostfix(origin)).toEqual(origin);
    expect(bkPostfix(origin, '!')).toEqual(origin + '!');
  });
  
  afterEach(function () {
    
  });
});
