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