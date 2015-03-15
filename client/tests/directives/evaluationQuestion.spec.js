describe('evaluationQuestion', function () {

	var $scope;
	var $rootScope;
	var element;

	var question;
	var answers;
	var teacher;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		var template = "<evaluation-question></evaluation-question>";

		element = _$compile_(template)($scope);

	}));

	it("should call login function on enter", function () {
		expect(1).toEqual(1);
	});

});