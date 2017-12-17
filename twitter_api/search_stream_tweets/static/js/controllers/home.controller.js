app.controller("SearchController", ["$scope", "$window", "$http", function($scope, $window, $http){
        $scope.search = "";
        $scope.user = "";
        $scope.description = "";
        $scope.location = "";

        $scope.tweets = "";

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

        $scope.convertArrayOfObjectsToCSV = function(args){  
                var result, ctr, all_keys, columnDelimiter, lineDelimiter, data;

                data = args.data || null;
                if (data == null || !data.length) {
                        console.log("A")
                        return null;
                }

                columnDelimiter = args.columnDelimiter || ',\t';
                lineDelimiter = args.lineDelimiter || '\n';

                var keys = ['User', 'Text', 'Location', 'Created At', 'Likes', 'Followers']

                result = '';
                result += keys.join(columnDelimiter);
                result += lineDelimiter;
                data.forEach(function(item) {
                        if (ctr > 0) result += columnDelimiter;
                        result += item.user.screen_name;
                        result += columnDelimiter;
                        result += item.text;
                        result += columnDelimiter;
                        result += item.user.location;
                        result += columnDelimiter;
                        result += item.created_at;
                        result += columnDelimiter;
                        result += item.user.favourites_count;
                        result += columnDelimiter;
                        result += item.user.followers_count;
                        result += lineDelimiter;
                });
                return result;
        };

        $scope.exportTweets = function(){
                var data, filename, link;

                var csv = $scope.convertArrayOfObjectsToCSV({
                    data: $scope.tweets
                });

                if (csv == null) return;

                filename = 'tweets.csv';

                if (!csv.match(/^data:text\/csv/i)) {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                }
                data = encodeURI(csv);

                link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename);
                link.click();
        }       
}]);