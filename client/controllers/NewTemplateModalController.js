angular.module("schoolApp").controller("NewTemplateModalController", ["$scope", "$modalInstance",
	function ($scope, $modalInstance) {

		$scope.ok = function () {

			console.log("OK");

			$modalInstance.close("Poop");

		};

		$scope.cancel = function () {

			$modalInstance.dismiss("cancel");

		};

	}
]);