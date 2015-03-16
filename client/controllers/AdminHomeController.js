angular.module("schoolApp").controller("AdminHomeController", ["$scope", "$modal", "apiFactory", "userFactory",

	function ($scope, $modal, apiFactory, userFactory) {

		$scope.createTemplate = function () {

			$scope.modalInstance = $modal.open({
				templateUrl: "/client/views/modals/newTemplateModal.html",
				controller: "NewTemplateModalController"
			});

			$scope.modalInstance.result.then(function (selectedItem){

				

			});

		};

		$scope.viewTemplate = function (templateID) {

			apiFactory.adminGetTemplate(templateID).then(function (results) {

				var modalInstance = $modal.open({
					templateUrl: "/client/views/modals/viewTemplateModal.html",
					controller: "ViewTemplateModalController",
					resolve: {
						currentTemplate: function () {
							return results;
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