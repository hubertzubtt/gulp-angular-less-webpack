require('./travelView.html');

ControllerFn.$inject = ['$scope', 'commonService'];

function ControllerFn($scope, commonService) {
	$scope.dane = commonService.metoda();
}

module.exports = ControllerFn;