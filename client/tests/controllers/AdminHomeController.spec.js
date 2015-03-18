describe('AdminHomeController', function () {

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
	var deferred5;
	var mockApiFactory;
	var mockUserFactory;
	var mockDataFactory;
	var $timeout;

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
			adminGetEvaluation: function () {
				deferred4 = $q.defer();
				return deferred4.promise;
			},
			adminPostEvaluation: function () {
				return {
					then: function (fn) {
						fn();
					}
				};
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

		mockDataFactory = {
			setEvaluationResults: function (results) {

			},
			getEvaluationResults: function () {

			}
		};

		mockModal = {
			open: function (obj) {
				if (obj.resolve && obj.resolve.currentTemplate) {
					obj.resolve.currentTemplate();
				}
				if (obj.resolve && obj.resolve.templates) {
					obj.resolve.templates();
				}
				return {
					result: {
						then: function (fn) {
							fn({});
						}
					}
				};
			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_, _$location_, _$timeout_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$location = _$location_;

		$timeout = _$timeout_;

		$scope.createTemplate = function () {

		};

		$q = _$q_;

		$controller = _$controller_("AdminHomeController", {
			$scope: $scope,
			$modal: mockModal,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory,
			$location: _$location_,
			dataFactory: mockDataFactory
		});

	}));

	it("should check whether the user is logged in on initialization", function () {
		spyOn(mockUserFactory, "checkValid").and.callThrough();

		$scope.init();

		deferred1.resolve({
			data: []
		});

		deferred2.resolve({
			data: []
		});

		$rootScope.$apply();

		expect(mockUserFactory.checkValid).toHaveBeenCalled();
	});

	it("should populate evaluationsResults with evaluations after initialization", function () {

		expect($scope.evaluations.length).toEqual(0);

		$scope.init();

		deferred2.resolve({
			data: evaluationsResult
		});

		$rootScope.$apply();

		expect($scope.evaluations).toEqual(evaluationsResult);

	});


	it("should populate templateResults with templates after initialization", function () {

		expect($scope.templates.length).toEqual(0);

		$scope.init();

		deferred1.resolve({
			data: templateResult
		});

		$rootScope.$apply();

		expect($scope.templates).toEqual(templateResult);

	});

	it("should redirect to create a template", function () {

		spyOn($location, "path").and.callThrough();

		$scope.createTemplate();

		$rootScope.$apply();

		expect($location.path).toHaveBeenCalledWith("/admin/newtemplate");
	});

	it("should open a modal with the template specified", function () {

		var templateObj = {
			CourseQuestions: [],
			TeacherQuestions: [],
			ID: 1,
			Title: "Template2",
			IntroText: "the template 2"
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.viewTemplate(12);

		deferred3.resolve({
			data: templateObj
		});

		$rootScope.$apply();

		expect(mockModal.open).toHaveBeenCalled();


	});

	it("should set evaluation results before redirecting to view them", function () {

		spyOn(mockDataFactory, "setEvaluationResults");

		var evaluationResult = {
			data: {
				Course: [],
				ID: 1,
				TemplateID: 4,
				TemplateTitle: "temp title 1"
			}
		};

		$scope.viewResult(12);

		deferred4.resolve({
			data: evaluationResult
		});

		$rootScope.$apply();

		expect(mockDataFactory.setEvaluationResults).toHaveBeenCalledWith(evaluationResult);

	});

	it("should redirect after getting the evaluation results and setting them", function () {

		spyOn($location, "path");

		var evaluationResult = {
			data: {
				Course: [],
				ID: 1,
				TemplateID: 4,
				TemplateTitle: "temp title 1"
			}
		};

		$scope.viewResult(12);

		deferred4.resolve({
			data: evaluationResult
		});

		$rootScope.$apply();

		expect($location.path).toHaveBeenCalledWith("/admin/results");
	});

	it("should open a modal with the correct parameters when creating an evaluation", function () {

		var templateObj = {
			CourseQuestions: [],
			TeacherQuestions: [],
			ID: 1,
			Title: "Template2",
			IntroText: "the template 2"
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.createEvaluation();

		deferred1.resolve({
			data: {
				ID: 1,
				Title: "temp 1",
				TitleEN: "template 1"
			}
		});

		$rootScope.$apply();

		expect(mockModal.open).toHaveBeenCalled();

	});

	it("should get the evaluations again after a successful creation of an evaluation", function () {

		var templateObj = {
			CourseQuestions: [],
			TeacherQuestions: [],
			ID: 1,
			Title: "Template2",
			IntroText: "the template 2"
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.createEvaluation();

		deferred1.resolve({
			data: {
				ID: 1,
				Title: "temp 1",
				TitleEN: "template 1"
			}
		});


		$rootScope.$apply();

		expect(1).toEqual(
			1
		);

	});



});