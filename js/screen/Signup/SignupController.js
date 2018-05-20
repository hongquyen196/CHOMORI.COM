/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('SignupApp.controllers', []);

moduleController.controller('SignupCtrl', ['$scope', '$localStorage', '$mdDialog', '$timeout', 'SignupService',
    function ($scope, $localStorage, $mdDialog, $timeout, SignupService) {
        console.log($localStorage.access_token);

        $scope.signup = {
            "full_name": "Hoàng Thị Thu Thủy",
            "phone": "01269685896",
            "email": "tiffanyhoangf@gmail.com",
            "password": "123",
            "re_password": "123",
            "user_type": 0
        };
        $scope.signupSubmit = function () {
            console.log($scope.signup);
            if ($scope.signup && $scope.signup !== 'null' && $scope.signup !== undefined) {
                SignupService.postData($scope.signup).then(function (data) {
                    console.log($localStorage.access_token);
                    $localStorage.username = data.data.username;
                    $localStorage.access_token = data.data.access_token;
                    $scope.showConfirm("Chào mừng bạn!", "Tên đăng nhập của bạn là: " + $localStorage.username + ". Hãy ghi nhớ tên đăng nhập để có thể đăng nhập sau này.");
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert(response.data.meta.code, response.data.meta.message);
                });
            }
        };

        $scope.showConfirm = function (title, content) {
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(content)
                .ok('Đồng ý')
            $mdDialog.show(confirm).then(function () {
                $timeout(function () {
                    $scope.redirectPage('./washerNearby.html');
                }, 1000);
            });
        };

        $scope.showAlert = function (title, content) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(title)
                    .textContent(content)
                    .ok('Đồng ý')
            );
        };

        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        }
    }]);




