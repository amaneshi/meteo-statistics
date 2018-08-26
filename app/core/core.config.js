;(function () {
        'use strict';

        angular
            .module('app')
            .config(mainConfig);

        mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        function mainConfig($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/homepage/homepage.html',
                    controller: 'HomePageController',
                    controllerAs: 'vm',
                    resolve: {
                        stations: getStationsList
                    }
                })
                .state('station', {
                    url: '/station/:station?state&file',
                    templateUrl: 'templates/station/station.html',
                    controller: 'StationPageController',
                    controllerAs: 'vm',
                    resolve: {
                        data: getData,
                        stations: getStationsList
                    }
                });
        }

        function getStationsList(getRemoteData) {
            return getRemoteData.get();
        }

        function getData($q, $stateParams, stations, getRemoteData) {
            return $q.all({
                title: $stateParams.station,
                state: $stateParams.state,
                file: $stateParams.file,
                content: getRemoteData.get($stateParams.file)
            });
        }
    }

)();

