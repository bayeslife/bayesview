'use strict';

/**
 * @ngdoc overview
 * @name bayesview3App
 * @description
 * # bayesview3App
 *
 * Main module of the application.
 */
angular
  .module('bayesview3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/problems.html',
        controller: 'ProblemsCtrl'
      })
      .when('/problem/:dataset', {
        templateUrl: 'views/problem.html',
        controller: 'ProblemCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
