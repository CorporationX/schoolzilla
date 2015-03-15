angular.module("schoolApp").controller("StudentHomeController", ["$scope", "$location", "apiFactory", "userFactory",

	function ($scope, $location, apiFactory, userFactory) {

		$scope.evaluations = [];

		$scope.openEvaluation = function (courseID, semesterID, evalID) {
			$location.path("/student/course/" + courseID + "/" + semesterID + "/evaluation/" + evalID);
		};

		$scope.init = function () {
			userFactory.checkValid();

			apiFactory.studentGetEvaluations().then(function (results) {
				console.log("StudentHomeController results", results);

				$scope.evaluations = results.data;
			});
		};

		$scope.init();

	}
]);