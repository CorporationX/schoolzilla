describe('AdminNewTemplateController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var mockModal;
	var deferred1;
	var deferred2;
	var deferred3;
	var deferred4;
	var mockApiFactory;
	var mockUserFactory;
	var newQuestionObject;

	var evaluationsResult = [{
		ID: 33,
		TemplateTitle: "Template Title",
		StartDate: "2015-03-18T00:00:00",
		EndDate: "2015-03-18T00:00:00",
		Status: "open"
	}, {
		ID: 45,
		TemplateTitle: "Template Title",
		StartDate: "2015-03-14T02:03:00",
		EndDate: "2015-03-18T00:00:00",
		Status: "closed"
	}];

	var templateResult = [{
		ID: 5,
		Title: "titill",
	}, {
		ID: 5,
		Title: "titill"
	}];

	beforeEach(module("schoolApp"));

	beforeEach(function () {


		mockApiFactory = {
			adminGetTemplates: function () {
				deferred1 = $q.defer();
				return deferred1.promise;
			},
			adminGetEvaluations: function () {
				deferred2 = $q.defer();
				return deferred2.promise;
			},
			adminGetTemplate: function () {
				deferred3 = $q.defer();
				return deferred3.promise;
			},
			adminPostTemplate: function () {
				deferred4 = $q.defer();
				return deferred4.promise;
			}
		};

		mockUserFactory = {
			setUser: function (user) {

			},
			setToken: function (token) {

			},
			checkValid: function () {

			}
		};

		mockModal = {
			open: function (obj) {
				if (obj.resolve && obj.resolve.currentTemplate) {
					obj.resolve.currentTemplate();
				}
				return {
					result: {
						then: function (fn) {
							fn(newQuestionObject);
						}
					}
				};
			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_, _$location_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$location = _$location_;

		$scope.createTemplate = function () {

		};

		$q = _$q_;

		$controller = _$controller_("AdminNewTemplateController", {
			$scope: $scope,
			$modal: mockModal,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory,
			$location: _$location_
		});

	}));

	it("should open a modal with the template specified", function () {

		newQuestionObject = {
			Text: "a",
			TextEN: "b",
			type: "single",
			Answers: []
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.newQuestion();

		$rootScope.$apply();

		expect(mockModal.open).toHaveBeenCalledWith({
			templateUrl: "/client/views/modals/newQuestionModal.html",
			controller: "NewQuestionModalController"
		});

	});

	it("should add to the CourseQuestions a new question", function () {

		expect($scope.template.CourseQuestions.length).toEqual(0);

		newQuestionObject = {
			Text: "a",
			TextEN: "b",
			type: "single",
			Answers: [],
			category: "Course question"
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.newQuestion();

		$rootScope.$apply();

		expect($scope.template.CourseQuestions.length).toEqual(1);

	});

	it("should add to the TeacherQuestions a new question", function () {

		expect($scope.template.TeacherQuestions.length).toEqual(0);

		newQuestionObject = {
			Text: "a",
			TextEN: "b",
			type: "text",
			Answers: [],
			category: "Teacher question"
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.newQuestion();

		$rootScope.$apply();

		expect($scope.template.TeacherQuestions.length).toEqual(1);

	});

	it("should save a template if CourseQuestions or TeacherQuestions is not empty", function () {

		expect($scope.errors.template).toEqual(false);

		$scope.template.CourseQuestions = [];
		$scope.template.TeacherQuestions = [{
			Text: "hvernig er",
			TextEN: "how is",
			ImageURL: "",
			Type: "text"
		}];

		$scope.saveTemplate();

		$rootScope.$apply();

		expect($scope.errors.template).toEqual(false);

	});

	it("should not save a template if both CourseQuestions or TeacherQuestions is empty", function () {

		expect($scope.errors.template).toEqual(false);

		$scope.template.CourseQuestions = [];
		$scope.template.TeacherQuestions = [];

		$scope.saveTemplate();

		$rootScope.$apply();

		expect($scope.errors.template).toEqual(true);

	});

	it("should redirect back to the home page when a user clicks cancel", function () {

		spyOn($location, "path");

		$scope.cancel();

		$rootScope.$apply();

		expect($location.path).toHaveBeenCalledWith("/admin/home");

	});

	it("should redirect back to the home page when a user successfully saves a template", function () {

		spyOn($location, "path");

		$scope.template.CourseQuestions = [];
		$scope.template.TeacherQuestions = [{
			Text: "hvernig er",
			TextEN: "how is",
			ImageURL: "",
			Type: "text"
		}];

		$scope.saveTemplate();

		deferred4.resolve({

		});

		$rootScope.$apply();

		expect($location.path).toHaveBeenCalledWith("/admin/home");

	});

});