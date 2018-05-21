/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('ComfirmApp.controllers', []);
var isDlgOpen;
moduleController.controller('ComfirmCtrl', ['$scope', '$localStorage', '$window', '$mdDialog', '$timeout', 'ComfirmService',
    function ($scope, $localStorage, $window, $mdDialog, $timeout, ComfirmService) {
        $scope.isUser = $localStorage.type == 0 ? true : false;
        $scope.setStyle = {
            "height": $window.innerHeight - 20 * $window.innerHeight / 100 + "px"
        };
        console.log($localStorage.access_token);
        $scope.imagePath = "./img/washer/";
        $scope.messengerPath = "https://www.messenger.com/t/";
        //if ($localStorage.contact_order != undefined) {
        //    $scope.phone = $localStorage.contact_order.contact.phone;
        //    $scope.messeger = $scope.messengerPath + $localStorage.contact_order.contact.facebook;
        //    $scope.address =  $localStorage.contact_order.contact.address;
        //    $scope.location =  $localStorage.contact_order.location;
        //}
        $scope.seller_order = {};
        $scope.map_data = {};
        if ($scope.isUser) {
            if ($localStorage.seller_order_id != undefined) {
                ComfirmService.getData($localStorage.seller_order_id, $localStorage.access_token).then(function (data) {
                    $scope.seller_order = data.data;
                    $scope.map_data = JSON.parse($scope.seller_order.user_info.map_data);
                    $scope.seller_order.image = $scope.imagePath + $scope.seller_order.image;
                    console.log($scope.seller_order);
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert('Có lỗi xãy ra.', response.data.meta.message);
                });
            }
        } else {
            if ($localStorage.seller_order_id != undefined) {
                ComfirmService.getSellerOrder($localStorage.seller_order_id, $localStorage.access_token).then(function (data) {
                    $scope.seller_order = data.data;
                    $scope.map_data = JSON.parse($scope.seller_order.user_info.map_data);
                    $scope.seller_order.image = $scope.imagePath + $scope.seller_order.image;
                    console.log($scope.seller_order);
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert('Có lỗi xãy ra.', response.data.meta.message);
                });
            }
        }

        $scope.okCancelSubmit = function (flag) {
            if ($scope.isUser) {
                var comfirm = {
                    "id": $localStorage.buyer_order_id,
                    "comfirm_flag": flag
                };
                console.log(comfirm);
                ComfirmService.putData(comfirm, $localStorage.access_token).then(function (data) {
                    $scope.showConfirm(data.meta.code, data.meta.message);
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert(response.data.meta.code, response.data.meta.message);
                });
            } else {
                var comfirm = {
                    "id": $localStorage.buyer_order_id,
                    "seller_order_id": $localStorage.seller_order_id,
                    "comfirm_flag": flag
                };
                console.log(comfirm);
                ComfirmService.sellerComfirm(comfirm, $localStorage.access_token).then(function (data) {
                    $scope.showConfirm(data.meta.code, data.meta.message);
                }).catch(function (response) {
                    console.log('Gists error', response.status, response.data);
                    $scope.showAlert(response.data.meta.code, response.data.meta.message);
                });
            }
        };

        $scope.okDoneSubmit = function () {
            if (!$scope.isUser) {
                var comfirm = {
                    "id": $localStorage.buyer_order_id,
                    "seller_order_id": $localStorage.seller_order_id,
                };
                console.log(comfirm);
                ComfirmService.sellerComfirmDone(comfirm, $localStorage.access_token).then(function (data) {
                    $scope.showConfirm(data.meta.code, data.meta.message);
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
                .ok('Hoàn tất')
                .cancel('Xem các đơn hàng');
            $mdDialog.show(confirm).then(function () {
                $timeout(function () {
                    $scope.redirectPage('./washerNearby.html');
                }, 1000);
            }, function () {
                $timeout(function () {
                    $scope.redirectPage('./buyerOrder.html');
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


        $('#myModal').on('shown.bs.modal', function () {
            ComfirmService.init();
            ComfirmService.addMarkerCustom($scope.map_data);
        });


        $scope.redirectPage = function (redirectUrl) {
            location.href = redirectUrl;
        };

        $scope.openPage = function (redirectUrl) {
            window.open(redirectUrl);
        };
    }]);


