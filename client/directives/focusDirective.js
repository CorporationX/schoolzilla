angular.module("schoolApp").directive("focusDirective", ["$timeout", function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {

			scope.$watch("focus", function (value) {

				if (value === true) {

					$timeout(function () {
						$(elem).focus();
					});

				}

			});

			scope.focus = true;

		}
	};
}]);