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