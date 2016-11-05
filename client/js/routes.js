//ROUTES
delone.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/homepage.html',
		controller: 'mainController'
	})
	.when('/events', {
		templateUrl: 'views/events.html',
		controller: 'eventController',
		resolve: {
			loggedin: checkLoggedIn
		}
	})
	.when('/events/new', {
		templateUrl: 'views/newEvent.html',
		controller: 'newEventController',
		resolve: {
			loggedin: checkLoggedIn
		}
	})
	.when('/events/:id', {
		templateUrl: 'views/eventInfo.html',
		controller: 'eventInfoController',
		resolve: {
			loggedin: checkLoggedIn
		}
	})
	.when('/auth', {
		templateUrl: 'views/authenticate.html',
		controller: 'authController'
	})
	.otherwise('/events')
});

function checkLoggedIn($http, $location, $q, $rootScope) {
	var deferred = $q.defer();
	$http.get('/isLoggedIn').success(function(user){
		if(user != '0'){
			$rootScope.user = user;
			deferred.resolve();
		} else {
			$rootScope.user = null;
			deferred.reject();
			$location.url('/auth');
		}
	});
	return deferred.promise;
}