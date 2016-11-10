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
	.when('/users/:id', {
		templateUrl: 'views/profile.html',
		controller: 'profileController',
		resolve: {
			loggedin: checkLoggedIn
		}
	})
	.otherwise('/events')
});

//store list of default user avatars
delone.constant('AVATARS', {
	urls: [
		"../rsrcs/imgs/1.png",
		"../rsrcs/imgs/2.png",
		"../rsrcs/imgs/3.png",
		"../rsrcs/imgs/4.png",
		"../rsrcs/imgs/5.png",
		"../rsrcs/imgs/6.png",
		"../rsrcs/imgs/7.png",
		"../rsrcs/imgs/8.png",
		"../rsrcs/imgs/9.png",
		"../rsrcs/imgs/10.png"
	]
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