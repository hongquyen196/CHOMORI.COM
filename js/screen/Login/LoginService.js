/**
 * Created by mac on 05/05/2018.
 */
angular.module('LoginApp.services', []).factory('LoginService',
    ["$localStorage", "$http", "CONSTANTS", "$q", "$sce", function ($localStorage, $http, CONSTANTS, $q, $sce) {
        var factory = {
            getData: getData,
            postData: postData,
            getAddress: getAddress
        };
        var promise;



        var config = {
          headers: {
              "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IjAwMDAxIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNTI2NDQ2NzcyfQ.bOmNzVIqpE5SbZG_qjhoQDjHBhsG-A3ZtcxlZ-qu_bmzDEb_ulRk3atM1QPdb2kDt9IQ4gbvzNrDM-3JFfnFrw"
          }
        };
        return factory;

        function getData() {
            console.log("#getData start");
            var url = "https://localhost:8080/api/user/logout";
            var deferred = $q.defer();
            $http.get(url, config).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#getData end");
            return deferred.promise;
        }


        /**
         * Login
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

        /**
         * Post normal test OK
         * @param object
         * @returns {*|e.promise|Function|promise|i.promise}
         */
        function postData2 (object) {
            console.log("#postData start");
            console.log("https://localhost:8080/api/user/checkToken");
            var deferred = $q.defer();
            object =  config.headers;
            $http.post("https://localhost:8080/api/user/checkToken", object).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#postData end");
            return deferred.promise;
        }


        function getAddress(zipcode) {
            console.log("#getAddress start");
            var url = "http://zipcloud.ibsnet.co.jp/api/search?zipcode=" + zipcode;
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var promise= $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'}).then(function(response) {
                    if (response.data.results != null) {
                        return response.data.results;

                    }
                }
                , function (errResponse) {
                    console.log("Error get data");
                });
            console.log("#getAddress end");
            return promise;
        }

    }]);
