angular.module('gemhome', ['ionic', 'gemHome.controllers', 'gemHome.services'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: "/auth",
        abstract: true,
        templateUrl: "templates/auth.html"
      })
      .state('auth.signin', {
        url: '/signin',
        views: {
          'auth-signin': {
            templateUrl: 'templates/auth-signin.html',
            controller: 'SignInCtrl'
          }
        }
      })
      .state('auth.signup', {
        url: '/signup',
        views: {
          'auth-signup': {
            templateUrl: 'templates/auth-signup.html',
            controller: 'SignUpCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/auth/signin');
  });
