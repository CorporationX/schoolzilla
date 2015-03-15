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
describe('LoginController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var deferred;
	var mockApiFactory;
	var mockUserFactory;

	var studentObject = {
		FullName: "Kristjan",
		Role: "student",
		Username: "kristjanj11"
	};

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockApiFactory = {
			login: function (username, password) {

				deferred = $q.defer();
				return deferred.promise;

			}
		};

		mockUserFactory = {
			setUser: function (user) {

			},
			setToken: function (token) {

			}
		};

		$location = {
			path: function (thePath) {

			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$q = _$q_;


		$controller = _$controller_("LoginController", {
			$scope: $scope,
			$location: $location,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory
		});

	}));



	it("should be initialized", function () {
		$rootScope.$apply();

		expect($scope.user).toBeDefined();
		expect($scope.user.username).toBeDefined();
		expect($scope.user.password).toBeDefined();
	});

	it("should set variables through userFactory on successful login", function () {

		spyOn(mockUserFactory, "setUser").and.callThrough();
		spyOn(mockUserFactory, "setToken").and.callThrough();

		$scope.user = {
			username: "kristjanj11",
			password: 123456
		};

		$scope.login();

		deferred.resolve({
			data: {
				User: studentObject,
				Token: "1234"
			},
			status: 200
		});

		$rootScope.$apply();

		expect(mockUserFactory.setUser).toHaveBeenCalledWith(studentObject);
		expect(mockUserFactory.setToken).toHaveBeenCalledWith("1234");
	});

	it("should redirect on a successful login as a student", function () {

		spyOn($location, "path").and.callThrough();

		$scope.user = {
			username: "kristjanj11",
			password: 123456
		};

		$scope.login();

		deferred.resolve({
			data: {
				User: studentObject,
				Token: "1234"
			},
			status: 200
		});

		$rootScope.$apply();

		expect($location.path).toHaveBeenCalled();
	});

});
describe('StudentHomeController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var deferred;
	var mockApiFactory;
	var mockUserFactory;

	var evaluationsResult = [{
		CourseID: "T-427-WEPO",
		CourseName: "Vefforitun II",
		Semester: "20151",
		ID: 34,
		TemplateName: "Midannarmat"
	}, {
		CourseID: "T-622-ARTI",
		CourseName: "Gervigreind",
		Semester: "20151",
		ID: 55,
		TemplateName: "Midannarmat"
	}];

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockApiFactory = {
			studentGetEvaluations: function () {
				deferred = $q.defer();
				return deferred.promise;
			}
		};

		mockUserFactory = {
			setUser: function (user) {

			},
			setToken: function (token) {

			},
			checkValid: function () {

			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$q = _$q_;

		$controller = _$controller_("StudentHomeController", {
			$scope: $scope,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory
		});

	}));

	it("should check whether the user is logged in on initialization", function () {
		spyOn(mockUserFactory, "checkValid").and.callThrough();

		$scope.init();

		deferred.resolve({
			data: []
		});

		$rootScope.$apply();

		expect(mockUserFactory.checkValid).toHaveBeenCalled();
	});

	it("should populate evaluations with evaluations after initialization", function () {

		spyOn(mockUserFactory, "checkValid").and.callThrough();

		expect($scope.evaluations.length).toEqual(0);

		$scope.init();

		deferred.resolve({
			data: evaluationsResult
		});

		$rootScope.$apply();

		expect($scope.evaluations.length).toEqual(2);

	});


});
describe('enterDirective', function () {

	var $controller;
	var $scope;
	var $rootScope;
	var element;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$scope.login = function () {

		};

		var template = "<div enter-directive enter='login()'></div>";

		element = _$compile_(template)($scope);

	}));

	it("should call login function on enter", function () {

		spyOn($scope, "login").and.callThrough();

		var event = $.Event("keypress", {
			keyCode: 13
		});

		element.trigger(event);

		$rootScope.$apply();

		expect($scope.login).toHaveBeenCalled();
	});


});
describe('focusDirective', function () {

	var $controller;
	var $scope;
	var $rootScope;
	var $timeout;
	var element;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$timeout_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$timeout = _$timeout_;

		var template = "<input type='text' focus-directive>";

		element = _$compile_(template)($scope);

	}));

	it("should call login function on enter", function () {
		spyOn(element[0], "focus");

		expect($scope.focus).toEqual(true);

		$rootScope.$apply();
		$timeout.flush();

		expect(element[0].focus).toHaveBeenCalled();

	});


});
describe('apiFactory', function () {

	var apiFactory;
	var $httpBackend;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_apiFactory_, _$httpBackend_) {

		$httpBackend = _$httpBackend_;
		apiFactory = _apiFactory_;

	}));

	it("should post to the login route with the username and password provided", function () {

		$httpBackend.expect("POST", "http://dispatch.ru.is/demo/api/v1/login", {
			user: "kristjanj11",
			pass: 123456
		}).respond(200);

		apiFactory.login("kristjanj11", 123456);

		$httpBackend.flush();

	});

	it("should get the student evaluations when requested", function () {

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/my/evaluations").respond(200);

		apiFactory.studentGetEvaluations();

		$httpBackend.flush();

	});


	afterEach(function () {

		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();

	});

});
describe('apiFactory', function () {

	var userFactory;
	var $httpBackend;
	var $rootScope;
	var $location;

	var userObj = {
		FullName: "Kristjan",
		Role: "student",
		Username: "kristjanj11"
	};

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_userFactory_, _$rootScope_, _$location_) {

		$location = _$location_;
		userFactory = _userFactory_;
		$rootScope = _$rootScope_;

	}));

	it("should set the connected user ", function () {


		userFactory.setUser(userObj);

		expect($rootScope.user).toEqual(userObj);

	});

	it("should get the connected user", function () {

		userFactory.setUser(userObj);

		expect(userFactory.getUser()).toEqual(userObj);

	});

	it("should set the token", function () {

		userFactory.setToken("12345");

		expect($rootScope.token).toEqual("12345");

	});

	it("should get the token", function () {

		userFactory.setToken("12345");

		expect(userFactory.getToken()).toEqual("12345");

	});

	it("should do nothing if the token and the user is set", function () {

		userFactory.setUser(userObj);

		userFactory.setToken("12345");

		userFactory.checkValid();

		expect($location.path()).not.toEqual("/login");

	});

	it("should do nothing if the token and the user is set", function () {

		userFactory.checkValid();

		$rootScope.$apply();

		expect($location.path()).toEqual("/login");

	});

});