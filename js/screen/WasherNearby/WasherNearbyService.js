/**
 * Created by mac on 05/05/2018.
 */
angular.module('WasherNearbyApp.services', []).factory('WasherNearbyService',
    ["$http", "CONSTANTS", "$q", function ($http, CONSTANTS, $q) {
        var factory = {
            postData: postData,
            createOrder: createOrder,
            createWasher: createWasher,
            getMySellerOrder: getMySellerOrder,
            getMyWasher: getMyWasher,
            updateWasher: updateWasher

        };
        var promise;
        return factory;
        /**
         *
         * @param object
         * @param access_token
         * @returns {*}
         */
        function postData (object, access_token) {
            console.log("#postData start");
            var deferred = $q.defer();
            $http.post(CONSTANTS.urlPost, object, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#postData end");
            return deferred.promise;
        }

        /**
         *
         * @param object
         * @param access_token
         * @returns {*}
         */
        function createOrder (object, access_token) {
            console.log("#postData start");
            var deferred = $q.defer();
            $http.post(CONSTANTS.urlCreateOrder, object, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#postData end");
            return deferred.promise;
        }

        function createWasher (object, access_token) {
            console.log("#createWasher start");
            var deferred = $q.defer();
            $http.post(CONSTANTS.urlCreateWasher, object, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#createWasher end");
            return deferred.promise;
        }

        function updateWasher (object, access_token) {
            console.log("#createWasher start");
            var deferred = $q.defer();
            $http.put(CONSTANTS.urlUpdateWasher, object, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#createWasher end");
            return deferred.promise;
        }

        function getMySellerOrder (access_token) {
            console.log("#getSellerOrder start");
            var deferred = $q.defer();
            $http.get(CONSTANTS.urlGetMySellerOrder, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#getSellerOrder end");
            return deferred.promise;
        }

        function getMyWasher (access_token) {
            console.log("#getSellerOrder start");
            var deferred = $q.defer();
            $http.get(CONSTANTS.urlGetMyWasher, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#getSellerOrder end");
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
