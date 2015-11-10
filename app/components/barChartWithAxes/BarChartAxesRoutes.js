(function () {
    'use strict';
    angular.module('mentoringApp')
        .config(function ($stateProvider) {
            $stateProvider.state('barAxes', {
                url: '/barAxes',
                templateUrl: 'components/barChartWithAxes/barChartTemplate.html',
                controller: 'BarChartAxesController',
                controllerAs: 'barAxesCtrl',
                resolve: {
                    mentees(MenteeService) {
                        return MenteeService.getMentees();
                    }
                },
                data: {
                    primaryNavOptions: {
                        order: 0,
                        displayName: 'Bar Charts'
                    }
                }
            });
        });
})();
