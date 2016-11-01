//ROUTES
delone.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/homepage.html',
		controller: 'mainController'
	})
	.when('/events', {
		templateUrl: 'views/events.html',
		controller: 'eventController'
	})
});