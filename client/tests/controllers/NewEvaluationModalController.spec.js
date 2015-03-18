describe('NewEvaluationModalController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var deferred1;
	var mockModalInstance;
	var mockTemplates;

	var templateResult = [{
		ID: 5,
		Title: "titill",
	}, {
		ID: 5,
		Title: "titill"
	}];

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockModalInstance = {
			close: function (item) {

			},
			dismiss: function (someString) {

			}
		};

		mockTemplates = {};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$q = _$q_;

		$controller = _$controller_("NewEvaluationModalController", {
			$scope: $scope,
			$modalInstance: mockModalInstance,
			templates: mockTemplates
		});

	}));

	it("should cancel the modalInstance", function () {

		spyOn(mockModalInstance, "dismiss").and.callThrough();

		$scope.cancel();

		$rootScope.$apply();

		expect(mockModalInstance.dismiss).toHaveBeenCalledWith("cancel");

	});

	it("should add a templateID error if we try to click ok without one", function () {

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.templateIDError).toEqual(true);

	});

	it("should not add a templateID error if we try to click ok without one", function () {
		$scope.evalObject.templateID = 12;

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.templateIDError).toEqual(false);

	});

	it("should add a startDate error if we try to click ok without one", function () {

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.StartDateError).toEqual(true);

	});

	it("should not add a startDate error if we try to click ok without one", function () {

		$scope.evalObject.StartDate = new Date();

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.StartDateError).toEqual(false);

	});

	it("should add a endDate error if we try to click ok without one", function () {

		$scope.evalObject.templateID = 12;
		$scope.evalObject.StartDate = new Date();

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.EndDateError).toEqual(true);

	});

	it("should not add a endDate error if we try to click ok without one", function () {

		$scope.evalObject.EndDate = new Date();

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.EndDateError).toEqual(false);

	});

	it("should close and send the object along only if there are no errors", function () {

		spyOn(mockModalInstance, "close");

		$scope.evalObject.EndDate = new Date();
		$scope.evalObject.StartDate = new Date();
		$scope.evalObject.templateID = 12;

		$scope.ok();

		$rootScope.$apply();

		expect(mockModalInstance.close).toHaveBeenCalledWith($scope.evalObject);

	});

});