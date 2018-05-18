angular
  .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .controller('AppCtrl', function ($scope, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  });


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/