app.controller("SearchController", function($scope, $http){
        $scope.searchQuery = "";

        $scope.searchTweets = function(){
        	$http({
        		method: "GET",
        		url: "/api/search-tweets/?search="+$scope.searchQuery
        	})
        	.then(function(response){
        		$scope.tweets = response.data.tweets;
        	})
        }
});