// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCookies', 'ionapp.controllers','ionapp.services','ionapp.oauthapp'])

    // Use this method to register work which should be performed
    // when the injector is done loading all modules.
.run(function($rootScope, $ionicPlatform, $cookieStore, $state) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                //cordova.plugins.inappbrowser.inappbrowser(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }


        });
      /* $rootScope.$on('$stateChangeStart', function (event, next, current){
                var userInfo = $cookieStore.get('userInfo');
                if (!userInfo) {
                    // user not logged in | redirect to login
                    if (next.name !== "login") {
                        // not going to #login, we should redirect now
                        event.preventDefault();
                        $state.go('login');
                    }
                } else if (next.name === "login") {
                    event.preventDefault();
                    $state.go('dashboard');
                }

            });*/
alert('test');

}).config(function($stateProvider, $urlRouterProvider){

       $stateProvider

           //
         .state('login', {
           url: "/login",
           templateUrl: "views/login.html",
           controller: 'LoginCtrl',
           cache: false // system de cache de ionic.

        }).state('dashboard', {
           url: "/dashboard",
           templateUrl: "views/dashboard.html",
           controller: "dashboardCtrl",
           cache: false

        }).state('comments',{
           url:'/comments',
           controller: 'ComListController',
           templateUrl: 'views/comments.html',
           cache: false // system de cache de ionic.

       }).state('createComment',{
           url:'/comment/new',
           controller: 'ComCreateController',
           templateUrl: 'views/create-comments.html'

       }).state('editcomment',{
           url:'/comment/edit/:id/:content',
           controller: 'ComEditController',
           templateUrl: 'views/edit-comment.html'

       });
        // default route
       $urlRouterProvider.otherwise("login");

});

