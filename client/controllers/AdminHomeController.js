angular.module("schoolApp").controller("AdminHomeController", ["$scope", "$modal", "apiFactory", "userFactory", "$location", "dataFactory",

	function ($scope, $modal, apiFactory, userFactory, $location, dataFactory) {

		$scope.createTemplate = function () {

			$location.path("/admin/newtemplate");
		};

		$scope.createEvaluation = function () {
			apiFactory.adminGetTemplates().then(function (results) {
				$scope.modalInstance = $modal.open({
					templateUrl: "/client/views/modals/newEvaluationModal.html",
					controller: "NewEvaluationModalController",
					resolve: {
						templates: function () {
							return results.data;
						}
					}
				});
				$scope.modalInstance.result.then(function (newQuestion) {
					console.log("new question is", newQuestion);
				});
			});

		};

		$scope.viewTemplate = function (templateID) {

			apiFactory.adminGetTemplate(templateID).then(function (results) {
				console.log("viewTemplate: ", results);

				var modalInstance = $modal.open({
					templateUrl: "/client/views/modals/viewTemplateModal.html",
					controller: "ViewTemplateModalController",
					resolve: {
						currentTemplate: function () {
							return results.data;
						}
					}
				});

			});

		};

		$scope.viewResult = function (evalID) {

			apiFactory.adminGetEvaluation(evalID).then(function (results) {

				$scope.kris = "kris";

				dataFactory.setEvaluationResults(results.data);

				$location.path("/admin/results");

			});

		};

		$scope.init = function () {

			userFactory.checkValid();

			$scope.templates = [];
			$scope.evaluations = [];

			apiFactory.adminGetTemplates().then(function (results) {
				console.log("AdminHomeController templates", results);

				$scope.templates = results.data;
			});

			apiFactory.adminGetEvaluations().then(function (results) {
				console.log("AdminHomeController evaluations", results);

				$scope.evaluations = results.data;
			});

		};

		$scope.init();

	}
]);