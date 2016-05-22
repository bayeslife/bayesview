'use strict';

describe('Directive: visualizeposterior', function () {

  // load the directive's module
  beforeEach(module('bayesview3App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<visualizeposterior></visualizeposterior>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the visualizeposterior directive');
  }));
});
