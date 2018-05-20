/**
 * Created by mac on 05/05/2018.
 */
angular.module('ComfirmApp.services', []).factory('ComfirmService',
    ["$http", "CONSTANTS", "$q", function ($http, CONSTANTS, $q) {
        var factory = {
            getData: getData,
            putData: putData,
            init: init,
            search: search,
            addMarker: addMarker,
            addMarkerCustom: addMarkerCustom
        };
        return factory;

        function init() {
            var options = {
                center: new google.maps.LatLng(16.4581519, 107.5961825),
                zoom: 17,
                disableDefaultUI: true
            };
            this.map = new google.maps.Map(
                document.getElementById("map"), options
            );
            this.places = new google.maps.places.PlacesService(this.map);
        }

        function search(str) {
            var d = $q.defer();
            this.places.textSearch({query: str}, function(results, status) {
                if (status == 'OK') {
                    d.resolve(results[0]);
                }
                else d.reject(status);
            });
            return d.promise;
        }

        function addMarker(res) {
            if(this.marker) this.marker.setMap(null);
            this.marker = new google.maps.Marker({
                map: this.map,
                position: res.geometry.location,
                animation: google.maps.Animation.DROP
            });
            this.map.setCenter(res.geometry.location);
        }

        function addMarkerCustom(location) {
            if(this.marker) this.marker.setMap(null);
            this.marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(location.lat, location.lng),
                //animation: google.maps.Animation.DROP,
                icon: './ico/17481383_Dhc_icon.ico'
            });
            this.map.setCenter(new google.maps.LatLng(location.lat, location.lng));
        }



        var promise;

        /**
         *
         * @param strData
         * @param access_token
         * @returns {*}
         */
        function getData(strData, access_token) {
            console.log("#getData start");
            var deferred = $q.defer();
            $http.get(CONSTANTS.urlGet + strData, config(access_token)).then(
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
         * @param object
         * @param access_token
         * @returns {*}
         */
        function putData(object, access_token) {
            console.log("#putData start");
            var deferred = $q.defer();
            $http.put(CONSTANTS.urlPut, object, config(access_token)).then(
                function (response) {
                    deferred.resolve(response.data);
                }).catch(function (errResponse) {
                    deferred.reject(errResponse);
                });
            console.log("#putData end");
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
