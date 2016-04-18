var indexFile = require('file?name=[name].[ext]!./index.html');

// angular deps 
var angular = require('angular'),
    angularRoute = require('angular-route');

// app modules
var testModule = require('./modules/testModule/testModule'),
    travelModule = require('./modules/travelModule/travelModule'),
    commonModule = require('./modules/commonModule/commonModule');

// app layout
require('./layouts/mainLayout.less');

angular.module('gtmsApp', [

    // angular deps
    angularRoute,

    // app modules
    testModule,
    travelModule,
    commonModule

]);