angular.module("schoolApp").factory("apiFactory", ["$http", "userFactory", function ($http, userFactory) {

	return {
		login: function (username, password) {
			return $http.post("http://dispatch.ru.is/demo/api/v1/login", {
				user: username,
				pass: password
			});
		},
		studentGetEvaluations: function () {
			return $http.get("http://dispatch.ru.is/demo/api/v1/my/evaluations");
		},
		studentGetEvaluation: function (evaluationVariables) {
			return $http.get("http://dispatch.ru.is/demo/api/v1/courses/" + evaluationVariables.courseID + "/" + evaluationVariables.semesterID +
				"/evaluations/" + evaluationVariables.evalID);
		}
	};

}]);