angular.module("schoolApp").controller("LoginController", ["$scope", "$location", "apiFactory", "userFactory",
	function ($scope, $location, apiFactory, userFactory) {

		$scope.user = {
			username: "",
			password: ""
		};

		$scope.errors = [];

		$scope.error = {
			available: false,
			empty: false
		};

		$scope.login = function () {

			if ($scope.user.username && $scope.user.password) {
				apiFactory.login($scope.user.username, $scope.user.password)
					.then(function (results) {

						console.log("LoginController results", results);
						if (results.status === 200) {

							userFactory.setUser(results.data.User);
							userFactory.setToken(results.data.Token);

							if (results.data.User.Role === "student") {
								$location.path("/student/home");
							}

						}
						// Something wrong with credentials most likely - add error for that
						else {
							$scope.error.available = true;
							console.log("error available = true");
						}

					});
			}
			// Username and password must be filled in to attempt to login
			else {
				$scope.error.available = true;
			}

		};

	}
]);