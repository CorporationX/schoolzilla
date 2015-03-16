angular.module("schoolApp").controller("StudentViewEvaluationController", ["$scope", "$routeParams", "apiFactory", "userFactory",

	function ($scope, $routeParams, apiFactory, userFactory) {

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

		$scope.evaluationAnswers = [];

		$scope.sendEvaluation = function (){
				
			for (var key in $scope.answers){

				if ($scope.answers[key].value){

					$scope.evaluationAnswers.push($scope.answers[key]);

				}
			
			}
			
			console.log("sending ", $scope.evaluationAnswers);

		};

		$scope.init = function () {

			userFactory.checkValid();

			apiFactory.studentGetEvaluation($scope.evaluationVariables).then(function (results) {
				$scope.evaluation.data = results.data;
				console.log("StudentViewEvaluationController evaluation results", results);
			});

			apiFactory.studentGetTeachers($scope.evaluationVariables).then(function (results) {
				$scope.evaluation.teachers = results.data;
				console.log("StudentViewEvaluationController teacher results", results);
			});

		};

		$scope.init();

	}
]);