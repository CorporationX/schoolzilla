describe('barDirective', function () {

	var $controller;
	var $scope;
	var $rootScope;
	var element;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$scope.values = [];

		var template = "<bar-directive values=''></bar-directive>";

		element = _$compile_(template)($scope);

	}));

	it("should initialize the directive", function () {


		expect(element).toBeDefined();

	});


});