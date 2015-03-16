describe('evaluationQuestion', function () {

	var $scope;
	var $rootScope;
	var element;

	describe('courseQuestions', function (){

		beforeEach(module("schoolApp"));

		beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$templateCache_) {
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();

			_$templateCache_.put("/client/views/templates/evaluationQuestion.html", "<div></div>");

			$scope.answers = {};
			$scope.teacher = "";
			$scope.question = {
				ID: 12
			};


			var template = '<evaluation-question answers="answers" teacher="teacher" ng-model="question"></evaluation-question>';

			element = _$compile_(template)($scope);

		}));

		it("should set answer to include a QuestionID key", function (){

			$rootScope.$apply();

			expect($scope.answers).toEqual({
				12: {
					QuestionID: 12
				}
			});

		});

	});


	describe('teacherQuestions', function (){

		beforeEach(module("schoolApp"));

		beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_, _$templateCache_) {
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();

			_$templateCache_.put("/client/views/templates/evaluationQuestion.html", "<div></div>");

			$scope.answers = {};
			$scope.teacher = "1234567890";

			$scope.question = {
				ID: 12
			};


			var template = '<evaluation-question answers="answers" teacher="teacher" ng-model="question"></evaluation-question>';

			element = _$compile_(template)($scope);

		}));

		it("should set answer to include a QuestionID key and a TeacherSSN key", function (){

			$rootScope.$apply();

			expect($scope.answers).toEqual({
				"12-1234567890": {
					QuestionID: 12,
					TeacherSSN: "1234567890"
				}
			});

		});

	});

});