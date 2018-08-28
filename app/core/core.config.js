;(function () {
        'use strict';

        angular
            .module('app')
            .config(mainConfig);

        mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        function mainConfig($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/station/');

            $stateProvider
                // .state('home', {
                //     url: '/home',
                //     templateUrl: 'templates/homepage/homepage.html',
                //     controller: 'HomePageController',
                //     controllerAs: 'vm',
                //     resolve: {
                //         stations: getStationsList
                //     }
                // })
                .state('station', {
                    url: '/station/:station',
                    templateUrl: 'templates/station/station.html',
                    controller: 'StationPageController',
                    controllerAs: 'vm',
                    resolve: {
                        data: getData,
                        stations: getStationsList
                    },
                    params : {
                        stationInfo : {city: 'Aberporth', state: 'open', url: 'aberporthdata.txt'}
                    }
                });
        }

        function getStationsList(getRemoteData) {
            return getRemoteData.get();
        }

        function getData($log, $q, $stateParams, stations, getRemoteData) {
            var stationInfo = $stateParams.stationInfo;
            $log.debug(stationInfo);
            return $q.all({
                title: stationInfo.city,
                state: stationInfo.state,
                content: getRemoteData.get(stationInfo.url)
            });
        }
    }

)();

