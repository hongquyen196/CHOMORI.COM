/**
 * Created by mac on 05/05/2018.
 */
'use strict';
var module = angular.module('BuyerOrderApp', ['BuyerOrderApp.controllers', 'BuyerOrderApp.services', 'ngStorage','ngRoute', 'ngMaterial','ngMessages']);
module.constant("CONSTANTS", {
    urlPost: "https://localhost:8080/api/buyer/createOrder"
});
