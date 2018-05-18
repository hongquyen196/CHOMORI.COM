/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('StartApp.controllers', []);

moduleController.controller('StartCtrl', ['$scope', '$localStorage', 'StartService',
    function ($scope, $localStorage, StartService) {
        //if($localStorage.access_token != undefined) {
        //    location.href = "./washerNearby.html";
        //}

        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        }

    }]);




