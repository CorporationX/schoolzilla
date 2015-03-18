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



});