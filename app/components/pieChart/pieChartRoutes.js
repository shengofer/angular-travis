(function () {
    'use strict';
    angular.module('mentoringApp')
        .config(function ($stateProvider) {
            $stateProvider.state('Pie Chart', {
                url: '/pie',
                templateUrl: 'components/pieChart/pieChartTemplate.html',
                controller: 'PieChartController',
                controllerAs: 'pieCtrl',
                resolve: {
                    mentees(MenteeService) {
                        return MenteeService.getMentees();
                    }
                },
                data: {
                    primaryNavOptions: {
                        order: 1,
                        displayName: 'Pie Charts'
                    }
                }
            });
        });
})();
