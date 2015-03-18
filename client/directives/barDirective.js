angular.module("schoolApp").directive("barDirective", [function () {
	return {
		restrict: "E",
		scope: {
			values: "="
		},
		templateUrl: "/client/views/templates/bar.html",
		link: function (scope, elem, attrs) {


		}
	};
}]);