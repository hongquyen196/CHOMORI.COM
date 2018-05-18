/**
 * Created by mac on 05/05/2018.
 */
angular.module('BuyerOrderApp.services', []).factory('BuyerOrderService',
    ["$http", "CONSTANTS", "$q", function ($http, CONSTANTS, $q) {
        var factory = {
            postData: postData
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
