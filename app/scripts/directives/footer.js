'use strict';

angular.module('bayesview3App')
  .directive('footer', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      	 var footer = d3.select(element[0]);

      	 footer.append('div').attr('class','footer').append('p').text('Xceptionale');        
      }
    };
  });
