var indexFile = require('file?name=[name].[ext]!./index.html');
var angular = require('angular');
var angularRoute = require('angular-route');

var testModule = require('./modules/testModule/testModule');

angular.module('zapp', [
    angularRoute,

    testModule
])

.config(['$routeProvider', function($routeProvider) {
	console.info("NO CZE");
    $routeProvider
        .when('/', {
            controller: 'testView',
            templateUrl: 'modules/testModule/views/testView/testView.html'
        })
        .otherwise('/');
}]);
