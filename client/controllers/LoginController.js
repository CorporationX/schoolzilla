angular.module("schoolApp").controller("LoginController", ["$scope", "$location", "apiFactory", "userFactory",
	function ($scope, $location, apiFactory, userFactory) {

		$scope.user = {
			username: "",
			password: ""
		};

<<<<<<< Updated upstream
		$scope.errors = [];
=======
		$scope.error = {
			available: false,
			empty: false
		};
>>>>>>> Stashed changes

		$scope.login = function () {

			if ($scope.user.username && $scope.user.password) {
				apiFactory.login($scope.user.username, $scope.user.password)
					.then(function (results) {
<<<<<<< Updated upstream

						console.log("LoginController results", results);

=======
>>>>>>> Stashed changes
						if (results.status === 200) {

							userFactory.setUser(results.data.User);
							userFactory.setToken(results.data.Token);

							if (results.data.User.Role === "student") {
								$location.path("/student/home");
							}

						}
						// Something wrong with credentials most likely - add error for that
						else {

<<<<<<< Updated upstream
=======
							$scope.error.available = true;
							console.log("error available = true");

>>>>>>> Stashed changes
						}

					});
			}
<<<<<<< Updated upstream
=======
			// Username and password must be filled in to attempt to login
			else {
				$scope.error.available = true;
			}
>>>>>>> Stashed changes

		};

	}
]);