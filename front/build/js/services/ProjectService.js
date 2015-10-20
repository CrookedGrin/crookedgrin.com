angular.module('cg').service('$projectService', ['$http', function($http) {

	this.getProjects = function() {
		return $http.get('/api/projects');
	}

}])