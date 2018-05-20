/**
 * Created by mac on 05/05/2018.
 */
angular.module('WasherNearbyApp.services', []).factory('WasherNearbyService',
    ["$http", "CONSTANTS", "$q", function ($http, CONSTANTS, $q) {
        var factory = {
            postData: postData,
            addGoogleMaps: addGoogleMaps,
            addMarkerCustom: addMarkerCustom
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

        function addGoogleMaps() {
            var options = {
                center: new google.maps.LatLng(16.4581519, 107.5961825),
                zoom: 17,
                disableDefaultUI: true
            };
            //this.map = new google.maps.Map(
            //    document.getElementById("map"), options
            //);
            //this.places = new google.maps.places.PlacesService(this.map);

            this.map = new google.maps.Map(document.getElementById('map'), options);
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

    }]);
