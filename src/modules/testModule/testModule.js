var angular = require('angular');
var style = require('./style/testModule.less');

var testView = require('./views/testView/testView');
var testDirective = require('./directives/testDirective/testDirective');

var MODULE_NAME = 'gtmsApp.testModule';

angular.module(MODULE_NAME, [])
    .controller('testView', testView)
    .directive('testDirective', testDirective)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'testView',
                templateUrl: 'modules/testModule/views/testView/testView.html'
            })
            .otherwise('/');
    }]);


module.exports = MODULE_NAME;
