angular.module("schoolApp").controller("ViewResultsModalController", ["$scope", "$modalInstance", "results", "template",
	function ($scope, $modalInstance, results, template) {

		$scope.cancel = function () {

			$modalInstance.dismiss("cancel");

		};

		$scope.results = results;
		$scope.template = template;
	}
]);