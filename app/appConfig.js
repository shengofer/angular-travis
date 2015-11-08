(function () {
    'use strict';
    let app = angular.module('mentoringApp', [
        'ngMaterial',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch'
    ]);

    app.config(function ($mdIconProvider) {
        $mdIconProvider.iconSet('core', '/assets/core-icons.svg', 24);
    });
})();
