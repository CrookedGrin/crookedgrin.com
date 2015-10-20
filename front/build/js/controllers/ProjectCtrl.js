angular.module('cg').controller('ProjectCtrl', ['$scope', '$projectService', function($scope, $projectService) {

	var projects = $projectService.getProjects().success(function(projects) {
		$scope.projects = projects;
	}).error(function(err) {
		console.log("Failed to get projects. Error: " + err);
	});

}]);