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
            $state.go('comments');
        });
    }


}]);


