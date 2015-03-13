describe('LoginController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var deferred;
	var mockApiFactory;
	var mockUserFactory;

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

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$q = _$q_;


		$controller = _$controller_("LoginController", {
			$scope: $scope,
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
				User: "kristjanj11",
				Token: "1234"
			},
			status: 200
		});

		$rootScope.$apply();

		expect(mockUserFactory.setUser).toHaveBeenCalledWith("kristjanj11");
		expect(mockUserFactory.setToken).toHaveBeenCalledWith("1234");
	});

});