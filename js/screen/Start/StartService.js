/**
 * Created by mac on 05/05/2018.
 */
angular.module('StartApp.services', []).factory('StartService',
    ["$localStorage", "$http", "CONSTANTS", "$q", "$sce", function ($localStorage, $http, CONSTANTS, $q, $sce) {
        var factory = {
            getAddress: getAddress
        };
        var promise;


        return factory;

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


        function setConfig(access_token) {
            var config = {
                headers: {
                    "Token": access_token
                }
            };
            return config;
        }

    }]);
