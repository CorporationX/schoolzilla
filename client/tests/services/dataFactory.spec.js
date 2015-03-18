describe('dataFactory', function () {

	var dataFactory;
	var $rootScope;

	var evaluationResult = {
		data: {
			Course: [],
			ID: 1,
			TemplateID: 4,
			TemplateTitle: "temp title 1"
		}
	};

	beforeEach(module("schoolApp"));

	beforeEach(inject(function (_dataFactory_, _$rootScope_) {

		dataFactory = _dataFactory_;
		$rootScope = _$rootScope_;

	}));

	it("should set the evaluation result ", function () {

		dataFactory.setEvaluationResults(evaluationResult);

		expect($rootScope.evaluationResults).toEqual(evaluationResult);

	});



	it("should get the token", function () {

		dataFactory.setEvaluationResults(evaluationResult);

		expect(dataFactory.getEvaluationResults()).toEqual(evaluationResult);

	});


});