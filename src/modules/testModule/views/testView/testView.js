var template = require('./testView.html');

Controller.$inject = ['$scope'];

function Controller($scope) {
	$scope.test = 'ABCDEf';
}

module.exports = Controller;