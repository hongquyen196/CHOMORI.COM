/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('ComfirmApp.controllers', []);

moduleController.controller('GoogleMapsCtrl', ['$scope', '$localStorage', 'GoogleMapsService',
    function ($scope, $localStorage, GoogleMapsService) {

        GoogleMapsService.init();

    }]);




