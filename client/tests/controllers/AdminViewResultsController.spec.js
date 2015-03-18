describe('AdminViewResultsController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var mockModal;
	var deferred1;
	var deferred2;
	var deferred3;
	var mockUserFactory;
	var newQuestionObject;

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockUserFactory = {
			setUser: function (user) {

			},
			setToken: function (token) {

			},
			checkValid: function () {

			}
		};

		mockDataFactory = {
			getEvaluationResults: function () {

			}
		};

		mockModal = {
			open: function (obj) {
				if (obj.resolve && obj.resolve.results) {
					obj.resolve.results();
				}
				if (obj.resolve && obj.resolve.template) {
					obj.resolve.template();
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

		$controller = _$controller_("AdminViewResultsController", {
			$scope: $scope,
			dataFactory: mockDataFactory,
			userFactory: mockUserFactory,
			$modal: mockModal,
			$location: _$location_
		});

	}));


	it("should open a modal with the correct parameters", function () {

		$scope.results = {
			Courses: [{
				ID: 1,
				CourseID: "T-427-WEPO",
				Semester: "20151"
			}, {
				ID: 2,
				CourseID: "T-123-FUNK",
				Semester: "20141"
			}],
			TemplateTitle: "Besta Mat",
			TemplateTitleEN: "Best evaluation"
		};

		spyOn(mockModal, "open").and.callThrough();

		$scope.viewResult(1);

		$rootScope.$apply();

		expect(mockModal.open).toHaveBeenCalled();

	});

	it("should redirect back to the admin homepage if the user cancels", function () {

		spyOn($location, "path").and.callThrough();

		$scope.cancel();

		$rootScope.$apply();

		expect($location.path).toHaveBeenCalledWith("/admin/home");

	});


});