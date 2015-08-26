// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionapp.controllers', 'ionapp.services','ionapp.constants'])


    // Use this method to register work which should be performed
    // when the injector is done loading all modules.
    .run(function ($rootScope, $ionicPlatform, $state) {

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
        //// State Change Events
        //// https://docs.angularjs.org/api/ng/service/$rootScope
        //// https://github.com/angular-ui/ui-router/wiki
        //// https://parse.com/docs/js/guide#users
        //// Whenever you use any signup or login methods, the user is cached in localStorage.
        //// You can treat this cache as a session, and automatically assume the user is logged in
        /////////////////////////////////
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            var tostatev = toState.data.requireLogin
            if( tostatev && !Parse.User.current()) {
               event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error*/
                $state.transitionTo('login');
                /*console.log(event.name);
                console.log(toState.name);*/

            }
            });

    }).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        //DISABLE ALL CACHE
        // $ionicConfigProvider.views.maxCache(0);


        // BEGIN STATE
        $stateProvider

            //
            .state('/HomeStatusController', {
                url: "/HomeStatusController",
                templateUrl: 'views/home-status.html',
                controller: 'HomeStatusController',
                data: {
                    requireLogin: true
                }

            }).state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: 'LoginController',
                data: {
                    requireLogin: false
                }

            }).state('logout',{
                /*url : '/logout',*/
                controller: 'LogoutController',
                data: {
                    requireLogin: false
                }

            })
            .state('slidemenu', {
                abstract: true,
                url: '/slidemenu',
                controller: 'SlideController',
                templateUrl: 'views/slide.html',
                data: {
                    requireLogin: true
                }
            })
            .state('slidemenu.comments', {
                url: '/comments',
                controller: 'ComListController',
                templateUrl: 'views/comments.html',
                data: {
                    requireLogin: true
                }

            }).state('createComment', {
                url: '/comment/new',
                controller: 'ComCreateController',
                templateUrl: 'views/create-comments.html',
                data: {
                    requireLogin: true
                }

            }).state('editcomment', {
                url: '/comment/edit/:id/:content',
                controller: 'ComEditController',
                templateUrl: 'views/edit-comment.html',
                /*cache: false // system de cache de ionic.*/
                data: {
                    requireLogin: true
                }

            });
        // default route
        // call url not state
        // replace . /
        $urlRouterProvider.otherwise("/slidemenu/comments");

    });
