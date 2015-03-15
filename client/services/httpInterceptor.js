angular.module("schoolApp").factory("httpInterceptor", ["userFactory", function (userFactory) {

	var requestIntercepter = {
		request: function (config) {

			if (userFactory.getToken()) {
				config.headers.Authorization = "Basic " + userFactory.getToken();
			}

			return config;

		}
	};

	return requestIntercepter;

}])

.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.interceptors.push("httpInterceptor");
}]);