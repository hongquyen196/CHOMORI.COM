/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('StartApp.controllers', []);

moduleController.controller('StartCtrl', ['$scope', '$localStorage', '$window', 'StartService',
    function ($scope, $localStorage, $window, StartService) {

        $window.localStorage.clear();
        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        }

    }]);




