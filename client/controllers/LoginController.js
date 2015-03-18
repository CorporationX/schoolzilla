angular.module("schoolApp").controller("LoginController", ["$scope", "$location", "apiFactory", "userFactory",
	function ($scope, $location, apiFactory, userFactory) {

		$scope.user = {
			username: "",
			password: ""
		};

		$scope.submitted = false;

		$scope.errors = {
			available: false
		};

		$scope.login = function () {
			$scope.submitted = true;
			if ($scope.user.username && $scope.user.password) {
				apiFactory.login($scope.user.username, $scope.user.password)
					.then(function (results) {

						if (results.status === 200) {

							userFactory.setUser(results.data.User);
							userFactory.setToken(results.data.Token);

							if (results.data.User.Role === "student") {
								$location.path("/student/home");
							} else if (results.data.User.Role === "admin") {
								$location.path("/admin/home");
							}

						}
					}, function (results) {
						$scope.errors.available = true;
					});
			}
		};

	}
]);