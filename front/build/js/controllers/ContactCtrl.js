angular.module('cg').controller('ContactCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

	$rootScope.currState = "contact";

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

	$scope.checkDisabled = function(contact) {
		if (contact.email.$invalid) {
			return true;
		}
	}

}]);