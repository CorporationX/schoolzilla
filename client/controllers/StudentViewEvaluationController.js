angular.module("schoolApp").controller("StudentViewEvaluationController", ["$scope", "$routeParams", "apiFactory", "userFactory", "$location",

	function ($scope, $routeParams, apiFactory, userFactory, $location) {

		$scope.evaluationVariables = {
			courseID: $routeParams.courseID,
			semesterID: $routeParams.semesterID,
			evalID: $routeParams.evalID
		};

		$scope.evaluation = {
			teachers: null,
			data: {}
		};

		$scope.answers = {

		};

		$scope.errors = false;

		$scope.evaluationAnswers = [];

		$scope.sendEvaluation = function () {

			$scope.evaluationAnswers = [];

			for (var key in $scope.answers) {

				if (!$scope.answers[key].TeacherSSN) {
					if (!$scope.answers[key].value) {
						$scope.errors = true;
						return;
					}
				}
				$scope.errors = false;
				if ($scope.answers[key].value) {

					$scope.evaluationAnswers.push($scope.answers[key]);

				}

			}
			apiFactory.studentPostEvaluation($scope.evaluationVariables, $scope.evaluationAnswers).then(function (results) {
				$location.path("/student/home");
			});

		};

		$scope.init = function () {

			userFactory.checkValid();

			apiFactory.studentGetEvaluation($scope.evaluationVariables).then(function (results) {
				$scope.evaluation.data = results.data;
			});

			apiFactory.studentGetTeachers($scope.evaluationVariables).then(function (results) {
				$scope.evaluation.teachers = results.data;
			});

		};

		$scope.init();

	}
]);