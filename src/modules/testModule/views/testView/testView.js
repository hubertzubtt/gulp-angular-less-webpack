var template = require('./testView.html');

Controller.$inject = ['$scope'];

function Controller($scope) {
	$scope.test = '(test zmiennej kontrolera)';
}

module.exports = Controller;