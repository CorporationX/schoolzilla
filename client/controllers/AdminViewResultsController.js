angular.module("schoolApp").controller("AdminViewResultsController", ["$scope", "dataFactory", "userFactory", "$modal", "$location",

	function ($scope, dataFactory, userFactory, $modal, $location) {

		$scope.viewResult = function (index) {

			var modalInstance = $modal.open({
				templateUrl: "/client/views/modals/viewResultsModal.html",
				controller: "ViewResultsModalController",
				resolve: {
					results: function () {
						return $scope.results.Courses[index];
					},
					template: function () {
						return {
							TemplateTitle: $scope.results.TemplateTitle,
							TemplateTitleEN: $scope.results.TemplateTitleEN
						};
					}
				}
			});

		};

		$scope.cancel = function () {
			$location.path("/admin/home");
		};

		$scope.init = function () {

			userFactory.checkValid();

			$scope.results = dataFactory.getEvaluationResults();

		};

		$scope.init();

	}
]);