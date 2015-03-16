describe('ViewTemplateModalController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var deferred;
	var mockModalInstance;

	var mockCurrentTemplate = {

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

		$controller = _$controller_("ViewTemplateModalController", {
			$scope: $scope,
			$modalInstance: mockModalInstance,
			currentTemplate: mockCurrentTemplate

		});

	}));

	it("should close the modal instance", function () {
		spyOn(mockModalInstance, "dismiss").and.callThrough();

		$scope.close();

		$rootScope.$apply();

		expect(mockModalInstance.dismiss).toHaveBeenCalledWith("cancel");
	});



});