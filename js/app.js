"use strict";

angular.module('comments', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'Gnof20Wxl9tdvHs9egtTuwQfTwayCfMv7D3RxzOH';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'xtjURjyX6j2kQ6tnbp20VBzBBLRlbv5htINL3WJN';
    })

 .controller('pullComment', function($scope, $http) {
        $scope.loadComments = function() {
            $scope.loading = true; 
            $http.get('https://api.parse.com/1/classes/comments') 
                    .success(function(data){
                    $scope.comments = data.results; 
                        console.log("success"); 
                    })
                    .error(function(err) {
                        console.log(err); 
                        //notify the user in some way
                    })
                    .finally(function() {
                        $scope.loading = false; 
                });
        }; 
        $scope.loadComments();
        $scope.newComment = {vote: 0};

        $scope.addComment = function(comment) { 
        $scope.inserting = true; //for spinner 
            $http.post('https://api.parse.com/1/classes/comments', comment)
                .success(function(responseData) {
                    comment.objectID = responseData.objectId; 
                    $scope.comments.push(comment);
                    $scope.newComment={done:false}; 

                    $scope.rateChange($scope.newComment,0); 
                    $scope.newComment={};
                    
                })
    
                .error(function(err) {
                    console.log(err);

                })
                .finally(function() {
                 $scope.inserting = false;
                });
              

            //wrap everything into a function 
            $http.put('https://api.parse.com/1/classes/comments/' + comment.objectId,rateChange )
                .success(function(responseData){
                    $scope.refreshTasks();

                })
                .error(function(err) {
                    console.log(err); 
                })
            }
        $scope.delete = function(comment) {
            $http.delete('https://api.parse.com/1/classes/comments/' + comment.objectId, comment)
                .finally(function() {
                    $scope.loadComments();
                });
        };
    }); 
