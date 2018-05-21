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


        $scope.list_washer = [];
        if ($scope.isUser) {
            if ($localStorage.data_searched != undefined) {
                if ($localStorage.data_searched.data.data_count == 0) {
                    $scope.showAlert("Thông báo", "Không tìm thấy máy giặt nào.");
                } else {
                    $scope.list_washer = $localStorage.data_searched.data.list_washer;
                }
            }
        }
        else { //admin
            WasherNearbyService.getMyWasher($localStorage.access_token).then(function (data) {
                $localStorage.washer_id = data.data.washerId;
                WasherNearbyService.getMySellerOrder($localStorage.access_token).then(function (data) {
                    if (data.data.data_count == 0) {
                        //$scope.showAlert("Thông báo", "Bạn chưa có đơn hàng nào.");
                        if ($localStorage.washer_id != undefined) {
                            $('#orderModal').modal('show');
                        }
                    } else {
                        $scope.list_washer = data.data.list_washer;
                        if ($scope.list_washer.length > 0) {
                            var location = JSON.parse($scope.list_washer[0].map_data);
                            $scope.map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 15,
                                //center: new google.maps.LatLng(16.4581519, 107.5961825),
                                center: new google.maps.LatLng(location.lat, location.lng)
                            });
                            this.marker = new google.maps.Marker({
                                position: new google.maps.LatLng(location.lat, location.lng),
                                icon: './ico/17481343_zS0_icon.ico',
                                map: $scope.map
                            });
                        }
                    }
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert("", response.data.meta.message);
                });
            }).catch(function (response) {
                console.log('Gists error', response.status, response.data);
                if (response.status == 400) {
                    $('#washerModal').modal('show');
                }
            });

        }

        $scope.initialize = function () {
            var location = undefined;
            if ($scope.list_washer.length > 0) {
                location = JSON.parse($scope.list_washer[0].map_data);
            }
            if (location == undefined) {
                location.lat = 16.4581519;
                location.lng = 107.5961825;
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(location.lat, location.lng)
            });
            $scope.list_washer.forEach(function (washer) {
                location = JSON.parse(washer.map_data);
                this.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(location.lat, location.lng),
                    icon: './ico/17481383_Dhc_icon.ico',
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
                    if (response.status == 403) {
                        $scope.showAlert("Lỗi tạo đơn hàng", "Bạn không có quyền truy cập chức năng này.");
                    } else if (response.status == 400) {
                        $scope.showAlert("Lỗi tạo đơn hàng", response.data.meta.message);
                    }
                });
            }, function () {
                //
            });
        };


        $scope.addWasher = undefined;
        $scope.map_data = undefined;
        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Trình duyệt của bạn không hỗ trợ xác định vị trí.";
            }
        };
        function showPosition(position) {
            console.log("Vĩ độ: " + position.coords.latitude +
                "Kinh độ: " + position.coords.longitude);
            $scope.map_data = {
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            }
        }
        $scope.washer_id = undefined;
        $scope.addWasherSubmit = function () {
            if ($scope.addWasher != undefined && $scope.map_data != undefined) {
                $scope.addWasher.image_url = "g4.jpg";
                $scope.addWasher.map_data = JSON.stringify($scope.map_data);
                console.log($scope.addWasher);
                WasherNearbyService.createWasher($scope.addWasher, $localStorage.access_token).then(function (data) {
                    $localStorage.washer_id = data.data.washer_id;
                    $scope.washer_id = data.data.washer_id;
                    $('#washerModal').modal('hide');
                    $('#orderModal').modal('show');
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    if (response.status == 403) {
                        $('#washerModal').modal('hide');
                        $scope.showAlert("Lỗi thêm máy", "Bạn không có quyền truy cập chức năng này.");
                    } else if (response.status == 400) {
                        alert(response.data.meta.message);
                    }
                });
            }
        };


        $scope.sellerOrder = undefined;
        if ($scope.sellerOrder == undefined) $scope.sellerOrder = $localStorage.sellerOrderTemp;

        $scope.addOrderSubmit = function () {
            if ($scope.washer_id != undefined || $localStorage.washer_id != undefined) {
                console.log($scope.sellerOrder);
                $scope.sellerOrder.washer_id = $localStorage.washer_id;
                WasherNearbyService.createOrder($scope.sellerOrder, $localStorage.access_token).then(function (data) {
                    console.log(data);
                    $scope.redirectPage("./washerNearby.html");
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    if (response.status == 403) {
                        $('#washerModal').modal('hide');
                        $scope.showAlert("Lỗi tạo đơn hàng", "Bạn không có quyền truy cập chức năng này.");
                    } else if (response.status == 400) {
                        alert(response.data.meta.message);
                    }
                    $scope.saveDataTemp();
                });
            }
        };


        $scope.saveDataTemp = function() {
            $localStorage.sellerOrderTemp = $scope.sellerOrder;
        };




        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        };

        $scope.openPage = function (redirectUrl) {
            window.open(redirectUrl);
        };


    }]);



