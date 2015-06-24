/**
 * Created by test on 07/03/2015.
 */
angular.module('ionapp.services',[]).factory('Comment',['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS){

   /* All API access is over HTTPS, and accessed via the https://api.parse.com domain.
    The relative path prefix /1/ indicates that we are currently using version 1 of the API.

    /1/classes/<className> 	POST 	Creating Objects
    /1/classes/<className>/<objectId> 	GET 	Retrieving Objects
    /1/classes/<className>/<objectId> 	PUT 	Updating Objects
    /1/classes/<className> 	GET 	Queries
    /1/classes/<className>/<objectId> 	DELETE 	Deleting Objects

    */
    return {

        getAll:function(){
            return $http.get('https://www.parse.com/1/classes/comment',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
                }
            });
        },


        get:function(id){
            return $http.get('https://www.parse.com/1/classes/comment/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
                }
            });
        },

        create:function(data){
            return $http.post('https://www.parse.com/1/classes/comment',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },

        edit:function(id,data){
            return $http.put('https://www.parse.com/1/classes/comment/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },

        delete:function(id){
            return $http.delete('https://www.parse.com/1/classes/comment/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}]).value('PARSE_CREDENTIALS',{
    APP_ID: 'Wz2ZU7eF3Fur7hp9SIhigKRwCJDC2cQRo3arGWGP',
    REST_API_KEY: 'ZsCQMHOwerQN1uIzsOwugl6PnuhqpzdyqXOhhG3F'
});


