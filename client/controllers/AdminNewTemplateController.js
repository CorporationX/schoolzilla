angular.module("schoolApp").controller("AdminNewTemplateController", ["$scope", "$modal", "apiFactory", "userFactory", "$location",

	function ($scope, $modal, apiFactory, userFactory, $location) {

		$scope.template = {
			CourseQuestions: [],
			TeacherQuestions: []
		};

		$scope.errors = {
			template: false
		};

		$scope.saved = {
			template: false,
			question: false
		};

		$scope.newQuestion = function () {

			$scope.modalInstance = $modal.open({
				templateUrl: "/client/views/modals/newQuestionModal.html",
				controller: "NewQuestionModalController"
			});

			$scope.modalInstance.result.then(function (newQuestion) {

				var questionObject = {
					Text: newQuestion.Text,
					TextEN: newQuestion.TextEN,
					ImageURL: "",
					Type: newQuestion.type
				};

				if (newQuestion.type === "single") {
					questionObject.Answers = newQuestion.options;
				}

				if (newQuestion.category === "Course question") {

					$scope.template.CourseQuestions.push(questionObject);

				} else if (newQuestion.category === "Teacher question") {

					$scope.template.TeacherQuestions.push(questionObject);

				}
				$scope.errors.template = false;

			});

		};

		$scope.saveTemplate = function () {
			$scope.saved.template = true;

			if (!$scope.template.CourseQuestions.length && !$scope.template.TeacherQuestions.length) {
				$scope.errors.template = true;
				return;
			}

			console.log("saving template", $scope.template);

		};

		$scope.cancel = function () {
			$location.path("/admin/home");
		};

		$scope.init = function () {

			userFactory.checkValid();


		};

		$scope.init();

	}
]);