var angular = require('angular');

var travelView = require('./views/travelView/travelView');

var MODULE_NAME = 'gtmsApp.travelModule';

angular.module(MODULE_NAME, [])
    .controller('travelView', travelView)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/travel', {
                controller: 'travelView',
                templateUrl: 'modules/travelModule/views/travelView/travelView.html'
            });
    }]);

module.exports = MODULE_NAME;