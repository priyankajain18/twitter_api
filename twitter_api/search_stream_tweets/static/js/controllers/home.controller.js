app.controller("SearchController", ["$scope", "$window", "$http", function($scope, $window, $http){
        $scope.search = "";
        $scope.user = "";
        $scope.description = "";
        $scope.location = "";

        $scope.searchTweets = function(){
                $scope.extraParameters = "?search="+$scope.search+"&user="+$scope.user+"&description="+$scope.description+"&location="+$scope.location;
        	$http({
        		method: "GET",
        		url: "/api/search-tweets/"+$scope.extraParameters
        	})
        	.then(function(response){
        		$scope.tweets = response.data.tweets;
        	})
        };
}]);