angular.module("schoolApp").controller("AdminHomeController", ["$scope", "$modal", "apiFactory", "userFactory",

	function ($scope, $modal, apiFactory, userFactory) {

		$scope.createTemplate = function (){

			var modalInstance = $modal.open({
				templateUrl: "/client/views/modals/newTemplateModal.html",
				controller: "NewTemplateModalController"
			});

			modalInstance.result.then(function (selectedItem){



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