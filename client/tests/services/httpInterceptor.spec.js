describe('httpInterceptor', function () {

	var httpInterceptor;

	var config = {
		headers: {
			Authorization: ""
		}
	};

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_httpInterceptor_, _$httpBackend_, _userFactory_) {

		httpInterceptor = _httpInterceptor_;

		_userFactory_.setToken(1234);

	}));

	it("should set the Authorization header if the token is set", function () {

		httpInterceptor.request(config);

		expect(config.headers.Authorization).toEqual("Basic " + 1234);

	});

});