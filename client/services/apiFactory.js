angular.module("schoolApp").factory("apiFactory", ["$http", function ($http) {

	return {
		login: function (username, password) {
			return $http.post("http://dispatch.ru.is/demo/api/v1/login", {
				user: username,
				pass: password
			});
		}
	};

}]);