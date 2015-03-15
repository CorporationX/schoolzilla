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
		expect($scope.errors.available).toEqual(false);
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

	it("should add an error when we do not post a successful login", function () {

		$scope.user = {
			username: "kristjanj11",
			password: 123456
		};

		$scope.login();

		deferred.reject({});

		$rootScope.$apply();

		expect($scope.errors.available).toEqual(true);
	});

});