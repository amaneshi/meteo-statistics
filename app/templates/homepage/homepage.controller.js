;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomePageController', HomePageController);


    HomePageController.$inject = ['stations'];

    function HomePageController(stations) {
        var vm = this;
        vm.stations = stations;

    }
})();