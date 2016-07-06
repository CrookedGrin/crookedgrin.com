angular.module('cg').controller('ProjectCtrl', ['$scope', '$rootScope', '$projectService', function($scope, $rootScope, $projectService) {

	$rootScope.currState = "projects";

	var projects = $projectService.getProjects().success(function(projects) {
		angular.forEach(projects, function(project) {
			project.tagsDisplay = project.tags.join(', ');
		});
		$scope.projects = projects;
		$scope.dataLoaded = true;
	}).error(function(err) {
		console.log("Failed to get projects. Error: " + err);
	});
		
	$scope.toggleLayout = function(which) {
		if (which) {
			$scope.layoutClass = which;
		} else {
			$scope.layoutClass = ($scope.layoutClass == "list-layout") ? "grid-layout" : "list-layout"; 
		}
	}
	$scope.toggleLayout('list-layout');

	$scope.filterFxn = function(item) {
		debugger;
		if (!$scope.filterQuery || 
			(item.name.toLowerCase().indexOf($scope.filterQuery) != -1) || 
			(item.tags.toString().toLowerCase().indexOf($scope.filterQuery) != -1)) {
				return true;
			}
		return false;
	}


}]);