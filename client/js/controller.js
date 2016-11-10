//CONTROLLER

// home page controller
delone.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

delone.controller('navBarController', ['$rootScope', '$http', '$location', '$scope', function($rootScope, $http, $location, $scope){
    $scope.logout = function() {
        $http.get('/logout').success(function(res){
            $rootScope.user = null;
            $location.url('/auth');
        });
    }
}]);

//events page controller
delone.controller('eventController', ['$rootScope','$scope', '$http', '$location', function($rootScope, $scope, $http, $location){
	$scope.loadEvents = function(response){
		$scope.events = response;
	}

	$scope.all = function() {
		$http.get('/events').success($scope.loadEvents);
	}

    $scope.route = function(){
        $location.path('/events/' + $scope.events._id);
    }

	$scope.all();
}]);

// new events controller
delone.controller('newEventController', ['$rootScope','$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {
    //add a new event to the database
    
    $scope.addEvent = function() {
        var newEvent = {
            event_name : $scope.event_name,
            place : $scope.chosenPlace,
            latitude: $scope.latitude,
            longitude: $scope.longitude,
            date : $scope.date,
            time : $scope.time,
            count : $scope.count,
            msg : $scope.msg,
            img : $scope.img,
            author: {
                id: $rootScope.user._id,
                username: $rootScope.user.username,
                img: $rootScope.user.img
            }
        }
        $http.post('/events', newEvent).success(function(response) {
            $location.path('/events');
        });
    }

    //set default options
    var options = {
        center: new google.maps.LatLng(40.7127837, -74.00594130000002),
        zoom: 13,
        disableDefaultUI: true    
    }

    //initialize map
    this.map = new google.maps.Map(
        document.getElementById("map"), options
    );
    this.places = new google.maps.places.PlacesService(this.map);

    $scope.gPlace;

    //add new place and marker to the map
    $scope.updateMap = function () {
        var place = $scope.gPlace.getPlace();

        $scope.latitude = place.geometry.location.lat();
        $scope.longitude = place.geometry.location.lng();
        var formatted_address = place.formatted_address;

        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
        
        this.map.center.latitude = $scope.latitude;
        this.map.center.longitude = $scope.longitude;
        this.map.zoom = 15;

        var myLatlng = new google.maps.LatLng($scope.latitude, $scope.longitude);

        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: myLatlng,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(myLatlng);
    };
}]);

//controller to show event information
delone.controller('eventInfoController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location){
    var url = $location.path();
    $http.get(url).success(function(response) {
        $scope.event = response;
        var options = {
            center: new google.maps.LatLng($scope.event.latitude, $scope.event.longitude),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        var myLatlng = new google.maps.LatLng($scope.event.latitude, $scope.event.longitude);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: myLatlng,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(myLatlng);
    });
    


    $scope.comment = '';
    $scope.showComment = [];

    $scope.submitComment = function(){
        n = new Date();
        var comment = {
            text: $scope.comment,
            author: $rootScope.user,
            date: n.toLocaleString('en-US')
        }
        $http.post(url + '/comments', comment).success(function(res){
            $scope.showComment.push(comment);
            $scope.comment = '';
        });
    }
}]);

//controller for user auth
delone.controller('authController', ['$rootScope','$scope', '$http','$location', 'AVATARS', function($rootScope, $scope, $http, $location, AVATARS){
    $scope.buttonText = 'login';
    $('#about-me').hide();

    //get random integer between min and max with min inclusive
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $scope.authenticate = function(){
        if($scope.buttonText === 'login') {
            var user = {
                username: $scope.username,
                password: $scope.password
            }
            $http.post('/login', user).success(function(user){
                $rootScope.user = user;
                $location.url('/events');
            });
        } else if($scope.buttonText === 'signup') {
            var user = {
                username: $scope.username,
                password: $scope.password,
                about: $scope.about,
                img: AVATARS.urls[getRandomInt(0, 10)]
            } 
            $http.post('/signup', user).success(function(user){
                $rootScope.user = user;
                $location.url('/events');
            });
        }
    }
    $scope.changeBtText = function() {
        $scope.buttonText = 'signup';
        $('#about-me').show();
    }
    $scope.loginText = function() {
        $scope.buttonText = 'login';
        $('#about-me').hide();
    }
    $scope.showPassword = function() {
        var control = $('#test5');
        var obj = document.getElementById('password');
        if(control.is(':checked')) {
            obj.type = "text";
        } else {
            obj.type = "password";
        }
    }
}]);    