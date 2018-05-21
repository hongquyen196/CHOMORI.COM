/**
 * Created by mac on 05/05/2018.
 */
var moduleController = angular.module('BuyerOrderApp.controllers', []);

moduleController.controller('BuyerOrderCtrl', ['$scope', '$localStorage', '$sessionStorage', '$window', '$mdDialog', '$timeout', 'BuyerOrderService',
    function ($scope, $localStorage, $sessionStorage, $window, $mdDialog, $timeout, BuyerOrderService) {
        $scope.isUser = $localStorage.type == 0 ? true : false;

        $scope.setStyle = {
            "height": $window.innerHeight - 18 * $window.innerHeight / 100 + "px"
        };

        console.log($localStorage.access_token);
        $scope.list_order = [];

        if ($scope.isUser) {
            BuyerOrderService.getData($localStorage.access_token).then(function (data) {
                $scope.list_order = data.data.list_order;
                //$localStorage.list_order = $scope.list_order;
            }).catch(function (response) {
                //console.log('Gists error', response.status, response.data);
                if (response.status == 403) {
                    $scope.showConfirm("Lỗi lấy dữ liệu", "Bạn không có quyền truy cập chức năng này.");
                } else {
                    $scope.showAlert("Có lỗi xãy ra.", "");
                }
            });
        } else {
            BuyerOrderService.getBuyerOrder($localStorage.access_token).then(function (data) {
                $scope.list_order = data.data.list_order;
                //$localStorage.list_order = $scope.list_order;
            }).catch(function (response) {
                //console.log('Gists error', response.status, response.data);
                if (response.status == 403) {
                    $scope.showConfirm("Lỗi lấy dữ liệu", "Bạn không có quyền truy cập chức năng này.");
                } else {
                    $scope.showAlert("Có lỗi xãy ra.", "");
                }
            });
        }



        $scope.selectOrder = function (item) {
            //if ($scope.isUser) {
                if ((item.status == 1 || item.status == 0) && item.buy_status == 0) {
                    $localStorage.buyer_order_id = item.id;
                    $localStorage.seller_order_id = item.seller_order_id;
                    $scope.redirectPage('./comfirm.html');
                } else {
                    $scope.showAlert("Thông tin đơn hàng", "Thông tin này đã bị ẩn");
                }
            //} else {
            //    if (item.status == 1 && item.buy_status == 1){
            //        //Xác nhận để hoàn tất 1 đơn hàng
            //        $localStorage.buyer_order_id = item.id;
            //        $localStorage.seller_order_id = item.seller_order_id;
            //        $scope.redirectPage('./comfirm.html');
            //    } else {
            //        $scope.showAlert("Thông tin đơn hàng", "Thông tin này đã bị ẩn");
            //    }
            //}

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
        };

        $scope.openPage = function (redirectUrl) {
            window.open(redirectUrl);
        };
    }]);




