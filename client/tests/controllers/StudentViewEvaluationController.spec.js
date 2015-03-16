describe('StudentViewEvaluationController', function () {

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var deferred1;
	var deferred2;

	var mockRouteParams = {
		courseID: "vef2",
		semesterID: "20151",
		evalID: 123
	};

	var evaluationResults = {
		CourseQuestions: [

		],
		Teacher: [

		],
		IntroText: "evaluation for vef2",
		templateID: 12,
		Title: "midterm evaluation"
	};

	var teachersArray = [{
		Username: "baering10",
		FullName: "Bæring",
		Role: "teacher"
	}, {
		Username: "dabs",
		FullName: "Daníel",
		Role: "teacher"
	}];

	var mockApiFactory;
	var mockUserFactory;



	beforeEach(module("schoolApp"));

	beforeEach(function () {

		mockApiFactory = {
			studentGetEvaluation: function () {
				deferred1 = $q.defer();
				return deferred1.promise;
			},
			studentGetTeachers: function () {
				deferred2 = $q.defer();
				return deferred2.promise;
			}
		};

		mockUserFactory = {
			checkValid: function () {

			}
		};

	});

	beforeEach(inject(function (_$q_, _$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		$q = _$q_;

		$controller = _$controller_("StudentViewEvaluationController", {
			$scope: $scope,
			$routeParams: mockRouteParams,
			apiFactory: mockApiFactory
		});

	}));

	it("should initialize data when created", function () {

		expect($scope.evaluationVariables.courseID).toEqual("vef2");
		expect($scope.evaluationVariables.semesterID).toEqual("20151");
		expect($scope.evaluationVariables.evalID).toEqual(123);
		expect($scope.evaluation.teachers).toBeNull();
		expect($scope.evaluation.data).toBeDefined();

	});

	it("should populate evaluation.teachers after initialization", function () {

		$scope.init();

		deferred2.resolve({
			data: teachersArray
		});

		$rootScope.$apply();

		expect($scope.evaluation.teachers).toEqual(teachersArray);

	});

	it("should populate evaluation.data after initialization", function () {

		$scope.init();

		deferred1.resolve({
			data: evaluationResults
		});

		$rootScope.$apply();

		expect($scope.evaluation.data).toEqual(evaluationResults);

	});

	it("should only post questions that have answers", function (){

		$scope.answers = {
			1: {
				QuestionID: 12,
				value: "asdf"
			},
			2: {
				QuestionID: 13
			}	
		};

		$scope.sendEvaluation();

		expect($scope.evaluationAnswers).toEqual([{QuestionID: 12, value: "asdf"}]);

	});


});