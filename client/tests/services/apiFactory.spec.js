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

	it("should get the admin evaluations when requested", function () {

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/evaluations").respond(200);

		apiFactory.adminGetEvaluations();

		$httpBackend.flush();

	});

	it("should get the admin templates when requested", function () {

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/evaluationtemplates").respond(200);

		apiFactory.adminGetTemplates();

		$httpBackend.flush();

	});

	it("should get the student evaluation when requested", function () {

		var templateID = 12;

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/evaluationtemplates/12").respond(200);

		apiFactory.adminGetTemplate(templateID);

		$httpBackend.flush();

	});

	it("should post the evaluation", function () {

		var evaluationVariables = {
			courseID: "vef2",
			semesterID: "20151",
			evalID: 123
		};

		var evaluationItems = [{
			QuestionID: 1,
			Value: "good"
		}];

		$httpBackend.expect("POST", "http://dispatch.ru.is/demo/api/v1/courses/vef2/20151/evaluations/123", evaluationItems).respond(200);

		apiFactory.studentPostEvaluation(evaluationVariables, evaluationItems);

		$httpBackend.flush();

	});


	it("should get the evaluation", function () {

		var templateID = 12;

		$httpBackend.expect("GET", "http://dispatch.ru.is/demo/api/v1/evaluations/12").respond(200);

		apiFactory.adminGetEvaluation(templateID);

		$httpBackend.flush();

	});

	it("should post the template", function () {

		var template = {
			Title: "midannarmat",
			TitleEN: "midterm",
			IntroText: "jamm",
			IntroTextEN: "yup",
			CourseQuestions: [{
				Text: "rett",
				TextEN: "correct",
				ImageURL: "",
				Type: "text"
			}],
			TeacherQuestions: []
		};

		$httpBackend.expect("POST", "http://dispatch.ru.is/demo/api/v1/evaluationtemplates", template).respond(200);

		apiFactory.adminPostTemplate(template);

		$httpBackend.flush();

	});

	afterEach(function () {

		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();

	});

});