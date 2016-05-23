var angular = require('angular');

var commonService = require('./services/commonService/commonService');

var MODULE_NAME = 'testApp.commonModule';

angular.module(MODULE_NAME, [])
    .service('commonService', commonService);


module.exports = MODULE_NAME;
