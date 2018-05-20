/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('WasherNearbyApp.controllers', []);
moduleController.controller('WasherNearbyCtrl', ['$scope', '$localStorage', '$sessionStorage', '$window', '$mdDialog', 'WasherNearbyService',
    function ($scope, $localStorage, $sessionStorage, $window, $mdDialog, WasherNearbyService) {
        $scope.isUser = $localStorage.type == 0 ? true : false;
        $scope.setStyle = {
            "height": $window.innerHeight - 13 * $window.innerHeight / 100 + "px"
        };
        $scope.direction = ($window.innerWidth < 360 ? "right" : "down");
        $scope.selectedMode = 'md-scale';

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

        $scope.list_washer = [];
        if ($localStorage.data_searched != undefined) {
            $scope.list_washer = $localStorage.data_searched.data.list_washer;
        }

        $scope.initialize = function () {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: new google.maps.LatLng(16.4581519, 107.5961825),
                mapTypeId: 'roadmap',
                scrollwheel: false

            });
            var location;
            $scope.list_washer.forEach(function (washer) {
                location = JSON.parse(washer.map_data);
                this.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location.lat, location.lng),
                    icon: './ico/17481343_zS0_icon.ico',
                    map: $scope.map
                });
            });
        };
        google.maps.event.addDomListener(window, 'load', $scope.initialize);


        $scope.imagePath = "./img/washer/";
        $scope.messengerPath = "https://www.messenger.com/t/";

        if ($localStorage.username != undefined) {
            $scope.user_id = $localStorage.username.substr(4);
        }
        $scope.washer = {};
        $scope.order = {};
        $localStorage.buyer_order_comfirm = {};
        $localStorage.contact_order = {};

        $scope.showConfirm = function (index) {
            var confirm = $mdDialog.confirm()
                .title('Bạn có chắc chắn muốn thuê và sử dụng máy giặt này không?')
                .textContent('Khi đồng ý thuê máy giặt, một mới đơn hàng sẽ được tạo trên hệ thống.')
                .ok('Đồng ý thuê')
                .cancel('Hủy');
            $mdDialog.show(confirm).then(function () {
                $scope.washer = $scope.list_washer[index];
                $scope.order = {
                    "id": $scope.washer.id,               //id của đơn hàng bán
                    "washer_id": $scope.washer.washer_id,  //mã máy đơn hàng bán
                    "buy_price": $scope.washer.sale_price,  //giá mua = giá bán
                    "payment_type": 1,
                    "user_id": $localStorage.username.substr(4)
                };
                WasherNearbyService.postData($scope.order, $localStorage.access_token).then(function (data) {
                    $localStorage.buyer_order_id = data.data.id;
                    $localStorage.seller_order_id = $scope.washer.id;
                    location.href = "./comfirm.html";
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert("", response.data.meta.message);
                });
            }, function () {
                //
            });
        };

        $scope.showAlert = function (message, content) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(message)
                    .textContent(content)
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



