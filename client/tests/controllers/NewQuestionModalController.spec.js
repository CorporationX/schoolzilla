describe('NewQuestionModalController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var deferred;
	var mockModalInstance;

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockModalInstance = {
			close: function (item) {

			},
			dismiss: function (someString) {

			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$controller = _$controller_("NewQuestionModalController", {
			$scope: $scope,
			$modalInstance: mockModalInstance
		});

	}));

	it("should cancel the modalInstance", function () {

		spyOn(mockModalInstance, "dismiss").and.callThrough();

		$scope.cancel();

		$rootScope.$apply();

		expect(mockModalInstance.dismiss).toHaveBeenCalledWith("cancel");

	});

	it("should add an item to the options when clicked", function () {

		expect($scope.question.options.length).toEqual(1);

		$scope.addOption();

		$rootScope.$apply();

		expect($scope.question.options.length).toEqual(2);

	});

	it("should add the appropriate error if no questionText is filled out", function () {

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.questionText).toEqual(true);

	});

	it("should add the appropriate error if an option is not filled out in single choice", function () {

		$scope.question.Text = "Hvernig eru fyrirlestrarnir";
		$scope.question.TextEN = "How is the lectures";
		$scope.question.type = "single";
		$scope.question.options = [{
			Text: "good",
			TextEN: "",
			ImageURL: "",
			Weight: 1
		}];

		$scope.ok();

		$rootScope.$apply();

		expect($scope.errors.single).toEqual(true);

	});

	it("should send along the correct data if all is successful", function () {

		spyOn(mockModalInstance, "close").and.callThrough();

		$scope.question.Text = "Hvernig eru fyrirlestrarnir";
		$scope.question.TextEN = "How is the lectures";

		$scope.ok();

		$rootScope.$apply();

		expect(mockModalInstance.close).toHaveBeenCalledWith({
			category: "Course question",
			type: "text",
			options: [{
				Text: "",
				TextEN: "",
				ImageURL: "",
				Weight: 1
			}],
			Text: "Hvernig eru fyrirlestrarnir",
			TextEN: "How is the lectures"
		});

	});

});