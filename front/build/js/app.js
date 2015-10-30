var app = angular.module('cg', ['ngRoute', 'ngAnimate']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'MainCtrl'
		})
		.when('/projects', {
			templateUrl: 'partials/projects.html',
			controller: 'ProjectCtrl'
		});

	$locationProvider.html5Mode(true);

}]);

app.controller('MainCtrl', ['$scope', function($scope) {
	$scope.msg = "Hi dude"
}]);




