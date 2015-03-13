angular.module("schoolApp").controller("LoginController", ["$scope", "apiFactory", "userFactory",
	function ($scope, apiFactory, userFactory) {

		$scope.user = {
			username: "",
			password: ""
		};

		$scope.login = function () {

			if ($scope.user.username && $scope.user.password) {
				apiFactory.login($scope.user.username, $scope.user.password)
					.then(function (results) {

						if (results.status === 200) {

							userFactory.setUser(results.data.User);
							userFactory.setToken(results.data.Token);

							console.log("status 200");

						}
						// Something wrong with credentials most likely - add error for that
						else {



						}

					});
			}
			// Username and password must be filled in to attempt to login
			else {

			}

		};

	}
]);