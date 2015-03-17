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
		},
		studentPostEvaluation: function (evaluationVariables, evaluationArray) {
			return $http.post("http://dispatch.ru.is/demo/api/v1/courses/" + evaluationVariables.courseID + "/" + evaluationVariables.semesterID +
				"/evaluations/" + evaluationVariables.evalID, evaluationArray);
		},
		studentGetTeachers: function (evaluationVariables) {
			return $http.get("http://dispatch.ru.is/demo/api/v1/courses/" + evaluationVariables.courseID + "/" + evaluationVariables.semesterID + "/teachers");
		},
		adminGetTemplates: function () {
			return $http.get("http://dispatch.ru.is/demo/api/v1/evaluationtemplates");
		},
		adminGetEvaluations: function () {
			return $http.get("http://dispatch.ru.is/demo/api/v1/evaluations");
		},
		adminGetTemplate: function (templateID) {
			return $http.get("http://dispatch.ru.is/demo/api/v1/evaluationtemplates/" + templateID);
		}
	};

}]);