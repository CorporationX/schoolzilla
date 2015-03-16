describe('AdminHomeController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var $location;
	var modal;
	var deferred1;
	var defferred2;
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

		modal = {
			open: function (obj){
				return {
					result:{
						then: function (fn){
							fn("pizzahut");
						}
					}
				};
			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$scope.createTemplate = function (){

		};

		$q = _$q_;

		$controller = _$controller_("AdminHomeController", {
			$scope: $scope,
			$modal: modal,
			apiFactory: mockApiFactory,
			userFactory: mockUserFactory
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

	it("should open the modal with the correct data when called", function (){

		spyOn(modal, "open").and.callThrough();

		$scope.createTemplate();

		$rootScope.$apply();

		expect(modal.open).toHaveBeenCalledWith({
				templateUrl: "/client/views/modals/newTemplateModal.html",
				controller: "NewTemplateModalController"
			});

	});




});