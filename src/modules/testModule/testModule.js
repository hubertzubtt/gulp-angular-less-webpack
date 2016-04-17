var angular = require('angular');
var style = require('./style/testModule.less');

var testView = require('./views/testView/testView');
var testDirective = require('./directives/testDirective/testDirective');

angular.module('app.testModule', [])
    .controller('testView', testView)
    .directive('testDirective', testDirective);

module.exports = 'app.testModule';
