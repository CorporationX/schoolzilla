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