angular.module("schoolApp").controller("StudentHomeController", ["$scope", "apiFactory", "userFactory",

	function ($scope, apiFactory, userFactory) {

		$scope.evaluations = [];

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