/**
 * Created by mac on 05/05/2018.
 */
angular.module('SignupApp.services', []).factory('SignupService',
    ["$http", "CONSTANTS", "$q", function ($http, CONSTANTS, $q) {
        var factory = {
            postData: postData
        };
        return factory;
        var promise;

        /**
         *
         * @param object
         * @returns {*|e.promise|Function|promise|i.promise}
         */
        function postData (object) {
            console.log("#postData start");
            var deferred = $q.defer();
            $http.post(CONSTANTS.urlPost, object).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#postData end");
            return deferred.promise;
        }
    }]);
