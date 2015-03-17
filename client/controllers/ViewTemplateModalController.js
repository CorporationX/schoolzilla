angular.module("schoolApp").controller("ViewTemplateModalController", ["$scope", "$modalInstance", "currentTemplate",
	function ($scope, $modalInstance, currentTemplate) {

		$scope.close = function () {

			$modalInstance.dismiss("cancel");

		};

		$scope.currentTemplate = currentTemplate;
		console.log(currentTemplate.data);
	}
]);