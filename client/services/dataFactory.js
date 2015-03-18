angular.module("schoolApp").factory("dataFactory", ["$rootScope", function ($rootScope) {

	$rootScope.evaluationResults = {};

	return {
		setEvaluationResults: function (results) {
			$rootScope.evaluationResults = results;
		},
		getEvaluationResults: function () {
			return $rootScope.evaluationResults;
		}
	};

}]);