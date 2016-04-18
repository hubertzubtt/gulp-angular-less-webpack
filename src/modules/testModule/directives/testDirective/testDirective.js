var template = require('./testDirective.html');

function DirectiveFn() {
	return {
		templateUrl: template,
		link: function($scope) {
			$scope.tests = "Zmienna dyrektywy";
		} 
	};
}

module.exports = DirectiveFn;
