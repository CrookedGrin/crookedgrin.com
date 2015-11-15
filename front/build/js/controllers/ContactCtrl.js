angular.module('cg').controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.submit = function(formData) {
		return $http.post('/contact', {'name':formData.name});
	}

}]);