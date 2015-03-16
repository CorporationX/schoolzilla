describe('evaluationQuestion', function () {

	var $scope;
	var $rootScope;
	var element;

	var question;
	var answers;
	var teacher;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {
		// $rootScope = _$rootScope_;
		// $scope = $rootScope.$new();

		// var template = '<evaluation-question answers="answers" teacher="teacher" ng-model="question"></evaluation-question>';

		// element = _$compile_(template)($scope);

	}));

	it("should set elements when courseQuestion", function () {
		// teacher = "";
		// question = "courseQuestion";
		// $scope.ID = $scope.question.ID;
		// $scope.answers[$scope.ID] = {
		// 	QuestionID: $scope.question.ID
		// };

		// expect(teacher).toEqual("");
		// expect(question).toEqual("courseQuestion");
		// expect(QuestionID).toEqual($scope.question.ID);

	});

	it("should set elements when teacherQuestion", function () {
		// teacher = 1234567890;


		// expect(teacher).toEqual(1234567890);
	});



});