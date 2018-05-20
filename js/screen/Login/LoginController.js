/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('LoginApp.controllers', []);

moduleController.controller('LoginCtrl', ['$scope', '$localStorage', 'LoginService',
    function ($scope, $localStorage, LoginService) {
        console.log($localStorage.access_token);
        $scope.login = {};
        $scope.login.username = "00003";
        $scope.login.password = "123";
        $scope.loginSubmit = function () {
            if ($scope.login.username !== undefined && $scope.login.password !== undefined) {
                LoginService.postData($scope.login).then(function (data) {
                    console.log($localStorage.access_token);
                    $localStorage.username = data.data.username;
                    $localStorage.type = data.data.type;
                    $localStorage.access_token = data.data.access_token;
                    $scope.redirectPage('./washerNearby.html');
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                });
            }
        };
        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        }
    }]);


moduleController.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    //$httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    //$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
});




