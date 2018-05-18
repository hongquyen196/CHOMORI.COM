/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('WasherNearbyApp.controllers', []);

moduleController.controller('WasherNearbyCtrl', ['$scope', '$localStorage', '$sessionStorage', '$window', '$mdDialog', 'WasherNearbyService',
    function ($scope, $localStorage, $sessionStorage, $window, $mdDialog, WasherNearbyService) {

        $scope.setStyle = {
            "height": $window.innerHeight - 13 * $window.innerHeight / 100 + "px"
        };
        $scope.direction = ($window.innerWidth < 360 ? "right" : "down");
        $scope.selectedMode = 'md-scale';


        $scope.listMarker = [];
        $scope.initialize = function () {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: new google.maps.LatLng(16.4581519, 107.5961825),
                mapTypeId: 'roadmap',
                scrollwheel: false

            });
            // Create markers.
            var i = 0;
            $scope.features.forEach(function (feature) {
                var object = {
                    id: i++,
                    marker: new google.maps.Marker({
                        position: feature.position,
                        icon: $scope.icons[feature.type].icon,
                        map: $scope.map
                    })
                };
//                console.log(object);
                $scope.listMarker.push(object);
            });
        };

        $scope.features = [
            {
                position: new google.maps.LatLng("16.4581519", "107.5961825"),
                type: '24'
            },
            {
                position: new google.maps.LatLng(16.4549983, 107.6025903),
                type: '25'
            },
            {
                position: new google.maps.LatLng(16.4539983, 107.6225903),
                type: '24'
            },
            {
                position: new google.maps.LatLng(16.4529983, 107.6325903),
                type: '25'
            },
            {
                position: new google.maps.LatLng(16.4579983, 107.6425903),
                type: '24'
            },
            {
                position: new google.maps.LatLng(16.4559983, 107.6525903),
                type: '25'
            },
            {
                position: new google.maps.LatLng(16.4569983, 107.6625903),
                type: '24'
            }
        ];

        //var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        $scope.icons = {
            24: {
                icon: './ico/17481343_zS0_icon.ico'
            },
            25: {
                icon: './ico/17481383_Dhc_icon.ico'
            }
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize);

        for (var mgoogle in $scope.listMarker) {
            google.maps.event.addListener(mgoogle, 'click', function () {
                var infowindow = new mgoogle.maps.InfoWindow({
                    content: "Hello World!"
                });
                infowindow.open($scope.map, mgoogle);
            });
        }


        /*end maps*/

        /**
         * Sidenav
         * @param page
         */




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




