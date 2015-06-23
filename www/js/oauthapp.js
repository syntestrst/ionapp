// create a new module
angular.module('ionapp.oauthapp', ['ngOpenFB']).controller('LoginCtrl', function ($scope, ngFB, $state, $cookieStore) {

    /**
     * SOCIAL LOGIN
     * Facebook and Google
     */
        $scope.fbLogin = function () {
            ngFB.login(
                {scope: 'email,' +
                'read_stream,' +
                'publish_actions'
                }).then(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');
                       $state.go('comments');
                    } else {
                        /*alert('Facebook login failed');
                        console.log('Facebook login failed');*/
                    }
                });
        };

});