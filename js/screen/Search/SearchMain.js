/**
 * Created by mac on 05/05/2018.
 */
'use strict';
var module = angular.module('SearchApp', ['SearchApp.controllers', 'SearchApp.services', 'ngStorage','ngRoute', 'ngMaterial','ngMessages']);
module.constant("CONSTANTS", {
    urlGet: "https://localhost:8080/api/buyer/search?"
});
