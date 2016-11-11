describe('angular-boilerplate-webpack prompt service', function () {
  var bkPrompt;
  
  beforeAll(function () {
  });
  
  beforeEach(angular.mock.module('AppMirror'));
  
  beforeEach(inject(function (_bkPrompt_) {
    bkPrompt = _bkPrompt_;
  }));
  
  it('should validate error structure', function () {
    var origin = {success: false, errorDesc: 'system error'}
      , abnormal = {success: true, errorDesc: ''};
    
    expect(bkPrompt.isValidPrompt(origin)).toBeTruthy();
    expect(bkPrompt.isValidPrompt(abnormal)).toBeFalsy();
  });
  
  it('should escape illegal characters', function () {
    var origin = {errorDesc: '<p class="text-info"></p>'};
    expect(bkPrompt.escapeValidPrompt(origin)).toEqual('&lt;p class=&quot;text-info&quot;&gt;&lt;/p&gt;');
  });
  
  afterEach(function () {
    
  });
});
