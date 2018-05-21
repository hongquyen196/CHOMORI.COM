/**
 * Created by mac on 05/05/2018.
 */
angular.module('BuyerOrderApp.services', []).factory('BuyerOrderService',
    ["$http", "CONSTANTS", "$q", function ($http, CONSTANTS, $q) {
        var factory = {
            getData: getData,
            getBuyerOrder: getBuyerOrder
        };
        return factory;
        var promise;

        /**
         *
         * @param access_token
         * @returns {*}
         */
        function getBuyerOrder(access_token) {
            console.log("#getData start");
            var deferred = $q.defer();
            $http.get(CONSTANTS.urlGetBuyerOrder, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#getData end");
            return deferred.promise;
        }

        /**
         *
         * @param strData
         * @param access_token
         * @returns {*}
         */
        function getData(access_token) {
            console.log("#getData start");
            var deferred = $q.defer();
            $http.get(CONSTANTS.urlGet, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#getData end");
            return deferred.promise;
        }


        /**
         *
         * @param access_token
         * @returns {{headers: {Authorization: string}}}
         */
        function config(access_token) {
            return {
                headers: {
                    "Authorization": "Bearer " + access_token
                }
            };
        }

    }]);
