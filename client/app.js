angular.module("schoolApp", ["ngRoute"])


.config(["$routeProvider", function ($routeProvider) {

	$routeProvider.when("/login", {
			templateUrl: "/client/views/login.html",
			controller: "LoginController"
		}).when("/student/home", {
			templateUrl: "/client/views/student/home.html",
			controller: "StudentHomeController"
		})
		.otherwise({
			redirectTo: "/login"
		});

}]);