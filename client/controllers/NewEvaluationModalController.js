angular.module("schoolApp").controller("NewEvaluationModalController", ["$scope", "$modalInstance", "templates",
	function ($scope, $modalInstance, templates) {

		$scope.templates = templates;
		$scope.evalObject = {
			templateID: "",
			StartDate: "",
			EndDate: ""
		};

		$scope.errors = {
			templateIDError: false,
			StartDateError: false,
			EndDateError: false,
			show: false
		};

		$scope.ok = function () {
			if ($scope.evalObject.templateID === "") {
				$scope.errors.templateIDError = true;
			} else {
				$scope.errors.templateIDError = false;
			}

			if ($scope.evalObject.StartDate === "") {
				$scope.errors.StartDateError = true;
			} else {
				$scope.errors.StartDateError = false;
			}

			if ($scope.evalObject.EndDate === "") {
				$scope.errors.EndDateError = true;
			} else {
				$scope.errors.EndDateError = false;
			}

			if ($scope.errors.templateIDError || $scope.errors.StartDateError || $scope.errors.EndDateError) {
				$scope.errors.show = true;
				return;
			} else {
				$scope.evalObject.templateID = parseInt($scope.evalObject.templateID, 10);
				$modalInstance.close($scope.evalObject);
			}
		};

		$scope.cancel = function () {

			$modalInstance.dismiss("cancel");

		};

	}
]);