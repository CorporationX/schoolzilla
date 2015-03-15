describe('apiFactory', function () {

	var apiFactory;
	var $httpBackend;

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_apiFactory_, _$httpBackend_) {

		$httpBackend = _$httpBackend_;
		apiFactory = _apiFactory_;

	}));

	it("should post to the login route with the username and password provided", function () {

		$httpBackend.expect("POST", "http://dispatch.ru.is/demo/api/v1/login", {
			user: "kristjanj11",
			pass: 123456
		}).respond(200);

		apiFactory.login("kristjanj11", 123456);

		$httpBackend.flush();

	});

	it("should get the student evaluations when requested", function () {

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/my/evaluations").respond(200);

		apiFactory.studentGetEvaluations();

		$httpBackend.flush();

	});


	it("should get the student evaluation when requested", function () {

		var evaluationVariables = {
			courseID: "vef2",
			semesterID: "20151",
			evalID: 123
		};

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/courses/vef2/20151/evaluations/123").respond(200);

		apiFactory.studentGetEvaluation(evaluationVariables);

		$httpBackend.flush();

	});

	it("should get the students teachers when requested", function () {

		var evaluationVariables = {
			courseID: "vef2",
			semesterID: "20151",
			evalID: 123
		};

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/courses/vef2/20151/teachers").respond(200);

		apiFactory.studentGetTeachers(evaluationVariables);

		$httpBackend.flush();

	});


	afterEach(function () {

		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();

	});

});