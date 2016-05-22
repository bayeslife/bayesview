'use strict';

/**
 * @ngdoc service
 * @name bayesview3App.guidservice
 * @description
 * # guidservice
 * Service in the bayesview3App.
 */
angular.module('bayesview3App')
  .service('guidservice', function () {
    

   return {
   	 createGuid: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
  }});

