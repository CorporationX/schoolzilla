angular.module("schoolApp").controller("AdminHomeController", ["$scope", "$location", "apiFactory", "userFactory",

	function ($scope, $location, apiFactory, userFactory) {

		$scope.init = function () {

			userFactory.checkValid();

			$scope.templates = [];
			$scope.evaluations = [];

			apiFactory.adminGetTemplates().then(function (results) {
				console.log("StudentHomeController templates", results);

				$scope.templates = results.data;
			});

			apiFactory.adminGetEvaluations().then(function (results) {
				console.log("StudentHomeController evaluations", results);

				$scope.evaluations = results.data;
			});			

		};

		$scope.init();

	}
]);