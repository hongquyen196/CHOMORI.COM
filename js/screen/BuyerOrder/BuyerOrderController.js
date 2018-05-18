/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('BuyerOrderApp.controllers', []);

moduleController.controller('BuyerOrderCtrl', ['$scope', '$localStorage', '$sessionStorage', '$window', '$mdDialog', 'BuyerOrderService',
    function ($scope, $localStorage, $sessionStorage, $window, $mdDialog, WasherNearbyService) {



        $scope.isOpenNav = false;
        $scope.openNav = function () {
            if ($scope.isOpenNav) {
                document.getElementById("mySidenav").style.width = "200px";
                $("md-content.main").css({"opacity": "0.3"});
//                document.body.style.opacity = "0.3";
            } else {
                document.getElementById("mySidenav").style.width = "0";
                $("md-content.main").css({"opacity": "unset"});
            }
            $scope.isOpenNav = !$scope.isOpenNav;
        };


        $scope.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }


        var imagePath = '/src/tile.png';
        $scope.imagePath = "./img/washer/";
        $scope.messengerPath = "https://www.messenger.com/t/";
        $scope.list_washer = [];
        if ($sessionStorage.dataSearched != undefined) {
            $scope.list_washer = $sessionStorage.dataSearched.data.list_washer;
            console.log($scope.list_washer)
        }
        if ($localStorage.username != undefined) {
            $scope.user_id = $localStorage.username.substr(4);
        }
        $scope.washer = {};
        $scope.order = {};
        $scope.showConfirm = function (index) {
            var confirm = $mdDialog.confirm()
                .title('Bạn có chắc chắn muốn thuê và sử dụng máy giặt này không?')
                .textContent('Khi đồng ý thuê máy giặt, một mới đơn hàng sẽ được tạo trên hệ thống.')
                .ok('Đồng ý thuê máy này')
                .cancel('Hủy');
            $mdDialog.show(confirm).then(function () {
                $scope.washer = $scope.list_washer[index];
                $scope.order = {
                    "id": $scope.washer.id,
                    "washer_id": $scope.washer.washer_id,
                    "buy_price": $scope.washer.sale_price,
                    "payment_type": 1,
                    "user_id": $localStorage.username.substr(4)
                };
                console.log($scope.order);
                WasherNearbyService.postData($scope.order, $localStorage.access_token).then(function (data) {
                    $localStorage.BuyerOrderId = data.data.id;
                    location.href = "./comfirm.html";
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert(response.data.meta.message);
                });
            }, function () {
                //
            });
        };

        $scope.showAlert = function(message) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(message)
                    .textContent('Bạn đã có đơn hàng trước đó hoặc đơn hàng chưa hoàn tất.')
                    .ok('Đồng ý')
            );
        };


        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        };

        $scope.openPage = function (redirectUrl) {
            window.open(redirectUrl);
        };
    }]);




