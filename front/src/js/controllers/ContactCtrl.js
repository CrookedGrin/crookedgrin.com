angular.module('cg').controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.submit = function() {
		return $http.post('/contact', {'name':'Michael Daross'});
	}

}]);