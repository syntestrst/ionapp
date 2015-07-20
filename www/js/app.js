// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCookies', 'ngCordova', 'ionapp.controllers', 'ionapp.services','ionapp.constants'])


    // Use this method to register work which should be performed
    // when the injector is done loading all modules.
    .run(function ($rootScope, $ionicPlatform, $cookieStore, $state, facebookAppId) {

        ////////////////////////////////////////////////////////
        // Device Plugin injected by ionic ho yeah.
        ////////////////////////
        $ionicPlatform.ready(function() {


            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

        });
        ///////////////////////////////////////////////////////////////////
        //// https://docs.angularjs.org/api/ng/service/$rootScope
        /////////////////////////////////
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

            if(toState.data.require && !Parse.User.current()) {
                $state.transitionTo("login");
                event.preventDefault();
            }
            });

    }).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        //DISABLE ALL CACHE
        $ionicConfigProvider.views.maxCache(0);
        $stateProvider

            //
            .state('/HomeStatusController', {
                url: "/HomeStatusController",
                controller: 'HomeStatusController',
                data: {
                    require: true,
                },

            }).state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: 'LoginController',
                data: {
                    require: false
                },

            }).state('logout',{
                /*url : '/logout',*/
                controller: 'LogoutController',
                data: {
                    require: false
                },

            })
            .state('slidemenu', {
                abstract: true,
                url: '/slidemenu',
                controller: 'SlideController',
                templateUrl: 'views/slide.html',
                data: {
                    require: false
                },
            })
            .state('slidemenu.comments', {
                url: '/comments',
                controller: 'ComListController',
                templateUrl: 'views/comments.html',
                data: {
                    require: false
                },

            }).state('createComment', {
                url: '/comment/new',
                controller: 'ComCreateController',
                templateUrl: 'views/create-comments.html',
                data: {
                    require: false
                },

            }).state('editcomment', {
                url: '/comment/edit/:id/:content',
                controller: 'ComEditController',
                templateUrl: 'views/edit-comment.html',
                /*cache: false // system de cache de ionic.*/
                data: {
                    require: false
                },

            });
        // default route
        $urlRouterProvider.otherwise("/HomeStatusController");

    });
    /*.config(["$cordovaFacebook", function ($cordovaFacebook, facebookAppId) {
        // This is only required for the JavaScript API
        $cordovaFacebookProvider.setAppID(facebookAppId, "v2.0");
    }]);*/