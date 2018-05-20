/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('SearchApp.controllers', []);

moduleController.controller('SearchCtrl', ['$scope', '$localStorage', '$mdDialog', '$timeout', 'SearchService',
    function ($scope, $localStorage, $mdDialog, $timeout, SearchService) {
        console.log($localStorage.access_token);
        $scope.street = "";
        $scope.ward = "";
        $scope.city = "";
        $scope.searchSubmit = function () {
            if ($scope.street != "" || $scope.ward != "" || $scope.city != "") {
                var strData = "street=" + $scope.street + "&ward=" + $scope.ward + "&city=" + $scope.city;
                SearchService.getData(strData, $localStorage.access_token).then(function (data) {
                    $localStorage.data_searched = data;
                    location.href = "./washerNearby.html";
                }).catch(function (response) {
                    if (response.status == 403) {
                        $scope.showConfirm("Lỗi tìm kiếm", "Bạn không có quyền truy cập chức năng này.");
                    }
                });
            }
        };

        $scope.showConfirm = function (title, content) {
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(content)
                .ok('Đồng ý')
                .cancel('Hủy');
            $mdDialog.show(confirm).then(function () {
                $timeout(function () {
                    $scope.redirectPage('./washerNearby.html');
                }, 1000);
            }, function () {
                //
            });
        };

        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        }
    }]);



