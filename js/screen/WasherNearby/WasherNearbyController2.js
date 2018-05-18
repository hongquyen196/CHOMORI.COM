/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('WasherNearbyApp.controllers', []);

moduleController.controller('WasherNearbyCtrl', ['$scope', '$localStorage', '$sessionStorage', '$window', 'WasherNearbyService',
    function ($scope, $localStorage, $sessionStorage, $window, WasherNearbyService) {

        $scope.setStyle = {
            "height": $window.innerHeight - 13 * $window.innerHeight / 100 + "px"
        };
        $scope.direction = ($window.innerWidth < 360 ? "right" : "down");

        $(document).resize(function () {
            $scope.setStyle = {
                "height": $window.innerHeight - 13 * $window.innerHeight / 100 + "px"
            };
            $scope.direction = $(window).width() < 360 ? "right" : "up";
        });






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


        $scope.goGo = function (page) {
            window.location.href = page;
        };


        $scope.alert = function (x) {
            alert(x);
        };


        $scope.isOpen = false;

        $scope.selectedMode = 'md-scale';


        var imagePath = '/src/tile.png';
        $scope.imagePath = './img/washer/g1.jpg';
        $scope.imagePath2 = './img/washer/g2.jpg';
        $scope.washer = [
            {
                image: './img/washer/g1.jpg',
                region: 'Phường An Đông',
                city: 'Thừa Thiên Huế',
                price: '12.000',
                content: 'Máy giặt giá rẻ'
            },
            {
                image: './img/washer/g2.jpg',
                region: 'Phường An Cựu',
                city: 'Thừa Thiên Huế',
                price: '15.000',
                content: 'Kèm cả sấy',
            },
            {
                image: './img/washer/g3.jpg',
                region: 'Phường Hương Hồ',
                city: 'Thừa Thiên Huế',
                price: '18.000',
                content: 'Giao đồ miễn phí'
            },
            {
                image: './img/washer/g4.jpg',
                region: 'Phường Vĩnh Ninh',
                city: 'Thừa Thiên Huế',
                price: '20.000',
                content: 'Kèm sấy, ủi'
            },
            {
                image: './img/washer/g1.jpg',
                region: 'Phường An Đông',
                city: 'Thừa Thiên Huế',
                price: '12.000',
                content: 'Máy giặt tốt'
            },
            {
                image: './img/washer/g2.jpg',
                region: 'Phường An Cựu',
                city: 'Thừa Thiên Huế',
                price: '15.000',
                content: 'Kèm cả sấy',
            },
            {
                image: './img/washer/g3.jpg',
                region: 'Phường Hương Hồ',
                city: 'Thừa Thiên Huế',
                price: '18.000',
                content: 'Giao đồ miễn phí'
            },
            {
                image: './img/washer/g4.jpg',
                region: 'Phường Vĩnh Ninh',
                city: 'Thừa Thiên Huế',
                price: '29.000',
                content: 'Kèm sấy, ủi'
            }
        ];

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




