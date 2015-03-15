describe('StudentHomeController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var deferred;
	var mockApiFactory;
	var mockUserFactory;

	var evaluationsResult = [{
		CourseID: "T-427-WEPO",
		CourseName: "Vefforitun II",
		Semester: "20151",
		ID: 34,
		TemplateName: "Midannarmat"
	}, {
		CourseID: "T-622-ARTI",
		CourseName: "Gervigreind",
		Semester: "20151",
		ID: 55,
		TemplateName: "Midannarmat"
	}];

	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockApiFactory = {
			studentGetEvaluations: function () {
				deferred = $q.defer();
				return deferred.promise;
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

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$q = _$q_;

		$controller = _$controller_("StudentHomeController", {
			$scope: $scope,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory
		});

	}));

	it("should check whether the user is logged in on initialization", function () {
		spyOn(mockUserFactory, "checkValid").and.callThrough();

		$scope.init();

		deferred.resolve({
			data: []
		});

		$rootScope.$apply();

		expect(mockUserFactory.checkValid).toHaveBeenCalled();
	});

	it("should populate evaluations with evaluations after initialization", function () {

		spyOn(mockUserFactory, "checkValid").and.callThrough();

		expect($scope.evaluations.length).toEqual(0);

		$scope.init();

		deferred.resolve({
			data: evaluationsResult
		});

		$rootScope.$apply();

		expect($scope.evaluations.length).toEqual(2);

	});


});