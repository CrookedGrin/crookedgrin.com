angular.module('cg').controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.submit = function(formData) {
		return $http.post('/contact', formData).then(function(response) {
			console.log('Success: ' + response);
			if (response.status == 200) {
				$scope.emailSent = true;
			}
		}, function(response) {
			console.log('Error: ' + response)
		});
	}

}]);