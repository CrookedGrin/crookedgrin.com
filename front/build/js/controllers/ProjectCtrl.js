angular.module('cg').controller('ProjectCtrl', ['$scope', '$projectService', function($scope, $projectService) {

	var projects = $projectService.getProjects().success(function(projects) {
		angular.forEach(projects, function(project) {
			project.tagsDisplay = project.tags.join(', ');
		});
		$scope.projects = projects;
	}).error(function(err) {
		console.log("Failed to get projects. Error: " + err);
	});

}]);