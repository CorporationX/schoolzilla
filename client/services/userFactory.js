angular.module("schoolApp").factory("userFactory", ["$rootScope", "$location", function ($rootScope, $location) {

	$rootScope.user = {};
	$rootScope.token = "";

	return {
		setUser: function (newUser) {
			$rootScope.user = newUser;
		},
		getUser: function () {
			return $rootScope.user;
		},
		setToken: function (newToken) {
			$rootScope.token = newToken;
		},
		getToken: function () {
			return $rootScope.token;
		},
		checkValid: function () {
			if (!this.getToken() || !this.getUser()) {
				$location.path("/login");
			}
		}
	};

}]);