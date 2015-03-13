angular.module("schoolApp").factory("userFactory", [function () {

	var user = {};
	var token = "";

	return {
		setUser: function (newUser) {
			user = newUser;
		},
		getUser: function () {
			return user;
		},
		setToken: function (newToken) {
			token = newToken;
		},
		getToken: function () {
			return token;
		}
	};

}]);