describe('StudentHomeController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var deferred;
	var mockApiFactory;
	var mockUserFactory;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_, _$location_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$location = _$location_;

		$q = _$q_;

		$controller = _$controller_("StudentHomeController", {
			$scope: $scope,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory
		});

	}));


});