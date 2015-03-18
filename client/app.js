angular.module("schoolApp", ["ngRoute", "ui.bootstrap", "ui.bootstrap.datetimepicker"])


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
		}).when("/admin/home", {
			templateUrl: "/client/views/admin/home.html",
			controller: "AdminHomeController"
		}).when("/admin/newtemplate", {
			templateUrl: "/client/views/admin/newTemplate.html",
			controller: "AdminNewTemplateController"
		})
		.when("/admin/results", {
			templateUrl: "/client/views/admin/viewResults.html",
			controller: "AdminViewResultsController"
		})
		.otherwise({
			redirectTo: "/login"
		});

}]);