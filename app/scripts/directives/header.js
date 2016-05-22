'use strict';

angular.module('bayesview3App')
  .directive('header', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
            val: '='            
        },
      link: function postLink(scope, element, attrs) {

      	 var header = d3.select(element[0]);

      	 var headerDiv = header.append('div').attr('class','header');

      	 var menus = headerDiv.append('ul').attr('class','nav nav-pills pull-right');

      	 //var menuData = [ "Home","About","Contact"];
         var menuData = [ "Home","About"];

      	 var lis = menus.selectAll('li').data(menuData).enter().append('li').attr('class',function(d){
      	 	return d==='Home' ? 'active' : '';
      	 });

      	 lis.append('a').attr('ng-href','#').text(function(d){
      	 	return d;
      	 })

         scope.$watch('val', function (newVal, oldVal) {

            if(!newVal)
              return;
        	 
           headerDiv.append('h3').attr('class','text-muted').text(newVal);
          });
      }
    };
  });
