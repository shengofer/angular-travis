(function () {
    'use strict';
    angular.module('mentoringApp')
        .config(function ($stateProvider) {
            $stateProvider.state('Score', {
                url: '/score',
                templateUrl: 'components/scoreCharts/mostScorapleTemplate.html',
                controller: 'ScoreController',
                controllerAs: 'scoreCtrl',
                resolve: {
                    mentees(MenteeService) {
                        return MenteeService.getMentees();
                    }
                },
                data: {
                    primaryNavOptions: {
                        order: 2,
                        displayName: 'Score Charts'
                    }
                }
            });
        });
})();
