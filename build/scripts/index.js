angular.module("schoolApp", ["ngRoute"])


.config(["$routeProvider", function ($routeProvider) {

	$routeProvider.when("/login", {
			templateUrl: "/client/views/login.html",
			controller: "LoginController"
		}).when("/student/home", {
			templateUrl: "/client/views/student/home.html",
			controller: "StudentHomeController"
		})
		.otherwise({
			redirectTo: "/login"
		});

}]);
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

						console.log("LoginController results", results);
						if (results.status === 200) {

							userFactory.setUser(results.data.User);
							userFactory.setToken(results.data.Token);

							if (results.data.User.Role === "student") {
								$location.path("/student/home");
							}

						}
					}, function (results) {
						$scope.errors.available = true;
					});
			}
		};

	}
]);
angular.module("schoolApp").controller("StudentHomeController", ["$scope", "apiFactory", "userFactory",

	function ($scope, apiFactory, userFactory) {

		$scope.evaluations = [];

		$scope.init = function () {
			userFactory.checkValid();
			apiFactory.studentGetEvaluations().then(function (results) {
				console.log("StudentHomeController results", results);

				$scope.evaluations = results.data;
			});
		};

		$scope.init();

	}
]);
angular.module("schoolApp").directive("enterDirective", [function () {
	return {
		restrict: "A",
		scope: {
			enter: "&"
		},
		link: function (scope, elem, attrs) {

			elem.bind('keypress', function (e) {
				var code = e.keyCode || e.which;

				if (code == 13) {
					scope.enter();
				}

			});

		}
	};
}]);
angular.module("schoolApp").directive("focusDirective", ["$timeout", function ($timeout) {
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
angular.module("schoolApp").factory("apiFactory", ["$http", "userFactory", function ($http, userFactory) {

	return {
		login: function (username, password) {
			return $http.post("http://dispatch.ru.is/demo/api/v1/login", {
				user: username,
				pass: password
			});
		},
		studentGetEvaluations: function () {
			return $http.get("http://dispatch.ru.is/demo/api/v1/my/evaluations");
		}
	};

}]);
angular.module("schoolApp").factory("httpInterceptor", ["userFactory", function (userFactory) {

	var requestIntercepter = {
		request: function (config) {

			if (userFactory.getToken()) {
				config.headers.Authorization = "Basic " + userFactory.getToken();
			}

			return config;

		}
	};

	return requestIntercepter;

}])

.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.interceptors.push("httpInterceptor");
}]);
angular.module("schoolApp").factory("userFactory", ["$rootScope", "$location", function ($rootScope, $location) {

	$rootScope.user = {};
	$rootScope.token = "";

	return {
		setUser: function (newUser) {
			$rootScope.user = newUser;
		},
		getUser: function () {
			return $rootScope.user;
		},
		setToken: function (newToken) {
			$rootScope.token = newToken;
		},
		getToken: function () {
			return $rootScope.token;
		},
		checkValid: function () {
			if (!this.getToken() || !this.getUser()) {
				$location.path("/login");
			}
		}
	};

}]);