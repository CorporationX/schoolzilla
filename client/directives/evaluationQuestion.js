angular.module("schoolApp").directive("evaluationQuestion", [function () {
	return {
		restrict: "E",
		scope: {
			question: "=ngModel",
			answers: "=",
			teacher: "="
		},
		templateUrl: "/client/views/templates/evaluationQuestion.html",
		link: function (scope, elem, attrs) {


			if (!scope.teacher) {
				console.log("came here");
				scope.ID = scope.question.ID;

				scope.answers[scope.ID] = {
					QuestionID: scope.question.ID
				};

			} else {
				scope.ID = scope.question.ID + "-" + scope.teacher;

				scope.answers[scope.ID] = {
					QuestionID: scope.question.ID,
					TeacherSSN: scope.teacher
				};

			}

		}
	};
}]);