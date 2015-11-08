(function () {
    'use strict';
    angular
        .module('mentoringApp')
        .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('homePage', {
                    url: '/',
                    templateUrl: 'components/home/homepage.html'
                });
        })
        .constant('MENTEE_LIST_ROUTE', 'assets/data/');
})();
