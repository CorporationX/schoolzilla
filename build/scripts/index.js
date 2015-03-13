angular.module("schoolApp", ["ngRoute"])


.config(["$routeProvider", function ($routeProvider) {

	$routeProvider.when("/login", {
			templateUrl: "/client/views/login.html",
			controller: "LoginController"
		}).when("/home", {
			templateUrl: "/client/views/home.html",
			controller: "HomeController"
		})
		.otherwise({
			redirectTo: "/login"
		});

}]);
angular.module("schoolApp").controller("HomeController", ["$scope",

	function ($scope) {



	}
]);
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
angular.module("schoolApp").directive("enterDirective", [function () {
	return {
		restrict: "A",
		scope: {
			enter: "&"
		},
		link: function (scope, elem, attrs) {

			$(elem).bind('keypress', function (e) {
				var code = e.keyCode || e.which;

				if (code == 13) {
					scope.enter();
				}

			});

		}
	};
}]);
angular.module("schoolApp").directive("focusDirective", ["$timeout", "$parse", function ($timeout, $parse) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {

			scope.$watch("focus", function (value) {

				if (value === true) {

					$timeout(function () {
						$(elem).focus();
					});

				}

			});

			scope.focus = true;

		}
	};
}]);
angular.module("schoolApp").factory("apiFactory", ["$http", function ($http) {

	return {
		login: function (username, password) {
			return $http.post("http://dispatch.ru.is/demo/api/v1/login", {
				user: username,
				pass: password
			});
		}
	};

}]);
angular.module("schoolApp").factory("httpInterceptor", ["userFactory", function (userFactory) {

	var requestIntercepter = {
		request: function (config) {

			if (userFactory.getToken()) {
				console.log("Add token header");
			}

			return config;

		}
	};

	return requestIntercepter;

}])

.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.interceptors.push("httpInterceptor");
}]);
angular.module("schoolApp").factory("userFactory", [function () {

	var user = {};
	var token = "";

	return {
		setUser: function (newUser) {
			user = newUser;
		},
		getUser: function () {
			return user;
		},
		setToken: function (newToken) {
			token = newToken;
		},
		getToken: function () {
			return token;
		}
	};

}]);