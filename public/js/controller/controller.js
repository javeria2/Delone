//CONTROLLER

// home page controller
delone.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

//events page controller
delone.controller('eventController', ['$scope', '$http', function($scope, $http){
	$scope.loadEvents = function(response){
		$scope.events = response;
	}

	$scope.all = function() {
		$http.get('/events').success($scope.loadEvents);
	}

	$scope.all();
}]);
