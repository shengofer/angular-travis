(function () {
    'use strict';

    /** @ngInject*/
    class NavigationController {
        constructor(orderByFilter, NavigationService) {
            this.navService = NavigationService;
            this.items = orderByFilter(this.navService.getNavigationItems(), 'order');
        }

        isCurrent(state) {
            return this.navService.isCurrent(state);
        }
    }

    angular
        .module('mentoringApp')
        .controller('NavigationController', NavigationController);
})();
