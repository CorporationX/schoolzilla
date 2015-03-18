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
	var mockApiFactory;
	var mockUserFactory;

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
							fn("pizzahut");
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

		$controller = _$controller_("AdminHomeController", {
			$scope: $scope,
			$modal: mockModal,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory,
			$location: _$location_
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

	it("should open a modal with the template specified", function () {

		newQuestionObject = {
			Text: "a",
			TextEN: "b",
			type: "single",
			Answers: []
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.createEvaluation();

		$rootScope.$apply();

		expect(mockModal.open).toHaveBeenCalledWith({
			templateUrl: "/client/views/modals/newEvaluationModal.html",
			controller: "NewEvaluationModalController"
		});

	});



});