'use strict';

describe('Service: dataservice', function () {

  // load the service's module
  beforeEach(module('bayesview3App'));

  // instantiate service
  var dataservice;
  beforeEach(inject(function (_dataservice_) {
    dataservice = _dataservice_;
  }));

  it('should do something', function () {
    expect(!!dataservice).toBe(true);
  });

});
