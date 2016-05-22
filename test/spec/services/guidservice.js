'use strict';

describe('Service: guidservice', function () {

  // load the service's module
  beforeEach(module('bayesview3App'));

  // instantiate service
  var guidservice;
  beforeEach(inject(function (_guidservice_) {
    guidservice = _guidservice_;
  }));

  it('should do something', function () {
    expect(!!guidservice).toBe(true);
  });

});
