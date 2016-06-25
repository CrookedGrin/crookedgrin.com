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
		})
		.when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
		})
		.when('/skillset', {
			templateUrl: 'partials/skillset.html',
			controller: 'SkillsetCtrl'
		});

	$locationProvider.html5Mode(true);

}]);

app.controller('MainCtrl', ['$scope', function($scope) {
	$scope.msg = "Hi dude!"
}]);




