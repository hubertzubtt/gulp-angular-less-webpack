var angular = require('angular');

var travelView = require('./views/travelView/travelView');

var MODULE_NAME = 'testApp.travelModule';

angular.module(MODULE_NAME, [])
    .controller('travelView', travelView)
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('travel', {
                url: '^/travel',
                controller: 'travelView',
                templateUrl: 'modules/travelModule/views/travelView/travelView.html'
            });
    }]);

module.exports = MODULE_NAME;
