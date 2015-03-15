angular.module("schoolApp", ["ngRoute"])


.config(["$routeProvider", function ($routeProvider) {

	$routeProvider.when("/login", {
			templateUrl: "/client/views/login.html",
			controller: "LoginController"
		}).when("/student/home", {
			templateUrl: "/client/views/student/home.html",
			controller: "StudentHomeController"
		}).when("/student/course/:courseID/:semesterID/evaluation/:evalID", {
			templateUrl: "client/views/student/viewEvaluation.html",
			controller: "StudentViewEvaluationController"
		})
		.otherwise({
			redirectTo: "/login"
		});

}]);