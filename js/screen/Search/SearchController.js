/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('SearchApp.controllers', []);

moduleController.controller('SearchCtrl', ['$scope', '$localStorage', '$sessionStorage', 'SearchService',
    function ($scope, $localStorage, $sessionStorage, SearchService) {
        console.log($localStorage.access_token);
        $scope.street = "";
        $scope.ward = "";
        $scope.city = "";
        $scope.searchSubmit = function () {
            if ($scope.street != "" || $scope.ward != "" || $scope.city != "") {
                var strData = "street=" + $scope.street + "&ward=" + $scope.ward + "&city=" + $scope.city;
                SearchService.getData(strData, $localStorage.access_token).then(function (data) {
                    $sessionStorage.dataSearched = data;
                    location.href = "./washerNearby.html";
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                });
            }
        };
        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        }
    }]);



