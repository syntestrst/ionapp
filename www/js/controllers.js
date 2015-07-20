/**
 * Created by test on 08/03/2015.
 * $scope is special object designed to allow communication between controller and the view. All variables
 * available on view side are available on $scope in controller, and all values set on $scope we can access in view.
 *
 * The simplest controller is just a function. All arguments are interpreted by dependency injection mechanism.
 * So when we define argument named $scope,
 * we will get new scope created for that controller. Any typo here will break the script.
 *
 *
 *
 */

angular.module('ionapp.controllers',[]).controller('ComListController',['$scope','Comment',function($scope, Comment){

    Comment.getAll().success(function(data){
        $scope.items=data.results; // ok

    });

    $scope.onItemDelete=function(item){
        Comment.delete(item.objectId);
        $scope.items.splice($scope.items.indexOf(item),1);
    }

}]).controller('ComCreateController',['$scope', 'Comment','$state',function($scope, Comment, $state){

    $scope.Comment={};

    $scope.create=function(){
        /*The argument to the method Comment.create()
         is an object which is serialized and sent as JSON request body*/

        Comment.create(
            {
            content:$scope.Comment.content
        }

        ).success(function(data){
        $state.go('comments');
        });
    }

}]).controller('ComEditController',['$scope', 'Comment','$state', '$stateParams', function($scope,Comment,$state,$stateParams){

    $scope.Comment={id:$stateParams.id,content:$stateParams.content};

    $scope.edit=function(){
        Comment.edit($scope.Comment.id,{content:$scope.Comment.content}).success(function(data){
            $state.go('slidemenu.comments');
        });
    }


}]).controller('HomeStatusController',['$scope','$state' ,function($scope,$state) {

    /*$scope.check = function(){
    console.log('Check status FB')
    };
    if (!window.cordova) {
        /!*facebookConnectPlugin.browserInit('1379299842395038');*!/
        console.log('browserInit FB');

    }
    facebookConnectPlugin.getLoginStatus();*/







}]).controller('LoginController', ['$scope','$state',function ($scope, $state) {
    ////////////////////////////////////////////////////////
    // PROMISE JS WTF
    ////////////////////////////////////////////////////
    var fbLogged = new Parse.Promise();

    var fbLoginSuccess = function(response) {
        if (!response.authResponse){
            fbLoginError("Cannot find the authResponse");
            return;
        }
        var expDate = new Date(
            new Date().getTime() + response.authResponse.expiresIn * 1000
        ).toISOString();

        var authData = {
            id: String(response.authResponse.userID),
            access_token: response.authResponse.accessToken,
            expiration_date: expDate
        }
        fbLogged.resolve(authData);
        console.log(response);
    };

    var fbLoginError = function(error){
        fbLogged.reject(error);
    };

    ////////////////////////////////////////////////////////////
    // LOGIN
    ///////////////////////////////////////////////////////////
            $scope.Login = function() {

                console.log('Login');
                if (!window.cordova) {
                    /* console.log('Promised');
                     Parse.FacebookUtils.init({ // this line replaces FB.init({
                     appId: '1379299842395038', // Facebook App ID
                     status: false,  // check Facebook Login status
                     cookie: true,  // enable cookies to allow Parse to access the session
                     xfbml: true,  // initialize Facebook social plugins on the page
                     version: 'v2.3' // point to the latest Facebook Graph API version
                     });*/
                    facebookConnectPlugin.browserInit('1379299842395038');
                }
                facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);

                fbLogged.then( function(authData) {

                    return Parse.FacebookUtils.logIn(authData);
                })
                    .then( function(userObject) {
                        facebookConnectPlugin.api('/me', null,
                            function(response) {
                                console.log(response);
                                userObject.set('name', response.name);
                                userObject.set('email', response.email);
                                userObject.save();
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                        $state.go('comments');
                    }, function(error) {
                        console.log(error);
                    });
            };



}]).controller('LogoutController',['$scope', '$state', function($scope,$state){

    ////////////////////////////////////////////////////////
    // PROMISE JS WTF
    ////////////////////////////////////////////////////
    var fblogout = new Parse.Promise();

    var  fblogoutsucess = function(response){

        fblogout.resolve(response);
    };
    var flogouterror = function(error){

        fblogout.reject(error);
    };
    ////////////////////////////////////////////
    // LOGOUT
    ////////////////////////////////////////////

    facebookConnectPlugin.logout(fblogoutsucess,flogouterror);

    fblogout.then(function(){
        console.log('you are logout and redirect to login page');
        $state.go('login');
    },function(error){
        console.log(error);
    })
    /*;fblogoutsucess = function(){
        console.log('you are logout and redirect to login page');
        $state.go('login');
    };
    flogouterror = function(){
    console.log(flogouterror);
    }*/
    /*var logout = function () {
        facebookConnectPlugin.logout(
            function (response) { alert(JSON.stringify(response)) },
            function (response) { alert(JSON.stringify(response)) });
    }*/


}]).controller('SlideController',['$scope','$state','$ionicSideMenuDelegate',function($scope, $scope,$ionicSideMenuDelegate){

    /*$ionicSideMenuDelegate
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
*/

}]);


