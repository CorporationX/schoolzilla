angular.module("schoolApp").controller("AdminHomeController", ["$scope", "$modal", "apiFactory", "userFactory", "$location",

	function ($scope, $modal, apiFactory, userFactory, $location) {

		$scope.createTemplate = function () {

			$location.path("/admin/newtemplate");
		};


		// apiFactory.adminGetTemplates().then(function (results) {
		// 	console.log("NewEvaluationModalController templates", results);
		// 	$scope.templates = results.data;
		// });
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
				console.log("viewResults: ", results);

				var modalInstance = $modal.open({
					templateUrl: "/client/views/modals/viewResults.html",
					controller: "ViewResultsController",
					resolve: {
						currentTemplate: function () {
							return results.data;
						}
					}
				});

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