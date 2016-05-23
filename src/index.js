var indexFile = require('file?name=[name].[ext]!./index.html');

// angular deps
var angular = require('angular'),
    angularUiRouter = require('angular-ui-router');

// app modules
var testModule = require('./modules/testModule/testModule'),
    travelModule = require('./modules/travelModule/travelModule'),
    commonModule = require('./modules/commonModule/commonModule');

// app layout
require('./layouts/mainLayout.less');

angular.module('testApp', [

    // angular deps
    angularUiRouter,

    // app modules
    testModule,
    travelModule,
    commonModule

]);