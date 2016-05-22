'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  
beforeEach(module('bayesview3App', function ($provide) {
 var noop = function(){
          return {
            success: function(f){
              //f(null);
              return this;              
            },
            finally: function(f){
              //f();
            }
          }
        };

  var mockDataService = {
     getDataSets: noop,
     getCapabilities: noop,
     getHypothesises: noop,        
     setCorrelations: noop,
     getCorrelations: noop,
     getConsiderations: noop,
     getDecisions: noop
    };

    $provide.value("dataservice",mockDataService);  
}));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('ProblemCtrl', {
      $scope: scope
    });

    scope.awesomeThings = [1,2,3];


  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
