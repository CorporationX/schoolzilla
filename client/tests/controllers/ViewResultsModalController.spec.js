describe('ViewResultsModalController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var deferred;
	var mockModalInstance;

	var mockResults = {

	};

	var mockTemplate = {

	};

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockModalInstance = {
			dismiss: function (someString) {

			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$q = _$q_;

		$controller = _$controller_("ViewResultsModalController", {
			$scope: $scope,
			$modalInstance: mockModalInstance,
			results: mockResults,
			template: mockTemplate
		});

	}));

	it("should close the modal instance", function () {
		spyOn(mockModalInstance, "dismiss").and.callThrough();

		$scope.cancel();

		$rootScope.$apply();

		expect(mockModalInstance.dismiss).toHaveBeenCalledWith("cancel");
	});



});