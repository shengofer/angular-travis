(function () {
    'use strict';

    /** @ngInject*/
    class MenteeService {
        constructor($resource, MENTEE_LIST_ROUTE) {
            this.$resource = $resource(MENTEE_LIST_ROUTE + ':menteeId.json', {}, {
                query: {method: 'GET', params: {menteeId: 'mentees'}, isArray: true}
            });
        }

        getMentees() {
            return this.$resource.query().$promise;
        }

    }

    angular
        .module('mentoringApp')
        .service('MenteeService', MenteeService);
})();
