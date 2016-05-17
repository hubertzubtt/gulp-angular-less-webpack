var template = require('./testDirective.html');

function DirectiveFn() {
	return {
		templateUrl: template,
		link: function($scope) {
			$scope.tests = "(tu jest zmienna dyrektywy)";
		}
	};
}

module.exports = DirectiveFn;
