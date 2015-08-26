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

angular.module('ionapp.controllers', []).controller('ComListController', ['$scope', 'Comment', function ($scope, Comment) {

    Comment.getAll().success(function (data) {
        $scope.items = data.results; // ok

    });

    $scope.onItemDelete = function (item) {
        Comment.delete(item.objectId);
        $scope.items.splice($scope.items.indexOf(item), 1);
    }

}]).controller('ComCreateController', ['$scope', 'Comment','Camera','$state', function ($scope, Camera,Comment, $state) {

    $scope.takePicture = function(){
    /////////////////////////////////////////////////////////////////////////////////
        /* navigator.camera.getPicture( cameraSuccess, cameraError, [ cameraOptions ] )
        Takes a photo using the camera, or retrieves a photo from the device's image gallery.
        The image is passed to the success callback as a base64-encoded String,
        or as the URI for the image file. The method itself returns a
        CameraPopoverHandle object that can be used to reposition the file selection popover.*/
    /////////////////////////////////////////////////////////////////////////////////
        Camera.DestinationType = {
            DATA_URL : 0,      // Return image as base64-encoded string
            FILE_URI : 1,      // Return image file URI
            NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
        };
        Camera.PictureSourceType = {
            PHOTOLIBRARY : 0,
            CAMERA : 1,
            SAVEDPHOTOALBUM : 2
        };

        Camera.EncodingType = {
            JPEG : 0,               // Return JPEG encoded image
            PNG : 1                 // Return PNG encoded image
        };

        navigator.camera.getPicture(function(imageURI){

                // imageURI is the URL of the image that we can use for
                // an <img> element or backgroundImage.
                $scope.picture =  imageURI;


            }, function(err) {

                // Ruh-roh, something bad happened

            },
            {   quality : 75,
                destinationType : 2,
                sourceType : 1,
                allowEdit : true,
                encodingType: 0,
                targetWidth: 300,
                targetHeight: 100,
                saveToPhotoAlbum: false ,
            });

    };

    //$scope.Comment = {};
    //
    //$scope.create = function () {
    //
    //
    //    /*The argument to the method Comment.create()
    //     is an object which is serialized and sent as JSON request body*/
    //    Comment.create(
    //        {
    //            content: $scope.Comment.content
    //        }
    //
    //    ).success(function (data) {
    //        $state.go('slidemenu.comments');
    //    });
    //}




}]).controller('ComEditController', ['$scope', 'Comment', '$state', '$stateParams', function ($scope, Comment, $state, $stateParams) {

    $scope.Comment = { id: $stateParams.id, content: $stateParams.content };

    $scope.edit = function () {
        Comment.edit($scope.Comment.id, { content: $scope.Comment.content }).success(function (data) {
            $state.go('slidemenu.comments');
        });
    }


}]).controller('HomeStatusController', ['$scope', '$state', function ($scope, $state) {

    ///////////////////////////////////////////////////////////////////
    // TODO
    // check local storage object facebook if ok "go page home" else go "login page"
    ///////////////////////////////////////////////////////////

    /*$scope.check = function(){
    console.log('Check status FB')
    };
    if (!window.cordova) {
        /!*facebookConnectPlugin.browserInit('1379299842395038');*!/
        console.log('browserInit FB');

    }
    facebookConnectPlugin.getLoginStatus();*/


    

}]).controller('LoginController', ['$scope', '$state', function ($scope, $state) {


    $scope.Login = function () {
        ////////////////////////////////////////////////////////
        // PROMISE JS WTF
        ////////////////////////////////////////////////////
        var fbLogged = new Parse.Promise();

        var fbLoginSuccess = function (response) {
            if (!response.authResponse) {
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

        var fbLoginError = function (error) {
            fbLogged.reject(error);
        };

        fbLogged.then(function (authData) {

            return Parse.FacebookUtils.logIn(authData);
        })
            .then(function (userObject) {
                facebookConnectPlugin.api('/me', null,
                    function (response) {
                        console.log(response);
                        userObject.set('name', response.name);
                        userObject.set('email', response.email);
                        userObject.save();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
                $state.go('slidemenu.comments');
            }, function (error) {
                console.log(error);
            });

       /* var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;*/
        if (window.cordova) {
                ////////////////////////////////////////////////////////////
                // LOGIN APP
                ///////////////////////////////////////////////////////////
                console.log('Login');
                facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);


            }
            else {
            // Web page

            ////////////////////////////////////////////////////////
            // LOGIN WEB
            ////////////////////////////////////////////////////
            facebookConnectPlugin.browserInit('1379299842395038');
            facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);

        };

    };



}]).controller('LogoutController', ['$scope', '$state', function ($scope, $state) {

    ////////////////////////////////////////////////////////
    // PROMISE JS WTF
    ////////////////////////////////////////////////////
    var fblogout = new Parse.Promise();

    var fblogoutsucess = function (response) {

        fblogout.resolve(response);
    };
    var flogouterror = function (error) {
        console.log(error);
        fblogout.reject(error);
    };
    ////////////////////////////////////////////
    // LOGOUT
    // TODO
    ////////////////////////////////////////////

    facebookConnectPlugin.logout(fblogoutsucess, flogouterror);
    console.log("logout");
    Parse.User.logOut();
    $state.go('login');
    /*var logout = function () {
        facebookConnectPlugin.logout(
            function (response) { alert(JSON.stringify(response)) },
            function (response) { alert(JSON.stringify(response)) });
    }*/


}]).controller('SlideController', ['$scope', '$state', '$ionicSideMenuDelegate', function ($scope, $scope, $ionicSideMenuDelegate) {

    /*$ionicSideMenuDelegate
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
*/

}]);


