angular.module("schoolApp").controller("StudentViewEvaluationController", ["$scope", "$routeParams", "apiFactory", "userFactory",

	function ($scope, $routeParams, apiFactory, userFactory) {

		$scope.evaluationVariables = {
			courseID: $routeParams.courseID,
			semesterID: $routeParams.semesterID,
			evalID: $routeParams.evalID
		};


		$scope.init = function () {

			userFactory.checkValid();

			apiFactory.studentGetEvaluation($scope.evaluationVariables).then(function (results) {
				console.log("results", results);
			});

		};

		$scope.init();

	}
]);