angular.module("schoolApp").controller("NewQuestionModalController", ["$scope", "$modalInstance",
	function ($scope, $modalInstance) {

		$scope.question = {
			category: "Course question",
			type: "text",
			options: [{
				Text: "",
				TextEN: "",
				ImageURL: "",
				Weight: 1
			}],
			Text: "",
			TextEN: ""
		};

		$scope.errors = {
			questionText: false,
			single: false
		};

		$scope.addOption = function () {

			if ($scope.question.type === "text") {
				return;
			}

			$scope.question.options.push({
				Text: "",
				TextEN: "",
				ImageURL: "",
				Weight: 1
			});

		};

		$scope.ok = function () {

			if (!$scope.question.Text || !$scope.question.TextEN) {
				$scope.errors.questionText = true;
				return;
			}

			$scope.erors = {
				questionText: false,
				single: false
			};

			if ($scope.question.type === "single") {
				for (var i = 0; i < $scope.question.options.length; i++) {
					if (!$scope.question.options[i].Text || !$scope.question.options[i].TextEN) {
						$scope.errors.single = true;
						return;
					}
				}
			}

			$scope.erors = {
				questionText: false,
				single: false
			};

			$modalInstance.close($scope.question);

		};

		$scope.cancel = function () {

			$modalInstance.dismiss("cancel");

		};

	}
]);